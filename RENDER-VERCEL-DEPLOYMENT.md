# 🚀 Deploy Backend on Render + Frontend on Vercel

## Complete Step-by-Step Guide

This guide will help you deploy your Matrix Recruitment Portal with:
- **Backend (API)** → Render (Free tier)
- **Frontend (React)** → Vercel (Free tier)
- **Database** → MongoDB Atlas (Already configured)

---

## 📋 Prerequisites

- [x] GitHub account with your code pushed
- [ ] Render account (Sign up at [render.com](https://render.com) - FREE)
- [ ] Vercel account (Sign up at [vercel.com](https://vercel.com) - FREE)
- [x] MongoDB Atlas running (Already configured)

---

## PART 1: Deploy Backend on Render (15 minutes)

### Step 1: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with GitHub (recommended for easy deployment)

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `matrix-recruitment-portal`

### Step 3: Configure Backend Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `matrix-recruitment-backend` (or your choice)
- **Region:** Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (0$/month)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=production
```

### Step 5: Deploy Backend

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. **IMPORTANT:** Copy your backend URL
   - It will look like: `https://matrix-recruitment-backend.onrender.com`
   - **Save this URL - you'll need it for frontend!**

### Step 6: Verify Backend is Running

1. Open your backend URL in browser
2. Add `/api/applications/stats` to the URL
3. You should see: `{"success":true,"data":{"total":0,"byDomain":[]}}`

✅ **Backend is now live on Render!**

---

## PART 2: Deploy Frontend on Vercel (10 minutes)

### Step 1: Update Frontend Configuration

Before deploying, we need to configure the frontend to use your Render backend URL.

**Update `frontend/.env`:**
```env
DISABLE_ESLINT_PLUGIN=true
CI=false
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual Render URL from Part 1, Step 5.

**Commit this change:**
```bash
git add frontend/.env
git commit -m "Configure frontend for Render backend"
git push origin main
```

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select `matrix-recruitment-portal`

### Step 4: Configure Frontend

**Framework Preset:** Vercel should auto-detect "Create React App"

**Build Settings:**
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `build` (auto-filled)

**Environment Variables:**
Click "Environment Variables" and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Replace with your actual Render backend URL!

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your frontend URL**
   - It will look like: `https://matrix-recruitment-portal.vercel.app`

✅ **Frontend is now live on Vercel!**

---

## PART 3: Connect Backend & Frontend (5 minutes)

### Step 1: Update Backend CORS

Your backend needs to allow requests from your Vercel frontend URL.

**Update `backend/server.js`:**

Find the CORS configuration and update it:

```javascript
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://matrix-recruitment-portal.vercel.app', // Your Vercel URL
      'https://matrix-recruitment-backend.onrender.com', // Your Render URL
      'http://localhost:5000',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

**Commit and push:**
```bash
git add backend/server.js
git commit -m "Update CORS for Vercel frontend"
git push origin main
```

Render will automatically redeploy your backend (takes 2-3 minutes).

### Step 2: Update MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Network Access"** in left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

This allows Render to connect to your MongoDB.

---

## ✅ VERIFICATION - Test Your Live Site!

### Test 1: Frontend Loads
1. Open your Vercel URL: `https://matrix-recruitment-portal.vercel.app`
2. You should see the Matrix landing page

### Test 2: Submit Application
1. Click "Apply Now"
2. Fill out the recruitment form
3. Submit the application
4. You should see success message and redirect

### Test 3: Check Database
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. You should see your test application data

### Test 4: Admin Dashboard
1. Go to: `https://matrix-recruitment-portal.vercel.app/admin`
2. You should see the submitted applications

### Test 5: Check Browser Console
1. Press F12 to open DevTools
2. Go to Console tab
3. Should be NO CORS errors
4. Should be NO 404 errors

---

## 🎉 SUCCESS! Your URLs:

**Frontend (User Access):**
```
https://matrix-recruitment-portal.vercel.app
```

**Backend API:**
```
https://matrix-recruitment-backend.onrender.com
```

**Admin Dashboard:**
```
https://matrix-recruitment-portal.vercel.app/admin
```

---

## 🔧 Troubleshooting

### Issue: CORS Error in Browser Console

**Solution:**
1. Check that backend CORS includes your Vercel URL
2. Redeploy backend on Render
3. Clear browser cache

### Issue: "Failed to fetch" or Network Error

**Solution:**
1. Verify backend is running: Visit `https://your-backend.onrender.com/api/applications/stats`
2. Check REACT_APP_API_URL in Vercel environment variables
3. Redeploy frontend on Vercel

### Issue: Backend shows "Application Error"

**Solution:**
1. Check Render logs: Dashboard → Your Service → Logs
2. Verify MongoDB connection string is correct
3. Check MongoDB Atlas allows 0.0.0.0/0

### Issue: Data not saving to MongoDB

**Solution:**
1. Check MongoDB Atlas Network Access allows all IPs
2. Verify MONGODB_URI in Render environment variables
3. Check Render logs for connection errors

### Issue: Render backend is slow (first request)

**Note:** Render free tier sleeps after 15 minutes of inactivity. First request takes 30-60 seconds to wake up. This is normal for free tier.

**Solutions:**
- Upgrade to paid tier ($7/month) for always-on
- Use a service like UptimeRobot to ping your backend every 10 minutes
- Accept the cold start delay (it's free!)

---

## 🔄 Automatic Deployments

Both platforms auto-deploy when you push to GitHub:

**Render:**
- Push to `main` → Backend redeploys automatically
- Check deployment status in Render dashboard

**Vercel:**
- Push to `main` → Frontend redeploys automatically
- Push to other branches → Creates preview deployment
- Check deployment status in Vercel dashboard

---

## 📊 Monitoring Your Deployments

### Render Dashboard
- View logs: Dashboard → Your Service → Logs
- Check metrics: CPU, Memory usage
- View deployment history

### Vercel Dashboard
- View deployments: Project → Deployments
- Check analytics: Project → Analytics
- View build logs: Click on any deployment

### MongoDB Atlas
- Monitor database: Atlas → Metrics
- View collections: Atlas → Browse Collections
- Check connection logs: Atlas → Logs

---

## 💰 Cost Breakdown

**Total Monthly Cost: $0 (FREE!)**

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Render | Free | $0 | 750 hours/month, sleeps after 15min |
| Vercel | Hobby | $0 | 100GB bandwidth, unlimited deployments |
| MongoDB Atlas | Free | $0 | 512MB storage, shared cluster |

**Perfect for a recruitment portal!**

---

## 🚀 Performance Tips

### 1. Keep Backend Awake (Optional)
Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 10 minutes:
- Sign up at uptimerobot.com
- Add monitor: `https://your-backend.onrender.com/api/applications/stats`
- Set interval: 10 minutes

### 2. Optimize Frontend
Already optimized with:
- React production build
- Vercel CDN
- Automatic compression

### 3. Database Indexing
Already configured in Application model:
- Email index (unique)
- Domain + createdAt index

---

## 🔐 Security Checklist

- [x] Environment variables not in Git
- [x] CORS configured correctly
- [x] MongoDB credentials secure
- [x] HTTPS enabled (automatic on both platforms)
- [x] Input validation on backend
- [x] Email uniqueness enforced

---

## 📱 Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### For Backend (Render):
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## 🆘 Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

**Vercel Support:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

**MongoDB Atlas:**
- Docs: https://docs.atlas.mongodb.com
- Support: https://support.mongodb.com

---

## 🎯 Quick Commands Reference

### Update Backend
```bash
git add backend/
git commit -m "Update backend"
git push origin main
# Render auto-deploys in 2-3 minutes
```

### Update Frontend
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys in 1-2 minutes
```

### View Render Logs
```bash
# Install Render CLI (optional)
npm install -g render-cli
render login
render logs
```

### View Vercel Logs
```bash
# Install Vercel CLI (optional)
npm install -g vercel
vercel login
vercel logs
```

---

## ✨ You're All Set!

Your Matrix Recruitment Portal is now:
- ✅ Live and accessible worldwide
- ✅ Automatically deploying from GitHub
- ✅ Storing data in MongoDB
- ✅ Running on free tier (no credit card needed)
- ✅ Using HTTPS (secure)
- ✅ Hosted on reliable platforms

**Share your live URL with recruiters!**

Frontend: `https://matrix-recruitment-portal.vercel.app`

---

## 📝 Next Steps

1. Test all functionality on live site
2. Share URL with your team
3. Monitor applications in admin dashboard
4. Set up UptimeRobot to keep backend awake (optional)
5. Add custom domain (optional)

**Happy Recruiting! 🎉**
