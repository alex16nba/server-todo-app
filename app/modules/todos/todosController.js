import { pick } from 'lodash';
import {
  createTodosService, deleteTodo, getTodosService, updateTodo,
} from './todosService';

export async function createTodo(req, res, next) {
  try {
    const data = pick(req.body, ['title']);
    data.status = 'unread';

    const createdTodo = await createTodosService(data);

    req.resources.todos = createdTodo;
    return next();
  } catch (err) {
    return next(err);
  }
}

export async function getTodos(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const todos = await getTodosService(filter);

    req.resources.todos = todos;

    return next();
  } catch (err) {
    return next(err);
  }
}

export async function deleteTodoById(req, res, next) {
  try {
    const { todoId } = req.params;
    const deletedTodo = await deleteTodo(todoId);

    req.resources.todos = deletedTodo;
    return next();
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
