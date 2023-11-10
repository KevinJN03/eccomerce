import AsyncHandler from 'express-async-handler';

export const checkAuthenticated = AsyncHandler((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({ msg: 'User is not Authenticated' });
});
