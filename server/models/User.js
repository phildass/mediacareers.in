const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  phone: {
    type: String,
    required: false
  },
  profile: {
    currentRole: String,
    experience: {
      years: Number,
      months: Number
    },
    skills: [String],
    education: String,
    location: String,
    preferredLocations: [String],
    preferredRoles: [String],
    salary: {
      current: Number,
      expected: Number
    },
    portfolio: String,
    linkedin: String,
    twitter: String
  },
  resume: {
    filename: String,
    path: String,
    uploadedAt: Date,
    parsedData: mongoose.Schema.Types.Mixed
  },
  membership: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    paymentDetails: {
      transactionId: String,
      amount: Number,
      date: Date,
      method: String
    }
  },
  applications: [{
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    appliedAt: Date,
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending'
    },
    customResume: String,
    coverLetter: String
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  careerAdvice: [{
    question: String,
    answer: String,
    askedAt: Date,
    isProfessionalAdvice: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check if user is eligible for free membership
userSchema.methods.isEligibleForFreeMembership = function() {
  if (this.profile && this.profile.experience) {
    const totalMonths = (this.profile.experience.years || 0) * 12 + (this.profile.experience.months || 0);
    return totalMonths >= 12; // At least 1 year experience
  }
  return false;
};

// Method to check if premium membership is active
userSchema.methods.hasPremiumAccess = function() {
  if (this.membership.type === 'premium' && this.membership.endDate) {
    return new Date() < this.membership.endDate;
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);
