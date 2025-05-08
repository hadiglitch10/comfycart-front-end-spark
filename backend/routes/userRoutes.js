const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/user/register', async (req, res) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            return res.status(422).json({ message: 'Fill in all fields' });
        }

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(422).json({ message: 'Email already registered' });
        }

        if (password.trim().length < 8) {
            return res.status(422).json({ message: 'Password should be at least 8 characters' });
        }

        if (password !== password2) {
            return res.status(422).json({ message: 'Passwords do not match' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        res.status(201).json({ message: 'New user registered' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login user
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ message: 'Please fill in missing fields' });
        }

        const newEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return res.status(422).json({ message: 'You have entered an invalid username or password' });
        }

        const matchingPasswords = await bcrypt.compare(password, user.password);
        if (!matchingPasswords) {
            return res.status(422).json({ message: 'You have entered an invalid username or password' });
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, id, name });
    } catch (error) {
        res.status(500).json({ message: 'Login failed. Please check your credentials', error });
    }
});

// Get all users
router.get('/user/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users ? users : { message: 'No users registered' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

module.exports = router;