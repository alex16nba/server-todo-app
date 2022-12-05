import { pick } from 'lodash';

// Services
import {
  createTodosService, deleteTodoService, getTodosService, updateTodoService,
} from './todosService';

// Constants
import { COMPLETE_STATUS, INCOMPLETE_STATUS } from './todoConstants';

// Helpers
import { sendApiResponse } from '../../helpers/apiResponses';

export async function createTodo(req, res, next) {
  try {
    const todoData = pick(req.body, ['title']);
    todoData.status = INCOMPLETE_STATUS;
    todoData.userId = req.user?.id;

    const createdTodo = await createTodosService({ data: todoData });

    return sendApiResponse({ res, data: createdTodo });
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

    const todos = await getTodosService({ filter });

    return sendApiResponse({ res, data: todos });
  } catch (err) {
    return next(err);
  }
}

export async function deleteTodoById(req, res, next) {
  try {
    const { todoId } = req.params;
    const deletedTodo = await deleteTodoService({ id: todoId });

    return sendApiResponse({ res, data: deletedTodo });
  } catch (err) {
    return next(err);
  }
}

export async function markTodoCompleted(req, res, next) {
  try {
    const { todoId } = req.params;
    const updatedTodo = await updateTodoService({
      data: { status: COMPLETE_STATUS },
      id: todoId,
    });

    return sendApiResponse({ res, data: updatedTodo });
  } catch (err) {
    return next(err);
  }
}

export async function markTodoUncompleted(req, res, next) {
  try {
    const { todoId } = req.params;
    const updatedTodo = await updateTodoService({
      data: { status: INCOMPLETE_STATUS },
      id: todoId,
    });

    return sendApiResponse({ res, data: updatedTodo });
  } catch (err) {
    return next(err);
  }
}
