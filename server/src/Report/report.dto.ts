import { IsEnum } from 'class-validator';
import { Reason, Status } from './report.interface';

export class ReportDTO {
  _course: string;
  _user: string;
  description: string;

  @IsEnum(Reason)
  reason: Reason;

  @IsEnum(Status)
  status: Status;
}
