import { DataTypes } from 'sequelize';
import { getSequelize } from '../../../config/sequelize';

const sequelize = getSequelize();
export const TodoModel = sequelize.define('todos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
