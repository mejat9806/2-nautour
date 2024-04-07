import { catchAsync } from '../utils/catchAsync.js';
import { User } from '../model/userModel.js';

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'User succeffully created',
    data: { user: newUser },
  });
});

export { signUp };
