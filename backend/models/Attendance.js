const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late', 'leave', 'holiday'], required: true },
    checkIn: { type: String },
    checkOut: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
