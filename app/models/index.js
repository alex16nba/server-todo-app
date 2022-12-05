// Models
import { TodoModel } from './todoModel';
import { UserModel } from './userModel';

// Configs
import { getSequelize } from '../../config/sequelize';

const sequelize = getSequelize();
UserModel.hasMany(TodoModel, {
  foreignKey: 'userId',
});

TodoModel.belongsTo(UserModel, { foreignKey: 'userId' });

sequelize.sync({ });
console.log('All models were synchronized successfully.');
