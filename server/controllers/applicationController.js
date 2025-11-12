const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Job = require('../models/Job');
const { parseResume, generateTailoredResume, generateCoverLetter } = require('../utils/aiService');
const { sendApplicationConfirmation } = require('../utils/emailService');
const { sanitizeFilePath } = require('../utils/validation');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
}).single('resume');

// @desc    Upload resume
// @route   POST /api/application/upload-resume
// @access  Private
exports.uploadResume = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a resume file'
        });
      }

      // Parse resume with AI
      // Validate file path to prevent path injection
      if (!req.file.path || req.file.path.includes('..')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file path'
        });
      }
      
      const fileBuffer = fs.readFileSync(req.file.path);
      const parseResult = await parseResume(fileBuffer);

      if (!parseResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Error parsing resume'
        });
      }

      // Update user profile with parsed data
      const user = await User.findById(req.user.id);
      
      user.resume = {
        filename: req.file.filename,
        path: req.file.path,
        uploadedAt: Date.now(),
        parsedData: parseResult.data
      };

      // Update profile with parsed data
      if (parseResult.data.name && !user.name) {
        user.name = parseResult.data.name;
      }
      if (parseResult.data.phone && !user.phone) {
        user.phone = parseResult.data.phone;
      }
      
      user.profile = {
        ...user.profile,
        currentRole: parseResult.data.currentRole || user.profile?.currentRole,
        experience: parseResult.data.experience || user.profile?.experience,
        skills: parseResult.data.skills || user.profile?.skills,
        education: parseResult.data.education || user.profile?.education,
        location: parseResult.data.location || user.profile?.location
      };

      // Check if eligible for free membership
      if (user.isEligibleForFreeMembership() && user.membership.type === 'free') {
        user.membership.type = 'premium';
        user.membership.startDate = Date.now();
        user.membership.endDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
      }

      await user.save();

      res.json({
        success: true,
        message: 'Resume uploaded and parsed successfully',
        parsedData: parseResult.data,
        freeMembershipEligible: user.isEligibleForFreeMembership()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });
};

// @desc    Apply for job
// @route   POST /api/application/apply/:jobId
// @access  Private
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { customResume, coverLetter, useAIGeneration } = req.body;

    const user = await User.findById(req.user.id);
    const job = await Job.findById(jobId).populate('company');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if already applied
    const alreadyApplied = user.applications.some(
      app => app.job.toString() === jobId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Check premium membership for unlimited applications
    if (!user.hasPremiumAccess()) {
      return res.status(403).json({
        success: false,
        message: 'Premium membership required. Upgrade to apply for jobs.'
      });
    }

    let finalResume = customResume;
    let finalCoverLetter = coverLetter;

    // Generate AI-powered resume and cover letter if requested
    if (useAIGeneration) {
      if (!finalResume) {
        const resumeResult = await generateTailoredResume(user, {
          title: job.title,
          company: job.company.name,
          description: job.description,
          requirements: job.requirements
        });

        if (resumeResult.success) {
          finalResume = resumeResult.resume;
        }
      }

      if (!finalCoverLetter) {
        const coverLetterResult = await generateCoverLetter(user, {
          title: job.title,
          company: job.company.name,
          description: job.description
        });

        if (coverLetterResult.success) {
          finalCoverLetter = coverLetterResult.coverLetter;
        }
      }
    }

    // Add application to user's applications
    user.applications.push({
      job: jobId,
      appliedAt: Date.now(),
      status: 'pending',
      customResume: finalResume,
      coverLetter: finalCoverLetter
    });

    await user.save();

    // Increment job applications count
    job.applications += 1;
    await job.save();

    // Send confirmation email
    await sendApplicationConfirmation(
      user.email,
      user.name,
      job.title,
      job.company.name
    );

    res.json({
      success: true,
      message: 'Application submitted successfully',
      application: {
        job: job.title,
        company: job.company.name,
        appliedAt: Date.now()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user applications
// @route   GET /api/application/my-applications
// @access  Private
exports.getMyApplications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'applications.job',
        populate: {
          path: 'company',
          select: 'name logo type'
        }
      });

    res.json({
      success: true,
      applications: user.applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Save/bookmark job
// @route   POST /api/application/save/:jobId
// @access  Private
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);

    if (user.savedJobs.includes(jobId)) {
      // Remove from saved jobs
      user.savedJobs = user.savedJobs.filter(
        id => id.toString() !== jobId
      );
      await user.save();

      return res.json({
        success: true,
        message: 'Job removed from saved jobs',
        saved: false
      });
    }

    // Add to saved jobs
    user.savedJobs.push(jobId);
    await user.save();

    res.json({
      success: true,
      message: 'Job saved successfully',
      saved: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get saved jobs
// @route   GET /api/application/saved-jobs
// @access  Private
exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedJobs',
        populate: {
          path: 'company',
          select: 'name logo type'
        }
      });

    res.json({
      success: true,
      savedJobs: user.savedJobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
