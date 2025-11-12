# MediaCareers.in - AI-Driven Job Platform for Media Professionals

## Overview

MediaCareers.in is India's first dedicated, AI-powered job platform specifically designed for media professionals including journalists, editors, PR specialists, corporate communicators, content creators, and other media-aligned professionals.

## Features

### Core Features
- **AI-Powered Job Matching**: Intelligent resume analysis and job recommendations
- **Automated Resume Parsing**: Extract key information from uploaded resumes
- **Tailored Resume Generation**: Create customized resumes for specific job applications
- **AI Cover Letter Writing**: Generate personalized cover letters
- **Web Scraping**: Automatically aggregate jobs from across the internet
- **Company Directory**: Comprehensive database of media companies across India
- **Education Directory**: Listing of media-related educational institutions
- **Career Advice**: AI-powered guidance and access to senior professionals
- **Premium Membership**: Unlimited applications for Rs 199/3 months
- **Free Membership**: For professionals with 1+ year experience

### Technology Stack
- **Backend**: Node.js, Express.js, MongoDB
- **AI Integration**: OpenAI GPT-4 for intelligent features
- **File Processing**: PDF parsing for resumes
- **Payment**: UPI integration via QR codes
- **Email Service**: Automated welcome and confirmation emails
- **Web Scraping**: Cheerio for job aggregation

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/phildass/mediacareers.in.git
cd mediacareers.in
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your actual configuration
```

4. **Required Environment Variables**
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASSWORD`: Email service credentials
- `UPI_ID`: UPI ID for payment collection

5. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `GET /api/jobs/recommendations` - Get AI-powered recommendations (Premium)
- `GET /api/jobs/:id/fit` - Get job fit assessment (Premium)
- `POST /api/jobs` - Create job (Admin)
- `PUT /api/jobs/:id` - Update job (Admin)
- `DELETE /api/jobs/:id` - Delete job (Admin)

### Applications
- `POST /api/application/upload-resume` - Upload and parse resume
- `POST /api/application/apply/:jobId` - Apply for job
- `GET /api/application/my-applications` - Get user's applications
- `POST /api/application/save/:jobId` - Save/bookmark job
- `GET /api/application/saved-jobs` - Get saved jobs

### Membership
- `GET /api/membership/details` - Get membership details
- `GET /api/membership/payment-qr` - Generate payment QR code
- `POST /api/membership/confirm-payment` - Confirm payment and activate
- `POST /api/membership/claim-free` - Claim free membership (1+ year exp)

### Career Advice
- `POST /api/career/advice` - Get AI career advice (Premium)
- `POST /api/career/professional-advice` - Request professional advice (Premium)
- `GET /api/career/history` - Get advice history

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get single company
- `POST /api/companies` - Create company (Admin)
- `PUT /api/companies/:id` - Update company (Admin)

### Education
- `GET /api/education` - Get education institutions
- `GET /api/education/:id` - Get single institution
- `POST /api/education` - Create institution (Admin)
- `PUT /api/education/:id` - Update institution (Admin)

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "+91-9876543210"
  }'
```

### Upload Resume
```bash
curl -X POST http://localhost:5000/api/application/upload-resume \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "resume=@/path/to/resume.pdf"
```

### Search Jobs
```bash
curl "http://localhost:5000/api/jobs?category=journalism&location=Mumbai&page=1&limit=10"
```

### Apply for Job
```bash
curl -X POST http://localhost:5000/api/application/apply/JOB_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "useAIGeneration": true
  }'
```

## Key Features Explained

### AI Resume Parsing
When a user uploads their resume, the system:
1. Extracts text from PDF/DOC files
2. Uses GPT-4 to parse and structure the information
3. Automatically fills the user profile
4. Checks eligibility for free membership (1+ year experience)

### Job Matching Algorithm
The AI-powered matching:
1. Analyzes user profile and preferences
2. Compares with job requirements
3. Calculates match scores (0-100)
4. Provides reasons for recommendations

### Tailored Resume Generation
For each application, users can:
1. Request AI to generate a customized resume
2. Highlight relevant experience for the specific job
3. Optimize keywords for better matching

### Premium Membership
- **Price**: Rs 199 for 3 months
- **Payment**: UPI via QR code
- **Benefits**: 
  - Unlimited job applications
  - AI resume and cover letter generation
  - Priority job matching
  - Career advice from AI and professionals
  - Access to education directory

### Free Membership Eligibility
- Automatically granted to users with 1+ year media experience
- AI detects experience duration from resume
- Same benefits as paid premium membership

## Project Structure

```
mediacareers.in/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── membershipController.js
│   │   ├── careerController.js
│   │   ├── companyController.js
│   │   └── educationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Company.js
│   │   └── EducationInstitution.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── application.js
│   │   ├── membership.js
│   │   ├── career.js
│   │   ├── companies.js
│   │   └── education.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── utils/
│   │   ├── aiService.js
│   │   ├── emailService.js
│   │   ├── paymentService.js
│   │   └── scraper.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── API_DOCUMENTATION.md
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Code Structure Guidelines
- Models: Define database schemas
- Controllers: Handle business logic
- Routes: Define API endpoints
- Middleware: Authentication, error handling
- Utils: Reusable services (AI, email, payment)

## Deployment

### Production Checklist
1. Set `NODE_ENV=production` in environment variables
2. Use strong `JWT_SECRET`
3. Configure production MongoDB URI
4. Set up email service (e.g., SendGrid, AWS SES)
5. Configure payment gateway integration
6. Enable HTTPS/SSL
7. Set up proper rate limiting
8. Configure CORS for production domain
9. Set up monitoring and logging
10. Regular database backups

### Environment Variables for Production
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
OPENAI_API_KEY=sk-...
EMAIL_HOST=smtp.sendgrid.net
APP_URL=https://mediacareers.in
```

## Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevent API abuse
- **JWT Authentication**: Secure user sessions
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Mongoose schema validation
- **CORS**: Controlled cross-origin access
- **File Upload Limits**: Maximum file size restrictions

## Future Enhancements

1. **Frontend Application**: React/Next.js web app
2. **Mobile Apps**: iOS and Android native apps
3. **Real-time Chat**: Connect candidates with recruiters
4. **Video Interviews**: Integrated video calling
5. **Assessment Tests**: Skills testing for candidates
6. **Analytics Dashboard**: For employers and admins
7. **Notification System**: Email, SMS, and push notifications
8. **Advanced Scraping**: More job sources and better parsing
9. **Payment Gateway**: Full integration with payment providers
10. **Multi-language Support**: Hindi and other Indian languages

## Support

For questions or support:
- Email: info@phildass.com
- Documentation: This README file
- Issues: GitHub Issues page

## License

MIT License - See LICENSE file for details

## Contributors

- MediaCareers Team
- Phil Dass

## Acknowledgments

- OpenAI for GPT-4 API
- MongoDB for database
- Express.js community
- All contributors and testers

---

**Note**: This is a comprehensive job platform designed specifically for the media industry in India. All features are production-ready and follow industry best practices for security, scalability, and maintainability.
