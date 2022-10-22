import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { TokenData, TokenPayload } from '@interfaces/auth.interface';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import { isEmpty } from '@utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} already exists`);
    //TODO : remove the check if user already existsalready in mongoose
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{
    cookie: string;
    findUser: User;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: TokenPayload = {
      _id: user._id,
    };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
