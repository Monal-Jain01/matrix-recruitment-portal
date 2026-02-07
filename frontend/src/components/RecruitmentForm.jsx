import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios base URL - empty string for same domain (Vercel rewrites handle /api routes)
axios.defaults.baseURL = '';

const RecruitmentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    fullName: '',
    semester: '',
    branch: '',
    phone: '',
    email: '',
    domain: '',
    submissionLink: '',
    additionalLinks: [''], // Array for multiple links
    whyRecruit: '',
    leaderOrTeamPlayer: '',
    conflictHandling: ''
  });

  const [errors, setErrors] = useState({});

  const branches = ['CSE', 'IT', 'AI & DS', 'MT','ECE','EEE', 'MECH', 'CIVIL', 'IP'];
  const domains = ['Students Technical Council', 'Matrix Studio', 'Management', 'Students Editorial Council', 'Social Media'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAdditionalLinkChange = (index, value) => {
    const newLinks = [...formData.additionalLinks];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalLinks: newLinks
    }));
  };

  const addAdditionalLink = () => {
    if (formData.additionalLinks.length < 5) { // Limit to 5 additional links
      setFormData(prev => ({
        ...prev,
        additionalLinks: [...prev.additionalLinks, '']
      }));
    }
  };

  const removeAdditionalLink = (index) => {
    if (formData.additionalLinks.length > 1) {
      const newLinks = formData.additionalLinks.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        additionalLinks: newLinks
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.semester) newErrors.semester = 'Semester is required';
      if (!formData.branch) newErrors.branch = 'Branch is required';
      if (!formData.phone.match(/^[6-9]\d{9}$/)) newErrors.phone = 'Enter valid 10-digit phone number';
      if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) newErrors.email = 'Enter valid email';
    }

    if (step === 2) {
      if (!formData.domain) newErrors.domain = 'Please select a domain';
      // Main submission link is now optional - at least one link should be provided
      const hasAnyLink = formData.submissionLink.trim() || formData.additionalLinks.some(link => link.trim());
      if (!hasAnyLink) {
        newErrors.submissionLink = 'Please provide at least one link';
      }
    }

    if (step === 3) {
      if (formData.whyRecruit.length < 50) newErrors.whyRecruit = 'Please provide at least 50 characters';
      if (formData.leaderOrTeamPlayer.length < 30) newErrors.leaderOrTeamPlayer = 'Please provide at least 30 characters';
      if (formData.conflictHandling.length < 30) newErrors.conflictHandling = 'Please provide at least 30 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setLoading(true);
    
    try {
      // Combine main submission link with additional links (filter out empty strings)
      const allLinks = [formData.submissionLink, ...formData.additionalLinks]
        .filter(link => link && link.trim())
        .map(link => link.trim());
      
      // Prepare data with correct types
      const submissionData = {
        fullName: formData.fullName.trim(),
        semester: parseInt(formData.semester), // Ensure it's a number
        branch: formData.branch,
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        domain: formData.domain,
        submissionLink: allLinks.join(', '), // Join all links with comma separator
        whyRecruit: formData.whyRecruit.trim(),
        leaderOrTeamPlayer: formData.leaderOrTeamPlayer.trim(),
        conflictHandling: formData.conflictHandling.trim()
      };
      
      console.log('Submitting application data:', submissionData);
      
      const response = await axios.post('/api/apply', submissionData);
      
      if (response.data.success) {
        toast.success('Application submitted successfully! 🎉');
        navigate('/success', { 
          state: { 
            name: formData.fullName,
            domain: formData.domain 
          }
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          const fieldName = err.field || err.param || err.path;
          serverErrors[fieldName] = err.message || err.msg;
          console.log(`Validation error for ${fieldName}:`, err.message || err.msg);
        });
        setErrors(serverErrors);
        toast.error('Please fix the validation errors');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-red rounded-2xl p-8 shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-matrix-red">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-matrix-red to-red-400 bg-clip-text text-transparent">
                Basic Information
              </h3>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Semester *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select Semester</option>
                    {[1,2,3,4].map(sem => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                  {errors.semester && <p className="text-red-400 text-sm mt-1">{errors.semester}</p>}
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Branch *</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                  {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch}</p>}
                </div>
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                  placeholder="Enter 10-digit phone number"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">Email ID *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 2: Domain Selection */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-matrix-red to-red-400 bg-clip-text text-transparent">
                Domain Selection
              </h3>

              <div className="form-field">
                <label className="block text-sm font-medium mb-4">Which domain do you want to join? *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domains.map(domain => (
                    <motion.label
                      key={domain}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.domain === domain
                          ? 'border-matrix-red bg-matrix-red/10'
                          : 'border-gray-600 hover:border-matrix-red/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="domain"
                        value={domain}
                        checked={formData.domain === domain}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.domain === domain
                          ? 'border-matrix-red bg-matrix-red'
                          : 'border-gray-400'
                      }`}>
                        {formData.domain === domain && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <span className="font-medium">{domain}</span>
                    </motion.label>
                  ))}
                </div>
                {errors.domain && <p className="text-red-400 text-sm mt-1">{errors.domain}</p>}
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">
                  Portfolio/LinkedIn/GitHub/Drive Links (At least one required)
                </label>
                <div className="space-y-3">
                  {/* Main submission link */}
                  <div className="relative">
                    <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      name="submissionLink"
                      value={formData.submissionLink}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                      placeholder="https://your-portfolio-link.com (optional)"
                    />
                  </div>
                  
                  {/* Additional links */}
                  {formData.additionalLinks.map((link, index) => (
                    <div key={index} className="relative flex gap-2">
                      <div className="flex-1 relative">
                        <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => handleAdditionalLinkChange(index, e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300"
                          placeholder={`Additional link ${index + 1} (optional)`}
                        />
                      </div>
                      {formData.additionalLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAdditionalLink(index)}
                          className="px-3 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {/* Add more links button */}
                  {formData.additionalLinks.length < 5 && (
                    <button
                      type="button"
                      onClick={addAdditionalLink}
                      className="flex items-center gap-2 px-4 py-2 bg-matrix-red/20 hover:bg-matrix-red/30 border border-matrix-red/50 rounded-lg transition-colors text-matrix-red"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Link
                    </button>
                  )}
                  
                  <p className="text-sm text-gray-400">
                    Add your portfolio, GitHub repositories, project demos, or any relevant links
                  </p>
                </div>
                {errors.submissionLink && <p className="text-red-400 text-sm mt-1">{errors.submissionLink}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 3: Essay Questions */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-matrix-red to-red-400 bg-clip-text text-transparent">
                Tell Us About Yourself
              </h3>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">
                  Why should we recruit you over other applicants? * (Min 50 characters)
                </label>
                <textarea
                  name="whyRecruit"
                  value={formData.whyRecruit}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Share what makes you unique and valuable to MATRIX..."
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className={formData.whyRecruit.length < 50 ? 'text-red-400' : 'text-green-400'}>
                    {formData.whyRecruit.length}/1000 characters
                  </span>
                </div>
                {errors.whyRecruit && <p className="text-red-400 text-sm mt-1">{errors.whyRecruit}</p>}
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">
                  Do you see yourself more as a leader or a team player? Explain. * (Min 30 characters)
                </label>
                <textarea
                  name="leaderOrTeamPlayer"
                  value={formData.leaderOrTeamPlayer}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Describe your leadership style or team collaboration approach..."
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className={formData.leaderOrTeamPlayer.length < 30 ? 'text-red-400' : 'text-green-400'}>
                    {formData.leaderOrTeamPlayer.length}/800 characters
                  </span>
                </div>
                {errors.leaderOrTeamPlayer && <p className="text-red-400 text-sm mt-1">{errors.leaderOrTeamPlayer}</p>}
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium mb-2">
                  If two teammates are fighting and work is getting delayed, how would you handle it? * (Min 30 characters)
                </label>
                <textarea
                  name="conflictHandling"
                  value={formData.conflictHandling}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-matrix-red focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Describe your approach to conflict resolution..."
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className={formData.conflictHandling.length < 30 ? 'text-red-400' : 'text-green-400'}>
                    {formData.conflictHandling.length}/800 characters
                  </span>
                </div>
                {errors.conflictHandling && <p className="text-red-400 text-sm mt-1">{errors.conflictHandling}</p>}
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300"
              >
                Previous
              </motion.button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto px-6 py-3 bg-matrix-red hover:bg-matrix-red-dark rounded-lg font-medium transition-all duration-300 btn-glow"
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-matrix-red to-red-600 hover:from-matrix-red-dark hover:to-red-700 rounded-lg font-medium transition-all duration-300 btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default RecruitmentForm;