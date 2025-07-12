import mongoose from 'mongoose';
import Attendance from './models/attendance.model.js';

async function checkAttendance() {
    try {
        await mongoose.connect('mongodb://localhost:27017/bharati');
        console.log('Connected to database');

        // Find all attendance records
        const records = await Attendance.find({})
            .populate('teacher', 'name')
            .sort({ dateString: -1 });

        console.log('\nFound', records.length, 'attendance records\n');

        // Group records by date
        const recordsByDate = {};
        records.forEach(record => {
            if (!recordsByDate[record.dateString]) {
                recordsByDate[record.dateString] = [];
            }
            recordsByDate[record.dateString].push({
                department: record.department,
                class: record.class,
                subject: record.subject,
                teacher: record.teacher?.name || 'Unknown',
                studentCount: record.students.length
            });
        });

        // Print records grouped by date
        for (const [date, dateRecords] of Object.entries(recordsByDate)) {
            console.log(`\nDate: ${date}`);
            console.log('----------------------------------------');
            dateRecords.forEach(record => {
                console.log(`Department: ${record.department}`);
                console.log(`Class: ${record.class}`);
                console.log(`Subject: ${record.subject}`);
                console.log(`Teacher: ${record.teacher}`);
                console.log(`Students: ${record.studentCount}`);
                console.log('----------------------------------------');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking attendance:', error);
        process.exit(1);
    }
}

checkAttendance(); 