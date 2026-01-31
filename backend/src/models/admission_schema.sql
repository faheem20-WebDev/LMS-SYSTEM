-- Add 'applicant' to user_role enum
-- Note: Running this might fail if already exists, usually requires a specific DO block in raw SQL, 
-- but for now we assume this is a fresh run or we handle errors gracefully in code.
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'applicant';

CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'merit_list', 'rejected', 'fee_challan_issued', 'admitted');

-- Programs Table (Academic Programs offered)
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., BS Computer Science
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g., BSCS
    duration VARCHAR(50) NOT NULL, -- e.g., 4 Years
    description TEXT,
    eligibility_criteria TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    applicant_id INTEGER REFERENCES users(id),
    program_id INTEGER REFERENCES programs(id),
    status application_status DEFAULT 'draft',
    
    -- Storing detailed form data as JSONB for flexibility
    personal_info JSONB, -- { cnic, dob, blood_group, nationality, religion... }
    contact_info JSONB,  -- { address, city, district, emergency_contact... }
    guardian_info JSONB, -- { father_name, father_cnic, occupation, income... }
    education_info JSONB, -- [ { degree: 'Matric', marks: 850, total: 1100, board: 'FBISE' } ... ]
    
    submitted_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some initial programs
INSERT INTO programs (name, code, duration, description, eligibility_criteria) VALUES 
('BS Computer Science', 'BSCS', '4 Years', 'Study of computers and computational systems.', 'Minimum 50% in Intermediate with Math'),
('BS Software Engineering', 'BSSE', '4 Years', 'Systematic engineering approach to software development.', 'Minimum 50% in Intermediate with Math'),
('Bachelor of Business Admin', 'BBA', '4 Years', 'Business management and administration strategies.', 'Minimum 45% in Intermediate'),
('BS Artificial Intelligence', 'BSAI', '4 Years', 'Advanced study of AI, Machine Learning and Data Science.', 'Minimum 50% in Intermediate with Math')
ON CONFLICT (code) DO NOTHING;
