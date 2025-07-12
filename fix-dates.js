import mongoose from 'mongoose';
import Attendance from './models/attendance.model.js';

async function fixDates() {
    try {
        await mongoose.connect('mongodb://localhost:27017/bharati');
        console.log('Connected to database');

        const today = new Date();
        today.setUTCHours(12, 0, 0, 0);
        const todayString = today.toISOString().split('T')[0];

        // Find and update all records with future dates
        const result = await Attendance.updateMany(
            { dateString: { $gt: todayString } },
            { 
                $set: { 
                    date: today,
                    dateString: todayString
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} records with future dates`);
        process.exit(0);
    } catch (error) {
        console.error('Error fixing dates:', error);
        process.exit(1);
    }
}

fixDates(); 