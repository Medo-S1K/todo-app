const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
