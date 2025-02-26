import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://merlynndbuser:merlynn@merlynndb.wqpys.mongodb.net/";
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
