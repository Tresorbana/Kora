const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Seed admin user (for initial setup)
router.post('/seed', async (req, res) => {
    try {
        const existing = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (existing) return res.status(400).json({ message: 'Admin already exists' });

        const admin = new User({
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        });
        await admin.save();
        res.json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Change Password
router.post('/change-password', async (req, res) => {
    const { oldPassword, newPassword, token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
