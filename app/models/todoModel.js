import { DataTypes } from 'sequelize';

// Configs
import { getSequelize } from '../../config/sequelize';

const sequelize = getSequelize();

export const TodoModel = sequelize.define('Todos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
