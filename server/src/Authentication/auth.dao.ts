import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { type ICookie } from '@Authentication/auth.interface';
import { type ITokenService, type ITokenPayload } from '@Token/token.interface';
import { generateTokens } from '@Token/token.util';
import { IUser } from '@/User/user.interface';

import traineeModel from '@/Trainee/trainee.model';
import { compare } from 'bcrypt';

import { Role } from '@/User/user.enum';
import instructorModel from '@/Instructor/instructor.model';
import adminModel from '@/Admin/admin.model';
import { IInstructor } from '@/Instructor/instructor.interface';
import { IAdmin } from '@/Admin/admin.interface';
import { logger } from '@/Utils/logger';

class AuthService {
  public async signup(userData: CreateUserDto, role: Role): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const userModel = this.findUserModelByRole(role);
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
      logger.info(findAdmin);
      userModel = findAdmin ? adminModel : null;
      role = findAdmin ? Role.ADMIN : null;
    }

    if (!userModel) throw new HttpException(HttpStatusCodes.CONFLICT, "Email or Username doesn't exist. Please Sign Up First");

    const findUser = findTrainee ?? findInstructor ?? findAdmin;

    // check Password Hashing
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    logger.info(isPasswordMatching);

    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is invalid. Please try again');

    // activate user
    await userModel.updateOne({ _id: findUser._id }, { $set: { active: true, lastLogin: new Date() } });

    // create token
    const TokenPayload = {
      _id: findUser._id,
      role,
    };
    const { accessToken, refreshToken } = await generateTokens(TokenPayload);

    const tokenData = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(tokenPayload: ITokenPayload): Promise<IUser> {
    if (isEmpty(tokenPayload)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Token is empty');
    const { role, _id } = tokenPayload;
    const userModel = this.findUserModelByRole(role);
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

  public createCookie(tokenData: ITokenService): ICookie {
    return { name: 'Authorization', options: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 }, value: tokenData };
  }
  public findUserModelByRole(role: Role) {
    let userModel;
    switch (role) {
      case Role.TRAINEE:
        userModel = traineeModel;
        break;
      case Role.INSTRUCTOR:
        userModel = instructorModel;
        break;
      case Role.ADMIN:
        userModel = adminModel;
        break;
    }
    return userModel;
  }
}

export default AuthService;
