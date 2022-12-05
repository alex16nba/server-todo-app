import express from 'express';

// Controllers
import { getLoggedUser } from './userController';
import { isAuthenticated } from '../authentication/authController';

const router = express.Router();

router.get(
  '/user/me',
  isAuthenticated,
  getLoggedUser,
);

module.exports = router;
