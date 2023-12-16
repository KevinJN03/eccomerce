import AsyncHandler from 'express-async-handler';

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

export const checkAdminAuthenticated = AsyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user?.adminAccess) {
      return next();
    }
  }
  return res
    .status(401)
    .clearCookie('connect.sid')
    .send({ msg: 'User is not Authenticated' });
});
