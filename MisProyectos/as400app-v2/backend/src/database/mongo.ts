import mongoose from 'mongoose';

export const connectMongo = async () => {
  const uri = process.env.MONGO_URI!;
  await mongoose.connect(uri);
  console.log('[mongo] connected');
};
