const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const runSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, '../models/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Connecting to NeonDB...');
    await pool.query(schema);
    console.log('Schema executed successfully. All tables created.');
    
    // Create a default admin user for testing
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
      ['System Admin', 'admin@rsiit.edu.pk', hashedPassword, 'admin']
    );
    console.log('Default admin created: admin@rsiit.edu.pk / admin123');

    process.exit(0);
  } catch (err) {
    console.error('Error executing schema:', err);
    process.exit(1);
  }
};

runSchema();
