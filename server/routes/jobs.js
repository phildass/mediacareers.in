const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJob,
  getRecommendations,
  getJobFit,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect, premiumOnly } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/recommendations', protect, premiumOnly, getRecommendations);
router.get('/:id', getJob);
router.get('/:id/fit', protect, premiumOnly, getJobFit);
router.post('/', protect, createJob); // Should add adminOnly middleware in production
router.put('/:id', protect, updateJob); // Should add adminOnly middleware in production
router.delete('/:id', protect, deleteJob); // Should add adminOnly middleware in production

module.exports = router;
