# 🚀 Deploy Backend on Render + Frontend on Vercel

## Overview
- **Backend (API):** Render.com - Free tier, perfect for Node.js APIs
- **Frontend (React):** Vercel - Free tier, optimized for React apps
- **Database:** MongoDB Atlas (already configured)

---

## 📋 Prerequisites

1. ✅ GitHub account with your code pushed
2. ✅ Render account - Sign up at [render.com](https://render.com) (free)
3. ✅ Vercel account - Sign up at [vercel.com](https://vercel.com) (free)
4. ✅ MongoDB Atlas running (you already have this)

---

## PART 1: Deploy Backend on Render (15 minutes)

### Step 1: Prepare Backend for Render

Your backend is already configured! Render will automatically detect it.

### Step 2: Create Render Account & Deploy

1. **Go to [render.com](https://render.com)** and sign up/login

2. **Click "New +" → "Web Service"**

3. **Connect GitHub Repository:**
   - Click "Connect account" to link GitHub
   - Select your repository: `Matrix_recruitment`
   - Click "Connect"

4. **Configure Web Service:**
   ```
   Name: matrix-recruitment-backend
   Region: Choose closest to you (e.g., Singapore, Oregon)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Select Plan:**
   - Choose **"Free"** plan
   - Note: Free tier sleeps after 15 min of inactivity (wakes up automatically)

6. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these three variables:
   ```
   PORT = 5000
   MONGODB_URI = mongodb+srv://monaljain1901:monalj@cluster0.t5fifco.mongodb.net/matrx_recruitment_data
   NODE_ENV = production
   ```

7. **Click "Create Web Service"**

8. **W