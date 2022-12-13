import { ITrainee } from '@/Trainee/trainee.interface';

export interface IMessage {
  message: string;
  sender: ITrainee;
  users: ITrainee[];
}
