const mongoose = require('mongoose');

const educationInstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide institution name'],
    trim: true
  },
  type: {
    type: String,
    enum: ['university', 'college', 'institute', 'academy', 'school'],
    required: true
  },
  programs: [{
    name: String,
    degree: {
      type: String,
      enum: ['diploma', 'bachelors', 'masters', 'phd', 'certificate', 'short-course']
    },
    duration: String,
    specialization: [String],
    fees: {
      amount: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    eligibility: String
  }],
  location: {
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  contact: {
    email: String,
    phone: String,
    website: String,
    address: String
  },
  accreditation: [String],
  established: Number,
  description: String,
  facilities: [String],
  placements: {
    hasPlacement: Boolean,
    averagePackage: Number,
    topRecruiters: [String]
  },
  rankings: [{
    by: String,
    rank: Number,
    year: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

educationInstitutionSchema.index({ name: 'text', description: 'text' });
educationInstitutionSchema.index({ 'location.city': 1, 'location.state': 1 });

educationInstitutionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EducationInstitution', educationInstitutionSchema);
