import mongoose from 'mongoose';
import Attendance from './models/attendance.model.js';
import User from './models/user.model.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance-system')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Create test attendance records
async function createTestAttendanceRecords() {
  try {
    // Find a teacher or create one if none exists
    let teacher = await User.findOne({ role: 'teacher' });
    
    if (!teacher) {
      console.log('No teacher found, creating a test teacher');
      teacher = new User({
        username: 'testteacher',
        password: 'password',
        name: 'Test Teacher',
        email: 'test@example.com',
        mobile: '1234567890',
        designation: 'LECTURE',
        department: ['Computer Engineering'],
        classes: ['Second Year'],
        divisions: ['A'],
        role: 'teacher'
      });
      
      await teacher.save();
      console.log(`Created test teacher: ${teacher.name} (${teacher._id})`);
    } else {
      console.log(`Using existing teacher: ${teacher.name} (${teacher._id})`);
    }
    
    // Find or create test students
    const existingStudents = await User.find({ role: 'student' }).limit(10);
    const students = [];
    
    if (existingStudents.length < 10) {
      console.log('Creating test students');
      
      const neededStudents = 10 - existingStudents.length;
      for (let i = 0; i < neededStudents; i++) {
        const rollNo = `TEST${1000 + i}`;
        const student = new User({
          username: `student${rollNo}`,
          password: 'password',
          name: `Test Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          mobile: `98765${i}${i}${i}${i}${i}`,
          department: ['Computer Engineering'],
          classes: ['Second Year'],
          divisions: ['A'],
          rollNo: rollNo,
          role: 'student'
        });
        
        await student.save();
        students.push(student);
        console.log(`Created test student: ${student.name} (${student._id})`);
      }
    }
    
    // Get all students to use (existing + newly created)
    const allStudents = [...existingStudents, ...students];
    console.log(`Using ${allStudents.length} students for attendance records`);
    
    // Delete any existing test attendance records to avoid conflicts
    await Attendance.deleteMany({ subject: 'Test Subject' });
    console.log('Deleted existing test attendance records');
    
    // Create attendance records for today and past few days
    const dates = [];
    const today = new Date();
    
    // Today
    dates.push(new Date());
    
    // Yesterday
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    dates.push(yesterday);
    
    // 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);
    dates.push(twoDaysAgo);
    
    // Create attendance records for each date
    for (const date of dates) {
      const dateString = date.toISOString().split('T')[0];
      console.log(`Creating attendance record for date: ${dateString}`);
      
      // Create attendance record
      const attendance = new Attendance({
        date: date,
        dateString: dateString,
        department: teacher.department[0] || 'Computer Engineering',
        class: teacher.classes[0] || 'Second Year',
        division: teacher.divisions[0] || null,
        subject: 'Test Subject',
        teacher: teacher._id,
        students: allStudents.map(student => ({
          student: student._id,
          status: Math.random() > 0.3 ? 'present' : 'absent', // 70% present, 30% absent
          remark: 'Test attendance'
        }))
      });
      
      try {
        // Save attendance record
        await attendance.save();
        console.log(`Created attendance record for ${dateString}`);
      } catch (error) {
        console.error(`Error creating attendance for ${dateString}:`, error.message);
      }
    }
    
    console.log('All test attendance records created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test attendance records:', error);
    process.exit(1);
  }
}

// Run the function
createTestAttendanceRecords(); 