const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedEmployeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    deadline: { type: Date },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    surveyUpdates: [{
        date: { type: Date, default: Date.now },
        update: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
