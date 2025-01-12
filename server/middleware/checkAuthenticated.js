import AsyncHandler from 'express-async-handler';
import user from '../Models/user';

export const checkAuthenticated = AsyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // req.session.destroy();
  return res
    .status(401)
    .clearCookie('connect.sid')
    .send({ msg: 'User is not Authenticated' });
});

export const checkAdminAuthenticated = AsyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { _id } = req.user;
    const findUser = await user.findById(
      _id,
      { adminAccess: 1 },
      { lean: { toObject: true } },
    );
    if (findUser?.adminAccess) {
      return next();
    }
  }
  return res
    .status(401)
    .clearCookie('connect.sid')
    .send({ msg: 'User is not Authenticated' });
});
