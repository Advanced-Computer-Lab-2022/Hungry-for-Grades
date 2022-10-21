import { Reason, Report, Status } from '@/interfaces/report.interface';
import { Document, model, Schema } from 'mongoose';

const reportSchema = new Schema<Report>(
  {
    _course: {
      ref: 'Course',
      type: Schema.Types.ObjectId,
    },
    _user: {
      ref: 'User',
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
