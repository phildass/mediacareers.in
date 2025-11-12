const User = require('../models/User');
const { getCareerAdvice } = require('../utils/aiService');

// @desc    Get AI career advice
// @route   POST /api/career/advice
// @access  Private (Premium)
exports.getAIAdvice = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a question'
      });
    }

    const user = await User.findById(req.user.id);

    // Get AI advice
    const result = await getCareerAdvice(user, question);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error generating career advice'
      });
    }

    // Save to user's career advice history
    user.careerAdvice.push({
      question,
      answer: result.advice,
      askedAt: Date.now(),
      isProfessionalAdvice: false
    });

    await user.save();

    res.json({
      success: true,
      advice: result.advice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Request professional career advice
// @route   POST /api/career/professional-advice
// @access  Private (Premium)
exports.requestProfessionalAdvice = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your question'
      });
    }

    const user = await User.findById(req.user.id);

    // Check if user has already used their free professional advice
    const professionalAdviceCount = user.careerAdvice.filter(
      advice => advice.isProfessionalAdvice
    ).length;

    if (professionalAdviceCount >= 1) {
      return res.status(403).json({
        success: false,
        message: 'You have already used your free professional advice session'
      });
    }

    // In a real implementation, this would:
    // 1. Create a ticket/request
    // 2. Notify a senior professional
    // 3. Schedule a consultation
    
    // For now, we'll save the request
    user.careerAdvice.push({
      question,
      answer: 'Your request has been received. A senior media professional will contact you within 24-48 hours.',
      askedAt: Date.now(),
      isProfessionalAdvice: true
    });

    await user.save();

    res.json({
      success: true,
      message: 'Your request has been submitted. A senior media professional will reach out to you soon.',
      estimatedResponseTime: '24-48 hours'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get career advice history
// @route   GET /api/career/history
// @access  Private
exports.getAdviceHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      history: user.careerAdvice.sort((a, b) => b.askedAt - a.askedAt)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
