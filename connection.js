/* eslint-disable prefer-template */
import mongoose from 'mongoose';

const connection = {};

export async function connectToDB() {
  const mongoURL = process.env.MONGODB_URL;
  try {
    if (connection.isConnected) {
      console.log('connection is already exist');
      return;
    }
    if (!mongoURL) {
      console.log('MONGO URL WRONG ');
      return;
    }
    const db = await mongoose.connect(mongoURL);

    connection.isConnected = db.connections[0].readyState;
    console.log(`connection is  ${connection.isConnected}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('DB error');
  }
}
