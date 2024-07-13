const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists.' });

    user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '1h' });
    res.status(201).json({ token });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '1h' });
    res.status(200).json({ token });
};
