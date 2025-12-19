const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// GET attendance by date
router.get('/', async (req, res) => {
    const { date } = req.query;
    try {
        const query = date ? { date: new Date(date) } : {};
        const attendance = await Attendance.find(query).populate('employeeId');
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST attendance (batch)
router.post('/', async (req, res) => {
    const { records } = req.body; // Array of {employeeId, date, status, checkIn, checkOut}
    try {
        const results = await Promise.all(records.map(async (record) => {
            return await Attendance.findOneAndUpdate(
                { employeeId: record.employeeId, date: new Date(record.date) },
                record,
                { upsert: true, new: true }
            );
        }));
        res.status(201).json(results);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
