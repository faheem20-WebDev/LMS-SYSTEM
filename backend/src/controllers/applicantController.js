const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new Applicant
exports.registerApplicant = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, 'applicant', $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, phone]
    );

    const payload = {
      user: {
        id: newUser.rows[0].id,
        role: 'applicant'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: newUser.rows[0] });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get All Active Programs for Admission
exports.getPrograms = async (req, res) => {
  try {
    const programs = await db.query('SELECT * FROM programs WHERE is_active = true ORDER BY name');
    res.json(programs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Submit Detailed Application
exports.submitApplication = async (req, res) => {
  const { program_id, personal_info, contact_info, guardian_info, education_info } = req.body;
  const applicant_id = req.user.id;

  try {
    // Check if already applied to this program
    const existing = await db.query(
      'SELECT * FROM applications WHERE applicant_id = $1 AND program_id = $2',
      [applicant_id, program_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ msg: 'You have already applied to this program' });
    }

    const newApp = await db.query(
      `INSERT INTO applications 
      (applicant_id, program_id, personal_info, contact_info, guardian_info, education_info, status, submitted_at) 
      VALUES ($1, $2, $3, $4, $5, $6, 'submitted', CURRENT_TIMESTAMP) 
      RETURNING *`,
      [applicant_id, program_id, personal_info, contact_info, guardian_info, education_info]
    );

    res.json(newApp.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get My Applications (For Dashboard)
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await db.query(`
      SELECT a.id, a.status, a.submitted_at, p.name as program_name, p.code
      FROM applications a
      JOIN programs p ON a.program_id = p.id
      WHERE a.applicant_id = $1
      ORDER BY a.submitted_at DESC
    `, [req.user.id]);
    
    res.json(apps.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
