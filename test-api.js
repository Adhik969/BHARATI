import fetch from 'node-fetch';

// Configuration
const API_URL = 'http://localhost:3003';
const TEST_ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
};

// Test functions
async function loginAsAdmin() {
    try {
        console.log('Logging in as admin...');
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TEST_ADMIN_CREDENTIALS)
        });

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Login successful');
        return data.token;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

async function testDeleteAttendanceRecord(token, recordId) {
    try {
        console.log(`Testing delete attendance record API for record ID: ${recordId}`);
        
        // Make the DELETE request
        const response = await fetch(`${API_URL}/api/attendance/records/${recordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Log response details
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(`Delete failed with status ${response.status}: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Delete successful:', data);
        return data;
    } catch (error) {
        console.error('Delete test failed:', error);
        throw error;
    }
}

// Main test function
async function runTests() {
    try {
        // Login as admin
        const token = await loginAsAdmin();
        
        // Get the record ID from command line arguments or use a default for testing
        const recordId = process.argv[2] || '6870cbb857b150bef07c58d3'; // Replace with a valid record ID
        
        // Test delete attendance record
        await testDeleteAttendanceRecord(token, recordId);
        
        console.log('All tests completed successfully');
    } catch (error) {
        console.error('Test suite failed:', error);
        process.exit(1);
    }
}

// Run the tests
runTests(); 