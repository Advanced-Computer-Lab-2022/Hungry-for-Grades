import { Schema, model } from 'mongoose';
import { type IToken } from './toke.interface';

const userTokenSchema = new Schema<IToken>({
  createdAt: { default: Date.now, expires: 30 * 86400, type: Date },
  token: { required: true, type: String },
  userId: { required: true, type: Schema.Types.ObjectId }, // 30 days
});

const UserToken = model<IToken>('UserToken', userTokenSchema);

export default UserToken;
