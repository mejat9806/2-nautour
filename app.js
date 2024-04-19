//! mainly for middleware declarations
//!all middleware declarations here will be always available on all sucessful requests
//! middleware is in sequential  order
//! only express shit goes here
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { router as tourRouter } from './routes/tourRoute.js';
import { router as userRouter } from './routes/userRoute.js';
import { AppError } from './utils/appError.js';
import { globalErrorHandler } from './controller/errorController.js';
import { router as reviewRouter } from './routes/reviewRoute.js';

dotenv.config({ path: './.env' });

export const app = express();
///! Global middleware

//! development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//! header secrurity
//!
app.use(helmet());
//!
//! cors
app.use(cors());
//!
//!rate limit (this will limit how many request an ip can attemp)
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, //this allow 100 request in 1 hours
  message: 'To Many request from  this IP ,pls try again in an hours ',
});

app.use('/api', limiter);
//!
//!Body Parser ,reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //use middleware here //app.use is use to use middleware //this will make the req.body available //limit is to make sure it only give meaning ful data

//!data sanatization against NoSQL query injection
app.use(ExpressMongoSanitize());
//!
//!data sanatization against XSS
app.use(xss());
//!

//! parameter polution
app.use(
  hpp({
    //prevent duplicate parameters like 2 of the same parameter like 2 sort
    whitelist: [
      //whitelist will allow duplicates
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'difficulty',
      'maxGroupSize',
      'difficulty',
      'fields',
      'price',
    ],
  }),
);
//!
//! serving static files
app.use(express.static(`./public`));
// app.use((req, res, next) => {
//   // every middleware get req,res,next
//   console.log('hello from middleware ');
//   next(); //this is important becasue if there is no next it will stop here
// }); //order is important if this middleware is place after the route it will not run because the request will stop the route
//!

//Test middleWare
app.use((req, res, next) => {
  req.requestTimes = new Date().toISOString(); //this will give use the request time and to use it put in the response like other middleware
  //console.log(req.headers); //this use to send JWT token it should be in this format   authorization: 'Bearer dfasfasfafa',
  next();
});
// app.use((req, res, next) => {

//   next();
// });

//!route
app.use('/api/v1/tours', tourRouter); //this will use tourRouter as middleware to that route //all of the tours stuff need to go through this middleware
app.use('/api/v1/users', userRouter); //all of the user like signUp logiN  stuff need to go through this middleware
app.use('/api/v1/review', reviewRouter);
app.all('*', (req, res, next) => {
  //!this for handling routes that are not specified in the app.js

  const err = AppError(`cant find ${req.originalUrl} on this server`, 404); //this is FP version

  next(err); //this make it will go straight to the error handler middleware (globalErrorHandler)
  //!

  // next(AppError2(`cant find ${req.originalUrl} on this server`, 404)); //this make it will go straight to the error handler middleware //this is class version
});

//! error handler middleware
//this global error handler
app.use(globalErrorHandler);
//!

//?order of the error handling in express
//1 error is trigger by route or something
//2 then we send the error message and the statusCode to the AppError function/class
//3 the AppError will create the error message and the statusCode and return the error back for the next(err)
//4 then the next(err) will go straight to the error handler middleware and make a response to user for us
//! app middleware here is available for all routes

//?app.use have 2 arguments 1 is the path  and next is the callback function  .if the path is not specified it will run on all routes
//? order matters in the middleware
