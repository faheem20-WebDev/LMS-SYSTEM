const db = require('../config/db');

const migrate = async () => {
  try {
    await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS enrollment_no VARCHAR(50) UNIQUE;`);
    console.log('Migration success: Added enrollment_no to users');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

migrate();
