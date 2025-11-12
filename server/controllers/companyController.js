const Company = require('../models/Company');
const { sanitizeSearchQuery, sanitizePagination } = require('../utils/validation');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (search) {
      const sanitizedSearch = sanitizeSearchQuery(search);
      query.$text = { $search: sanitizedSearch };
    }

    const pagination = sanitizePagination(page, limit);

    const companies = await Company.find(query)
      .sort({ activeJobs: -1, name: 1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Company.countDocuments(query);

    res.json({
      success: true,
      count: companies.length,
      total,
      page: pagination.page,
      pages: Math.ceil(total / pagination.limit),
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
