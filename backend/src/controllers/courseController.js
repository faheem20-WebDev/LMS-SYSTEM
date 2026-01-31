const db = require('../config/db');

// Get available courses for student
exports.getAvailableCourses = async (req, res) => {
  try {
    // 1. Get student's class and current active semester
    const student = await db.query('SELECT department FROM users WHERE id = $1', [req.user.id]);
    const activeSemester = await db.query('SELECT id FROM semesters WHERE is_active = true LIMIT 1');
    
    if (activeSemester.rows.length === 0) {
      return res.status(404).json({ msg: 'No active semester found' });
    }

    // 2. Get courses available for this class/semester
    // Note: In a real app, students belong to a class. For now, we'll filter by department.
    const courses = await db.query(`
      SELECT ca.id as course_access_id, c.name, c.code, c.credit_hours, u.name as teacher_name
      FROM course_access ca
      JOIN courses c ON ca.course_id = c.id
      JOIN users u ON ca.teacher_id = u.id
      WHERE ca.semester_id = $1
    `, [activeSemester.rows[0].id]);

    res.json(courses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Request Course Registration
exports.requestRegistration = async (req, res) => {
  const { course_access_ids } = req.body; // Array of course_access_id

  try {
    const activeSemester = await db.query('SELECT id FROM semesters WHERE is_active = true LIMIT 1');
    const semester_id = activeSemester.rows[0].id;

    const enrollmentPromises = course_access_ids.map(ca_id => {
      return db.query(
        'INSERT INTO enrollments (student_id, course_access_id, semester_id, status) VALUES ($1, $2, $3, $4)',
        [req.user.id, ca_id, semester_id, 'requested']
      );
    });

    await Promise.all(enrollmentPromises);
    res.json({ msg: 'Registration request submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Get all enrollment requests
exports.getEnrollmentRequests = async (req, res) => {
  try {
    const requests = await db.query(`
      SELECT e.id, u.name as student_name, c.name as course_name, e.status, e.requested_at
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      JOIN course_access ca ON e.course_access_id = ca.id
      JOIN courses c ON ca.course_id = c.id
      WHERE e.status = 'requested'
    `);
    res.json(requests.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Approve/Deny Enrollment
exports.updateEnrollmentStatus = async (req, res) => {
  const { enrollment_id, status } = req.body; // 'approved' or 'denied'

  try {
    await db.query(
      'UPDATE enrollments SET status = $1, approved_at = $2 WHERE id = $3',
      [status, status === 'approved' ? new Date() : null, enrollment_id]
    );

    // If all courses for a student in a semester are approved, generate voucher (simplified logic)
    // In a full app, this would be a more complex check.
    
    res.json({ msg: `Enrollment ${status}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Delete Enrollment Request
exports.deleteEnrollmentRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM enrollments WHERE id = $1', [id]);
    res.json({ msg: 'Enrollment request deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};