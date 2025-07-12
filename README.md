# BHARATI Educational Management System

BHARATI is a comprehensive educational management system designed for schools and educational institutions. It provides features for student management, teacher management, attendance tracking, and reporting.

## Features

- User authentication and role-based access control
- Student management
- Teacher management
- Attendance tracking and reporting
- Dashboard with analytics

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (v4 or higher)

## Local Development Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/bharati.git
   cd bharati
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/bvit_attendance
   JWT_SECRET=your_secure_random_string
   PORT=3003
   NODE_ENV=development
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:3003`

## Production Deployment

### Preparing for Deployment

1. Update the `.env` file with production values:
   ```
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_random_string
   PORT=3003
   NODE_ENV=production
   ```

2. Update the CORS settings in `server.js` with your production domain.

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku
   ```
   heroku login
   ```

3. Create a new Heroku app
   ```
   heroku create bharati-app
   ```

4. Set environment variables
   ```
   heroku config:set MONGODB_URI=your_production_mongodb_uri
   heroku config:set JWT_SECRET=your_secure_random_string
   heroku config:set NODE_ENV=production
   ```

5. Deploy the application
   ```
   git push heroku main
   ```

6. Open the deployed application
   ```
   heroku open
   ```

### Deploying to Other Platforms

The application can also be deployed to platforms like:
- Vercel
- Railway
- DigitalOcean
- AWS

Follow the specific deployment instructions for your chosen platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact [your-email@example.com](mailto:your-email@example.com). 