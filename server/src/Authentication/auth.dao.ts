import { SECRET_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { ICookie, TokenData, TokenPayload } from '@Authentication/auth.interface';
import { IUser } from '@/User/user.interface';
import userModel from '@User/user.model';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const userWithEmail: IUser = await this.users.findOne({
      'email.address': userData.email.address,
    });
    if (userWithEmail) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email.address} already exists`);

    const userWithUsername: IUser = await this.users.findOne({
      username: userData.username,
    });

    if (userWithUsername) throw new HttpException(HttpStatusCodes.CONFLICT, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({
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

    const findUser: IUser = await this.users.findOne({
      $or: [{ 'email.address': userData.emailAddress }, { username: userData.username }],
    });
    //console.log(findUser);
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `Email or Username doesn't exist. Please try again`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is invalid. Please try again');

    await this.users.updateOne({ _id: findUser._id }, { $set: { active: true, lastLogin: new Date() } });
    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    const findUser: IUser = await this.users.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `this email ${userData.email.address} was not found`);

    await this.users.updateOne({ _id: findUser._id }, { $set: { active: false, lastLogin: new Date() } });

    return findUser;
  }

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
