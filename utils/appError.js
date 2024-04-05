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
  err.statusCodes = statusCode;
  err.status = status;
  err.isOperational = true;
  Error.captureStackTrace(err, AppError);
  return err;
}
