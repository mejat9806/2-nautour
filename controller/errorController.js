import { AppError } from '../utils/appError.js';

function handleCastErrorDB(error) {
  const message = ` invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}
function handleDuplicateDate(error) {
  const value = Object.values(error.keyValue)[0]; //this will work with any duplicate value
  const message = `Duplicate field value: ${value}. Use another value.`;
  return new AppError(message, 400);
}
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    errorStack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //operational error ,trusted error :send message to client
  if (err.isOperational) {
    // part II then this will run
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //this is programing or other unknow error : dont leak error detail
  } else {
    //this is like  the mongoose error
    //1)log eror
    console.error(err, 'here error ');
    //2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'something go wrong ',
    });
  }
};
export function globalErrorHandler(err, req, res, next) {
  //console.log(err.stack); //this will give the origi of the error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = JSON.parse(JSON.stringify(err));

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error); //this will add the result of the function to the error and send it to the sendErrorProd then part II
    }
    if (error.code === 11000) {
      error = handleDuplicateDate(error);
    }
    sendErrorProd(error, res);
  }
}
