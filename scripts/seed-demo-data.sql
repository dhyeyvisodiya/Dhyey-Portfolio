-- Clear existing data
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM certificates;
DELETE FROM blogs;
DELETE FROM experiences;
DELETE FROM resume;

-- Insert demo projects
INSERT INTO projects (title, description, technologies, image, github, demo, featured) VALUES
('E-Commerce Platform', 'A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/ecommerce-platform', 'https://ecommerce-demo.vercel.app', true),
('Task Management App', 'A collaborative task management application built with Next.js and Supabase. Real-time updates and team collaboration features.', ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/task-manager', 'https://task-manager-demo.vercel.app', true),
('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.', ARRAY['React', 'OpenWeather API', 'Chart.js', 'CSS3'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/weather-dashboard', 'https://weather-dashboard-demo.vercel.app', false),
('Social Media Analytics', 'Analytics dashboard for social media metrics with data visualization and reporting features.', ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/social-analytics', 'https://social-analytics-demo.vercel.app', true),
('Portfolio Website', 'Personal portfolio website built with Next.js, featuring dark theme, animations, and admin panel.', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/portfolio', 'https://dhyeyvisodiya.dev', false),
('Chat Application', 'Real-time chat application with rooms, file sharing, and emoji reactions.', ARRAY['React', 'Socket.io', 'Node.js', 'Express'], '/placeholder.svg?height=300&width=500', 'https://github.com/dhyeyvisodiya/chat-app', 'https://chat-demo.vercel.app', false);

-- Insert demo skills
INSERT INTO skills (name, category, level) VALUES
-- Frontend
('React', 'Frontend', 95),
('Next.js', 'Frontend', 90),
('TypeScript', 'Frontend', 85),
('Vue.js', 'Frontend', 80),
('Tailwind CSS', 'Frontend', 90),
('JavaScript', 'Frontend', 95),
('HTML5', 'Frontend', 98),
('CSS3', 'Frontend', 92),
-- Backend
('Node.js', 'Backend', 88),
('Express.js', 'Backend', 85),
('Python', 'Backend', 82),
('FastAPI', 'Backend', 75),
('PHP', 'Backend', 70),
-- Mobile
('React Native', 'Mobile', 80),
('Flutter', 'Mobile', 70),
-- Tools
('Git', 'Tools', 90),
('Docker', 'Tools', 75),
('Figma', 'Tools', 85),
('VS Code', 'Tools', 95),
-- Cloud
('AWS', 'Cloud', 80),
('Vercel', 'Cloud', 90),
('Netlify', 'Cloud', 85),
-- Database
('MongoDB', 'Database', 85),
('PostgreSQL', 'Database', 80),
('Supabase', 'Database', 85),
('MySQL', 'Database', 78);

-- Insert demo certificates
INSERT INTO certificates (title, issuer, date, credential_id, skills, verify_url) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', '2024', 'AWS-SAA-2024-001', ARRAY['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda'], 'https://aws.amazon.com/verification'),
('Google Cloud Professional Developer', 'Google Cloud', '2023', 'GCP-PD-2023-002', ARRAY['Google Cloud', 'Kubernetes', 'Cloud Functions', 'BigQuery'], 'https://cloud.google.com/certification'),
('Meta React Developer Certificate', 'Meta', '2023', 'META-RD-2023-003', ARRAY['React', 'JavaScript', 'Frontend Development', 'UI/UX'], 'https://coursera.org/verify/meta-react'),
('MongoDB Certified Developer', 'MongoDB University', '2023', 'MONGO-DEV-2023-004', ARRAY['MongoDB', 'NoSQL', 'Database Design', 'Aggregation'], 'https://university.mongodb.com/certification'),
('Microsoft Azure Fundamentals', 'Microsoft', '2023', 'AZ-900-2023-005', ARRAY['Azure', 'Cloud Computing', 'Virtual Machines', 'Storage'], 'https://learn.microsoft.com/certifications'),
('Docker Certified Associate', 'Docker', '2022', 'DCA-2022-006', ARRAY['Docker', 'Containerization', 'DevOps', 'Kubernetes'], 'https://docker.com/certification');

-- Insert demo blogs
INSERT INTO blogs (title, excerpt, content, date, read_time, tags, slug, published) VALUES
('Building Scalable React Applications with Next.js', 'Learn how to build performant and scalable React applications using Next.js, including SSR, SSG, and API routes.', 'Full content of the blog post about Next.js and building scalable applications...', '2024-01-15', '8 min read', ARRAY['React', 'Next.js', 'Performance', 'SSR'], 'building-scalable-react-applications-nextjs', true),
('Modern State Management in React', 'A comprehensive guide to state management patterns in React, comparing Redux, Zustand, and Context API.', 'Full content of the blog post about state management patterns...', '2024-01-10', '12 min read', ARRAY['React', 'State Management', 'Redux', 'Zustand'], 'modern-state-management-react', true),
('TypeScript Best Practices for Large Applications', 'Essential TypeScript patterns and practices for maintaining large-scale applications with better type safety.', 'Full content of the blog post about TypeScript best practices...', '2024-01-05', '10 min read', ARRAY['TypeScript', 'Best Practices', 'Large Scale', 'Type Safety'], 'typescript-best-practices-large-applications', true),
('Deploying Full-Stack Applications to AWS', 'Step-by-step guide to deploying full-stack applications to AWS using modern DevOps practices.', 'Full content of the blog post about AWS deployment strategies...', '2023-12-28', '15 min read', ARRAY['AWS', 'Deployment', 'DevOps', 'Full Stack'], 'deploying-fullstack-applications-aws', true),
('Getting Started with Docker for Developers', 'A beginner-friendly guide to containerization with Docker, including best practices and common use cases.', 'Full content of the blog post about Docker fundamentals...', '2023-12-20', '9 min read', ARRAY['Docker', 'DevOps', 'Containerization', 'Development'], 'getting-started-docker-developers', false),
('Building RESTful APIs with Node.js and Express', 'Complete guide to building robust and scalable REST APIs using Node.js, Express, and MongoDB.', 'Full content of the blog post about API development...', '2023-12-15', '14 min read', ARRAY['Node.js', 'Express', 'API', 'Backend'], 'building-restful-apis-nodejs-express', true);

-- Insert demo experiences
INSERT INTO experiences (title, company, period, description, technologies) VALUES
('Senior Full Stack Developer', 'TechCorp Solutions', '2023 - Present', 'Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices for code quality and performance optimization. Reduced application load time by 60% and improved user engagement by 40%.', ARRAY['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB', 'Docker']),
('Frontend Developer', 'Digital Innovations Inc', '2022 - 2023', 'Developed responsive web applications using React and Vue.js. Collaborated with design teams to implement pixel-perfect UI components and improved application performance by 40%. Built reusable component library used across 5+ projects.', ARRAY['React', 'Vue.js', 'JavaScript', 'CSS3', 'Webpack', 'Jest']),
('Junior Web Developer', 'StartupXYZ', '2021 - 2022', 'Built and maintained company websites using modern web technologies. Gained experience in full-stack development and agile methodologies. Contributed to 10+ client projects and learned industry best practices.', ARRAY['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap']),
('Freelance Developer', 'Self-Employed', '2020 - 2021', 'Worked with various clients to build custom web solutions. Specialized in e-commerce platforms and business websites. Successfully delivered 15+ projects on time and within budget.', ARRAY['WordPress', 'Shopify', 'JavaScript', 'PHP', 'CSS3', 'MySQL']);

-- Insert demo resume data
INSERT INTO resume (personal_info, summary, resume_url) VALUES
('{"full_name": "Dhyey Visodiya", "email": "visodiyadhyey@gmail.com", "phone": "+91 9913191735", "location": "Rajkot, Gujarat", "website": "https://dhyeyvisodiya.dev", "linkedin": "https://linkedin.com/in/dhyey-visodiya", "github": "https://github.com/dhyeyvisodiya"}', 'Passionate software engineer with 3+ years of experience in full-stack development, mobile applications, and modern web technologies. Proven track record of building scalable applications, leading development teams, and delivering high-quality solutions that drive business growth.', 'https://example.com/dhyey-visodiya-resume.pdf');
