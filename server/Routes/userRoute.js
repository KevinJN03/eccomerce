import {
  create_user,
  dummy_data,
  get_all_users,
  signUp_user,
  loginUser,
  checkUser,
  logoutUser,
  getAllUserData,
  changeDetails,
  addUserAddress,
  deleteAddress,
  editAddress,
  updatePreferences,
} from '../Controllers/userController.js';

import passport from 'passport';
import express from 'express';
const router = express.Router();

router.get('/all', get_all_users);
router.get('/dummy', dummy_data);
router.post('/create', create_user);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/signup', signUp_user);
router.get('/check', checkUser);
router.get('/userData', getAllUserData);
router.post('/address/add', addUserAddress);
router.put('/address/edit/:id', editAddress);
router.delete('/address/delete/:id', deleteAddress);
router.put('/changedetails', changeDetails);
router.put('/changepreferences', updatePreferences);

export default router;
