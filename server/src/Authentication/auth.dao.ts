import { logger } from '@/Utils/logger';
import { HttpException } from '@/Exceptions/HttpException';
import { UserDTO, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { type ICookie } from '@Authentication/auth.interface';
import { type ITokenPayload } from '@Token/token.interface';
import { generateTokens } from '@Token/token.util';
import { IUser } from '@/User/user.interface';
import { findUserModelByRole } from '@/User/user.util';

import traineeModel from '@/Trainee/trainee.model';
import { compare, genSalt, hash } from 'bcrypt';

import { Role } from '@/User/user.enum';
import instructorModel from '@/Instructor/instructor.model';
import adminModel from '@/Admin/admin.model';
import { IAdmin } from '@/Admin/admin.interface';
import { IInstructor } from '@/Instructor/instructor.interface';
import TraineeService from '@/Trainee/trainee.dao';
import InstructorService from '@/Instructor/instructor.dao';
import AdminService from '@/Admin/admin.dao';
import { sendResetPasswordEmail, sendVerificationEmail } from '@/Common/Email Service/email.template';
import { Types } from 'mongoose';
class AuthService {
  instructorService = new InstructorService();

  public async signup(userData: UserDTO, role: Role, isCorporate = false): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const userModel = findUserModelByRole(role);
    const userWithEmail: IUser = await userModel.findOne({
      'email.address': userData.email.address,
    });
    if (userWithEmail) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email.address} already exists`);

    const userWithUsername: IUser = await userModel.findOne({
      username: userData.username,
    });
    if (userWithUsername) throw new HttpException(HttpStatusCodes.CONFLICT, `This username ${userData.username} already exists`);

    userData.email.isVerified = true;
    if (isCorporate) userData.isCorporate = true;

    const createUserData = await userModel.create({
      ...userData,
    });

    return createUserData;
  }

  public async login(userData: UserLoginDTO): Promise<{
    accessToken: string;
    cookie: ICookie;
    findUser: IUser;
    refreshToken: string;
    role: Role;
    firstLogin: boolean;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    let userModel: typeof traineeModel | typeof instructorModel | typeof adminModel, findInstructor: IInstructor, findAdmin: IAdmin;
    let role: Role;
    const query = {
      $or: [{ 'email.address': userData?.email?.address??"" }, { username: userData?.username??"" }],
    };

    const findTrainee = await traineeModel.findOne(query).select('-active');
    userModel = findTrainee ? traineeModel : null;
    role = findTrainee ? Role.TRAINEE : null;

    if (!userModel) {
      findInstructor = await instructorModel.findOne(query).select('-active');
      userModel = findInstructor ? instructorModel : null;
      role = findInstructor ? Role.INSTRUCTOR : null;
    }
    if (!userModel) {
      findAdmin = await adminModel.findOne(query).select('-active');
      userModel = findAdmin ? adminModel : null;
      role = findAdmin ? Role.ADMIN : null;
    }

    if (!userModel) throw new HttpException(HttpStatusCodes.CONFLICT, "Email or Username doesn't exist. Please Sign Up First");

    const findUser = findTrainee ?? findInstructor ?? findAdmin;

    // check if user logged in before or not
    const firstLogin = !findUser.lastLogin;

    // check Password Hashing
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is invalid. Please try again');

    // activate user
    await userModel.updateOne({ _id: findUser._id }, { $set: { active: true, lastLogin: new Date() } });

    // generate token
    const TokenPayload = {
      _id: findUser._id,
      role,
    };
    const { accessToken, refreshToken } = await generateTokens(TokenPayload);

    const cookie = this.createCookie(refreshToken);

    delete findUser.password;
    findUser.role = role;

    return { accessToken, cookie, findUser, refreshToken, role, firstLogin };
  }

  public async logout(tokenPayload: ITokenPayload): Promise<IUser> {
    if (isEmpty(tokenPayload)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Token is empty');
    const { role, _id } = tokenPayload;
    const userModel = findUserModelByRole(role);
    if (!userModel) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role is Wrong');
    const findUser = await userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            active: false,
          },
        },
        { new: true },
      )
      .lean();

    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `this id ${_id} was not found`);

    return findUser;
  }

  // change any user password
  public async changePassword(userId: string, role: Role, oldPassword: string, newPassword: string): Promise<IUser> {
    if (!Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Invalid ObjectId');

    const userModel = findUserModelByRole(role);
    if (!userModel) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role does not exist');

    const user = await userModel.findById(userId).lean();
    if (!user) throw new HttpException(HttpStatusCodes.BAD_REQUEST, `No matching user found`);

    const isPasswordMatching: boolean = await compare(oldPassword, user.password);
    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Current Password is invalid. Please try again');

    const salt = await genSalt();
    newPassword = await hash(newPassword, salt);

    const updatedUser = await userModel.findByIdAndUpdate(userId, { password: newPassword });

    return updatedUser;
  }

  //forget pass
  public sendResetPasswordEmail = async (userEmail: string): Promise<void> => {
    userEmail = userEmail.toLowerCase();
    const trainee = await new TraineeService().getTraineeByEmail(userEmail);
    const instructor = await new InstructorService().getInstructorByEmail(userEmail);
    const admin = await new AdminService().getAdminByEmail(userEmail);
    const user = trainee ?? instructor ?? admin;
    if (!user) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email does not belong to a user');

    const username = user.name;
    const userId = user._id.toString();

    let role: Role = Role.TRAINEE;
    if (instructor) role = Role.INSTRUCTOR;
    if (admin) role = Role.ADMIN;

    //send email
    sendResetPasswordEmail(userEmail, username, userId, role);
  };

  public sendVerificationEmail = async (email: string, username: string): Promise<Number> => {
    email = email.toLowerCase();
    //generate a 6 digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    //send email
    sendVerificationEmail(email, username, verificationCode);

    // save code
    return verificationCode;
  };

  // creates a cookie
  public createCookie(refreshToken: string): ICookie {
    return {
      name: 'Authorization',
      options: {
        httpOnly: true, // only accessible by a web server
        maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 1 week
        sameSite: 'none', // cross-site cookie
        secure: false, //https
      },
      value: refreshToken,
    };
  }
}

export default AuthService;
