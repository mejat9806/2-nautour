import { AppError } from '../utils/appError.js';

function handleCastErrorDB(error) {
  const message = ` invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}
function handleDuplicateDate(error) {
  const value = Object.values(error.keyValue)[0]; //this will work with any duplicate value
  const message = `Duplicate field value: ${value}. Use another value.`;
  return AppError(message, 400);
}
function handleValidationErrorDB(err) {
  const error = Object.values(err.errors).map((val) => val.message);
  const message = `invalid input data ${error.join(', ')}`;
  return AppError(message, 400);
}

function handleJsonWebTokenError() {
  return AppError('something goes wrong with token ,please login again ', 401);
}
function handleJsonWebTokenExpired() {
  return AppError('token expired ,please login again ', 401);
}
const sendErrorDev = (req, res, err) => {
  //this of the api like postman
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      errorStack: err.stack,
    });
  }
  //this is for render
  return res.status(err.statusCode).render('error', {
    tittle: 'some went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (req, res, err) => {
  console.log(req);
  //this for api
  if (req.originalUrl.startsWith('/api')) {
    //operational error ,trusted error :send message to client
    if (err.isOperational) {
      // part II then this will run
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //this is programing or other unknow error : dont leak error detail
    //this is like  the mongoose error
    return res.status(500).json({
      status: 'error',
      message: 'something when wrong',
    });
  }
  //this for render website

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      tittle: 'some went wrong',
      msg: err.message,
    });
  }
  // programing or other unknow error : dont leak error detail for render website
  return res.status(err.statusCode).render('error', {
    tittle: 'some went wrong',
    msg: 'please try again',
  });
};
export function globalErrorHandler(err, req, res, next) {
  //(err.stack); //this will give the origi of the error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message; //add the message to the error
    //let error = Object.create(err);

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error); //this will add the result of the function to the error and send it to the sendErrorProd then part II
    }
    if (error.code === 11000) {
      error = handleDuplicateDate(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJsonWebTokenExpired();
    }
    sendErrorProd(req, res, err);
  }
}

// export function globalErrorHandler(err, req, res, next) {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   if (process.env.NODE_ENV === 'development') {
//     // Handle error in development environment
//     sendErrorDev(req, res, err);
//   } else if (process.env.NODE_ENV === 'production') {
//     // Handle error in production environment
//     //  let error = Object.create(err);
//     let error = { ...err };
//     error.message = err.message; //add the message to the error

//     if (error.name === 'CastError') {
//       error = handleCastErrorDB(error);
//     }
//     if (error.code === 11000) {
//       error = handleDuplicateDate(error);
//     }
//     if (error.name === 'ValidationError') {
//       error = handleValidationErrorDB(error);
//     }
//     if (error.name === 'JsonWebTokenError') {
//       error = handleJsonWebTokenError();
//     }
//     if (error.name === 'TokenExpiredError') {
//       error = handleJsonWebTokenExpired();
//     }
//     // Send error response
//     sendErrorProd(req, error, res);
//   }
// }
