import express from 'express';
import {
  createTodo, getTodos, deleteTodoById, markTodoCompleted, markTodoUncompleted,
} from './todosController';
import { isAuthenticated } from '../authentication/authController';
import { responseToJSON } from '../../helpers/generic';

const router = express.Router();

router.get(
  '/todos',
  isAuthenticated,
  getTodos,
  responseToJSON('todos'),
);

router.post(
  '/todos',
  isAuthenticated,
  createTodo,
  responseToJSON('todos'),
);

router.put(
  '/markTodoCompleted/:todoId',
  isAuthenticated,
  markTodoCompleted,
  responseToJSON('todos'),
);

router.put(
  '/markTodoUncompleted/:todoId',
  isAuthenticated,
  markTodoUncompleted,
  responseToJSON('todos'),
);

router.delete(
  '/todos/:todoId',
  isAuthenticated,
  deleteTodoById,
  responseToJSON('todos'),
);

module.exports = router;
