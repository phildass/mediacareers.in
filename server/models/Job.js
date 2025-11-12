const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  requirements: [String],
  responsibilities: [String],
  category: {
    type: String,
    enum: ['journalism', 'editorial', 'digital-media', 'pr', 'corporate-communications', 'content-creation', 'social-media', 'broadcasting', 'photography', 'video-production', 'other'],
    required: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    default: 'full-time'
  },
  experience: {
    min: Number,
    max: Number,
    required: Boolean
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    negotiable: Boolean
  },
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    },
    remote: Boolean
  },
  skills: [String],
  education: {
    level: String,
    field: String
  },
  benefits: [String],
  applicationEmail: {
    type: String,
    default: 'info@phildass.com'
  },
  applicationUrl: String,
  postedBy: {
    type: String,
    enum: ['admin', 'scraper', 'company'],
    default: 'admin'
  },
  source: {
    url: String,
    scrapedAt: Date
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'filled', 'expired'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  applications: {
    type: Number,
    default: 0
  },
  expiresAt: Date,
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search and filtering
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ category: 1, status: 1 });
jobSchema.index({ 'location.city': 1, status: 1 });
jobSchema.index({ createdAt: -1 });

// Update timestamp on save
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
