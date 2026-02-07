# 🔧 Deployment Configuration Guide

## Current Setup Status

✅ **Backend configured for standalone API deployment (Render)**
✅ **Frontend configured for separate deployment (Vercel)**
✅ **Environment variables properly configured**
✅ **CORS configured to accept Vercel and Render domains**

---

## Backend Configuration (Render)

### Files Ready:
- ✅ `backend/server.js` - Standalone API server (no frontend serving)
- ✅ `backend/.env` - Local development environment
- ✅ `backend/.env.example` - Template for deployment
- ✅ `backend/vercel.json` - Backup config (not needed for Render)

### Render Settings:

**Service Type:** Web Service

**Build Settings:**
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

**Environment Variables (Add in Render Dashboard):**
```
PORT=5000
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=production
```

**Health Check Endpoint:**
```
https://your-backend.onrender.com/
```
Should return:
```json
{
  "success": true,
  "message": "Matrix Recruitment Portal API is running",
  "timestamp": "2026-02-08T..."
}
```

---

## Frontend Configuration (Vercel)

### Files Ready:
- ✅ `frontend/src/config.js` - API URL configuration
- ✅ `frontend/src/index.js` - Axios base URL setup
- ✅ `frontend/.env` - Local development (localhost:5000)
- ✅ `frontend/.env.example` - Template for deployment
- ✅ `frontend/vercel.json` - Vercel configuration

### Vercel Settings:

**Framework:** Create React App (auto-detected)

**Build Settings:**
```
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

**Environment Variables (Add in Vercel Dashboard):**
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

⚠️ **IMPORTANT:** Replace `your-backend-name` with your actual Render backend URL!

---

## Deployment Steps

### 1. Deploy Backend First (Render)

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure as shown above
6. Click "Create Web Service"
7. **Wait for deployment to complete**
8. **Copy your backend URL** (e.g., `https://matrix-recruitment-backend.onrender.com`)

### 2. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository
5. Configure as shown above
6. **Add environment variable:** `REACT_APP_API_URL` with your Render backend URL
7. Click "Deploy"
8. **Wait for deployment to complete**
9. **Copy your frontend URL** (e.g., `https://matrix-recruitment-portal.vercel.app`)

### 3. Update Backend CORS

After getting your Vercel URL, update `backend/server.js`:

```javascript
const allowedOrigins = [
  'https://your-actual-frontend.vercel.app', // Add your Vercel URL here
  'https://matrix-recruitment-portal-d5bv.vercel.app',
  'http://localhost:5000',
  'http://localhost:3000'
];
```

Then commit and push:
```bash
git add backend/server.js
git commit -m "Add production frontend URL to CORS"
git push origin main
```

Render will auto-redeploy in 2-3 minutes.

### 4. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Network Access"
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

This allows Render to connect to your database.

---

## Testing Your Deployment

### Test Backend API

1. **Health Check:**
   ```
   https://your-backend.onrender.com/
   ```
   Should return success message

2. **Stats Endpoint:**
   ```
   https://your-backend.onrender.com/api/applications/stats
   ```
   Should return:
   ```json
   {"success":true,"data":{"total":0,"byDomain":[]}}
   ```

### Test Frontend

1. **Open Frontend:**
   ```
   https://your-frontend.vercel.app
   ```
   Should load the landing page

2. **Submit Test Application:**
   - Click "Apply Now"
   - Fill out the form
   - Submit
   - Should see success message

3. **Check Admin Dashboard:**
   ```
   https://your-frontend.vercel.app/admin
   ```
   Should see your test application

4. **Verify in MongoDB:**
   - Go to MongoDB Atlas
   - Browse Collections
   - Check `applications` collection
   - Should see your test data

---

## Environment Variables Summary

### Backend (Render)
```env
PORT=5000
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=production
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

### Local Development
Backend (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=development
```

Frontend (`frontend/.env`):
```env
DISABLE_ESLINT_PLUGIN=true
CI=false
REACT_APP_API_URL=http://localhost:5000
```

---

## CORS Configuration

The backend is configured to accept requests from:
- ✅ Any `.vercel.app` domain
- ✅ Any `.onrender.com` domain
- ✅ `localhost:3000` (development)
- ✅ `localhost:5000` (development)

This means your frontend can connect from any Vercel deployment URL.

---

## Auto-Deployment

Both platforms support automatic deployment from GitHub:

**Render:**
- Push to `main` branch → Auto-deploys backend
- Takes 2-3 minutes
- Check logs in Render dashboard

**Vercel:**
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployment
- Takes 1-2 minutes
- Check logs in Vercel dashboard

---

## Troubleshooting

### Backend Issues

**Error: "Application Error" on Render**
- Check Render logs for errors
- Verify MongoDB URI is correct
- Ensure MongoDB allows 0.0.0.0/0

**Error: "Cannot connect to MongoDB"**
- Check MongoDB Atlas Network Access
- Verify connection string in environment variables
- Check MongoDB Atlas status

### Frontend Issues

**Error: "Failed to fetch" or Network Error**
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check backend is running (visit health check endpoint)
- Check browser console for CORS errors

**Error: CORS Policy Error**
- Verify your Vercel URL is in backend CORS allowedOrigins
- Push changes to GitHub
- Wait for Render to redeploy

**Error: 404 on routes**
- Vercel should handle this automatically for Create React App
- Check vercel.json is configured correctly

### Database Issues

**Data not saving**
- Check MongoDB Atlas Network Access
- Verify backend can connect (check Render logs)
- Test backend endpoint directly

---

## Performance Notes

### Render Free Tier
- ⚠️ Backend sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- This is normal for free tier
- Consider using UptimeRobot to keep it awake

### Vercel Free Tier
- ✅ Always on, no cold starts
- ✅ Global CDN
- ✅ Automatic caching

---

## Security Checklist

- [x] Environment variables not committed to Git
- [x] CORS properly configured
- [x] MongoDB credentials secure
- [x] HTTPS enabled (automatic)
- [x] Input validation on backend
- [x] Email uniqueness enforced
- [x] Rate limiting (consider adding for production)

---

## Next Steps After Deployment

1. ✅ Test all functionality
2. ✅ Share frontend URL with team
3. ✅ Monitor Render and Vercel dashboards
4. ⚠️ Set up UptimeRobot to keep backend awake (optional)
5. ⚠️ Add custom domain (optional)
6. ⚠️ Set up error monitoring (optional)

---

## Support Resources

**Render:**
- Docs: https://render.com/docs
- Status: https://status.render.com

**Vercel:**
- Docs: https://vercel.com/docs
- Status: https://vercel-status.com

**MongoDB Atlas:**
- Docs: https://docs.atlas.mongodb.com

---

## Quick Reference

| What | Where | URL Pattern |
|------|-------|-------------|
| Backend API | Render | `https://[name].onrender.com` |
| Frontend | Vercel | `https://[name].vercel.app` |
| Admin Dashboard | Vercel | `https://[name].vercel.app/admin` |
| Database | MongoDB Atlas | Cloud hosted |

---

**All configurations are complete and ready for deployment! 🚀**
