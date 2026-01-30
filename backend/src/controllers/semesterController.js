const db = require('../config/db');

exports.createSemester = async (req, res) => {
  const { name, start_date, end_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO semesters (name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
      [name, start_date, end_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllSemesters = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM semesters ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.toggleActiveStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // Transaction: Deactivate all first, then activate the selected one
    await db.query('BEGIN');
    await db.query('UPDATE semesters SET is_active = false');
    const result = await db.query(
      'UPDATE semesters SET is_active = true WHERE id = $1 RETURNING *',
      [id]
    );
    await db.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
