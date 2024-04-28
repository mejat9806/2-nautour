/* eslint-disable prefer-template */
import mongoose from 'mongoose';

const connection = {};

export async function connectToDB(DB) {
  const mongoURL = DB;
  try {
    if (connection.isConnected) {
      ('connection is already exist');
      return;
    }
    if (!mongoURL) {
      ('MONGO URL WRONG ');
      return;
    }
    const db = await mongoose.connect(mongoURL);

    connection.isConnected = db.connections[0].readyState;
    `connection is  ${connection.isConnected}`;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('DB error');
  }
}
