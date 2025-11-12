const express = require('express');
const router = express.Router();
const {
  uploadResume,
  applyForJob,
  getMyApplications,
  saveJob,
  getSavedJobs
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

router.post('/upload-resume', protect, uploadResume);
router.post('/apply/:jobId', protect, applyForJob);
router.get('/my-applications', protect, getMyApplications);
router.post('/save/:jobId', protect, saveJob);
router.get('/saved-jobs', protect, getSavedJobs);

module.exports = router;
