const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/todos', authMiddleware, todoController.createTodo);
router.get('/todos', authMiddleware, todoController.getTodos);
router.put('/todos/:id', authMiddleware, todoController.updateTodo);
router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
