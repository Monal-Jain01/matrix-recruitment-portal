# ⚡ Render + Vercel Deployment Checklist

## 🎯 Goal
Backend on Render + Frontend on Vercel = One Connected URL

---

## STEP 1: Deploy Backend on Render (15 min)

### Setup
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repo

### Configuration
- [ ] **Name:** `matrix-recruitment-backend`
- [ ] **Root Directory:** `backend`
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Instance Type:** Free

### Environment Variables
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data`
- [ ] `NODE_ENV=production`

### Deploy & Test
- [ ] Click "Create Web Service"
- [ ] Wait 3-5 minutes
- [ ] **COPY YOUR BACKEND URL** (e.g., `https://matrix-recruitment-backend.onrender.com`)
- [ ] Test: Visit `https://your-backend-url.onrender.com/api/applications/stats`
- [ ] Should see: `{"success":true,"data":{"total":0,"byDomain":[]}}`

---

## STEP 2: Deploy Frontend on Vercel (10 min)

### Setup
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import your GitHub repo

### Configuration
- [ ] **Framework:** Create React App (auto-detected)
- [ ] **Root Directory:** `frontend`
- [ ] **Build Command:** `npm run build`
- [ ] **Output Directory:** `build`

### Environment Variables
- [ ] `REACT_APP_API_URL=https://your-backend-url.onrender.com`
  - ⚠️ Replace with YOUR actual Render URL from Step 1!

### Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] **COPY YOUR FRONTEND URL** (e.g., `https://matrix-recruitment-portal.vercel.app`)
- [ ] Open frontend URL in browser
- [ ] Should see Matrix landing page

---

## STEP 3: Connect Them Together (5 min)

### Update Backend CORS
- [ ] Open `backend/server.js` in your code editor
- [ ] Find the `allowedOrigins` array
- [ ] Add your Vercel URL:
```javascript
const allowedOrigins = [
  'https://matrix-recruitment-portal.vercel.app', // Your Vercel URL
  'http://localhost:5000',
  'http://localhost:3000'
];
```
- [ ] Save file
- [ ] Run: `git add backend/server.js`
- [ ] Run: `git commit -m "Update CORS for Vercel"`
- [ ] Run: `git push origin main`
- [ ] Wait 2-3 minutes for Render to auto-redeploy

### Update MongoDB Access
- [ ] Go to [MongoDB Atlas](https://cloud.mongodb.com)
- [ ] Click "Network Access"
- [ ] Click "Add IP Address"
- [ ] Click "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

---

## STEP 4: Test Everything! (5 min)

### Test 1: Frontend Loads
- [ ] Open: `https://your-frontend-url.vercel.app`
- [ ] Landing page loads correctly

### Test 2: Submit Application
- [ ] Click "Apply Now"
- [ ] Fill out form with test data
- [ ] Click Submit
- [ ] Should see success message
- [ ] Should redirect to success page

### Test 3: Check Database
- [ ] Go to MongoDB Atlas
- [ ] Click "Browse Collections"
- [ ] Click "matrx_recruitment_data" database
- [ ] Click "applications" collection
- [ ] Should see your test application

### Test 4: Admin Dashboard
- [ ] Go to: `https://your-frontend-url.vercel.app/admin`
- [ ] Should see list of applications
- [ ] Should see your test application

### Test 5: No Errors
- [ ] Press F12 (open DevTools)
- [ ] Go to Console tab
- [ ] Should be NO red errors
- [ ] Should be NO CORS errors

---

## ✅ SUCCESS!

If all tests pass, you're done! 🎉

**Your Live URLs:**

Frontend (Share this):
```
https://matrix-recruitment-portal.vercel.app
```

Backend API:
```
https://matrix-recruitment-backend.onrender.com
```

Admin Dashboard:
```
https://matrix-recruitment-portal.vercel.app/admin
```

---

## 🔧 If Something Doesn't Work

### CORS Error?
1. Check backend CORS includes your Vercel URL
2. Push changes to GitHub
3. Wait for Render to redeploy (2-3 min)
4. Clear browser cache and try again

### Backend Not Responding?
1. Check Render dashboard → Logs
2. Verify MongoDB URI is correct
3. Check MongoDB allows 0.0.0.0/0

### Frontend Can't Connect?
1. Check Vercel environment variables
2. Verify REACT_APP_API_URL is correct
3. Redeploy frontend on Vercel

### Data Not Saving?
1. Check MongoDB Atlas Network Access
2. Check Render logs for errors
3. Test backend directly: `https://your-backend.onrender.com/api/applications/stats`

---

## 📝 Important Notes

**Render Free Tier:**
- Backend sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- This is normal and expected for free tier

**Auto-Deployments:**
- Push to GitHub → Both platforms auto-deploy
- Render: 2-3 minutes
- Vercel: 1-2 minutes

**Cost:**
- Everything is FREE! 🎉
- No credit card needed
- Perfect for recruitment portal

---

## 🚀 You're Live!

Total time: ~35 minutes
Total cost: $0

Share your frontend URL with recruiters and start collecting applications!
