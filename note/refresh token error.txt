export const refreshToken = async (req, res, next) => {
  // (req.cookies.jwt, ' at refresh');
  const reToken = req.cookies.refreshToken;

  if (reToken) {
    try {
      const decoded = await promisify(jwt.verify)(
        reToken,
        process.env.REFRESH_JWT_SECRET,
      ).catch(() => false); //use to translate the token to readable object of string
      const currentUser = await User.findById(decoded.id).catch(() => false);

      req.user = currentUser; // we update the req.user to use in next middleware ,we can update req
      res.locals.user = currentUser;
      (currentUser);
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

////the route 
router.post('/signup', signUp);
router.patch('/signup/:token', confirmSignUp);
router.post('/login', login);
router.get('/logout', logOut);
router.patch('/resetPassword/:token', resetPassword); //use patch because we only want to update the password
router.post('/forgotPassword', forgotPassword); //the forgot password will genereate the reset token for reset password

router.post('/refresh', refreshToken);
router.use(protect); //this middleware will make sure that all middlewares after this get protected
router.get('/me', getMe, getUser);
router.patch('/updateYourData', updateME);
router.patch('/updateMyPassword', passwordUpdate);
router.delete('/deleteMe', deleteMe); //thsi dont really delete it because we only disable the account
//!
//! this is the rest arch
router.use(restrictTo('admin')); //you need to be admin to access this route
router.route('/').get(getAlluser).post(createUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);
//!
//////the error
{
    "status": "fail",
    "err": {
        "statusCode": 404,
        "status": "fail",
        "isOperational": true
    },
    "message": "cant find /api/v1/users/refresh on this server",
    "errorStack": "Error: cant find /api/v1/users/refresh on this server\n    at AppError (file:///C:/Users/user/Desktop/Backend/2-nautour/utils/appError.js:14:15)\n    at file:///C:/Users/user/Desktop/Backend/2-nautour/app.js:173:15\n    at Layer.handle [as handle_request] (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:149:13)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)\n    at next (C:\\Users\\user\\Desktop\\Backend\\2-nautour\\node_modules\\express\\lib\\router\\route.js:145:7)"
}