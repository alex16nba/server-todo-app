import Sequelize from 'sequelize';
import {
  DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_USER,
} from './index';

let sequelizeConnection;
export function getSequelize() {
  if (!sequelizeConnection) {
    return createConnection();
  }

  return sequelizeConnection;
}

function createConnection() {
  sequelizeConnection = new Sequelize(
    DB_DATABASE_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: DB_HOST,
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
        logging: false,
      },
    },
  );

  // eslint-disable-next-line
  const { TodoModel } = require("../app/modules/todos/todoModel");
  // eslint-disable-next-line
  const { UserModel } = require('../app/modules/users/userModel');
  UserModel.hasMany(TodoModel, {
    foreignKey: 'userId',
  });
  TodoModel.belongsTo(UserModel);

  sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

  return sequelizeConnection;
}
