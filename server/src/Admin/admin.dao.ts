import { HttpException } from '@/Exceptions/HttpException';
import { CreateUserDto } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import userService from '@/User/users.dao';
import AuthService from '@/Authentication/auth.dao';
import { IUser } from '@/User/user.interface';
import { Role } from '@/User/user.enum';
import InstructorService from '@/Instructor/instructor.dao';
import { CreateInstructorDTO } from '@/Instructor/instructor.dto';
import mongoose from 'mongoose';
import { IInstructor } from '@/Instructor/instructor.interface';
import { CreateTraineeDTO } from '@/Trainee/trainee.dto';
import TraineeService from '@/Trainee/trainee.dao';
import { Trainee } from '@/Trainee/trainee.interface';

class AdminService {
  public authService = new AuthService();
  public instructorService = new InstructorService();
  public traineeService = new TraineeService();

  //create admin service
  public createAdmin = async (adminData: CreateUserDto): Promise<IUser> => {
    if (isEmpty(adminData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Admin data is empty');
    if (adminData.role != Role.ADMIN) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role is not admin');

    const createdUser = this.authService.signup(adminData);

    return createdUser;
  };

  //create new instructor
  public createInstructor = async (instructorData: CreateInstructorDTO): Promise<IInstructor> => {
    if (isEmpty(instructorData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor data is empty');
    if (instructorData.role != Role.INSTRUCTOR) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role is not instructor');

    const createdUser = await this.authService.signup(instructorData);
    const createdInstructor = await this.instructorService.createInstructor({ ...instructorData, _user: createdUser._id });

    return createdInstructor;
  };

  //create new trainee
  public createCorporateTrainee = async (traineeData: CreateTraineeDTO): Promise<Trainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');
    if (traineeData.role != Role.TRAINEE) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role is not trainee');

    const createdUser = await this.authService.signup(traineeData);
    const createdCorporateTrainee = await this.traineeService.createCorporateTrainee({ ...traineeData, _user: createdUser._id });

    return createdCorporateTrainee;
  };
}

export default AdminService;
