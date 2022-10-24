/* eslint-disable security/detect-object-injection */
import { HttpException } from '@/exceptions/HttpException';
import { CreateUserDto } from '@/User/user.dto';
import { IUser } from '@/User/user.interface';
import userModel from '@/User/user.model';
import HttpStatusCodes from '@/utils/HttpStatusCodes';
import { PaginatedData } from '@/utils/PaginationResponse';
import { isEmpty } from '@utils/util';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { filters } from './user.type';

class UserService {
  public users = userModel;

  public async findAllUser(filters: filters): Promise<PaginatedData<IUser>> {
    const { page = 1, limit = 12, sortBy, orderBy, search } = filters;
    const query = {};
    query['$and'] = [];
    for (const key in filters) {
      if (filters[key] && key !== 'page' && key !== 'limit' && key !== 'sortBy' && key !== 'orderBy') {
        const filter = {};
        filter[key] = filters[key];
        query['$and'].push(filter);
      }
    }
    if (search) {
      query['$or'] = [
        {
          name: {
            $options: 'i',
            $regex: search,
          },
        },
        {
          email: {
            $options: 'i',
            $regex: search,
          },
        },
      ];
    }
    let users: (IUser &
      mongoose.Document & {
        _id: mongoose.Types.ObjectId;
      })[];

    if (sortBy && orderBy) {
      users = await this.users
        .find(query)
        .sort({ sortBy: orderBy })
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      users = await this.users
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    }

    const totalPages = await this.users.countDocuments(query);

    return { data: users, message: 'Completed Successfully', page: page, pageSize: users.length, totalPages: totalPages };
  }

  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const findUser: IUser = await this.users.findOne({
      _id: userId,
    });
    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');

    const findUser: IUser = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');
    const deleteUserById: IUser = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
