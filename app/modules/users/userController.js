import { getOneUserService } from './userService';

export async function getLoggedUser(req, res, next) {
  try {
    const user = await getOneUserService({ id: req?.user?.id });
    req.resources.users = user;

    return next();
  } catch (err) {
    return next(err);
  }
}
