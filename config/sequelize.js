import Sequelize from 'sequelize';

// Configs
import {
  DB_CONNECTION_LIMIT,
  DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_USER,
} from './envConfig';

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
      logging: false,
      pool: {
        max: +DB_CONNECTION_LIMIT,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );

  require('../app/models');

  sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

  return sequelizeConnection;
}
