const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password, role, phone, department } = req.body;

  try {
    let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (name, email, password, role, phone, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role',
      [name, email, hashedPassword, role, phone, department]
    );

    const payload = {
      user: {
        id: newUser.rows[0].id,
        role: newUser.rows[0].role
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.rows[0].id,
        role: user.rows[0].role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          user: {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            role: user.rows[0].role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await db.query('SELECT id, name, email, role, phone, department FROM users WHERE id = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
