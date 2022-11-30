import Sequelize from 'sequelize';
import {
  DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_USER,
} from './index';

export const sequelize = new Sequelize(
  DB_DATABASE_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'mysql',
  },
);

export default function unitSequelize() {
  // eslint-disable-next-line
  require("../app/modules/todos/todoModel");

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
}
