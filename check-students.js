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
        const students = await User.find({ role: 'student' });
        console.log('\nStudent Details:');
        if (students.length === 0) {
            console.log('No students found. Creating sample students...');
            
            // Create sample students for Computer Engineering
            const sampleStudents = [
                {
                    username: 'student1',
                    password: 'student123',
                    name: 'John Doe',
                    email: 'john@bvit.edu.in',
                    rollNo: '1001',
                    role: 'student',
                    department: ['Computer Engineering'],
                    classes: ['First Year'],
                    division: ['A']
                },
                {
                    username: 'student2',
                    password: 'student123',
                    name: 'Jane Smith',
                    email: 'jane@bvit.edu.in',
                    rollNo: '1002',
                    role: 'student',
                    department: ['Computer Engineering'],
                    classes: ['First Year'],
                    division: ['A']
                },
                {
                    username: 'student3',
                    password: 'student123',
                    name: 'Bob Wilson',
                    email: 'bob@bvit.edu.in',
                    rollNo: '2001',
                    role: 'student',
                    department: ['Computer Engineering'],
                    classes: ['Second Year'],
                    division: ['B']
                }
            ];

            await User.insertMany(sampleStudents);
            console.log('Sample students created successfully!');
            
            // Fetch and display the newly created students
            const newStudents = await User.find({ role: 'student' });
            newStudents.forEach(student => {
                console.log(`\nStudent ID: ${student._id}`);
                console.log(`Username: ${student.username}`);
                console.log(`Name: ${student.name}`);
                console.log(`Roll No: ${student.rollNo}`);
                console.log(`Department: ${student.department}`);
                console.log(`Class: ${student.classes}`);
                console.log(`Division: ${student.division}`);
            });
        } else {
            students.forEach(student => {
                console.log(`\nStudent ID: ${student._id}`);
                console.log(`Username: ${student.username}`);
                console.log(`Name: ${student.name}`);
                console.log(`Roll No: ${student.rollNo}`);
                console.log(`Department: ${student.department}`);
                console.log(`Class: ${student.classes}`);
                console.log(`Division: ${student.division}`);
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