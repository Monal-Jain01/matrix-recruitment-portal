# 🚀 Single URL Deployment Guide

## Overview
This guide will help you deploy both frontend and backend on a **single URL** using Vercel rewrites.

**Result**: Everything accessible from one domain!
- Frontend: `https://matrix-portal.vercel.app`
- Backend API: `https://matrix-portal.vercel.app/api/*`
- Admin: `https://matrix-portal.vercel.app/admin`

---

## 📋 Prerequisites

1. ✅ GitHub repository (already done)
2. ✅ Vercel account (sign up at https://vercel.com)
3. ✅ MongoDB Atlas with network access configured

---

## 🎯 Deployment Steps

### Step 1: Deploy Backend First (2 minutes)

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** your repository: `Monal-Jain01/matrix-recruitment-portal`

4. **Configure Backend**:
   - **Project Name**: `matrix-backend` (or any name)
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
   NODE_ENV=production
   ```

6. **Click Deploy** and wait for completion

7. **Copy Backend URL**: 
   - Example: `https://matrix-backend-xyz.vercel.app`
   - You'll need this in the next step!

---

### Step 2: Deploy Frontend with Rewrite (3 minutes)

1. **Go to Vercel**: https://vercel.com/new (again)
2. **Import** the same repository
3. **Configure Frontend**:
   - **Project Name**: `matrix-portal` (your main domain)
   - **Framework Preset**: Create React App
   - **Root Directory**: Click "Edit" → Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **NO Environment Variables Needed** (we're using rewrites!)

5. **Click Deploy** and wait for completion

---

### Step 3: Update Frontend Vercel Configuration (1 minute)

After deployment, update the rewrite URL:

1. **Go to your frontend project** on Vercel
2. **Settings** → **General** → Scroll to **Build & Development Settings**
3. Or update via file (already done in code):

The `frontend/vercel.json` should have:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-BACKEND-URL.vercel.app/api/:path*"
    }
  ]
}
```

**Replace** `YOUR-BACKEND-URL` with your actual backend URL from Step 1.

4. **Redeploy** the frontend:
   - Go to **Deployments** tab
   - Click three dots on latest deployment
   - Click **Redeploy**

---

### Step 4: Update Backend CORS (1 minute)

1. **Go to backend project** on Vercel
2. **Settings** → **Environment Variables**
3. **Add new variable**:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
   (Use your frontend URL from Step 2)

4. **Redeploy backend**:
   - Go to **Deployments** tab
   - Click three dots on latest deployment
   - Click **Redeploy**

---

### Step 5: Configure MongoDB Atlas (1 minute)

1. **Go to**: https://cloud.mongodb.com
2. **Network Access** (left sidebar)
3. **Add IP Address**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. **Click Confirm**

---

## ✅ Testing Your Deployment

### Test Frontend
Visit: `https://your-frontend-url.vercel.app`
- Landing page should load
- Animations should work
- Logo should display

### Test API (Same Domain!)
Visit: `https://your-frontend-url.vercel.app/api/applications/stats`
- Should return JSON with statistics
- This proves API is accessible from same domain!

### Test Form Submission
1. Fill out the recruitment form
2. Submit application
3. Should redirect to success page
4. Check MongoDB to verify data saved

### Test Admin Dashboard
Visit: `https://your-frontend-url.vercel.app/admin`
- Should display applications
- Test filtering and search
- Test view and delete functions

---

## 🎯 How It Works

### Vercel Rewrites Magic
When a request comes to your frontend domain:

1. **Regular requests** (/, /admin, etc.) → Served by React frontend
2. **API requests** (/api/*) → Automatically forwarded to backend
3. **User sees only one domain** → Seamless experience!

```
User Request: https://matrix-portal.vercel.app/api/apply
              ↓
Vercel Rewrite: Forwards to backend
              ↓
Backend: https://matrix-backend.vercel.app/api/apply
              ↓
Response: Sent back to user
              ↓
User sees: Same domain (matrix-portal.vercel.app)
```

---

## 🔧 Alternative: Update Rewrite URL Manually

If you need to change the backend URL later:

### Method 1: Via GitHub (Recommended)

1. Edit `frontend/vercel.json` in your repository
2. Update the `destination` URL in rewrites section
3. Commit and push to GitHub
4. Vercel will auto-deploy

### Method 2: Via Vercel Dashboard

1. Go to your frontend project
2. **Settings** → **Functions**
3. Add rewrite configuration
4. Redeploy

---

## 📊 Final Architecture

```
┌─────────────────────────────────────────┐
│  https://matrix-portal.vercel.app       │
│  (Single URL for everything!)           │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐      ┌──────────────────┐
│   Frontend   │      │   Backend API    │
│   (React)    │      │   (Express)      │
│              │      │                  │
│ /            │      │ /api/apply       │
│ /admin       │      │ /api/applications│
│ /success     │      │ /api/stats       │
└──────────────┘      └──────────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │   MongoDB    │
                      │   Atlas      │
                      └──────────────┘
```

---

## 🐛 Troubleshooting

### Issue: API calls return 404
**Solution**: 
- Check if rewrite URL in `frontend/vercel.json` is correct
- Make sure backend is deployed and accessible
- Redeploy frontend after updating vercel.json

### Issue: CORS errors
**Solution**:
- Add FRONTEND_URL environment variable to backend
- Make sure it matches your frontend URL exactly
- Redeploy backend

### Issue: MongoDB connection failed
**Solution**:
- Check Network Access in MongoDB Atlas
- Verify MONGODB_URI is correct
- Make sure 0.0.0.0/0 is allowed

### Issue: Changes not reflecting
**Solution**:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Vercel deployment logs

---

## 🎉 Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed on main domain
- [ ] Rewrite configured correctly
- [ ] MongoDB allows Vercel connections
- [ ] Form submission works
- [ ] Admin dashboard accessible
- [ ] API accessible via /api/* on same domain
- [ ] No CORS errors

---

## 🔄 Continuous Deployment

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build both projects
3. Deploy updates
4. Make them live

---

## 💡 Pro Tips

1. **Custom Domain**: Add your own domain in Vercel project settings
2. **Environment Variables**: Use Vercel's environment variable UI for sensitive data
3. **Preview Deployments**: Every PR gets a preview URL automatically
4. **Logs**: Check Vercel function logs for debugging API issues
5. **Analytics**: Enable Vercel Analytics to track visitors

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs/concepts/projects/project-configuration
- Vercel Rewrites: https://vercel.com/docs/concepts/projects/project-configuration#rewrites
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## 🎊 You're Done!

Your MATRIX Recruitment Portal is now live on a **single URL**!

**Main URL**: `https://matrix-portal.vercel.app`
- Landing Page: `/`
- Admin Dashboard: `/admin`
- API Endpoints: `/api/*`
- Success Page: `/success`

**Share your live link and showcase your project! 🚀**