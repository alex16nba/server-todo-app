import { UserModel } from './userModel';

export function getOneUserService(filter) {
  return UserModel.findOne({
    where: filter,
  });
}

export function createUserService(data) {
  return UserModel.create(data);
}
