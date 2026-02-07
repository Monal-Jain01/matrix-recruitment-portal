const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: [1, 'Semester must be between 1 and 4'],
    max: [4, 'Semester must be between 1 and 4']
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['CSE', 'IT', 'AI & DS', 'MT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IP']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  domain: {
    type: String,
    required: [true, 'Domain selection is required'],
    enum: ['Students Technical Council', 'Matrix Studio', 'Management', 'Students Editorial Council', 'Social Media']
  },
  submissionLink: {
    type: String,
    required: false, // Made optional - at least one link should be provided
    trim: true,
    maxlength: [2000, 'Submission links cannot exceed 2000 characters']
  },
  whyRecruit: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [50, 'Please provide at least 50 characters'],
    maxlength: [1000, 'Response cannot exceed 1000 characters']
  },
  leaderOrTeamPlayer: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [30, 'Please provide at least 30 characters'],
    maxlength: [800, 'Response cannot exceed 800 characters']
  },
  conflictHandling: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [30, 'Please provide at least 30 characters'],
    maxlength: [800, 'Response cannot exceed 800 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

applicationSchema.index({ domain: 1, createdAt: -1 });
applicationSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);