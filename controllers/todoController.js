const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    const { title, description } = req.body;
    const todo = new Todo({
        userId: req.user._id,
        title,
        description
    });
    await todo.save();
    res.status(201).json(todo);
};

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({ userId: req.user._id });
    res.status(200).json(todos);
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { title, description, updated_at: Date.now() },
        { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'Todo not found.' });
    res.status(200).json(todo);
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!todo) return res.status(404).json({ message: 'Todo not found.' });
    res.status(200).json({ message: 'Todo deleted.' });
};
