# MediaCareers.in

A comprehensive job board platform for media professionals in India, built with Next.js and Express.

<img src="https://github.com/phildass/mediacareers.in/actions/workflows/vercel-deploy.yml/badge.svg">

## Production URL

The current production URL is stored in docs/production_url.txt.

Raw file: https://raw.githubusercontent.com/phildass/mediacareers.in/main/docs/production_url.txt

## 🚀 Features

- **Job Board**: Browse and search media jobs across various categories
- **User Profiles**: Create and manage professional profiles
- **Premium Membership**: Advanced features for job seekers
- **Admin Dashboard**: Manage jobs, users, and platform content
- **AI-Powered Features**: Smart job matching and recommendations

## ��️ Tech Stack

### Frontend
- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS 4.0
- **Icons**: Lucide React

### Backend
- **Server**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer

## 📋 Prerequisites

- Node.js 18.x or 20.x
- MongoDB (local or Atlas)
- npm or yarn

## 🏃 Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/phildass/mediacareers.in.git
cd mediacareers.in
\`\`\`

### 2. Install dependencies

\`\`\`bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
\`\`\`

### 3. Set up environment variables

Copy the example environment file and update with your values:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` with your configuration. See [Environment Variables](#environment-variables) section below.

### 4. Run in development mode

\`\`\`bash
# Run both frontend and backend
npm run dev:full

# Or run separately:
# Frontend only
npm run dev

# Backend only
npm run server
\`\`\`

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌍 Environment Variables

See \`.env.example\` for a complete list of required environment variables.

### Frontend Variables (Vercel)
- \`NEXT_PUBLIC_API_BASE_URL\` - Backend API URL

### Backend Variables (Railway/Render/VPS)
- \`MONGODB_URI\` - MongoDB connection string
- \`JWT_SECRET\` - Secret key for JWT tokens
- \`EMAIL_HOST\`, \`EMAIL_PORT\`, \`EMAIL_USER\`, \`EMAIL_PASS\` - SMTP configuration
- Additional variables listed in \`.env.example\`

## 📦 Deploying

This guide covers deploying MediaCareers.in to production using Vercel for the frontend and Railway/Render for the backend.

### Architecture

- **Frontend (Next.js)**: Deployed to Vercel
- **Backend (Express)**: Deployed to Railway, Render, or VPS
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions

### Prerequisites for Deployment

1. **GitHub Repository**: Connected to this repository
2. **Vercel Account**: Sign up at https://vercel.com
3. **Backend Hosting**: Account on Railway, Render, or a VPS
4. **MongoDB Atlas**: Database cluster at https://www.mongodb.com/cloud/atlas
5. **Domain**: (Optional) Custom domain for production

### Step 1: Deploy Backend

Choose one of the following platforms:

#### Option A: Deploy to Railway (Recommended)

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select \`phildass/mediacareers.in\`
4. Configure:
   - **Root Directory**: \`backend\`
   - **Start Command**: \`npm start\`
   
5. Add environment variables in Railway dashboard:
   \`\`\`
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediacareers
   JWT_SECRET=<generate-strong-secret>
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@mediacareers.in
   \`\`\`

6. Deploy and note your backend URL (e.g., \`https://your-app.railway.app\`)

#### Option B: Deploy to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: \`mediacareers-api\`
   - **Root Directory**: \`backend\`
   - **Build Command**: \`npm install\`
   - **Start Command**: \`npm start\`

5. Add environment variables (same as Railway above)
6. Deploy and note your backend URL (e.g., \`https://mediacareers-api.onrender.com\`)

### Step 2: Set Up MongoDB Atlas

1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user with read/write permissions
3. Whitelist your backend server's IP (or \`0.0.0.0/0\` for development)
4. Get the connection string and update \`MONGODB_URI\` in your backend environment

### Step 3: Deploy Frontend to Vercel

#### Manual Deployment (Quick Start)

1. Go to https://vercel.com/new
2. Import the \`phildass/mediacareers.in\` repository
3. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: \`./\`
   - **Build Command**: \`npm run build\`
   
4. Add environment variables in Vercel:
   \`\`\`
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   \`\`\`

5. Click "Deploy"
6. Your site will be live at \`https://your-project.vercel.app\`

#### Automated Deployment via GitHub Actions

To enable automatic deployments on push to \`main\`:

1. **Get Vercel tokens**:
   - Go to https://vercel.com/account/tokens
   - Create a new token and copy it

2. **Get Vercel project IDs**:
   \`\`\`bash
   npm i -g vercel
   vercel login
   vercel link
   \`\`\`
   This will show your \`VERCEL_ORG_ID\` and \`VERCEL_PROJECT_ID\`

3. **Add secrets to GitHub**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add the following repository secrets:
     - \`VERCEL_TOKEN\`: Your Vercel token
     - \`VERCEL_ORG_ID\`: Your Vercel organization ID
     - \`VERCEL_PROJECT_ID\`: Your Vercel project ID
     - \`NEXT_PUBLIC_API_BASE_URL\`: Your backend URL (optional, can be set in Vercel)

4. **Deploy**: Push to \`main\` branch
   \`\`\`bash
   git push origin main
   \`\`\`
   
   The workflow in \`.github/workflows/vercel-deploy.yml\` will automatically:
   - Install dependencies
   - Build the Next.js app
   - Deploy to Vercel

### Step 4: Configure Custom Domain

#### In Vercel:

1. Go to your project → Settings → Domains
2. Add your domain (e.g., \`mediacareers.in\`)
3. Follow DNS configuration instructions from Vercel
4. Update DNS records at your domain registrar:
   - Type: \`A\`, Name: \`@\`, Value: \`76.76.21.21\` (Vercel IP)
   - Type: \`CNAME\`, Name: \`www\`, Value: \`cname.vercel-dns.com\`

5. Wait for DNS propagation (up to 48 hours)
6. Vercel will automatically provision SSL certificate

### Step 5: Post-Deployment Checklist

- [ ] Frontend loads at your Vercel URL
- [ ] Backend API is accessible (test \`/health\` endpoint)
- [ ] Database connection is working
- [ ] Environment variables are set correctly
- [ ] Email service is configured (for user notifications)
- [ ] SSL certificates are active
- [ ] Custom domain is working (if configured)
- [ ] Test user registration and login flows

### Required Secrets for GitHub Actions

To use the automated Vercel deployment workflow, you need to add these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name | Description | Required |
|------------|-------------|----------|
| \`VERCEL_TOKEN\` | Your Vercel authentication token | ✅ Yes |
| \`VERCEL_ORG_ID\` | Your Vercel organization ID | Optional* |
| \`VERCEL_PROJECT_ID\` | Your Vercel project ID | Optional* |
| \`NEXT_PUBLIC_API_BASE_URL\` | Backend API URL | Optional** |

\* If not provided, the action will use the Vercel CLI defaults  
\** Can be set in Vercel project settings instead

#### How to Get These Values:

1. **VERCEL_TOKEN**: 
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token

2. **VERCEL_ORG_ID and VERCEL_PROJECT_ID**:
   \`\`\`bash
   npm i -g vercel
   vercel login
   vercel link
   \`\`\`
   The IDs will be shown in the output or saved in \`.vercel/project.json\`

3. **NEXT_PUBLIC_API_BASE_URL**:
   - Your deployed backend URL (e.g., \`https://your-api.railway.app\`)
   - Can also be set in Vercel project environment variables

### Environment Setup Summary

| Platform | Environment Variables | Where to Set |
|----------|----------------------|--------------|
| **Vercel (Frontend)** | \`NEXT_PUBLIC_API_BASE_URL\` | Vercel project settings or GitHub secret |
| **Railway/Render (Backend)** | All backend vars (see \`.env.example\`) | Platform dashboard |
| **GitHub Actions** | \`VERCEL_TOKEN\`, \`VERCEL_ORG_ID\`, \`VERCEL_PROJECT_ID\` | GitHub repo secrets |

### Monitoring Deployment

- **Vercel Deployments**: https://vercel.com/dashboard
- **Railway Deployments**: https://railway.app/dashboard
- **GitHub Actions**: https://github.com/phildass/mediacareers.in/actions

### Continuous Deployment

Once set up:
- **Frontend**: Automatically deploys on push to \`main\` (via GitHub Actions or Vercel Git integration)
- **Backend**: Automatically deploys on push to \`main\` (if enabled in Railway/Render)

### Rollback

If a deployment fails:

**Vercel:**
1. Go to Deployments in Vercel dashboard
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Railway/Render:**
1. Go to your service dashboard
2. Redeploy a previous commit
3. Or manually revert and push

### Troubleshooting

#### Build Fails
- Check build logs in Vercel/Railway/Render dashboard
- Verify all environment variables are set
- Ensure dependencies are in \`package.json\`
- Test build locally: \`npm run build\`

#### API Connection Errors
- Verify \`NEXT_PUBLIC_API_BASE_URL\` matches backend URL
- Check CORS configuration in backend
- Ensure backend is running and accessible

#### Database Connection Issues
- Verify \`MONGODB_URI\` is correct
- Check MongoDB Atlas network access settings
- Ensure database user has proper permissions

### Alternative: Using Vercel Integration

Instead of GitHub Actions, you can also:

1. Connect your repository directly to Vercel
2. Vercel will automatically deploy on every push to \`main\`
3. Set environment variables in Vercel project settings
4. No need for GitHub Actions workflow

This is simpler but gives less control over the deployment process.

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

For detailed deployment guides, see:
- \`/docs/deploy-vercel.md\` - Comprehensive Vercel deployment guide
- \`/docs/ci-and-deployment.md\` - CI/CD and deployment strategies

## 🧪 Testing

\`\`\`bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test
\`\`\`

## 🔍 Linting

\`\`\`bash
# Lint frontend
npm run lint

# Lint backend
cd backend
npm run lint
\`\`\`

## 📁 Project Structure

\`\`\`
mediacareers.in/
├── app/                    # Next.js app directory
├── backend/                # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── server.js
├── docs/                   # Documentation
├── .github/
│   └── workflows/         # CI/CD workflows
├── package.json           # Frontend dependencies
├── vercel.json           # Vercel configuration
└── .env.example          # Environment variables template
\`\`\`

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security issues, please see [SECURITY.md](SECURITY.md).

## 📧 Contact

- **Email**: info@phildass.com
- **Website**: https://mediacareers.in
- **GitHub**: https://github.com/phildass/mediacareers.in

## 🙏 Acknowledgments

Built with ❤️ for the media community in India.
