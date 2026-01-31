const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { 
  registerApplicant, 
  getPrograms, 
  submitApplication, 
  getMyApplications 
} = require('../controllers/applicantController');

// Public routes
router.post('/register', registerApplicant);
router.get('/programs', getPrograms); // Can be public to view catalog

// Protected routes (Applicant only)
router.use(auth, authorize('applicant'));
router.post('/apply', submitApplication);
router.get('/my-applications', getMyApplications);

module.exports = router;
