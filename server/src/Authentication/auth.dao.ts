import { SECRET_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { ICookie, TokenData, TokenPayload } from '@Authentication/auth.interface';
import { IUser } from '@/User/user.interface';

import traineeModel from '@/Trainee/trainee.model';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { Role } from '@/User/user.enum';
import instructorModel from '@/Instructor/instructor.model';
import adminModel from '@/Admin/admin.model';
import { ITrainee } from '@/Trainee/trainee.interface';
import { IInstructor } from '@/Instructor/instructor.interface';
import { IAdmin } from '@/Admin/admin.interface';

class AuthService {
  public async signup(userData: CreateUserDto, role: Role): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

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
    const userWithEmail: IUser = await userModel.findOne({
      'email.address': userData.email.address,
    });
    if (userWithEmail) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email.address} already exists`);

    const userWithUsername: IUser = await userModel.findOne({
      username: userData.username,
    });

    if (userWithUsername) throw new HttpException(HttpStatusCodes.CONFLICT, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await userModel.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(userData: UserLoginDTO): Promise<{
    cookie: ICookie;
    findUser: IUser;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    let userModel;
    const findTrainee: IUser = await traineeModel.findOne({
      $or: [{ 'email.address': userData.emailAddress }, { username: userData.username }],
    });
    if (findTrainee) userModel = traineeModel;

    const findInstructor: IUser = await instructorModel.findOne({
      $or: [{ 'email.address': userData.emailAddress }, { username: userData.username }],
    });
    if (findInstructor) userModel = instructorModel;

    const findAdmin: IUser = await adminModel.findOne({
      $or: [{ 'email.address': userData.emailAddress }, { username: userData.username }],
    });
    if (findAdmin) userModel = adminModel;

    if (!findTrainee && !findInstructor && !findAdmin)
      throw new HttpException(HttpStatusCodes.CONFLICT, `Email or Username doesn't exist. Please try again`);

    const findUser = findTrainee ?? findInstructor ?? findAdmin;
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is invalid. Please try again');

    await userModel.updateOne({ _id: findUser._id }, { $set: { active: true, lastLogin: new Date() } });
    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  // public async logout(userData: IUser): Promise<IUser> {
  //   if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

  //   // Get role from token to know which model to use and logout user accordingly
  //   const findUser: IUser = await this.users.findOne({
  //     email: userData.email,
  //     password: userData.password,
  //   });
  //   if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `this email ${userData.email.address} was not found`);

  //   await this.users.updateOne({ _id: findUser._id }, { $set: { active: false, lastLogin: new Date() } });

  //   return findUser;
  // }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: TokenPayload = {
      _id: user._id,
    };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 1000 * 60 * 60 * 24 * 30; // a month

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): ICookie {
    return { name: 'Authorization', options: { httpOnly: true, maxAge: tokenData.expiresIn }, value: tokenData.token };
  }
}

export default AuthService;
