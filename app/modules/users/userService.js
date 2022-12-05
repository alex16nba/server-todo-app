// Configs
import { getSequelize } from '../../../config/sequelize';

const { models: { Users: UserModel } } = getSequelize();

export function getOneUserService({ filter }) {
  return UserModel.findOne({
    where: filter,
  });
}

export function createUserService({ data }) {
  return UserModel.create(data);
}
