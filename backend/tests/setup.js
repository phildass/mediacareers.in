// Set test environment variables before any other imports
process.env.NODE_ENV = 'test';
process.env.TEST_MODE = 'true';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mediacareers-test';
