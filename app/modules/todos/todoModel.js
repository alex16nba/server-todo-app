import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/sequelize';

export const TodoModel = sequelize.define('todos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize.sync().then(() => {
//   console.log('Todo table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });
