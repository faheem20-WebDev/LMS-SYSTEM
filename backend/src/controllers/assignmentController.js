const db = require('../config/db');

// Teacher: Create Assignment
exports.createAssignment = async (req, res) => {
  const { course_access_id, title, description, due_date } = req.body;

  try {
    const newAssignment = await db.query(
      'INSERT INTO assignments (course_access_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_access_id, title, description, due_date]
    );
    res.json(newAssignment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Student: Submit Assignment
exports.submitAssignment = async (req, res) => {
  const { assignment_id, file_url, submission_text } = req.body;

  try {
    // Use CURRENT_TIMESTAMP for realtime tracking
    const submission = await db.query(
      'INSERT INTO submissions (assignment_id, student_id, file_url, submission_text, submitted_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
      [assignment_id, req.user.id, file_url, submission_text]
    );
    res.json(submission.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Teacher: View Submissions for an assignment
exports.getSubmissions = async (req, res) => {
  const { assignment_id } = req.params;

  try {
    const submissions = await db.query(`
      SELECT s.*, u.name as student_name, u.email as student_email
      FROM submissions s
      JOIN users u ON s.student_id = u.id
      WHERE s.assignment_id = $1
      ORDER BY s.submitted_at DESC
    `, [assignment_id]);
    res.json(submissions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Student: Get assignments for their courses
exports.getMyAssignments = async (req, res) => {
  try {
    const assignments = await db.query(`
      SELECT a.*, c.name as course_name,
             (SELECT s.submitted_at FROM submissions s WHERE s.assignment_id = a.id AND s.student_id = $1) as submitted_at
      FROM assignments a
      JOIN course_access ca ON a.course_access_id = ca.id
      JOIN courses c ON ca.course_id = c.id
      JOIN enrollments e ON e.course_access_id = ca.id
      WHERE e.student_id = $1 AND e.status = 'enrolled'
    `, [req.user.id]);
    res.json(assignments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
