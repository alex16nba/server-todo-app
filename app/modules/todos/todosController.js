import { pick } from 'lodash';
import {
  createTodosService, deleteTodo, getTodosService, updateTodo,
} from './todosService';
import { COMPLETE_STATUS, INCOMPLETE_STATUS } from '../../constants/general';

export async function createTodo(req, res, next) {
  try {
    const data = pick(req.body, ['title']);
    data.status = INCOMPLETE_STATUS;
    data.userId = req.user?.id;

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
    const filter = {
      userId: req?.user?.id,
    };

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
      data: { status: COMPLETE_STATUS },
      id: todoId,
    });

    req.resources.todos = updatedTodo;
    return next();
  } catch (err) {
    return next(err);
  }
}

export async function markTodoUncompleted(req, res, next) {
  try {
    const { todoId } = req.params;
    const updatedTodo = await updateTodo({
      data: { status: INCOMPLETE_STATUS },
      id: todoId,
    });

    req.resources.todos = updatedTodo;
    return next();
  } catch (err) {
    return next(err);
  }
}
