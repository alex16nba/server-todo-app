// Services
import { getOneUserService } from './userService';

// Helpers
import { sendApiResponse } from '../../helpers/apiResponses';

export async function getLoggedUser(req, res, next) {
  try {
    const user = await getOneUserService({ id: req?.user?.id });

    return sendApiResponse({ res, data: user });
  } catch (err) {
    return next(err);
  }
}
