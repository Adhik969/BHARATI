import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bvit_attendance',
    JWT_SECRET: process.env.JWT_SECRET || 'bharati_secure_jwt_secret_key_2024',
    PORT: process.env.PORT || 3003,
    NODE_ENV: process.env.NODE_ENV || 'development'
}; 