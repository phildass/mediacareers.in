const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const companies = await Company.find(query)
      .sort({ activeJobs: -1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(query);

    res.json({
      success: true,
      count: companies.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create company (admin only)
// @route   POST /api/companies
// @access  Private/Admin
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update company (admin only)
// @route   PUT /api/companies/:id
// @access  Private/Admin
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
