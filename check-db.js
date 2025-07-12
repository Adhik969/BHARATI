import mongoose from 'mongoose';
import User from './models/user.model.js';
import Attendance from './models/attendance.model.js';
import config from './config.js';

async function checkDatabase() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully\n');

        // Find all students
        const students = await User.find({ role: 'student' });
        
        // Fix missing data for students
        for (const student of students) {
            let needsUpdate = false;
            const updates = {};

            // Fix missing roll number
            if (!student.rollNo && student.username) {
                console.log(`Fixing missing roll number for student: ${student.name}`);
                updates.rollNo = student.username;
                needsUpdate = true;
            }

            // Fix missing department
            if (!student.department) {
                console.log(`Fixing missing department for student: ${student.name}`);
                updates.department = 'Computer Engineering'; // Default value
                needsUpdate = true;
            }

            // Fix missing class
            if (!student.class) {
                console.log(`Fixing missing class for student: ${student.name}`);
                updates.class = 'First Year'; // Default value
                needsUpdate = true;
            }

            // Fix missing division
            if (!student.division) {
                console.log(`Fixing missing division for student: ${student.name}`);
                updates.division = 'A'; // Default value
                needsUpdate = true;
            }

            // Fix missing email
            if (!student.email && student.username) {
                console.log(`Fixing missing email for student: ${student.name}`);
                updates.email = `${student.username}@student.bvit.edu.in`;
                needsUpdate = true;
            }

            if (needsUpdate) {
                try {
                    await User.findByIdAndUpdate(student._id, updates);
                    console.log('Updated student record:', student.name);
                } catch (error) {
                    console.error(`Error updating student ${student.name}:`, error.message);
                }
            }
        }

        // Display all users after updates
        console.log('\nCurrent Database State:');
        const allUsers = await User.find({}).select('-password');
        for (const user of allUsers) {
            console.log('\nUser Details:');
            console.log('ID:', user._id);
            console.log('Name:', user.name);
            console.log('Username:', user.username);
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            if (user.role === 'student') {
                console.log('Roll No:', user.rollNo);
                console.log('Department:', user.department);
                console.log('Class:', user.class);
                console.log('Division:', user.division);
            }
            console.log('Created:', user.createdAt);
        }

        // Check Attendance Records
        console.log('\n=== Attendance Records ===');
        const attendance = await Attendance.find({}).populate('student', 'name');
        if (attendance.length === 0) {
            console.log('No attendance records found in database');
        } else {
            attendance.forEach(record => {
                console.log(`\nAttendance ID: ${record._id}`);
                console.log(`Student: ${record.student?.name || 'Unknown'}`);
                console.log(`Date: ${record.date}`);
                console.log(`Status: ${record.status}`);
                console.log(`Class: ${record.class}`);
            });
        }

        // Close connection
        await mongoose.connection.close();
        console.log('\nDatabase check and fixes completed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        if (mongoose.connection) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
}

// Run the check
checkDatabase(); 