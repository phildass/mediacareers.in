const express = require('express');
const router = express.Router();
const {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution
} = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

router.get('/', getInstitutions);
router.get('/:id', getInstitution);
router.post('/', protect, createInstitution); // Should add adminOnly middleware in production
router.put('/:id', protect, updateInstitution); // Should add adminOnly middleware in production

module.exports = router;
