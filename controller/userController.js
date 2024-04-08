import { User } from '../model/userModel.js';

export const getAlluser = async (req, res, next) => {
  const users = await User.find();
  const documentAmmount = await User.countDocuments();
  res.status(500).json({
    status: 'hello from user',
    documentAmmount: documentAmmount,
    users: { users },
    message: 'this route is not define',
  });
};
export function createUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
export function getUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}

export function patchUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
export function deleteUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
