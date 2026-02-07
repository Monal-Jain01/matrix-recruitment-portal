# 🚀 Vercel Deployment Guide for MATRIX Recruitment Portal

## Prerequisites
- GitHub account (already done ✅)
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account for production database

---

## 📦 Step 1: Deploy Backend to Vercel

### 1.1 Go to Vercel Dashboard
1. Visit https://vercel.com and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your repository: `Monal-Jain01/matrix-recruitment-portal`

### 1.2 Configure Backend Deployment
1. **Framework Preset**: Other
2. **Root Directory**: Click **"Edit"** and select `backend`
3. **Build Command**: Leave empty or use `npm install`
4. **Output Directory**: Leave empty
5. **Install Command**: `npm install`

### 1.3 Add Environment Variables
Click **"Environment Variables"** and add:

```
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=production
PORT=5000
```

⚠️ **IMPORTANT**: Update your MongoDB Atlas to allow connections from anywhere:
- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (Allow from anywhere)

### 1.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://matrix-backend.vercel.app`)

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Create New Project
1. Go back to Vercel Dashboard
2. Click **"Add New"** → **"Project"**
3. Import the same repository again

### 2.2 Configure Frontend Deployment
1. **Framework Preset**: Create React App
2. **Root Directory**: Click **"Edit"** and select `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Install Command**: `npm install`

### 2.3 Add Environment Variables
Click **"Environment Variables"** and add:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

Replace `your-backend-url.vercel.app` with your actual backend URL from Step 1.4

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Your frontend will be live at `https://matrix-recruitment-portal.vercel.app`

---

## 🔧 Step 3: Update Backend CORS

After deploying frontend, you need to update the backend CORS settings:

### 3.1 Update server.js
Go to your backend deployment on Vercel:
1. Click on your backend project
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

### 3.2 Update CORS in code (already done in server.js)
The backend is configured to accept requests from your frontend URL.

### 3.3 Redeploy Backend
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **"Redeploy"**

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Frontend
Visit your frontend URL: `https://your-frontend-url.vercel.app`
- Check if the landing page loads
- Check if animations work
- Check if the logo displays

### 4.2 Test Form Submission
1. Fill out the recruitment form
2. Submit the application
3. Check if it redirects to success page
4. Verify data is saved in MongoDB Atlas

### 4.3 Test Admin Dashboard
Visit: `https://your-frontend-url.vercel.app/admin`
- Check if applications are displayed
- Test filtering and search
- Test view and delete functions

---

## 🔄 Alternative: Deploy Both on Same Domain

If you want both frontend and backend on the same domain:

### Option A: Use Vercel Rewrites (Recommended)

Update `frontend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url.vercel.app/api/:path*"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Then update frontend axios config to use relative URLs:
```javascript
axios.defaults.baseURL = '';
```

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: 
- Make sure FRONTEND_URL is set in backend environment variables
- Redeploy backend after adding the variable

### Issue: MongoDB Connection Failed
**Solution**:
- Check if MongoDB Atlas allows connections from `0.0.0.0/0`
- Verify MONGODB_URI is correct in environment variables
- Check if database user has proper permissions

### Issue: 404 on Page Refresh
**Solution**: 
- Make sure `vercel.json` is properly configured in frontend
- All routes should redirect to `index.html`

### Issue: Environment Variables Not Working
**Solution**:
- Redeploy after adding environment variables
- Make sure variable names are correct (case-sensitive)
- For React, variables must start with `REACT_APP_`

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] MongoDB connection working
- [ ] Form submission works
- [ ] Admin dashboard accessible
- [ ] All API endpoints responding
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

---

## 🎉 Success!

Your MATRIX Recruitment Portal is now live on Vercel!

**Frontend URL**: `https://your-frontend-url.vercel.app`
**Backend API**: `https://your-backend-url.vercel.app`
**Admin Dashboard**: `https://your-frontend-url.vercel.app/admin`

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Make it live

---

## 📞 Support

For issues:
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Check Vercel deployment logs for errors

---

## 💡 Pro Tips

1. **Use Vercel CLI** for faster deployments:
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Set up custom domain** in Vercel project settings

3. **Enable Analytics** in Vercel dashboard to track visitors

4. **Use Preview Deployments** for testing before production

5. **Monitor Performance** using Vercel Analytics

---

**Happy Deploying! 🚀**