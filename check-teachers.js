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
        const teachers = await User.find({ role: 'teacher' });
        console.log('\nTeachers in database:');
        if (teachers.length === 0) {
            console.log('No teachers found');
        } else {
            teachers.forEach(teacher => {
                console.log(`- Username: ${teacher.username}, Name: ${teacher.name}`);
            });
        }
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