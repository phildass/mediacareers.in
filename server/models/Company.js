const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide company name'],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['newspaper', 'magazine', 'online-media', 'tv-channel', 'radio', 'pr-agency', 'corporate', 'production-house', 'digital-agency', 'other'],
    required: true
  },
  description: String,
  website: String,
  logo: String,
  contact: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: 'India'
      },
      pincode: String
    }
  },
  social: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  founded: Number,
  specializations: [String],
  activeJobs: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    overall: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviews: Number
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

// Index for search
companySchema.index({ name: 'text', description: 'text' });
companySchema.index({ type: 1 });

companySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Company', companySchema);
