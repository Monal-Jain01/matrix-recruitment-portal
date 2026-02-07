const Application = require('../models/Application');
const { validationResult } = require('express-validator');

// Submit application
const submitApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Custom validation: Check if at least one link is provided
    if (!req.body.submissionLink || req.body.submissionLink.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one portfolio/GitHub/Drive link',
        errors: [{ field: 'submissionLink', message: 'At least one link is required' }]
      });
    }

    const applicationData = {
      fullName: req.body.fullName,
      semester: req.body.semester,
      branch: req.body.branch,
      phone: req.body.phone,
      email: req.body.email,
      domain: req.body.domain,
      submissionLink: req.body.submissionLink,
      whyRecruit: req.body.whyRecruit,
      leaderOrTeamPlayer: req.body.leaderOrTeamPlayer,
      conflictHandling: req.body.conflictHandling
    };

    const application = new Application(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        id: application._id,
        fullName: application.fullName,
        domain: application.domain,
        createdAt: application.createdAt
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. You can only submit one application.',
        error: 'DUPLICATE_EMAIL'
      });
    }

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// Get all applications (Admin)
const getAllApplications = async (req, res) => {
  try {
    const { domain, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (domain && domain !== 'all') {
      filter.domain = domain;
    }

    const skip = (page - 1) * limit;
    
    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(filter);

    res.json({
      success: true,
      data: applications,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: applications.length,
        totalApplications: total
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
};

// Get single application
const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
};

// Get application statistics
const getStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: '$domain',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const total = await Application.countDocuments();

    res.json({
      success: true,
      data: {
        total,
        byDomain: stats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getApplication,
  deleteApplication,
  getStats
};