import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import HttpStatusCodes from '@/utils/HttpStatusCodes';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

class UserService {
  private users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const findUser: User = await this.users.findOne({
      _id: userId,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
