# 🎯 DEPLOY WITH SINGLE LINK - USERS ONLY SEE ONE URL

## What You'll Get

**Users will ONLY see and use**: `https://matrix-portal.vercel.app`

- They visit: `https://matrix-portal.vercel.app` ✅
- They submit forms: `https://matrix-portal.vercel.app` ✅
- They see admin: `https://matrix-portal.vercel.app/admin` ✅

**Backend is HIDDEN** - users never see it!

---

## 🚀 Deployment Steps (5 minutes)

### Step 1: Deploy Backend (Hidden from Users) - 2 minutes

1. **Go to**: https://vercel.com/new

2. **Sign in** with GitHub

3. **Click "Import"** next to: `Monal-Jain01/matrix-recruitment-portal`

4. **Configure**:
   - **Project Name**: `matrix-backend-hidden` (users won't see this)
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Type `backend` → Click "Continue"

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data`
   - Click "Add"
   
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - Click "Add"

6. **Click "Deploy"**

7. **Wait for deployment** (1-2 minutes)

8. **COPY YOUR BACKEND URL**:
   - After deployment, you'll see: `https://matrix-backend-hidden-xyz123.vercel.app`
   - **COPY THIS URL** - you'll need it in Step 3!

---

### Step 2: Deploy Frontend (This is YOUR SINGLE LINK!) - 2 minutes

1. **Go to**: https://vercel.com/new (again)

2. **Click "Import"** next to the same repository

3. **Configure**:
   - **Project Name**: `matrix-portal` (THIS WILL BE YOUR SINGLE URL!)
   - **Framework Preset**: Create React App
   - **Root Directory**: Click "Edit" → Type `frontend` → Click "Continue"

4. **NO Environment Variables needed!**

5. **Click "Deploy"**

6. **Wait for deployment** (1-2 minutes)

7. **YOUR SINGLE LINK IS READY!**
   - You'll see: `https://matrix-portal.vercel.app`
   - **THIS IS THE ONLY LINK USERS WILL USE!** ✅

---

### Step 3: Connect Backend to Frontend (Hidden Connection) - 1 minute

Now we connect the backend to frontend so users never see the backend URL:

#### Option A: Via GitHub (Easiest)

1. **Go to**: https://github.com/Monal-Jain01/matrix-recruitment-portal

2. **Click on**: `frontend` folder → `vercel.json` file

3. **Click the pencil icon** (Edit this file)

4. **Find line 11** that says:
   ```json
   "destination": "https://matrix-backend.vercel.app/api/:path*"
   ```

5. **Replace** `matrix-backend.vercel.app` with **YOUR BACKEND URL** from Step 1
   
   Example:
   ```json
   "destination": "https://matrix-backend-hidden-xyz123.vercel.app/api/:path*"
   ```

6. **Scroll down** → Click "Commit changes" → Click "Commit changes" again

7. **Vercel will automatically redeploy** (wait 1 minute)

8. **DONE!** ✅

---

### Step 4: Configure MongoDB - 30 seconds

1. **Go to**: https://cloud.mongodb.com

2. **Sign in**

3. **Click "Network Access"** (left sidebar)

4. **Click "Add IP Address"**

5. **Click "Allow Access from Anywhere"**

6. **Click "Confirm"**

---

## ✅ Testing Your Single Link

### Test 1: Visit Your Site
Go to: `https://matrix-portal.vercel.app`
- Landing page should load ✅
- Logo should display ✅
- Animations should work ✅

### Test 2: Submit Form
1. Fill out the recruitment form
2. Click Submit
3. Should redirect to success page ✅
4. Check MongoDB - data should be saved ✅

### Test 3: Admin Dashboard
Go to: `https://matrix-portal.vercel.app/admin`
- Should show all applications ✅
- Can filter and search ✅
- Can view and delete ✅

---

## 🎯 How It Works (Behind the Scenes)

```
User sees ONLY: https://matrix-portal.vercel.app

When user submits form:
  User → https://matrix-portal.vercel.app/api/apply
         ↓
  Vercel Rewrite (automatic, hidden from user)
         ↓
  Backend → https://matrix-backend-hidden.vercel.app/api/apply
         ↓
  MongoDB → Data saved
         ↓
  Response → Back to user
         ↓
  User still sees: https://matrix-portal.vercel.app
```

**Users NEVER see the backend URL!** ✅

---

## 📱 Share Your Single Link

Give this link to users:
```
https://matrix-portal.vercel.app
```

They can:
- View landing page: `/`
- Submit applications: `/` (form on landing page)
- See success page: `/success` (after submission)

You can:
- Access admin: `/admin`
- View all applications
- Manage submissions

**Everything from ONE link!** 🎉

---

## 🔄 Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will **automatically redeploy** both projects!

Your single link stays the same: `https://matrix-portal.vercel.app`

---

## 🐛 Troubleshooting

### If form submission fails:

1. **Check Step 3** - Make sure you updated the backend URL in `frontend/vercel.json`
2. **Check MongoDB** - Make sure Network Access allows 0.0.0.0/0
3. **Check Vercel logs**:
   - Go to backend project → Deployments → Click latest → View Function Logs

### If page doesn't load:

1. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check Vercel deployment status**
3. **Wait a few minutes** - DNS propagation can take time

---

## 🎉 Success!

You now have:
- ✅ **ONE single link** for users: `https://matrix-portal.vercel.app`
- ✅ Backend is **hidden** from users
- ✅ Data automatically saved to MongoDB
- ✅ Admin dashboard accessible
- ✅ Professional, production-ready site
- ✅ **FREE** hosting

---

## 💡 Important Notes

1. **Users ONLY need**: `https://matrix-portal.vercel.app`
2. **Backend URL is hidden** - users never see it
3. **All API calls** go through the frontend URL automatically
4. **No CORS issues** - everything works seamlessly
5. **One link to share** - simple and professional!

---

**Start Now**: https://vercel.com/new 🚀

**Your Single Link**: `https://matrix-portal.vercel.app` (after deployment)