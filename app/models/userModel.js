import { DataTypes } from 'sequelize';

// Configs
import { getSequelize } from '../../config/sequelize';

const sequelize = getSequelize();

export const UserModel = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
