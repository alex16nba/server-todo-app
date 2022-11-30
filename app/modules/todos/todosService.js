import { TodoModel } from './todoModel';

export function getTodosService() {
  return TodoModel.findAll();
}

export function createTodosService(data) {
  return TodoModel.create(data);
}

export function deleteTodo(id) {
  return TodoModel.destroy({
    where: {
      id,
    },
  });
}

export function updateTodo({ data, id }) {
  return TodoModel.update(
	  data,
	  {
      where: {
        id,
      },
    },
  );
}