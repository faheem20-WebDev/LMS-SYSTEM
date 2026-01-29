const express = require('express');
const router = express.Router();
const { 
  createAssignment, 
  submitAssignment, 
  getSubmissions, 
  getMyAssignments 
} = require('../controllers/assignmentController');
const { auth, authorize } = require('../middleware/auth');

router.get('/my', auth, getMyAssignments);
router.post('/submit', auth, submitAssignment);

// Teacher routes
router.post('/create', auth, authorize('teacher'), createAssignment);
router.get('/submissions/:assignment_id', auth, authorize('teacher'), getSubmissions);

module.exports = router;
