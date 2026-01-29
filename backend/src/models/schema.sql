-- SQL Schema for RSIIT LMS

CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
CREATE TYPE enrollment_status AS ENUM ('requested', 'approved', 'denied', 'paid', 'enrolled');
CREATE TYPE voucher_status AS ENUM ('pending', 'paid', 'expired');

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Semesters Table
CREATE TABLE semesters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., Fall 2025
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false
);

-- Classes Table (e.g., BSCS-1, BSCS-2)
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    credit_hours INTEGER NOT NULL
);

-- Course Access (Courses available for a class in a semester)
CREATE TABLE course_access (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    class_id INTEGER REFERENCES classes(id),
    semester_id INTEGER REFERENCES semesters(id),
    teacher_id INTEGER REFERENCES users(id)
);

-- Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id),
    course_access_id INTEGER REFERENCES course_access(id),
    semester_id INTEGER REFERENCES semesters(id),
    status enrollment_status DEFAULT 'requested',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP
);

-- Vouchers Table
CREATE TABLE vouchers (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id),
    semester_id INTEGER REFERENCES semesters(id),
    amount DECIMAL(10, 2) NOT NULL,
    status voucher_status DEFAULT 'pending',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Assignments Table
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    course_access_id INTEGER REFERENCES course_access(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions Table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    student_id INTEGER REFERENCES users(id),
    file_url TEXT,
    submission_text TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'submitted'
);
