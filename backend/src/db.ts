import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://erikwistrand04:CUl7c9cN6plAptDo@cluster0.fv3kz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;