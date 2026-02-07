# Complete Deployment Guide - Matrix Recruitment Portal

## 🎯 Best Platform: Vercel

Vercel is the ideal choice for this project because:
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS and CDN
- ✅ Easy GitHub integration
- ✅ Perfect for React + Node.js apps
- ✅ Zero configuration needed (vercel.json already configured)

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
3. **MongoDB Atlas** - Already configured in your .env file

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Push all changes to GitHub:**
```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

2. **Verify your .gitignore excludes:**
   - node_modules/
   - .env files (environment variables will be set in Vercel)

---

### Step 2: Deploy Backend (API)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. **Configure the backend:**
   - **Project Name:** `matrix-recruitment-backend` (or your choice)
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
   NODE_ENV=production
   ```

6. Click **"Deploy"**
7. **Copy your backend URL** (e.g., `https://matrix-recruitment-backend.vercel.app`)

---

### Step 3: Update Frontend Configuration

1. **Update frontend/.env:**
   Create or update `frontend/.env` with your backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Update API calls in your code:**
   Make sure your frontend uses the environment variable:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

3. **Update frontend/vercel.json:**
   Replace the destination URL with your actual backend URL:
   ```json
   {
     "version": 2,
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://your-backend-url.vercel.app/api/:path*"
       }
     ]
   }
   ```

---

### Step 4: Deploy Frontend

1. **Commit the frontend changes:**
```bash
git add frontend/.env frontend/vercel.json
git commit -m "Update frontend for production"
git push origin main
```

2. **Go back to Vercel Dashboard**
3. Click **"Add New Project"** again
4. **Import the same GitHub repository**
5. **Configure the frontend:**
   - **Project Name:** `matrix-recruitment-portal` (or your choice)
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

6. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

7. Click **"Deploy"**
8. **Your frontend URL** will be something like `https://matrix-recruitment-portal.vercel.app`

---

### Step 5: Update Backend CORS

1. **Update backend/server.js** to allow your frontend URL:
```javascript
const allowedOrigins = [
  'https://your-frontend-url.vercel.app',
  'http://localhost:5000',
  'http://localhost:3000'
];
```

2. **Commit and push:**
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push origin main
```

Vercel will automatically redeploy your backend.

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Frontend loads at your Vercel URL
- [ ] Recruitment form submits successfully
- [ ] Admin dashboard loads
- [ ] Data saves to MongoDB
- [ ] No CORS errors in browser console
- [ ] All routes work correctly

---

## 🔧 Troubleshooting

### Issue: CORS Errors
**Solution:** Make sure backend CORS includes your frontend Vercel URL

### Issue: API calls fail
**Solution:** Check that REACT_APP_API_URL is set correctly in Vercel environment variables

### Issue: 404 on routes
**Solution:** Verify vercel.json rewrites are configured correctly

### Issue: Build fails
**Solution:** Check build logs in Vercel dashboard, ensure all dependencies are in package.json

---

## 🔄 Automatic Deployments

Once set up, Vercel automatically deploys when you push to GitHub:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment

---

## 📊 Monitoring

1. **Vercel Dashboard:** Monitor deployments, logs, and analytics
2. **MongoDB Atlas:** Monitor database usage and performance
3. **Browser DevTools:** Check for console errors

---

## 💰 Cost

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN

This is more than enough for a recruitment portal!

---

## 🔐 Security Best Practices

1. **Never commit .env files** to GitHub
2. **Use environment variables** in Vercel for all secrets
3. **Keep MongoDB credentials secure**
4. **Enable MongoDB IP whitelist** (allow 0.0.0.0/0 for Vercel)
5. **Use strong admin passwords**

---

## 📱 Custom Domain (Optional)

To use your own domain:
1. Go to Project Settings in Vercel
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed

---

## 🎉 You're Done!

Your Matrix Recruitment Portal is now live and accessible worldwide!

**Frontend:** https://your-frontend-url.vercel.app
**Backend API:** https://your-backend-url.vercel.app

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- React Deployment: https://create-react-app.dev/docs/deployment
