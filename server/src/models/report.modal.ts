import {
  reason,
  Report,
  status,
} from '@/interfaces/report.interface';
import {
  Document,
  model,
  Schema,
} from 'mongoose';

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
      default: reason.OTHER,
      enum: Object.values(reason),
      type: String,
    },
    status: {
      default: status.PENDING,
      enum: Object.values(status),
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const reportModel = model<Report & Document>(
  'Report',
  reportSchema,
);

export default reportModel;
