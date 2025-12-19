const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { Parser } = require('json2csv');

// Generate Payroll for a specific month
router.post('/generate', async (req, res) => {
    const { month, year } = req.body;

    try {
        const employees = await Employee.find({ status: 'active' });
        const payrolls = [];

        for (const emp of employees) {
            // Get attendance for the month
            const start = new Date(year, month - 1, 1);
            const end = new Date(year, month, 0);

            const attendance = await Attendance.find({
                employeeId: emp._id,
                date: { $gte: start, $lte: end }
            });

            const dayCount = attendance.filter(a => a.status === 'present' || a.status === 'leave').length;
            const lateCount = attendance.filter(a => a.status === 'late').length;

            // Simple Calculation Logic (customizable)
            // Assuming baseSalary is monthly for simplicity in this MVP, or calculated via simplified daily rate
            // Let's assume baseSalary is the monthly salary.

            // Deductions for lateness (e.g., 1000 RWF per late) - completely arbitrary for now
            const lateDeductionAmount = lateCount * 500;

            // Net Pay
            const netPay = emp.baseSalary - lateDeductionAmount;

            const payrollRecord = {
                employeeId: emp._id,
                month,
                year,
                baseSalary: emp.baseSalary,
                attendanceCount: dayCount,
                lateDeductions: lateDeductionAmount,
                netPay,
                status: 'pending'
            };

            const savedPayroll = await Payroll.findOneAndUpdate(
                { employeeId: emp._id, month, year },
                payrollRecord,
                { upsert: true, new: true }
            );
            payrolls.push(savedPayroll);
        }

        res.json(payrolls);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Payroll Records
router.get('/', async (req, res) => {
    const { month, year } = req.query;
    try {
        const query = {};
        if (month) query.month = month;
        if (year) query.year = year;

        const records = await Payroll.find(query).populate('employeeId');
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export to CSV
router.get('/export', async (req, res) => {
    try {
        const records = await Payroll.find(req.query).populate('employeeId');
        const fields = ['employeeId.name', 'baseSalary', 'lateDeductions', 'netPay', 'month', 'year'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(records);

        res.header('Content-Type', 'text/csv');
        res.attachment('payroll.csv');
        return res.send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
