const express = require('express');
const router = express.Router();
const {
  getMembershipDetails,
  getPaymentQR,
  confirmPayment,
  claimFreeMembership
} = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');

router.get('/details', protect, getMembershipDetails);
router.get('/payment-qr', protect, getPaymentQR);
router.post('/confirm-payment', protect, confirmPayment);
router.post('/claim-free', protect, claimFreeMembership);

module.exports = router;
