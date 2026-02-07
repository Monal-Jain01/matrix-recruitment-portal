# 🚀 START HERE - Deploy Your Recruitment Portal

## What You'll Get
- ✅ Backend API running on Render
- ✅ Frontend website running on Vercel  
- ✅ One URL to share with recruiters
- ✅ Data automatically saves to MongoDB
- ✅ Everything FREE (no credit card needed)

## Time Required: 35 minutes

---

## Quick Start

### 1️⃣ Deploy Backend (15 min)
👉 Go to: [render.com](https://render.com)

**Settings to use:**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

**Environment Variables:**
```
PORT=5000
MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
NODE_ENV=production
```

**After deployment:**
- Copy your backend URL (looks like: `https://something.onrender.com`)
- Test it: Add `/api/applications/stats` to your URL

---

### 2️⃣ Deploy Frontend (10 min)
👉 Go to: [vercel.com](https://vercel.com)

**Settings to use:**
- Root Directory: `frontend`
- Framework: Create React App (auto-detected)

**Environment Variable:**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```
⚠️ Use YOUR actual backend URL from step 1!

**After deployment:**
- Copy your frontend URL (looks like: `https://something.vercel.app`)
- Open it in browser - you should see your site!

---

### 3️⃣ Connect Them (5 min)

**Update MongoDB:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Network Access → Add IP Address
3. Allow Access from Anywhere (0.0.0.0/0)

**Update Backend CORS:**
1. Edit `backend/server.js`
2. Add your Vercel URL to `allowedOrigins` array
3. Push to GitHub:
```bash
git add backend/server.js
git commit -m "Add Vercel URL to CORS"
git push origin main
```
4. Wait 2-3 minutes for Render to auto-redeploy

---

### 4️⃣ Test It! (5 min)

1. Open your Vercel URL
2. Click "Apply Now"
3. Fill and submit the form
4. Check MongoDB Atlas - data should be there!
5. Visit `/admin` - see your application!

---

## 📚 Detailed Guides

- **Complete Guide:** See `RENDER-VERCEL-DEPLOYMENT.md`
- **Step-by-Step Checklist:** See `DEPLOYMENT-CHECKLIST.md`
- **Commands Reference:** See `DEPLOY-COMMANDS.md`

---

## 🆘 Need Help?

**Common Issues:**

**"CORS Error"**
→ Make sure you added your Vercel URL to backend/server.js

**"Backend not responding"**
→ Check Render logs, verify MongoDB URI is correct

**"Data not saving"**
→ Make sure MongoDB allows 0.0.0.0/0 in Network Access

---

## ✨ After Deployment

Your live URLs will be:

**Frontend (Share this with recruiters):**
```
https://your-project.vercel.app
```

**Admin Dashboard:**
```
https://your-project.vercel.app/admin
```

**Backend API:**
```
https://your-backend.onrender.com
```

---

## 💡 Pro Tips

1. **Render Free Tier:** Backend sleeps after 15 min. First request takes 30-60 sec to wake up. This is normal!

2. **Auto-Deploy:** Push to GitHub → Both platforms auto-deploy. No manual redeployment needed!

3. **Keep Backend Awake:** Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 10 minutes.

4. **Monitor:** Check Render and Vercel dashboards for logs and deployment status.

---

## 🎯 Ready to Deploy?

Follow the steps above or use the detailed checklist in `DEPLOYMENT-CHECKLIST.md`

**Let's go! 🚀**
