import mongoose, { Document, model, models } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  private: boolean;
  discord: string | null;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  private: {
    type: Boolean,
    required: true,
    default: true,
  },
  discord: {
    type: String,
    default: null,
  },
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
