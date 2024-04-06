// export class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message); //super allows us to call the constructer of the parent class (Error for example)
//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

export function AppError(message, statusCode) {
  const status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

  const err = new Error(message);
  err.statusCode = statusCode;
  err.status = status;
  err.isOperational = true; //this is used to mark operational errors

  Error.captureStackTrace(err, AppError);

  return err;
}

//!flow of error
//!  return next(err) is called then it will go to the globalErrorHandler then to AppError then  create the error data then to the error controller to send it to user as response

//extra note in Error_note
