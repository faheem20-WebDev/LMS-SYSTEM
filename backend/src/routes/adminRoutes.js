const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { 
  createSemester, 
  getAllSemesters, 
  toggleActiveStatus 
} = require('../controllers/semesterController');
const { 
  createClass, 
  getAllClasses, 
  createCourse, 
  getAllCourses, 
  allocateCourse,
  getAdminStats,
  getApplications,
  updateAppStatus,
  deleteApplication
} = require('../controllers/adminOpsController');

// All routes require Admin role
router.use(auth, authorize('admin'));

// Admission Applications
router.get('/applications', getApplications);
router.put('/applications/:id/status', updateAppStatus);
router.delete('/applications/:id', deleteApplication);

// Dashboard Stats
router.get('/stats', getAdminStats);

// Semester Routes
router.post('/semesters', createSemester);
router.get('/semesters', getAllSemesters);
router.put('/semesters/:id/activate', toggleActiveStatus);

// Class Routes
router.post('/classes', createClass);
router.get('/classes', getAllClasses);

// Course Catalog Routes
router.post('/courses', createCourse);
router.get('/courses', getAllCourses);

// Allocation
router.post('/allocate', allocateCourse);

module.exports = router;
