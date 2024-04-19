import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory.js';

export const getMe = (req, res, next) => {
  req.params.id = req.user.id; //this will update the req.params.id to re.user.id then use it on getUSer
  next();
};

function filterObject(object, ...allowedFields) {
  const newObject = {};
  Object.keys(object).forEach((el) => {
    //this part keys to get like name
    if (allowedFields.includes(el)) newObject[el] = object[el];
  });
  console.log(newObject);
  //this will loop through the req.user object and check if it has name and email fields
  //if so add the input from the req.user object  like (name, email) to a new object and return it
  return newObject;
}

export const updateME = async function (req, res, next) {
  //! 1) show error message if user try to update(POST) his own password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }
  //!filter out unwanted fields
  const filterBody = filterObject(req.body, 'name', 'email');
  //!
  //! 3) if not update user document

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  //  const updatedUser = await User.findById(req.user.id);
  console.log(updatedUser);
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};

//!

//!Delete Me (way to user to delete his own account)
export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false }); //this will update the active fields

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
//!
// export const getAlluser = async (req, res, next) => {
//   const users = await User.find();
//   const documentAmmount = await User.countDocuments();
//   res.status(500).json({
//     status: 'hello from user',
//     documentAmmount: documentAmmount,
//     users: { users },
//   });
// };
export function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'this route  not define !please use sign up',
  });
}
// export async function getUser(req, res) {
//   const user = await User.findById(req.params.id);
//   console.log(user);
//   res.status(500).json({
//     status: 'hello from user',

//     message: 'this route is not define',
//   });
// }

// export function patchUser(req, res) {
//   res.status(500).json({
//     status: 'hello from user',
//     message: 'this route is not define',
//   });
// }

export const getAlluser = getAll(User);
export const getUser = getOne(User);
export const patchUser = updateOne(User); //Donot update password with this
export const deleteUser = deleteOne(User);

//! user update his own data
