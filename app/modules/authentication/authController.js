import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Configs
import { JWT_SECRET } from '../../../config/envConfig';

// Services
import { createUserService, getOneUserService } from '../users/userService';

// Constants
import { SALT_ROUNDS } from './authConstants';
import { emailOrPasswordWrong, unauthorizedError } from '../../constants/errorCodes';

// Helpers
import { createJwtToken } from './authHelpers';
import { sendApiResponse } from '../../helpers/apiResponses';

// Validations
import { validateRegister } from './authValidation';

export async function userRegister(req, res, next) {
  try {
    const { email, name } = req.body;

    // Validations
    const validationErrors = validateRegister(req.body);

    if (validationErrors) {
      return next(validationErrors);
    }

    const filterUser = {
      email,
    };
    const user = await getOneUserService({ filter: filterUser });

    if (user) {
      return next(unauthorizedError);
    }

    const hashedPassword = await bcrypt.hash(req.body?.password, SALT_ROUNDS);
    const userData = {
      email,
      password: hashedPassword,
      name,
    };

    const createdUser = await createUserService({ data: userData });

    const jwtToken = createJwtToken(createdUser);

    // Remove the password from api response
    const { password, ...userRes } = createdUser.dataValues;
    userRes.token = jwtToken;

    return sendApiResponse({ res, data: userRes });
  } catch (err) {
    return next(err);
  }
}

export async function userLogin(req, res, next) {
  try {
    const filterUser = {
      email: req.body?.email,
    };

    const user = await getOneUserService({ filter: filterUser });

    if (!user) {
      return next(emailOrPasswordWrong);
    }

    const comparePassword = await bcrypt.compare(req?.body?.password, user.password);

    if (!comparePassword) {
      return next(emailOrPasswordWrong);
    }

    const jwtToken = createJwtToken(user);

    // Remove the password from api response
    const { password, ...userRes } = user.dataValues;
    userRes.token = jwtToken;

    return sendApiResponse({ res, data: userRes });
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
