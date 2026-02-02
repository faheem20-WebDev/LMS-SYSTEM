const db = require('../config/db');

const migrate = async () => {
  try {
    await db.query(`ALTER TABLE applications ADD COLUMN IF NOT EXISTS profile_image TEXT;`);
    await db.query(`ALTER TABLE applications ADD COLUMN IF NOT EXISTS voucher_image TEXT;`);
    console.log('Migration success: Added image columns');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

migrate();
