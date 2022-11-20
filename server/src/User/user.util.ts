import adminModel from '@/Admin/admin.model';
import instructorModel from '@/Instructor/instructor.model';
import traineeModel from '@/Trainee/trainee.model';
import { Role } from './user.enum';

export function findUserModelByRole(role: Role) {
  let userModel;
  switch (role) {
    case Role.TRAINEE:
      userModel = traineeModel;
      break;
    case Role.INSTRUCTOR:
      userModel = instructorModel;
      break;
    case Role.ADMIN:
      userModel = adminModel;
      break;
    default:
      userModel = null;
  }
  return userModel;
}
