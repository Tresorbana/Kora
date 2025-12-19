const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const existing = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (existing) {
            console.log('Admin user already exists');
        } else {
            const admin = new User({
                username: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD
            });
            await admin.save();
            console.log('Admin user created successfully');
        }
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
