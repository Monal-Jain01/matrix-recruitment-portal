import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Users, Lightbulb, Target, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import RecruitmentForm from '../components/RecruitmentForm';

const LandingPage = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const clubFeatures = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Technical Excellence",
      description: "Master cutting-edge technologies and build innovative solutions that make a real impact."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Culture",
      description: "Work with passionate peers, learn from each other, and grow together as a team."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Hub",
      description: "Turn your creative ideas into reality with resources, mentorship, and support."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Leadership Development",
      description: "Develop leadership skills through real projects and meaningful responsibilities."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center animate-glow">
              <img 
                src="/assets/matrixLogo.png" 
                alt="MATRIX Logo" 
                className="w-full h-full object-contain rounded-2xl"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-32 h-32 bg-gradient-to-br from-matrix-red to-red-600 rounded-2xl flex-col items-center justify-center glass-red hidden">
                <span className="text-2xl font-bold text-white">MATRIX</span>
                <span className="text-xs text-gray-300">LOGO</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Join{' '}
            <span className="bg-gradient-to-r from-matrix-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse-red">
              MATRIX
            </span>
            <br />
            <span className="text-3xl md:text-5xl font-light text-gray-300">
              Build. Lead. Innovate.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Where innovation meets ambition. Join the most dynamic tech club on campus and transform your ideas into reality alongside passionate student leaders.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(225, 6, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="group px-12 py-4 bg-gradient-to-r from-matrix-red to-red-600 hover:from-matrix-red-dark hover:to-red-700 rounded-full font-bold text-lg transition-all duration-300 btn-glow flex items-center gap-3 mx-auto"
          >
            Apply Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToForm}
            >
              <ChevronDown className="h-8 w-8 text-matrix-red" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About MATRIX Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose MATRIX?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just another college club. We're a community of innovators, builders, and leaders shaping the future of technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-xl p-6 text-center group hover:glass-red transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-matrix-red to-red-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-matrix-red transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Form Section */}
      <section ref={formRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-matrix-red to-red-400 bg-clip-text text-transparent">
              Ready to Join MATRIX?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Take the first step towards an incredible journey of innovation, learning, and leadership.
            </p>
          </motion.div>

          <RecruitmentForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2024 MATRIX Club. Built with passion for innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;