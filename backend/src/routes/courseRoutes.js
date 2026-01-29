const express = require('express');
const router = express.Router();
const { 
  getAvailableCourses, 
  requestRegistration, 
  getEnrollmentRequests, 
  updateEnrollmentStatus 
} = require('../controllers/courseController');
const { auth, authorize } = require('../middleware/auth');

router.get('/available', auth, getAvailableCourses);
router.post('/register', auth, requestRegistration);

// Admin only routes
router.get('/requests', auth, authorize('admin'), getEnrollmentRequests);
router.put('/request-status', auth, authorize('admin'), updateEnrollmentStatus);

module.exports = router;
