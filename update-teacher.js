import mongoose from 'mongoose';
import config from './config.js';
import User from './models/user.model.js';

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connected to MongoDB');
    try {
        // Find the teacher
        const teacher = await User.findOne({ username: 'adhik' });
        if (!teacher) {
            console.log('Teacher not found');
            return;
        }

        // Update teacher with required fields
        teacher.department = ['Computer Engineering'];
        teacher.classes = ['First Year', 'Second Year'];
        
        await teacher.save();
        
        console.log('Teacher updated successfully');
        console.log('\nUpdated Teacher Details:');
        console.log(`Username: ${teacher.username}`);
        console.log(`Name: ${teacher.name}`);
        console.log(`Department: ${JSON.stringify(teacher.department)}`);
        console.log(`Classes: ${JSON.stringify(teacher.classes)}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
}); 