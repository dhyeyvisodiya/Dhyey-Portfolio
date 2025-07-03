-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS resume CASCADE;

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image TEXT DEFAULT '/placeholder.svg?height=300&width=500',
  github TEXT,
  demo TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  credential_id TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  verify_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  read_time TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resume table
CREATE TABLE resume (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  personal_info JSONB NOT NULL DEFAULT '{}',
  summary TEXT NOT NULL DEFAULT '',
  resume_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_experiences_created_at ON experiences(created_at DESC);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON certificates FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON blogs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON experiences FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON resume FOR SELECT USING (true);

-- Create policies for full access (insert, update, delete)
CREATE POLICY "Enable all operations for all users" ON projects FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON skills FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON certificates FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON blogs FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON experiences FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON resume FOR ALL USING (true);

-- Insert demo data
INSERT INTO projects (title, description, technologies, image, github, demo, featured) VALUES
('E-Commerce Platform', 'A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/ecommerce-platform', 'https://ecommerce-demo.vercel.app', true),
('Task Management App', 'A collaborative task management application built with Next.js and Supabase. Real-time updates and team collaboration features.', ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/task-manager', 'https://task-manager-demo.vercel.app', true),
('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.', ARRAY['React', 'OpenWeather API', 'Chart.js', 'CSS3'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/weather-dashboard', 'https://weather-dashboard-demo.vercel.app', false),
('Social Media Analytics', 'Analytics dashboard for social media metrics with data visualization and reporting features.', ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/social-analytics', 'https://social-analytics-demo.vercel.app', true);

INSERT INTO skills (name, category, level) VALUES
('React', 'Frontend', 95),
('Next.js', 'Frontend', 90),
('TypeScript', 'Frontend', 85),
('Vue.js', 'Frontend', 80),
('Tailwind CSS', 'Frontend', 90),
('Node.js', 'Backend', 88),
('Express.js', 'Backend', 85),
('Python', 'Backend', 82),
('React Native', 'Mobile', 80),
('Flutter', 'Mobile', 70),
('Git', 'Tools', 90),
('Docker', 'Tools', 75),
('AWS', 'Cloud', 80),
('MongoDB', 'Database', 85),
('PostgreSQL', 'Database', 80);

INSERT INTO certificates (title, issuer, date, credential_id, skills, verify_url) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', '2024', 'AWS-SAA-2024-001', ARRAY['AWS', 'Cloud Architecture', 'EC2', 'S3'], 'https://aws.amazon.com/verification'),
('Google Cloud Professional Developer', 'Google Cloud', '2023', 'GCP-PD-2023-002', ARRAY['Google Cloud', 'Kubernetes', 'Cloud Functions'], 'https://cloud.google.com/certification'),
('Meta React Developer Certificate', 'Meta', '2023', 'META-RD-2023-003', ARRAY['React', 'JavaScript', 'Frontend Development'], 'https://coursera.org/verify/meta-react');

INSERT INTO blogs (title, excerpt, content, date, read_time, tags, slug, published) VALUES
('Building Scalable React Applications', 'Learn how to build performant and scalable React applications using Next.js.', 'Full content here...', '2024-01-15', '8 min read', ARRAY['React', 'Next.js', 'Performance'], 'building-scalable-react-applications', true),
('Modern State Management in React', 'A comprehensive guide to state management patterns in React.', 'Full content here...', '2024-01-10', '12 min read', ARRAY['React', 'State Management'], 'modern-state-management-react', true);

INSERT INTO experiences (title, company, period, description, technologies) VALUES
('Senior Full Stack Developer', 'TechCorp Solutions', '2023 - Present', 'Leading development of scalable web applications using React, Node.js, and AWS.', ARRAY['React', 'Node.js', 'AWS', 'TypeScript']),
('Frontend Developer', 'Digital Innovations Inc', '2022 - 2023', 'Developed responsive web applications using React and Vue.js.', ARRAY['React', 'Vue.js', 'JavaScript', 'CSS3']);

INSERT INTO resume (personal_info, summary, resume_url) VALUES
('{"full_name": "Dhyey Visodiya", "email": "visodiyadhyey@gmail.com", "phone": "+91 9913191735", "location": "Rajkot, Gujarat", "website": "https://dhyeyvisodiya.dev", "linkedin": "https://linkedin.com/in/dhyey-visodiya", "github": "https://github.com/dhyeyvisodiya"}', 'Passionate software engineer with expertise in full-stack development, mobile applications, and modern web technologies.', 'https://example.com/dhyey-visodiya-resume.pdf');
