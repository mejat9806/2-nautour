//! mainly for middleware declarations
//! only express shit goes here
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { router as tourRouter } from './routes/tourRoute.js';
import { router as userRouter } from './routes/userRoute.js';

dotenv.config({ path: './config.env' });

export const app = express();
///! middleware
if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //use middleware here //app.use is use to use middleware //this will make the req.body available
app.use(express.static(`./public`));
app.use((req, res, next) => {
  // every middleware get req,res,next
  console.log('hello from middleware ');
  next(); //this is important becasue if there is no next it will stop here
}); //order is important if this middleware is place after the route it will not run because the request will stop the route
app.use((req, res, next) => {
  req.requestTimes = new Date().toISOString(); //this will give use the request time and to use it put in the response like other middleware
  next();
});
app.use((req, res, next) => {
  req.hello = 'hello';
  next();
});
//!route
app.use('/api/v1/tours', tourRouter); //this will use tourRouter as middleware to that route
app.use('/api/v1/users', userRouter);

//! app middleware here is available for all routes
