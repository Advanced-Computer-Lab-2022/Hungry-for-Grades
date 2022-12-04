import { Reason, Report, Status } from '@/Report/report.interface';
import { Role } from '@/User/user.enum';
import { Document, model, Schema } from 'mongoose';

const reportSchema = new Schema<Report>(
  {
    _course: {
      ref: 'Course',
      type: Schema.Types.ObjectId,
    },
    _user: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    description: String,
    reason: {
      default: Reason.OTHER,
      enum: Object.values(Reason),
      type: String,
    },
    status: {
      default: Status.PENDING,
      enum: Object.values(Status),
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const reportModel = model<Report & Document>('Report', reportSchema);

export default reportModel;
