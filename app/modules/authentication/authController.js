import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUserService, getOneUserService } from '../users/userService';
import { JWT_SECRET } from '../../../config';
import { saltRounds, unauthorizedError } from '../../constants/general';
import { createJwtToken } from '../../helpers/generic';
import { validateRegister } from './authValidation';

export async function userRegister(req, res, next) {
  try {
    const { email, password, name } = req.body;

    // Validations
    const validationErrors = validateRegister(req.body);

    if (validationErrors) {
      return next(validationErrors);
    }

    const user = await getOneUserService({ email });

    if (user) {
      return next({ messages: 'error-user' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = {
      email,
      password: hashedPassword,
      name,
    };

    const createdUser = await createUserService(userData);

    const jwtToken = createJwtToken(createdUser);

    const userRes = {
      ...createdUser.dataValues,
      token: jwtToken,
    };
    delete userRes.password;

    return res.json({ data: userRes });
  } catch (err) {
    return next(err);
  }
}

export async function userLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await getOneUserService({ email });

    if (!user) {
      return next({ messages: 'email-or-password-wrong' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next({ messages: 'email-or-password-wrong' });
    }

    const jwtToken = createJwtToken(user);

    const userRes = {
      ...user.dataValues,
      token: jwtToken,
    };

    delete userRes.password;

    return res.json({ data: userRes });
  } catch (err) {
    return next(err);
  }
}

export function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(unauthorizedError);
    }
    const tokenWithoutBearer = token?.split(' ')?.[1];

    return jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(unauthorizedError);
      }

      req.user = decoded?.data;

      return next();
    });
  } catch (err) {
    return next(err);
  }
}
