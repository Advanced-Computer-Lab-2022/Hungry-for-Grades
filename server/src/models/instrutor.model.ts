import { User } from '@interfaces/users.interface';
import { Document, model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  _instructor:{type:Schema.Types.ObjectId, ref:'Instructor'},
  _trainee:{type:Schema.Types.ObjectId, ref:'Trainee'},
  _corporate:{type:Schema.Types.ObjectId, ref:'Corporate'},
  role: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
