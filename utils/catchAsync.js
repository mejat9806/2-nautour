export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err)); //!this next(err) will go directly to globaleErrorHandler
};
//! how this function works
//! we wrap the function inside of catchAsync to remove the tryCatch block
//! the postTour will call the catchAsync function and that function will return a anonymous function (promise) that will be used by the postTour
//! it work by using catch method(available for all promise) that will only run if there is a error happened
