# 🚀 Deployment Commands Reference

## Initial Setup

### 1. Install Vercel CLI (Optional but recommended)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

---

## Deploy Backend

### Option A: Using Vercel Dashboard (Recommended for first time)
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure as shown in DEPLOYMENT-GUIDE.md

### Option B: Using Vercel CLI
```bash
cd backend
vercel --prod
```

When prompted:
- Set up and deploy: `Y`
- Which scope: Choose your account
- Link to existing project: `N` (first time) or `Y` (subsequent)
- Project name: `matrix-recruitment-backend`
- Directory: `./` (already in backend folder)
- Override settings: `N`

---

## Deploy Frontend

### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import same GitHub repository
3. Configure as shown in DEPLOYMENT-GUIDE.md

### Option B: Using Vercel CLI
```bash
cd frontend
vercel --prod
```

---

## Update Deployment

### Auto-deploy (Recommended)
Just push to GitHub:
```bash
git add -A
git commit -m "Your changes"
git push origin main
```
Vercel automatically redeploys!

### Manual deploy with CLI
```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

---

## Environment Variables via CLI

### Set environment variable
```bash
vercel env add MONGODB_URI production
```

### List environment variables
```bash
vercel env ls
```

### Pull environment variables
```bash
vercel env pull
```

---

## Useful Vercel Commands

### View deployment logs
```bash
vercel logs
```

### List all deployments
```bash
vercel ls
```

### Remove a deployment
```bash
vercel rm [deployment-url]
```

### Open project in browser
```bash
vercel open
```

### View project info
```bash
vercel inspect [deployment-url]
```

---

## Git Workflow for Deployment

### Standard workflow
```bash
# 1. Make changes to your code
# 2. Test locally
npm start

# 3. Commit changes
git add -A
git commit -m "Description of changes"

# 4. Push to GitHub (triggers auto-deploy)
git push origin main

# 5. Check deployment status at vercel.com
```

### Create preview deployment (test before production)
```bash
# Push to a different branch
git checkout -b feature-branch
git push origin feature-branch
```
Vercel creates a preview URL automatically!

---

## Rollback to Previous Deployment

### Via Dashboard
1. Go to your project on vercel.com
2. Click "Deployments"
3. Find the working deployment
4. Click "..." → "Promote to Production"

### Via CLI
```bash
vercel rollback
```

---

## Domain Management

### Add custom domain
```bash
vercel domains add yourdomain.com
```

### List domains
```bash
vercel domains ls
```

### Remove domain
```bash
vercel domains rm yourdomain.com
```

---

## Troubleshooting Commands

### Check build logs
```bash
vercel logs [deployment-url]
```

### Test build locally
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
node server.js
```

### Clear Vercel cache
```bash
vercel --force
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy to production | `vercel --prod` |
| Deploy preview | `vercel` |
| View logs | `vercel logs` |
| List deployments | `vercel ls` |
| Add env variable | `vercel env add` |
| Rollback | `vercel rollback` |
| Open in browser | `vercel open` |

---

## Pro Tips

1. **Always test locally first:**
   ```bash
   npm start
   ```

2. **Use preview deployments for testing:**
   - Push to a feature branch
   - Test the preview URL
   - Merge to main when ready

3. **Monitor deployments:**
   - Check Vercel dashboard after each push
   - Review build logs if deployment fails

4. **Keep environment variables in sync:**
   - Update in Vercel dashboard when changed
   - Never commit .env files to Git

---

## Emergency Rollback

If something breaks in production:

1. **Quick rollback via dashboard:**
   - Go to vercel.com → Your Project → Deployments
   - Find last working deployment
   - Click "Promote to Production"

2. **Or revert Git commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## Need Help?

- Vercel Status: https://vercel-status.com
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
