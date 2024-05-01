import sharp from 'sharp';
import multer from 'multer';
import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory.js';

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     //cb is similar next
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     //user-1231312(userID)-2131231(timeStamp).jpg
//     const extension = file.mimetype.split('/')[1]; //this file comes from req.file
//     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });

const multerStorage = multer.memoryStorage(); // memory storage will save to buffer
const multerFilter = (req, file, cb) => {
  console.log(file);
  //this to filter only certain files can pass through
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(AppError('please upload a image file only ', 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = (req, res, next) => {
  //this will run after the upload image
  if (!req.file) {
    return next();
  }

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`; //why we do this because the filename is not set up if we use memoryStorage so we set up it here and make it available in the next middleware in updateMe
  sharp(req.file.buffer) //here we read the data from the buffer and edit it
    .resize(500, 500, { fit: 'cover' })
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`public/img/users/${req.file.filename}`); //this will create a jpeg
  next();
};

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
  //this will loop through the req.user object and check if it has name and email fields
  //if so add the input from the req.user object  like (name, email) to a new object and return it
  return newObject;
}

export const updateME = catchAsync(async (req, res, next) => {
  // console.log(req.file); this is where we can see the file
  // console.log(req.body);
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
  if (req.file) {
    //this will add the new image to the filter object
    filterBody.photo = req.file.filename;
  }
  //!
  //! 3) if not update user document

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  //  const updatedUser = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

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
//   (user);
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
