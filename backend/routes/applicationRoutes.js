const express = require('express');
const { body } = require('express-validator');
const {
  submitApplication,
  getAllApplications,
  getApplication,
  deleteApplication,
  getStats
} = require('../controllers/applicationController');

const router = express.Router();

// Validation middleware
const validateApplication = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  
  body('semester')
    .isInt({ min: 1, max: 4 })
    .withMessage('Semester must be between 1 and 4'),
  
  body('branch')
    .isIn(['CSE', 'IT', 'ECE', 'MECH', 'CIVIL', 'EEE', 'CHEM', 'BIOTECH', 'OTHER'])
    .withMessage('Please select a valid branch'),
  
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please enter a valid 10-digit phone number'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('domain')
    .isIn(['Technical', 'Design', 'Management', 'Content', 'Media'])
    .withMessage('Please select a valid domain'),
  
  body('submissionLink')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .withMessage('Submission link cannot be empty if provided'),
  
  body('whyRecruit')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Response must be between 50 and 1000 characters'),
  
  body('leaderOrTeamPlayer')
    .trim()
    .isLength({ min: 30, max: 800 })
    .withMessage('Response must be between 30 and 800 characters'),
  
  body('conflictHandling')
    .trim()
    .isLength({ min: 30, max: 800 })
    .withMessage('Response must be between 30 and 800 characters')
];

// Routes
router.post('/apply', validateApplication, submitApplication);
router.get('/applications', getAllApplications);
router.get('/applications/stats', getStats);
router.get('/applications/:id', getApplication);
router.delete('/applications/:id', deleteApplication);

module.exports = router;