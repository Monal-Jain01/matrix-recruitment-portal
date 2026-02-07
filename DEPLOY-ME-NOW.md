# 🚀 DEPLOY IN 5 MINUTES - SINGLE LINK

## ⚡ Super Fast Deployment

Follow these exact steps to get your single URL live:

---

## 📱 **Step 1: Deploy Backend** (2 minutes)

1. **Open this link**: https://vercel.com/new

2. **Sign in** with your GitHub account

3. **Click "Import"** next to: `Monal-Jain01/matrix-recruitment-portal`

4. **Configure**:
   - Project Name: `matrix-backend`
   - Framework: Other
   - Root Directory: Click "Edit" → Type `backend` → Save

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data`
   - Click "Add"

6. **Click "Deploy"** button

7. **Wait 1-2 minutes** for deployment

8. **IMPORTANT**: Copy your backend URL
   - It will look like: `https://matrix-backend-abc123.vercel.app`
   - **Write it down or keep the tab open!**

---

## 🎨 **Step 2: Deploy Frontend** (2 minutes)

1. **Open this link again**: https://vercel.com/new

2. **Click "Import"** next to the same repository

3. **Configure**:
   - Project Name: `matrix-portal` (this will be your main URL!)
   - Framework: Create React App
   - Root Directory: Click "Edit" → Type `frontend` → Save

4. **NO Environment Variables needed!**

5. **Click "Deploy"** button

6. **Wait 1-2 minutes** for deployment

7. **Your site is now live!** 🎉
   - URL will be like: `https://matrix-portal.vercel.app`

---

## 🔗 **Step 3: Connect Backend to Frontend** (1 minute)

Now we need to tell the frontend where the backend is:

### Option A: Via GitHub (Recommended)

1. **Go to your repository**: https://github.com/Monal-Jain01/matrix-recruitment-portal

2. **Navigate to**: `frontend/vercel.json`

3. **Click the pencil icon** (Edit)

4. **Find line 11** (around line 11):
   ```json
   "destination": "https://matrix-backend.vercel.app/api/:path*"
   ```

5. **Replace** `matrix-backend.vercel.app` with **your actual backend URL** from Step 1

6. **Scroll down** and click "Commit changes"

7. **Vercel will automatically redeploy** (wait 1 minute)

### Option B: Via Vercel Dashboard

1. Go to your frontend project on Vercel
2. Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.vercel.app`
4. Redeploy

---

## 🗄️ **Step 4: Configure MongoDB** (30 seconds)

1. **Open**: https://cloud.mongodb.com

2. **Sign in** to your account

3. **Click "Network Access"** (left sidebar)

4. **Click "Add IP Address"**

5. **Select "Allow Access from Anywhere"**

6. **Click "Confirm"**

---

## ✅ **Step 5: Test Your Site!**

Visit your frontend URL: `https://matrix-portal.vercel.app`

**Test these:**
- ✅ Landing page loads
- ✅ Fill and submit the form
- ✅ Check success page
- ✅ Visit `/admin` to see applications
- ✅ Check MongoDB to see data saved

---

## 🎯 **Your Single URL**

Everything works from ONE link:

```
https://matrix-portal.vercel.app
```

**Pages:**
- Landing: https://matrix-portal.vercel.app/
- Admin: https://matrix-portal.vercel.app/admin
- Success: https://matrix-portal.vercel.app/success

**API (hidden from users):**
- /api/apply
- /api/applications
- /api/applications/stats

---

## 🐛 **Troubleshooting**

### If form submission fails:

1. **Check backend URL** in `frontend/vercel.json`
2. **Make sure MongoDB** allows 0.0.0.0/0
3. **Check Vercel logs**:
   - Go to backend project → Deployments → Click latest → View Function Logs

### If page doesn't load:

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Check Vercel deployment status**
3. **Look at build logs** for errors

---

## 📞 **Need Help?**

If you get stuck:
1. Check the deployment logs on Vercel
2. Make sure all environment variables are set
3. Verify MongoDB network access is configured

---

## 🎉 **Success!**

Once deployed, share your link:
- **Main Site**: `https://matrix-portal.vercel.app`
- **Admin Panel**: `https://matrix-portal.vercel.app/admin`

**Total Time**: ~5 minutes
**Cost**: FREE (Vercel free tier)

---

## 🔄 **Future Updates**

Whenever you make changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will **automatically redeploy** both frontend and backend!

---

**Start Now**: https://vercel.com/new 🚀