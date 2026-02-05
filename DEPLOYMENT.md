# MATRIX Recruitment Portal - Deployment Guide

## 📦 GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `matrix-recruitment-portal`
   - **Description**: `Full-stack MERN recruitment portal for MATRIX club with modern UI and premium features`
   - **Visibility**: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Push Code to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Add your GitHub repository as remote origin (replace YOURUSERNAME)
git remote add origin https://github.com/YOURUSERNAME/matrix-recruitment-portal.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Example** (replace with your username):
```bash
git remote add origin https://github.com/monaljain1901/matrix-recruitment-portal.git
git push -u origin main
```

---

## 🚀 Deployment Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

#### Backend Deployment:

1. Go to [Render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `matrix-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Click **"Create Web Service"**

#### Frontend Deployment:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `matrix-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL from Render
5. Click **"Create Static Site"**

---

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend on Render:
Follow the backend steps from Option 1 above.

#### Frontend on Vercel:

1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL
6. Click **"Deploy"**

---

### Option 3: Deploy to Railway (Full-stack)

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect both frontend and backend
5. Configure environment variables for backend:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
6. Deploy!

---

## 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get your connection string
6. Replace `<password>` with your database user password
7. Use this connection string in your `MONGODB_URI` environment variable

---

## 🔧 Environment Variables

### Backend (.env):
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/matrix-recruitment
NODE_ENV=production
```

### Frontend (if needed):
```env
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 📝 Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and loads correctly
- [ ] MongoDB connection is working
- [ ] API endpoints are responding
- [ ] Form submission works
- [ ] Admin dashboard is accessible
- [ ] All animations and features work
- [ ] Mobile responsiveness is maintained
- [ ] CORS is properly configured

---

## 🔄 Updating Your Deployment

Whenever you make changes:

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

Most platforms (Vercel, Render, Railway) will automatically redeploy when you push to GitHub.

---

## 🆘 Troubleshooting

### MongoDB Connection Issues:
- Verify your connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### CORS Errors:
- Update the CORS origin in `backend/server.js` to include your frontend URL
- Make sure environment variables are set correctly

### Build Failures:
- Check build logs for specific errors
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility

---

## 📞 Support

For issues or questions:
- Check the main README.md
- Review deployment platform documentation
- Check MongoDB Atlas documentation

---

## 🎉 Success!

Once deployed, your MATRIX Recruitment Portal will be live and accessible worldwide!

Share your deployment URL:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.render.com`
- Admin Dashboard: `https://your-app.vercel.app/admin`