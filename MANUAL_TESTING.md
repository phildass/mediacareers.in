# Manual Testing Guide for PR A

This guide helps you manually test the authentication endpoints implemented in PR A.

## Prerequisites

1. MongoDB running locally or accessible
2. Node.js v18+ installed
3. Backend dependencies installed (`npm install`)

## Setup

1. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Update .env**
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/mediacareers
   JWT_SECRET=your-secret-key-here
   TEST_MODE=true
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server running on http://localhost:3000
   Environment: development
   Test Mode: true
   MongoDB Connected: localhost
   ```

## Test Scenarios

### 1. Health Check

**Request:**
```bash
curl http://localhost:3000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "testMode": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. User Registration

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false,
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Console Output (TEST_MODE):**
```
=== TEST MODE: Email Not Sent ===
To: john.doe@example.com
Subject: Welcome to MediaCareers.in
Content: [HTML email template]
================================
```

### 3. Registration Validation Tests

#### Invalid Email
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Please provide a valid email address"]
}
```

#### Weak Password
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "weak",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Password must be at least 8 characters long"]
}
```

#### Duplicate Email
```bash
# Register the same user again
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Expected Response (409 Conflict):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### 4. User Login

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false,
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 5. Login with Invalid Credentials

**Wrong Password:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "WrongPassword123"
  }'
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 6. Get User Profile (Protected Route)

**Request (with token from login/register):**
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false,
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 7. Profile without Token

**Request:**
```bash
curl http://localhost:3000/api/auth/profile
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 8. Profile with Invalid Token

**Request:**
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer invalid-token"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

## Testing TEST_MODE

### With TEST_MODE=true (Default)

When registering a user, check the console output. You should see:
```
=== TEST MODE: Email Not Sent ===
To: user@example.com
Subject: Welcome to MediaCareers.in
Content: [Full HTML email]
================================
```

**Verify**: No actual email is sent, only logged.

### With TEST_MODE=false (Production Mode)

⚠️ **Warning**: Only test this if you have valid SMTP credentials configured.

1. Update `.env`:
   ```env
   TEST_MODE=false
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

2. Restart server
3. Register a new user
4. Check that actual email is sent

**Important**: Set `TEST_MODE=true` after testing to prevent accidental email sending.

## Rate Limiting Test

**Request (make more than 100 requests in 15 minutes):**
```bash
for i in {1..101}; do
  curl http://localhost:3000/health
done
```

**Expected Response (after 100 requests):**
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

## Security Tests

### 1. Password Hashing
- Register a user
- Check MongoDB (password should be hashed, not plain text)
- Hash should start with `$2a$` or `$2b$` (bcrypt pattern)

### 2. JWT Token
- Token should be in format: `header.payload.signature`
- Decode payload (use jwt.io) - should contain user id and email
- Token should expire based on JWT_EXPIRES_IN setting

### 3. CORS
```bash
curl -X OPTIONS http://localhost:3000/api/auth/register \
  -H "Origin: http://localhost:3001" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should allow requests from configured CORS_ORIGIN only.

## Database Verification

Connect to MongoDB and verify data:

```bash
mongosh
```

```javascript
use mediacareers

// View users
db.users.find().pretty()

// Check password is hashed
db.users.findOne({ email: "john.doe@example.com" }).password
// Should see bcrypt hash like: $2b$10$...

// Check user structure
db.users.findOne({ email: "john.doe@example.com" })
// Should have: email, password, firstName, lastName, isEmailVerified, role, createdAt, updatedAt
```

## Cleanup

Remove test data:
```javascript
db.users.deleteMany({})
```

## Troubleshooting

### Server won't start
- Check MongoDB is running: `mongod --version`
- Check port 3000 is not in use: `lsof -i :3000`
- Verify .env file exists and has correct values

### Tests pass but manual testing fails
- Ensure server is running (`npm run dev`)
- Check MongoDB connection string
- Verify TEST_MODE setting in .env

### Emails not logging in TEST_MODE
- Check console output (terminal where server is running)
- Verify TEST_MODE=true in .env
- Restart server after .env changes

## Success Criteria

✅ All endpoints respond with correct status codes
✅ Validation errors return 400 with descriptive messages
✅ Passwords are hashed in database
✅ JWT tokens work for protected routes
✅ TEST_MODE prevents actual email sending
✅ Email is logged to console in TEST_MODE
✅ Rate limiting works after 100 requests
✅ Duplicate emails return 409 Conflict
✅ Invalid credentials return 401 Unauthorized
✅ Health check returns server status
