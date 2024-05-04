/* eslint-disable import/no-extraneous-dependencies */
//!start the server

import mongoose from 'mongoose';
import { app } from './app.js';

process.on('uncaughtException', () => {
  console.log(`uncaught Exception 😢 shutting down ...`);
  process.exit(1); //this shutdown the server
});
// all error/bug that happened in syncronous but not handled anywhere
const DB = process.env.MONGODB_URL.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD,
);
async function conDB() {
  await mongoose
    .connect(DB)
    .then(() => 'Connected to database')
    .catch((err) => err.message);
}
conDB();

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`listen app on port ${port}`);
});

//!step of how request is processed
//1 first it go to the server.js
//2 second it go to the app where our main middleware is place
//3 third it go to whichever route that it requests example here is tours and users
//4 then it will do the whichever controller handlrer  that the user request

//debuging node app
// use ndb and breakepoint

//!for unhandled rejection errors(error out like of express) example mongo DB connection like authentication wrong
//! this is mostly for async function/request
//?this is like event listener
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`unhandled rejection ${err.message} ⛔`);
  server.close(() => {
    process.exit(1); //this shutdown the server
  });
});
//!uncaught exception

//!
