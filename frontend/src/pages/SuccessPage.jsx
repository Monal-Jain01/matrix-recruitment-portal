import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Users, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticleBackground from '../components/ParticleBackground';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, domain } = location.state || { name: 'Applicant', domain: 'MATRIX' };

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#e10600', '#ff1a0d', '#ffffff']
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#e10600', '#ff1a0d', '#ffffff']
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="text-center max-w-2xl mx-auto relative z-10">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Application Submitted!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Congratulations, <span className="text-matrix-red font-semibold">{name}</span>!
          </p>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Your application for the <span className="text-matrix-red font-medium">{domain}</span> domain has been successfully submitted to MATRIX. 
            Our team will review your application and get back to you soon.
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-red rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-matrix-red">What's Next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-matrix-red rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">We'll review your application within 3-5 business days</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-matrix-red rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">Selected candidates will be contacted for an interview</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-matrix-red rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">Keep an eye on your email for updates</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-matrix-red rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">Follow us on social media for club updates</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-matrix-red to-red-600 hover:from-matrix-red-dark hover:to-red-700 rounded-lg font-medium transition-all duration-300 btn-glow flex items-center gap-2 justify-center"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://chat.whatsapp.com/J5arPSuTdU3EFfjwsNoXhf', '_blank')}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 justify-center shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp Group
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.instagram.com/matrix.jec?igsh=Mzg1OXdzeTI3d3Bi', '_blank')}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <Users className="h-5 w-5" />
            Follow MATRIX
          </motion.button>
        </motion.div>

        {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2026 MATRIX Club, Jabalpur Engineering College
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default SuccessPage;