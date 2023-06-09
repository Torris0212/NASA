import mongoose from "mongoose";

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
})

mongoose.connection.on('error', (err) => {
  console.error(err);
})

const MONGO_URL = "mongodb+srv://torris:1peGHgSLIxHIwB7H@nasacluster.unzzfmy.mongodb.net/nasa?retryWrites=true&w=majority";

export const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
}

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
}
