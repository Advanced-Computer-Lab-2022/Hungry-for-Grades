import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { type ICookie } from '@Authentication/auth.interface';
import { type ITokenPayload } from '@Token/token.interface';
import { generateTokens } from '@Token/token.util';
import { IUser } from '@/User/user.interface';
import { findUserModelByRole } from '@/User/user.util';

import traineeModel from '@/Trainee/trainee.model';
import { compare } from 'bcrypt';

import { Role } from '@/User/user.enum';
import instructorModel from '@/Instructor/instructor.model';
import adminModel from '@/Admin/admin.model';
import { IAdmin } from '@/Admin/admin.interface';
import { IInstructor } from '@/Instructor/instructor.interface';

class AuthService {
  public async signup(userData: CreateUserDto, role: Role): Promise<any> {
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

    const createUserData = await userModel.create({
      ...userData,
    });

    return createUserData;
  }

  public async login(userData: UserLoginDTO): Promise<{
    accessToken: string;
    cookie: ICookie;
    findUser: IUser;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    let userModel: typeof traineeModel | typeof instructorModel | typeof adminModel, findInstructor: IInstructor, findAdmin: IAdmin;
    let role: Role;
    const query = {
      $or: [{ 'email.address': userData.email.address }, { username: userData.username }],
    };

    const findTrainee = await traineeModel.findOne(query);
    userModel = findTrainee ? traineeModel : null;
    role = findTrainee ? Role.TRAINEE : null;

    if (!userModel) {
      findInstructor = await instructorModel.findOne(query);
      userModel = findInstructor ? instructorModel : null;
      role = findInstructor ? Role.INSTRUCTOR : null;
    }
    if (!userModel) {
      findAdmin = await adminModel.findOne(query);
      userModel = findAdmin ? adminModel : null;
      role = findAdmin ? Role.ADMIN : null;
    }

    if (!userModel) throw new HttpException(HttpStatusCodes.CONFLICT, "Email or Username doesn't exist. Please Sign Up First");

    const findUser = findTrainee ?? findInstructor ?? findAdmin;

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

    return { accessToken, cookie, findUser };
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
