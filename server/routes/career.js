const express = require('express');
const router = express.Router();
const {
  getAIAdvice,
  requestProfessionalAdvice,
  getAdviceHistory
} = require('../controllers/careerController');
const { protect, premiumOnly } = require('../middleware/auth');

router.post('/advice', protect, premiumOnly, getAIAdvice);
router.post('/professional-advice', protect, premiumOnly, requestProfessionalAdvice);
router.get('/history', protect, getAdviceHistory);

module.exports = router;
