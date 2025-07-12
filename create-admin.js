import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'bvit_attendance';

async function createAdmin() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        
        // Check if admin exists
        const adminExists = await db.collection('users').findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin already exists');
            await client.close();
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Create admin user
        const result = await db.collection('users').insertOne({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@bvit.edu.in',
            name: 'System Administrator',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Admin user created successfully');
        await client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

createAdmin(); 