import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import SuccessPage from './pages/SuccessPage';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid #e10600',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#e10600',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e10600',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;