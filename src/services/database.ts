import { Pool } from 'pg';

// Database connection configuration
const pool = new Pool({
  connectionString: import.meta.env.DATABASE_URL || process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Generic query function
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

// Database initialization - create tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'student',
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Courses table
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        short_description TEXT,
        thumbnail VARCHAR(500),
        price DECIMAL(10,2),
        discount_price DECIMAL(10,2),
        duration VARCHAR(100),
        level VARCHAR(50),
        category VARCHAR(100),
        instructor_id UUID REFERENCES users(id),
        rating DECIMAL(3,2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        enrollment_count INTEGER DEFAULT 0,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Jobs table
    await query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        requirements TEXT[],
        responsibilities TEXT[],
        location VARCHAR(255),
        type VARCHAR(50),
        salary_min INTEGER,
        salary_max INTEGER,
        salary_currency VARCHAR(10) DEFAULT 'USD',
        category VARCHAR(100),
        department VARCHAR(100),
        experience VARCHAR(100),
        deadline DATE,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Job Applications table
    await query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_id UUID REFERENCES jobs(id),
        applicant_id UUID REFERENCES users(id),
        resume_filename VARCHAR(255),
        resume_url VARCHAR(500),
        cover_letter TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Course Enrollments table
    await query(`
      CREATE TABLE IF NOT EXISTS course_enrollments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id UUID REFERENCES courses(id),
        student_id UUID REFERENCES users(id),
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress DECIMAL(5,2) DEFAULT 0,
        completed_at TIMESTAMP,
        UNIQUE(course_id, student_id)
      )
    `);

    // Notifications table
    await query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        message TEXT,
        type VARCHAR(50) DEFAULT 'info',
        is_read BOOLEAN DEFAULT false,
        action_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// User-related database functions
export const userDb = {
  create: async (userData: {
    email: string;
    name: string;
    password_hash: string;
    role?: string;
  }) => {
    const { email, name, password_hash, role = 'student' } = userData;
    const result = await query(
      'INSERT INTO users (email, name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, name, password_hash, role]
    );
    return result.rows[0];
  },

  findByEmail: async (email: string) => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (id: string) => {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  update: async (id: string, updates: any) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await query(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  },
};

// Course-related database functions
export const courseDb = {
  getAll: async () => {
    const result = await query(`
      SELECT c.*, u.name as instructor_name, u.avatar as instructor_avatar
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.is_published = true
      ORDER BY c.created_at DESC
    `);
    return result.rows;
  },

  getById: async (id: string) => {
    const result = await query(`
      SELECT c.*, u.name as instructor_name, u.avatar as instructor_avatar, u.id as instructor_id
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.id = $1
    `, [id]);
    return result.rows[0];
  },

  create: async (courseData: any) => {
    const {
      title, description, short_description, thumbnail, price, discount_price,
      duration, level, category, instructor_id
    } = courseData;
    
    const result = await query(`
      INSERT INTO courses (
        title, description, short_description, thumbnail, price, discount_price,
        duration, level, category, instructor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `, [title, description, short_description, thumbnail, price, discount_price, duration, level, category, instructor_id]);
    
    return result.rows[0];
  },
};

// Job-related database functions
export const jobDb = {
  getAll: async () => {
    const result = await query(`
      SELECT * FROM jobs 
      WHERE is_active = true 
      ORDER BY created_at DESC
    `);
    return result.rows;
  },

  getById: async (id: string) => {
    const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (jobData: any) => {
    const {
      title, description, requirements, responsibilities, location, type,
      salary_min, salary_max, category, department, experience, deadline
    } = jobData;
    
    const result = await query(`
      INSERT INTO jobs (
        title, description, requirements, responsibilities, location, type,
        salary_min, salary_max, category, department, experience, deadline
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
    `, [title, description, requirements, responsibilities, location, type, salary_min, salary_max, category, department, experience, deadline]);
    
    return result.rows[0];
  },
};

export default pool;
