// Configs
import { getSequelize } from '../../../config/sequelize';

const { models: { Todos: TodoModel } } = getSequelize();

export function getTodosService({ filter }) {
  return TodoModel.findAll({
    where: filter,
  });
}

export function createTodosService({ data }) {
  return TodoModel.create(data);
}

export function deleteTodoService({ id }) {
  return TodoModel.destroy({
    where: {
      id,
    },
  });
}

export function updateTodoService({ data, id }) {
  return TodoModel.update(
	  data,
	  {
      where: {
        id,
      },
    },
  );
}
