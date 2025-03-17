import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  reqruiter: boolean;
}

const userSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  reqruiter: { type: Boolean, default: false }
});

const ReqruiterSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reqruiter: { type: Boolean, default: true },
  company: { type: String, required: true }
});



const User = mongoose.model<IUser>('User', userSchema);
const Reqruiter = mongoose.model<IUser>('Reqruiter', ReqruiterSchema);
export default User;
export {Reqruiter};
export { IUser };