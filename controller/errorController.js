export function globalErrorHandler(err, req, res, next) {
  //console.log(err.stack); //this will give the origi of the error
  err.statusCode = err.statusCodes || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
