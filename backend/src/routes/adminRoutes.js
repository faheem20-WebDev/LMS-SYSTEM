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
  getAdminStats
} = require('../controllers/adminOpsController');

// All routes require Admin role
router.use(auth, authorize('admin'));

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
