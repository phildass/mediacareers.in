const Job = require('../models/Job');
const Company = require('../models/Company');
const User = require('../models/User');
const { matchJobs, assessJobFit } = require('../utils/aiService');
const { sanitizeSearchQuery, sanitizePagination } = require('../utils/validation');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { 
      category, 
      location, 
      type, 
      experience, 
      search,
      page = 1,
      limit = 20
    } = req.query;

    const query = { status: 'active' };

    // Apply filters
    if (category) query.category = category;
    if (type) query.type = type;
    if (location) {
      // Sanitize location to prevent regex injection
      const sanitizedLocation = sanitizeSearchQuery(location);
      query['location.city'] = new RegExp(sanitizedLocation, 'i');
    }
    if (experience) {
      query['experience.min'] = { $lte: parseInt(experience) };
    }
    if (search) {
      // Sanitize search query
      const sanitizedSearch = sanitizeSearchQuery(search);
      query.$text = { $search: sanitizedSearch };
    }

    const pagination = sanitizePagination(page, limit);

    const jobs = await Job.find(query)
      .populate('company', 'name type logo website')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      count: jobs.length,
      total,
      page: pagination.page,
      pages: Math.ceil(total / pagination.limit),
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get AI-powered job recommendations
// @route   GET /api/jobs/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Get active jobs
    const jobs = await Job.find({ status: 'active' })
      .populate('company', 'name type')
      .limit(50);

    if (jobs.length === 0) {
      return res.json({
        success: true,
        recommendations: []
      });
    }

    // Use AI to match jobs
    const result = await matchJobs(user.profile, jobs);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error generating recommendations'
      });
    }

    // Get matched jobs with scores
    const recommendations = result.matches.map(match => {
      const job = jobs.find(j => j._id.toString() === match.jobId);
      return {
        job,
        score: match.score,
        reason: match.reason
      };
    }).filter(r => r.job);

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get job fit assessment
// @route   GET /api/jobs/:id/fit
// @access  Private
exports.getJobFit = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const job = await Job.findById(req.params.id).populate('company');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const result = await assessJobFit(user, job);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error assessing job fit'
      });
    }

    res.json({
      success: true,
      assessment: result.assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create job (admin only)
// @route   POST /api/jobs
// @access  Private/Admin
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    // Update company active jobs count
    await Company.findByIdAndUpdate(job.company, {
      $inc: { activeJobs: 1 }
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update job (admin only)
// @route   PUT /api/jobs/:id
// @access  Private/Admin
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete job (admin only)
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Update company active jobs count
    await Company.findByIdAndUpdate(job.company, {
      $inc: { activeJobs: -1 }
    });

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
