# MediaCareers.in

## Your Gateway to India's Dynamic Media and Communications Industry

MediaCareers.in is India's first AI-driven job platform exclusively for media professionals. Whether you're a journalist, editor, PR specialist, corporate communicator, content creator, or working in any media-related field, this platform is designed to help you find your next opportunity quickly and efficiently.

## 🌟 Key Features

- **AI-Powered Job Matching**: Intelligent resume analysis matches you with the most relevant opportunities
- **Smart Resume Parsing**: Upload your resume and let AI extract and organize your experience
- **Tailored Applications**: Generate customized resumes and cover letters for each job
- **Web Scraping**: Automatically aggregates media jobs from across India
- **Company Directory**: Comprehensive database of media companies and organizations
- **Education Directory**: Find colleges and institutes offering media-related programs
- **Career Advice**: Get AI-powered guidance or connect with senior media professionals
- **Premium Membership**: Unlimited applications for just Rs 199 for 3 months
- **Free Membership**: Automatic premium access for professionals with 1+ year experience

## 🚀 Quick Start
A webapp which scrapes the internet for the best media and allied jobs across India.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Email Notifications**: Welcome emails for new users (TEST_MODE supported)
- **Job Listings**: Browse media and allied job opportunities
- **Resume Upload**: Upload and parse resumes
- **Membership System**: Eligibility-based access
- **Admin Dashboard**: Manage jobs and users

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🔧 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phildass/mediacareers.in.git
   cd mediacareers.in
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 📚 Documentation

For detailed API documentation, setup instructions, and usage examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🎯 Who Is This For?

- Journalists seeking roles in newspapers, magazines, or online media
- Social Media Managers looking for opportunities in media houses
- PR professionals targeting corporate communications teams
- Content creators, editors, photographers, and video producers
- Any professional in the media and communications industry

## 💎 Premium Membership

**Price**: Rs 199 for 3 months

**Benefits**:
- Unlimited job applications
- AI-powered resume and cover letter generation
- Priority job recommendations
- Career advice from senior professionals
- Access to comprehensive education directory

**Special Offer**: Free premium membership for professionals with 1+ year of media experience!

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: OpenAI GPT-4
- **Payment**: UPI Integration
- **Security**: Helmet, JWT, Rate Limiting

## 📧 Contact

- Email: info@phildass.com
- Website: MediaCareers.in (coming soon)

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for India's media professionals** 
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file and update it with your values:
   ```bash
   cp .env.example .env
   ```

   **Required Environment Variables:**

   | Variable | Description | Default | Required |
   |----------|-------------|---------|----------|
   | `NODE_ENV` | Environment (development/production) | development | No |
   | `PORT` | Server port | 3000 | No |
   | `HOST` | Server host | localhost | No |
   | `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/mediacareers | Yes |
   | `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
   | `JWT_EXPIRES_IN` | JWT token expiration | 7d | No |
   | `EMAIL_HOST` | SMTP host | smtp.gmail.com | Yes* |
   | `EMAIL_PORT` | SMTP port | 587 | Yes* |
   | `EMAIL_SECURE` | Use TLS | false | No |
   | `EMAIL_USER` | Email username | - | Yes* |
   | `EMAIL_PASSWORD` | Email password | - | Yes* |
   | `EMAIL_FROM` | From email address | noreply@mediacareers.in | No |
   | `TEST_MODE` | Enable test mode (no emails sent) | true | No |
   | `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3001 | No |

   *Email variables are required only when `TEST_MODE=false`

4. **Start MongoDB**
   
   Make sure MongoDB is running:
   ```bash
   # Using systemd (Linux)
   sudo systemctl start mongod
   
   # Using Homebrew (macOS)
   brew services start mongodb-community
   
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Run the backend server**

   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000`

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run unit tests only
```bash
npm run test:unit
```

### Run integration tests only
```bash
npm run test:integration
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs validated using Joi
- **Rate Limiting**: Protection against brute-force attacks
- **Helmet**: Security headers enabled
- **CORS**: Configured cross-origin resource sharing
- **TEST_MODE**: Prevents accidental email sending during development

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false,
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {jwt-token}
```

### Health Check
```http
GET /health
```

## 🏗️ Project Structure

```
mediacareers.in/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── index.js     # Main config
│   │   │   └── database.js  # Database connection
│   │   ├── controllers/     # Request handlers
│   │   │   └── authController.js
│   │   ├── models/          # Database models
│   │   │   └── User.js
│   │   ├── routes/          # API routes
│   │   │   └── auth.js
│   │   ├── middleware/      # Custom middleware
│   │   │   └── auth.js
│   │   ├── utils/           # Utility functions
│   │   │   ├── validators.js
│   │   │   └── emailService.js
│   │   └── server.js        # Entry point
│   ├── tests/
│   │   ├── unit/            # Unit tests
│   │   └── integration/     # Integration tests
│   ├── .env.example         # Example environment variables
│   └── package.json
└── README.md
```

## 📝 Development Workflow

This project follows a PR-based development approach:

- **PR A** (Current): Backend skeleton + user model + register endpoint + welcome email stub
- **PR B** (Planned): Frontend landing page + signup form + styles (lavender/red)
- **PR C** (Planned): Resume upload endpoint + naive resume parser + membership eligibility logic
- **PR D** (Planned): Job model + listing endpoints + admin basic auth route
- **PR E** (Planned): Scraper skeleton (respect robots.txt) with unit tests
- **PR F** (Planned): AI integration stubs (endpoints) with mock responses

## 🔒 Security Checklist

- [x] No secrets committed to repository (use .env)
- [x] TEST_MODE prevents production email sending
- [x] Password hashing with bcrypt
- [x] JWT token authentication
- [x] Input validation on all endpoints
- [x] Rate limiting enabled
- [x] Security headers with Helmet
- [x] CORS properly configured

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 
