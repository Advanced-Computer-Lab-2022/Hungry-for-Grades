import { HttpException } from '@/Exceptions/HttpException';
import { UserDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import AuthService from '@/Authentication/auth.dao';
import { UserRole } from '@/User/user.enum';
import InstructorService from '@Instructor/instructor.dao';
import { CreateInstructorDTO } from '@/Instructor/instructor.dto';
import { IInstructor } from '@/Instructor/instructor.interface';
import { TraineeDTO } from '@/Trainee/trainee.dto';
import TraineeService from '@Trainee/trainee.dao';
import { ITrainee } from '@/Trainee/trainee.interface';
import { IAdmin } from './admin.interface';
import adminModel from './admin.model';

class AdminService {
  public authService = new AuthService();
  public instructorService = new InstructorService();
  public traineeService = new TraineeService();

  //create admin service
  public createAdmin = async (adminData: UserDTO): Promise<IAdmin> => {
    if (isEmpty(adminData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Admin data is empty');

    const createdUser = this.authService.signup(adminData, UserRole.ADMIN);
    return createdUser;
  };

  //create new instructor
  public createInstructor = async (instructorData: CreateInstructorDTO): Promise<IInstructor> => {
    if (isEmpty(instructorData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor data is empty');

    instructorData = { ...instructorData, rating: { averageRating: 0, reviews: [] } };
    const createdInstructor = await this.authService.signup(instructorData, UserRole.INSTRUCTOR);

    return createdInstructor;
  };

  //create new trainee
  public createCorporateTrainee = async (traineeData: TraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdTrainee = await this.authService.signup(traineeData, UserRole.TRAINEE, true);

    return createdTrainee;
  };
  // @desc get all Admins
  public async findAdmins(): Promise<IAdmin[]> {
    return await adminModel.find().select('-password ');
  }

  //get admin by email
  public getAdminByEmail = async (adminEmail: string): Promise<IAdmin> => {
    if (isEmpty(adminEmail)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email is empty');
    const admin: IAdmin = await adminModel.findOne({ 'email.address': adminEmail }).select('-password');

    return admin;
  };

  // get admin by username
  public getAdminByUsername = async (adminUsername: string): Promise<IAdmin> => {
    if (isEmpty(adminUsername)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Username is empty');

    const admin: IAdmin = await adminModel.findOne({ username: adminUsername }).select('-password');
    return admin;
  };
}

export default AdminService;
