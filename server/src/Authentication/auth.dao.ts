import { SECRET_KEY } from '@/Config';
import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto, FindUserDto } from '@/User/user.dto';
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

    const findUser: IUser = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} already exists`);
    //TODO : remove the check if user already existsalready in mongoose
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(userData: FindUserDto): Promise<{
    cookie: ICookie;
    findUser: IUser;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    const findUser: IUser = await this.users.findOne({
      email: userData.email,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `this email ${userData.email.address} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'password is not matching');
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
