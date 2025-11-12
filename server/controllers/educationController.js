const EducationInstitution = require('../models/EducationInstitution');
const { sanitizeSearchQuery, sanitizePagination } = require('../utils/validation');

// @desc    Get all education institutions
// @route   GET /api/education
// @access  Public
exports.getInstitutions = async (req, res) => {
  try {
    const { type, city, state, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (city) {
      const sanitizedCity = sanitizeSearchQuery(city);
      query['location.city'] = new RegExp(sanitizedCity, 'i');
    }
    if (state) {
      const sanitizedState = sanitizeSearchQuery(state);
      query['location.state'] = new RegExp(sanitizedState, 'i');
    }
    if (search) {
      const sanitizedSearch = sanitizeSearchQuery(search);
      query.$text = { $search: sanitizedSearch };
    }

    const pagination = sanitizePagination(page, limit);

    const institutions = await EducationInstitution.find(query)
      .sort({ name: 1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await EducationInstitution.countDocuments(query);

    res.json({
      success: true,
      count: institutions.length,
      total,
      page: pagination.page,
      pages: Math.ceil(total / pagination.limit),
      institutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single institution
// @route   GET /api/education/:id
// @access  Public
exports.getInstitution = async (req, res) => {
  try {
    const institution = await EducationInstitution.findById(req.params.id);

    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution not found'
      });
    }

    res.json({
      success: true,
      institution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create institution (admin only)
// @route   POST /api/education
// @access  Private/Admin
exports.createInstitution = async (req, res) => {
  try {
    const institution = await EducationInstitution.create(req.body);

    res.status(201).json({
      success: true,
      institution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update institution (admin only)
// @route   PUT /api/education/:id
// @access  Private/Admin
exports.updateInstitution = async (req, res) => {
  try {
    const institution = await EducationInstitution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Institution not found'
      });
    }

    res.json({
      success: true,
      institution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
