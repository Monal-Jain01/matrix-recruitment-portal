# ⚡ Quick Deploy to Vercel

## 🚀 Fastest Way to Deploy

### Method 1: Using Vercel Website (Easiest)

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** your repository: `Monal-Jain01/matrix-recruitment-portal`

#### For Backend:
- Root Directory: `backend`
- Framework: Other
- Add Environment Variable:
  ```
  MONGODB_URI=mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
  ```
- Click **Deploy**
- Copy the URL (e.g., `https://matrix-backend-xyz.vercel.app`)

#### For Frontend:
- Import the same repo again
- Root Directory: `frontend`
- Framework: Create React App
- Add Environment Variable:
  ```
  REACT_APP_API_URL=https://your-backend-url.vercel.app
  ```
  (Use the backend URL from above)
- Click **Deploy**

### Method 2: Using Vercel CLI (For Developers)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd ../frontend
vercel --prod
```

---

## ⚠️ Important: MongoDB Atlas Setup

Before deploying, make sure MongoDB allows Vercel connections:

1. Go to: https://cloud.mongodb.com
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Confirm**

---

## ✅ After Deployment

1. Visit your frontend URL
2. Test the form submission
3. Check admin dashboard at `/admin`
4. Share your live link! 🎉

---

## 🔗 Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://matrix-recruitment-portal.vercel.app`
- **Backend**: `https://matrix-backend.vercel.app`
- **Admin**: `https://matrix-recruitment-portal.vercel.app/admin`

---

## 🆘 Need Help?

Check the detailed guide: `VERCEL-DEPLOYMENT.md`

---

**That's it! Your app will be live in ~2 minutes! 🚀**