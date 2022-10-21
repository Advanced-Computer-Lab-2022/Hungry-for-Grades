import { hash } from 'bcrypt';
import { CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';
import HttpStatusCodes from '@/utils/HttpStatusCodes';
import mongoose from 'mongoose';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'User Id is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(400, 'User Id is an invalid Object Id');

    const findUser: User = await this.users.findOne({
      _id: userId,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(400, 'User Id is an invalid Object Id');

    if (userData.email) {
      const findUser: User = await this.users.findOne({
        email: userData.email,
      });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = {
        ...userData,
        password: hashedPassword,
      };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(400, 'User Id is an invalid Object Id');
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;