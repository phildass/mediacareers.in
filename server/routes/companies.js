const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany
} = require('../controllers/companyController');
const { protect } = require('../middleware/auth');

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', protect, createCompany); // Should add adminOnly middleware in production
router.put('/:id', protect, updateCompany); // Should add adminOnly middleware in production

module.exports = router;
