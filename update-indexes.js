import mongoose from 'mongoose';
import config from './config.js';

async function updateIndexes() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Drop the existing unique index on rollNo if it exists
        try {
            await mongoose.connection.collection('users').dropIndex('rollNo_1');
            console.log('Dropped old rollNo index');
        } catch (error) {
            console.log('No existing rollNo index to drop');
        }

        // Create new index on rollNo that only applies to students
        await mongoose.connection.collection('users').createIndex(
            { rollNo: 1 },
            { 
                unique: true,
                partialFilterExpression: { 
                    role: 'student',
                    rollNo: { $type: 'string' }
                }
            }
        );
        console.log('Created new rollNo index');

        console.log('Indexes updated successfully');
    } catch (error) {
        console.error('Error updating indexes:', error);
    } finally {
        await mongoose.disconnect();
    }
}

updateIndexes(); 