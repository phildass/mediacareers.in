const env = process.env;

function parseBool(value) {
  if (value === undefined || value === null) return false;
  const s = String(value).toLowerCase().trim();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

const config = {
  // Test mode configuration
  testMode: parseBool(env.TEST_MODE) || env.NODE_ENV === 'test',
  
  // Server configuration
  port: Number(env.PORT) || 3000,
  host: env.HOST || 'localhost',
  nodeEnv: env.NODE_ENV || 'development',
  
  // Database configuration
  mongodbUri: env.MONGODB_URI || 'mongodb://localhost:27017/mediacareers',
  
  // JWT configuration
  jwtSecret: env.JWT_SECRET || 'development-secret-change-in-production',
  jwtExpiresIn: env.JWT_EXPIRES_IN || '7d',
  
  // Email configuration
  email: {
    host: env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(env.EMAIL_PORT) || 587,
    secure: parseBool(env.EMAIL_SECURE),
    from: env.EMAIL_FROM || 'noreply@mediacareers.in',
    auth: {
      user: env.EMAIL_USER || '',
      pass: env.EMAIL_PASSWORD || ''
    }
  },
  
  // CORS configuration
  cors: {
    origin: env.CORS_ORIGIN || 'http://localhost:3001'
  }
};

module.exports = config;