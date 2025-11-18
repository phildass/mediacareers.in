# MediaCareers.in

[![Vercel Deploy](https://github.com/phildass/mediacareers.in/actions/workflows/vercel-deploy.yml/badge.svg)](https://github.com/phildass/mediacareers.in/actions/workflows/vercel-deploy.yml)

A comprehensive job board platform for media professionals in India, built with Next.js and Express.

## Production URL

The current production URL is stored in [docs/production_url.txt](docs/production_url.txt).

To view it directly:
- Raw: https://raw.githubusercontent.com/phildass/mediacareers.in/main/docs/production_url.txt

If the file contains "Not deployed yet", no production deployment has been recorded by CI yet.

## 🚀 Features

<!-- existing features go here -->

#### Automated Deployment via GitHub Actions

To enable automatic deployments on push to `main`:

1. **Get Vercel tokens**:
   - Go to https://vercel.com/account/tokens
   - Create a new token and copy it

2. Add the following secrets to your repository:
   - VERCEL_TOKEN: the token you generated on Vercel
   - (Optional) Any other secrets your project needs

3. Configure project on Vercel:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`

4. Add environment variables in Vercel:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```

5. Click "Deploy".

6. Your site will be live at `https://your-project.vercel.app`

The provided GitHub Actions workflow will deploy on push to `main`, capture the Vercel deployment output, extract the production URL, and update `docs/production_url.txt` only if the URL has changed.