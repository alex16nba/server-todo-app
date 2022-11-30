import express from 'express';
import {
  createTodo, getTodos, deleteTodoById, markTodoCompleted, markTodoUncompleted,
} from './todosController';

const router = express.Router();

router.get(
  '/todos',
  getTodos,
);

router.post(
  '/todos',
  createTodo,
);

router.put(
  '/markTodoCompleted/:todoId',
  markTodoCompleted,
);

router.put(
  '/markTodoUncompleted/:todoId',
  markTodoUncompleted,
);

router.delete(
  '/todos/:todoId',
  deleteTodoById,
);

module.exports = router;
