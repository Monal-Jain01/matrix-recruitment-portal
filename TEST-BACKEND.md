# 🧪 Test Your Backend

## Step 1: Find Your Backend Production URL

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click on your backend project**
3. **Look for the "Production" deployment** (it has a special badge)
4. **Copy the URL** - it should look like:
   - `https://matrix-recruitment-portal.vercel.app` OR
   - `https://matrix-recruitment-portal-git-main-xxx.vercel.app` OR
   - The one you gave me: `https://matrix-recruitment-portal-526ee88rn-monal-jains-projects.vercel.app`

## Step 2: Test Backend Directly

Open this URL in your browser (replace with YOUR backend URL):

```
https://matrix-recruitment-portal-526ee88rn-monal-jains-projects.vercel.app/api/applications/stats
```

### Expected Result:
You should see JSON like:
```json
{
  "success": true,
  "data": {
    "total": 0,
    "byDomain": []
  }
}
```

### If you see an error:
- Backend is not deployed correctly
- Environment variables are missing
- MongoDB connection failed

## Step 3: Check Backend Logs

1. Go to backend project on Vercel
2. Click "Deployments"
3. Click on the latest deployment
4. Click "View Function Logs"
5. Look for errors (especially MongoDB connection errors)

## Step 4: Verify Environment Variables

Make sure these are set in backend:

1. Go to backend project → Settings → Environment Variables
2. Check if these exist:
   - `MONGODB_URI`
   - `NODE_ENV`
   - `PORT` (optional)

## Step 5: Update Frontend Rewrite

Once you confirm the backend URL works:

1. Go to: https://github.com/Monal-Jain01/matrix-recruitment-portal
2. Edit: `frontend/vercel.json`
3. Line 11: Update with the CORRECT backend URL
4. Make sure it ends with `/api/:path*`

Example:
```json
"destination": "https://YOUR-BACKEND-URL.vercel.app/api/:path*"
```

5. Commit and push
6. Vercel will auto-redeploy

---

## 🔍 Common Issues:

### Issue 1: Backend URL is wrong
**Solution**: Use the production URL, not preview URL

### Issue 2: Backend not deployed
**Solution**: Deploy backend first, then frontend

### Issue 3: MongoDB not connected
**Solution**: 
- Add MONGODB_URI to Vercel environment variables
- Allow 0.0.0.0/0 in MongoDB Atlas Network Access

### Issue 4: CORS blocking
**Solution**: Already fixed in latest code, just redeploy backend

---

## ✅ Quick Fix:

If backend test (Step 2) works, just update `frontend/vercel.json` with the correct URL and push to GitHub.

Vercel will auto-redeploy and it should work!