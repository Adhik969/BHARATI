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
        console.log('\nTeacher Details:');
        if (teachers.length === 0) {
            console.log('No teachers found');
        } else {
            teachers.forEach(teacher => {
                console.log(`\nTeacher ID: ${teacher._id}`);
                console.log(`Username: ${teacher.username}`);
                console.log(`Name: ${teacher.name}`);
                console.log(`Email: ${teacher.email}`);
                console.log(`Mobile: ${teacher.mobile}`);
                console.log(`Designation: ${teacher.designation}`);
                console.log(`Department: ${teacher.department ? JSON.stringify(teacher.department) : 'Not set'}`);
                console.log(`Classes: ${teacher.classes ? JSON.stringify(teacher.classes) : 'Not set'}`);
                console.log(`Division: ${teacher.division ? JSON.stringify(teacher.division) : 'Not set'}`);
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