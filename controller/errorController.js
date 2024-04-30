import { AppError } from '../utils/appError.js';

// Function to handle CastError from MongoDB
function handleCastErrorDB(error) {
  const message = ` invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}

// Function to handle duplicate data error from MongoDB
function handleDuplicateDate(error) {
  const value = Object.values(error.keyValue)[0];
  const message = `Duplicate field value: ${value}. Use another value.`;
  return AppError(message, 400);
}

// Function to handle validation errors from MongoDB
function handleValidationErrorDB(err) {
  const error = Object.values(err.errors).map((val) => val.message);
  const message = `invalid input data ${error.join(', ')}`;
  return AppError(message, 400);
}

// Function to handle JsonWebTokenError
function handleJsonWebTokenError() {
  return AppError('something goes wrong with token ,please login again ', 401);
}

// Function to handle TokenExpiredError
function handleJsonWebTokenExpired() {
  return AppError('token expired ,please login again ', 401);
}

// Function to send error response in development environment
const sendErrorDev = (req, res, err) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      errorStack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    tittle: 'some went wrong',
    msg: err.message,
  });
};

// Function to send error response in production environment
const sendErrorProd = (req, err, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'something when wrong',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      tittle: 'some went wrong',
      msg: err.message,
    });
  }
  return res.status(err.statusCode).render('error', {
    tittle: 'some went wrong',
    msg: 'please try again',
  });
};

// Global error handling middleware
export function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Handle error in development environment
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    // Handle error in production environment
    let error = Object.create(err);

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
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
    // Send error response
    sendErrorProd(req, error, res);
  }
}
