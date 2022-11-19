import { HttpException } from '@/Exceptions/HttpException';
import { Role } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import { CreateTraineeDTO } from './trainee.dto';
import { ITrainee } from './trainee.interface';
import traineeModel from './trainee.model';

class TraineeService {
  //create trainee service
  public createCorporateTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    // User should be created before corporate trainee
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdCorporateTrainee = traineeModel.create({ ...traineeData });
    return createdCorporateTrainee;
  };

  public createTrainee = async (traineeData: CreateTraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdTrainee = traineeModel.create({ ...traineeData });
    return createdTrainee;
  };
}
export default TraineeService;
