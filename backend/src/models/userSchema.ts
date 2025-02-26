import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
}

const userSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };