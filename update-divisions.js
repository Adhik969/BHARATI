import mongoose from 'mongoose';
import config from './config.js';

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Define a simple schema since we're just updating
    const User = mongoose.model('User', new mongoose.Schema({}), 'users');
    
    try {
      // Find students with Computer Engineering department
      const students = await User.find({ 
        role: 'student',
        department: 'Computer Engineering'
      });
      
      console.log(`Found ${students.length} students to update`);
      
      // Update each student to add Division A
      for (const student of students) {
        await User.updateOne(
          { _id: student._id },
          { 
            $set: { 
              divisions: ['A']
            } 
          }
        );
        console.log(`Updated student: ${student.name}`);
      }
      
      console.log('Update complete');
    } catch (error) {
      console.error('Error updating students:', error);
    } finally {
      // Close the connection
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 