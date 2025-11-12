# Deploying MediaCareers.in to Vercel

This guide walks you through deploying the MediaCareers.in client (Next.js frontend) to Vercel.

## Prerequisites

- GitHub account with access to the mediacareers.in repository
- Vercel account (sign up at https://vercel.com)
- Backend API deployed (see Backend Deployment section below)
- MongoDB Atlas account for production database

## Part 1: Deploy Client to Vercel

### Step 1: Connect Repository to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and authorize Vercel if needed
4. Import the `phildass/mediacareers.in` repository
5. Click "Import" on the repository

### Step 2: Configure Project Settings

Vercel will auto-detect Next.js. Verify the following settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as root)
- **Build Command**: `npm run build` (should auto-populate)
- **Output Directory**: `out` (for static export)
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel project settings, add the following environment variables:

#### Required for Production:
```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

> **Important**: Do NOT add backend-specific variables (MONGODB_URI, JWT_SECRET, etc.) to Vercel. Those belong in your backend deployment (Render/VPS).

#### Optional (for development/testing):
```
NODE_ENV=production
```

**Security Note**: Never commit real API keys or secrets to the repository. Always use Vercel's environment variable UI.

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Once complete, you'll get a deployment URL like `your-project.vercel.app`

### Step 5: Configure Custom Domain (mediacareers.in)

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Click "Add Domain"
4. Enter `mediacareers.in`
5. Follow Vercel's DNS configuration instructions:

#### For Cloudflare DNS (recommended):
- Add an A record: `@` pointing to Vercel's IP (provided by Vercel)
- Add a CNAME record: `www` pointing to `cname.vercel-dns.com`

#### For other DNS providers:
- Follow the specific DNS records shown in Vercel's dashboard
- Typically requires an A record for the root domain and CNAME for www

6. Wait for DNS propagation (can take 24-48 hours, often much faster)
7. Once verified, Vercel will automatically provision an SSL certificate

### Step 6: Set up Production Domain Alias

1. Also add `www.mediacareers.in` as a domain
2. Vercel will automatically redirect www to non-www (or vice versa based on your preference)

## Part 2: Deploy Backend API

The backend (server/ and backend/ directories) should be deployed separately. We recommend Render.com or a VPS.

### Option A: Deploy to Render (Recommended)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `mediacareers-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier for testing, Starter ($7/mo) for production

5. Set Environment Variables in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mediacareers?retryWrites=true&w=majority
   JWT_SECRET=<generate-a-strong-random-secret>
   JWT_EXPIRES_IN=7d
   
   # Email Configuration (use your SMTP provider)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_FROM=noreply@mediacareers.in
   
   # Admin Credentials (set strong credentials)
   ADMIN_USER=admin
   ADMIN_PASS=<strong-password>
   
   # Keep TEST_MODE=true until you've verified email/payment
   TEST_MODE=true
   
   # CORS Configuration
   CORS_ORIGIN=https://mediacareers.in
   ```

6. Click "Create Web Service"
7. Once deployed, copy your Render URL (e.g., `https://mediacareers-api.onrender.com`)
8. Update the `NEXT_PUBLIC_API_URL` in Vercel to point to this URL

### Option B: Deploy to VPS (Ubuntu/Debian)

If you prefer self-hosting on a VPS (DigitalOcean, Linode, etc.):

1. **Set up server**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js (v18 or higher)
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Clone and set up the backend**:
   ```bash
   cd /var/www
   git clone https://github.com/phildass/mediacareers.in.git
   cd mediacareers.in/backend
   npm install --production
   ```

3. **Create .env file**:
   ```bash
   sudo nano /var/www/mediacareers.in/backend/.env
   ```
   Add all the environment variables listed in the Render section above.

4. **Start with PM2**:
   ```bash
   pm2 start src/server.js --name mediacareers-api
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx as reverse proxy**:
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/mediacareers-api
   ```
   
   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name api.mediacareers.in;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/mediacareers-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.mediacareers.in
   ```

## Part 3: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0) or paid tier for production
3. In "Database Access", create a database user with read/write permissions
4. In "Network Access", add your backend server's IP address (or 0.0.0.0/0 for development)
5. Click "Connect" → "Connect your application"
6. Copy the connection string and replace in your backend environment variables

## Part 4: Post-Deployment Checklist

### Security & Configuration:
- [ ] `TEST_MODE=true` is set in backend environment
- [ ] Strong `JWT_SECRET` generated (use: `openssl rand -base64 32`)
- [ ] Strong `ADMIN_PASS` set
- [ ] CORS_ORIGIN points to your production domain
- [ ] MongoDB network access configured correctly
- [ ] SSL certificates active on both frontend and backend
- [ ] Environment variables never committed to git

### Testing:
- [ ] Visit https://mediacareers.in and verify it loads
- [ ] Test user registration (should send to test email due to TEST_MODE)
- [ ] Test job browsing and search
- [ ] Test admin login at /admin
- [ ] Verify API endpoints are accessible from frontend
- [ ] Check browser console for any errors

### Before Going Live:
- [ ] Verify email service is working correctly
- [ ] Implement and test payment verification flow
- [ ] Update privacy policy with actual contact information
- [ ] Set `TEST_MODE=false` only after verifying email/payment
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Set up error alerting
- [ ] Configure backup strategy for MongoDB
- [ ] Review and test all scraper compliance with robots.txt

## Part 5: Continuous Deployment

Vercel automatically deploys when you push to your main branch. To configure:

1. Go to Vercel project settings → "Git"
2. Configure which branches trigger deployments
3. Set up preview deployments for pull requests

For the backend on Render:
1. Enable "Auto-Deploy" in Render dashboard
2. Render will automatically deploy when you push to the configured branch

## Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure `next.config.js` has `output: 'export'` for static export
- Check that environment variables are set correctly

### API not connecting
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel and matches your backend URL
- Check CORS settings in backend
- Verify backend is running (check Render logs or PM2 status)
- Test API endpoint directly in browser: `https://your-api-url.com/health`

### Custom domain not working
- Wait for DNS propagation (can take 24-48 hours)
- Verify DNS records are correct using `dig mediacareers.in`
- Check domain registrar settings
- Ensure SSL certificate is provisioned in Vercel

### 404 errors on page refresh
- Verify `cleanUrls: true` in vercel.json
- Check that routes are configured correctly in Next.js

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## Environment Variables Reference

### Frontend (Vercel)
Only these are needed in Vercel:
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (Render/VPS)
All backend configuration:
- `NODE_ENV` - production
- `PORT` - Port number (e.g., 3000 or 10000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRES_IN` - Token expiry (e.g., 7d)
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_SECURE` - true/false
- `EMAIL_USER` - SMTP username
- `EMAIL_PASSWORD` - SMTP password
- `EMAIL_FROM` - From email address
- `ADMIN_USER` - Admin username
- `ADMIN_PASS` - Admin password
- `TEST_MODE` - true/false (keep true until verified)
- `CORS_ORIGIN` - Frontend URL

---

**Last Updated**: November 2024

For questions or issues, please open an issue on GitHub or contact the development team.
