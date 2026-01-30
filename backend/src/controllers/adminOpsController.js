const db = require('../config/db');

// --- Classes Management ---
exports.createClass = async (req, res) => {
  const { name, department } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO classes (name, department) VALUES ($1, $2) RETURNING *',
      [name, department]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM classes ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Course Catalog Management ---
exports.createCourse = async (req, res) => {
  const { code, name, description, credit_hours } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO courses (code, name, description, credit_hours) VALUES ($1, $2, $3, $4) RETURNING *',
      [code, name, description, credit_hours]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses ORDER BY code');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Course Allocation (Access) ---
exports.allocateCourse = async (req, res) => {
  const { course_id, class_id, semester_id, teacher_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO course_access (course_id, class_id, semester_id, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, class_id, semester_id, teacher_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// --- Dashboard Stats ---
exports.getAdminStats = async (req, res) => {
  try {
    const students = await db.query("SELECT COUNT(*) FROM users WHERE role = 'student'");
    const teachers = await db.query("SELECT COUNT(*) FROM users WHERE role = 'teacher'");
    const courses = await db.query("SELECT COUNT(*) FROM courses");
    const activeSemester = await db.query("SELECT name FROM semesters WHERE is_active = true");
    const pendingRequests = await db.query("SELECT COUNT(*) FROM enrollments WHERE status = 'requested'");

    res.json({
      students: students.rows[0].count,
      teachers: teachers.rows[0].count,
      courses: courses.rows[0].count,
      activeSemester: activeSemester.rows[0]?.name || 'None',
      pendingRequests: pendingRequests.rows[0].count
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
