# ⚡ Quick Deploy Checklist

## Before You Start
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] MongoDB Atlas running

## Backend Deployment (5 minutes)
1. [ ] Go to vercel.com → New Project
2. [ ] Import GitHub repo
3. [ ] Set Root Directory: `backend`
4. [ ] Add environment variables:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_uri`
   - `NODE_ENV=production`
5. [ ] Deploy
6. [ ] **Copy backend URL** → You'll need this!

## Frontend Deployment (5 minutes)
1. [ ] Update `frontend/vercel.json` with backend URL
2. [ ] Commit and push changes
3. [ ] Vercel → New Project
4. [ ] Import same GitHub repo
5. [ ] Set Root Directory: `frontend`
6. [ ] Framework: Create React App
7. [ ] Add environment variable:
   - `REACT_APP_API_URL=your_backend_url`
8. [ ] Deploy
9. [ ] **Copy frontend URL**

## Final Steps (2 minutes)
1. [ ] Update `backend/server.js` CORS with frontend URL
2. [ ] Commit and push (auto-redeploys)
3. [ ] Test the live site!

## Test Your Site
- [ ] Open frontend URL
- [ ] Submit a test application
- [ ] Check admin dashboard
- [ ] Verify data in MongoDB

## 🎉 Done!
Total time: ~15 minutes

Your URLs:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.vercel.app`
