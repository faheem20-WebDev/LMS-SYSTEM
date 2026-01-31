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

const runMigration = async () => {
  try {
    console.log('Connecting to NeonDB for Admissions Migration...');
    const schemaPath = path.join(__dirname, '../models/admission_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    console.log('Admissions Schema & Seed Data executed successfully.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  }
};

runMigration();
