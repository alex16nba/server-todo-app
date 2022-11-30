import express from 'express';
import { userLogin, userRegister } from './authController';

const router = express.Router();

router.post(
  '/register',
  userRegister,
);

router.post(
  '/login',
  userLogin,
);

module.exports = router;
