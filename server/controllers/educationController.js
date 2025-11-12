const EducationInstitution = require('../models/EducationInstitution');

// @desc    Get all education institutions
// @route   GET /api/education
// @access  Public
exports.getInstitutions = async (req, res) => {
  try {
    const { type, city, state, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (type) query.type = type;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const institutions = await EducationInstitution.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await EducationInstitution.countDocuments(query);

    res.json({
      success: true,
      count: institutions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
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
