const User = require('../models/User');
const { generateUPIQRCode } = require('../utils/paymentService');

// @desc    Get premium membership details
// @route   GET /api/membership/details
// @access  Private
exports.getMembershipDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      membership: {
        type: user.membership.type,
        startDate: user.membership.startDate,
        endDate: user.membership.endDate,
        isActive: user.hasPremiumAccess(),
        price: process.env.PREMIUM_PRICE,
        durationMonths: process.env.PREMIUM_DURATION_MONTHS
      },
      eligibleForFree: user.isEligibleForFreeMembership()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate payment QR code
// @route   GET /api/membership/payment-qr
// @access  Private
exports.getPaymentQR = async (req, res) => {
  try {
    const amount = process.env.PREMIUM_PRICE || '199';
    const user = await User.findById(req.user.id);

    const result = await generateUPIQRCode(
      amount,
      `MediaCareers Premium - ${user.email}`
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error generating payment QR code'
      });
    }

    res.json({
      success: true,
      qrCode: result.qrCode,
      amount: amount,
      upiId: process.env.UPI_ID,
      instructions: 'Scan this QR code with any UPI app to complete payment. After payment, please submit your transaction ID.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Confirm payment and activate membership
// @route   POST /api/membership/confirm-payment
// @access  Private
exports.confirmPayment = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID is required'
      });
    }

    const user = await User.findById(req.user.id);

    // In production, verify payment with payment gateway
    // For now, we'll accept any transaction ID and activate membership

    user.membership = {
      type: 'premium',
      startDate: Date.now(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      paymentDetails: {
        transactionId,
        amount: amount || process.env.PREMIUM_PRICE,
        date: Date.now(),
        method: 'UPI'
      }
    };

    await user.save();

    res.json({
      success: true,
      message: 'Premium membership activated successfully!',
      membership: {
        type: user.membership.type,
        startDate: user.membership.startDate,
        endDate: user.membership.endDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Claim free membership (for experienced professionals)
// @route   POST /api/membership/claim-free
// @access  Private
exports.claimFreeMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isEligibleForFreeMembership()) {
      return res.status(400).json({
        success: false,
        message: 'You need at least 1 year of experience to claim free membership'
      });
    }

    if (user.membership.type === 'premium' && user.hasPremiumAccess()) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active premium membership'
      });
    }

    user.membership = {
      type: 'premium',
      startDate: Date.now(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      paymentDetails: {
        transactionId: 'FREE_MEMBERSHIP',
        amount: 0,
        date: Date.now(),
        method: 'Experience-based Free Membership'
      }
    };

    await user.save();

    res.json({
      success: true,
      message: 'Congratulations! Free premium membership activated for 3 months.',
      membership: {
        type: user.membership.type,
        startDate: user.membership.startDate,
        endDate: user.membership.endDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
