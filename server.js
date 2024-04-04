/* eslint-disable import/no-extraneous-dependencies */
//!start the server

import { app } from './app.js';
import { connectToDB } from './connection.js';
/* 
const DB = process.env.MONGODB_URL;
mongoose.connect(DB).then((con) => {
  console.log('DB connection successfull');
});
 */
connectToDB(); //connet to mongodb
// const testTour = new Tour({
//   name: 'forest blue',
//   price: 200,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('error', err);
//   });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listen app on port ${port}`);
});

//!step of how request is processed
//1 first it go to the server.js
//2 second it go to the app where our main middleware is place
//3 third it go to whichever route that it requests example here is tours and users
//4 then it will do the whichever controller handlrer  that the user request
