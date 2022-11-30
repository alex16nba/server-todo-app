import { pick } from 'lodash';
import { TodoModel } from './todoModel';
import { deleteTodo, getTodosService, updateTodo } from './TodosService';

export async function createTodo(req, res, next) {
  try {
    const data = pick(req.body, ['title']);
    data.status = 'unread';

    return TodoModel
      .create(data)
      .then((result) => res.json({ data: result }))
      .catch((err) => {
        console.error('Failed to create a new record : ', err);
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
}

export async function getTodos(req, res, next) {
  try {
    const todos = await getTodosService();

    return res.json({ data: todos });
  } catch (err) {
    return next(err);
  }
}

export async function deleteTodoById(req, res, next) {
  try {
    const { todoId } = req.params;
    const deletedTodo = await deleteTodo(todoId);

    return res.json({ data: deletedTodo });
  } catch (err) {
    return next(err);
  }
}

export async function markTodoCompleted(req, res, next) {
  try {
    const { todoId } = req.params;
    const updatedTodo = await updateTodo({
      data: { status: 'completed' },
      id: todoId,
    });

    return res.json({ data: updatedTodo });
  } catch (err) {
    return next(err);
  }
}

export async function markTodoUncompleted(req, res, next) {
  try {
    const { todoId } = req.params;
    const updatedTodo = await updateTodo({
      data: { status: 'unread' },
      id: todoId,
    });

    return res.json({ data: updatedTodo });
  } catch (err) {
    return next(err);
  }
}
