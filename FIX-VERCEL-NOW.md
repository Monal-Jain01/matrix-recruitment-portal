# 🔧 Fix Vercel Deployment - Quick Steps

## The Issue
Your frontend is deployed but can't connect to the backend (401 error).

## ✅ Solution - Add Environment Variables on Vercel

### Step 1: Fix Backend CORS

1. **Go to your BACKEND project on Vercel**:
   - https://vercel.com/dashboard
   - Click on: `matrix-recruitment-portal` (backend)

2. **Go to Settings → Environment Variables**

3. **Add these variables**:
   
   **Variable 1:**
   - Name: `FRONTEND_URL`
   - Value: `https://matrix-recruitment-portal-d5bv.vercel.app`
   - Click "Add"

   **Variable 2:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data`
   - Click "Add"

   **Variable 3:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Click "Add"

4. **Redeploy Backend**:
   - Go to "Deployments" tab
   - Click three dots on latest deployment
   - Click "Redeploy"
   - Wait 1-2 minutes

---

### Step 2: Fix Frontend Environment

1. **Go to your FRONTEND project on Vercel**:
   - https://vercel.com/dashboard
   - Click on: `matrix-recruitment-portal-d5bv`

2. **Go to Settings → Environment Variables**

3. **Add this variable**:
   
   **Variable:**
   - Name: `CI`
   - Value: `false`
   - Click "Add"

4. **Redeploy Frontend**:
   - Go to "Deployments" tab
   - Click three dots on latest deployment
   - Click "Redeploy"
   - Wait 1-2 minutes

---

### Step 3: Test Your Site

After both redeploy:

1. **Visit**: https://matrix-recruitment-portal-d5bv.vercel.app

2. **Open Developer Console** (F12)

3. **Try submitting the form**

4. **Check if errors are gone**

---

## 🐛 If Still Not Working

### Check Backend Logs:

1. Go to backend project on Vercel
2. Click "Deployments"
3. Click on latest deployment
4. Click "View Function Logs"
5. Look for errors

### Check if Backend is Accessible:

Visit this URL directly in browser:
```
https://matrix-recruitment-portal-526ee88rn-monal-jains-projects.vercel.app/api/applications/stats
```

You should see JSON response like:
```json
{
  "success": true,
  "data": {
    "total": 0,
    "byDomain": []
  }
}
```

If you see this, backend is working!

---

## 🎯 Alternative: Use Vercel Production URL

Your backend might have a cleaner production URL. Check:

1. Go to backend project on Vercel
2. Look for "Production" deployment
3. Copy the production URL (not the preview URL)
4. It might be: `https://matrix-recruitment-portal.vercel.app`

If you find a cleaner URL, update `frontend/vercel.json` line 11 with that URL.

---

## 📞 Quick Debug Checklist

- [ ] Backend has MONGODB_URI environment variable
- [ ] Backend has FRONTEND_URL environment variable
- [ ] Backend is deployed and accessible
- [ ] Frontend vercel.json has correct backend URL
- [ ] Both projects redeployed after changes
- [ ] MongoDB Atlas allows 0.0.0.0/0 connections

---

**After following these steps, your site should work!** 🎉