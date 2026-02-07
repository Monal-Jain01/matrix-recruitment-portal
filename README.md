# MATRIX Recruitment Portal

Recruitment portal for the MATRIX club at Jabalpur Engineering College.

## 🚀 Features

### Frontend
- **Modern Design**: Dark futuristic theme with red (#e10600) accent colors
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth Framer Motion animations and transitions
- **Interactive Elements**: Custom cursor, particle background, glassmorphism effects
- **Multi-step Form**: Progressive form with validation and progress tracking
- **Success Page**: Animated success page with confetti effects

### Backend
- **RESTful API**: Express.js server with MongoDB integration
- **Validation**: Server-side validation with express-validator
- **Error Handling**: Comprehensive error handling middleware
- **CORS**: Configured for cross-origin requests
- **Data Models**: Mongoose schemas with validation

### Admin Dashboard
- **Application Management**: View, filter, and delete applications
- **Statistics**: Real-time stats and analytics
- **Search & Filter**: Advanced filtering by domain and search functionality
- **Responsive Table**: Mobile-friendly application listing
- **Modal Views**: Detailed application view in modal

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion, Canvas Confetti

## 📋 Application Form Fields

1. **Basic Information**
   - Full Name
   - Semester (1-8)
   - Branch (CSE, IT, ECE, MECH, CIVIL, etc.)
   - Phone Number
   - Email ID

2. **Domain Selection**
   - Technical
   - Studio
   - Management
   - Editorial
   - Media

3. **Essay Questions**
   - Why should we recruit you?
   - Leader or team player explanation
   - Conflict resolution scenario

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd matrix-recruitment-portal
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=<your_database_credential>
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas cloud database

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend React app on http://localhost:3000

### Individual Commands

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
matrix-recruitment-portal/
├── backend/
│   ├── controllers/
│   │   └── applicationController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   └── RecruitmentForm.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   └── SuccessPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json
└── README.md
```

## 🎨 Design Features

- **Color Palette**: Red (#e10600), Black, White
- **Typography**: Inter font family
- **Effects**: Glassmorphism, gradients, glowing accents
- **Animations**: Hover effects, transitions, particle background
- **Responsive**: Mobile-first approach

## 🔗 API Endpoints

- `POST /api/apply` - Submit application
- `GET /api/applications` - Get all applications (admin)
- `GET /api/applications/stats` - Get application statistics
- `GET /api/applications/:id` - Get single application
- `DELETE /api/applications/:id` - Delete application

## 🔐 Admin Access

Visit `/admin` to access the admin dashboard for managing applications.

## 🎯 Key Features Implemented

✅ Multi-step form with progress indicator  
✅ Real-time form validation  
✅ Animated particle background  
✅ Custom cursor with hover effects  
✅ Glassmorphism design elements  
✅ Success page with confetti animation  
✅ Admin dashboard with filtering  
✅ Responsive design  
✅ Toast notifications  
✅ Loading states and error handling  

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `backend` folder

### Database
- Use MongoDB Atlas for production
- Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- MATRIX Club for the inspiration
- React and Node.js communities
- TailwindCSS for the utility-first CSS framework
- Framer Motion for smooth animations
