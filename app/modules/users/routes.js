import express from 'express';

import { responseToJSON } from '../../helpers/generic';
import { isAuthenticated } from '../authentication/authController';
import { getLoggedUser } from './userController';

const router = express.Router();

router.get(
  '/user/me',
  isAuthenticated,
  getLoggedUser,
  responseToJSON('users'),
);

module.exports = router;
