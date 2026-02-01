# Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:
- A [Vercel account](https://vercel.com/signup) (free)
- Git installed on your machine
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd /Users/mygyan/Downloads/Code\ Arena/jrfleetsolutions
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? (No for first deployment)
   - Project name: `jrfleetsolutions` (or your preferred name)
   - Directory: `./` (current directory)
   - Vercel will auto-detect the configuration

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for Vercel deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/jrfleetsolutions.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects settings from `vercel.json`
   - Click "Deploy"

3. **Your site is live!**
   - URL: `https://jrfleetsolutions.vercel.app`
   - Custom domain can be added in project settings

## Configuration Files

Your project includes these Vercel-ready files:

### vercel.json
Configures routing, headers, and caching for optimal performance:
- Static file serving
- Security headers
- Cache control for assets
- Clean URLs

### .vercelignore
Excludes unnecessary files from deployment:
- Development files
- Documentation
- Git files
- Log files

### package.json
Defines project metadata (optional for static sites but recommended)

## Post-Deployment

### Custom Domain
1. Go to your project on Vercel
2. Settings → Domains
3. Add your custom domain
4. Configure DNS records as instructed

### Environment Variables (if needed)
1. Project Settings → Environment Variables
2. Add any API keys or configuration

### Performance Optimization
Vercel automatically provides:
- ✅ CDN distribution
- ✅ HTTPS/SSL certificate
- ✅ Automatic compression
- ✅ Edge caching
- ✅ Fast global deployment

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch → production deployment
- Pull requests → preview deployments
- Automatic builds and deployments

## Troubleshooting

### Issue: 404 on page refresh
**Solution**: Already handled in `vercel.json` routing configuration

### Issue: Assets not loading
**Solution**: Ensure all asset paths in HTML are relative (e.g., `./public/css/style.css`)

### Issue: Custom domain not working
**Solution**: 
1. Check DNS propagation (can take up to 48 hours)
2. Verify DNS records in domain provider
3. Check Vercel domain settings

## Monitoring

View deployment analytics:
- Vercel Dashboard → Your Project → Analytics
- Track page views, performance, and errors

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Status Page](https://www.vercel-status.com/)

---

**Your JR Fleet Solutions landing page is now ready for Vercel deployment!** 🚀
