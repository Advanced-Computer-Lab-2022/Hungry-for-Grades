import { HttpException } from '@/Exceptions/HttpException';
import instructorModel from '@/Instructor/instructor.model';
import { CreateUserDto } from '@/User/user.dto';
import { IUser } from '@/User/user.interface';
import userModel from '@/User/user.model';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { IInstructor } from '@Instructor/instructor.interface';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { isEmpty } from '../Utils/util';

class InstructorService {
  public instructors = instructorModel;
  public users = userModel;

  public async findInstructorByUserId(_user: string): Promise<IInstructor> {
    if (isEmpty(_user)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is empty');

    if (!mongoose.Types.ObjectId.isValid(_user)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

    const instructor: IInstructor &
      mongoose.Document & {
        _id: mongoose.Types.ObjectId;
      } = await this.instructors.findOne({ _user: _user });
    return instructor;
  }

  //    public async findUserById(userId: string): Promise<IUser> {
  //   if (isEmpty(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is empty');
  //   if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

  //   const findUser: IUser = await this.users.findOne({
  //     _id: userId,
  //   });
  //   if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

  //   return findUser;
  // }

  // public async createUser(userData: CreateUserDto): Promise<IUser> {
  //   if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');

  //   const findUser: IUser = await this.users.findOne({
  //     email: userData.email,
  //   });
  //   if (findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `This email ${userData.email} already exists`);

  //   const hashedPassword = await hash(userData.password, 10);
  //   const createUserData: IUser = await this.users.create({
  //     ...userData,
  //     password: hashedPassword,
  //   });

  //   return createUserData;
  // }

  // public async updateUser(userId: string, userData: CreateUserDto): Promise<IUser> {
  //   if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'userData is empty');
  //   if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');

  //   const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<IUser> {
  //   if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'User Id is an invalid Object Id');
  //   const deleteUserById: IUser = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(HttpStatusCodes.CONFLICT, "User doesn't exist");

  //   return deleteUserById;
  // }
}

export default InstructorService;
