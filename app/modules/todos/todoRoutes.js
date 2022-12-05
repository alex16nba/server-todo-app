import express from 'express';

// Controllers
import {
  createTodo, getTodos, deleteTodoById, markTodoCompleted, markTodoUncompleted,
} from './todosController';
import { isAuthenticated } from '../authentication/authController';

const router = express.Router();

router.get(
  '/todos',
  isAuthenticated,
  getTodos,
);

router.post(
  '/todos',
  isAuthenticated,
  createTodo,
);

router.put(
  '/markTodoCompleted/:todoId',
  isAuthenticated,
  markTodoCompleted,
);

router.put(
  '/markTodoUncompleted/:todoId',
  isAuthenticated,
  markTodoUncompleted,
);

router.delete(
  '/todos/:todoId',
  isAuthenticated,
  deleteTodoById,
);

module.exports = router;
