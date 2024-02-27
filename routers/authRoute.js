import express from 'express';
import {
  handleLogin,
  handleRegister,
  handleForgetPassword,
  updateProfileController,
  updatePassword,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  emailChange,
  getAllUser,
} from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';
import upload from '../helpers/multer.js';
const authRouter = express.Router();

// register user

authRouter.post('/register', handleRegister);
authRouter.get('/get-all', getAllUser);
authRouter.post('/login', handleLogin);
authRouter.post('/forget-password', handleForgetPassword);
//protected user route auth
authRouter.get('/user-auth', requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route auth
authRouter.get('/admin-auth', requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
authRouter.put(
  '/profile-update',
  upload.array('image'),
  requiredSignIn,
  updateProfileController
);
authRouter.put('/password-update', requiredSignIn, updatePassword);
authRouter.put('/email-change', requiredSignIn, emailChange);

//orders
authRouter.get('/orders', requiredSignIn, getOrdersController);

// //all orders
authRouter.get('/all-orders', requiredSignIn, isAdmin, getAllOrdersController);

// // order status update
authRouter.put(
  '/order-status/:orderId',
  requiredSignIn,
  isAdmin,
  orderStatusController
);

export default authRouter;
