-- Add resume table
CREATE TABLE IF NOT EXISTS resume (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_info JSONB NOT NULL DEFAULT '{}',
  summary TEXT NOT NULL DEFAULT '',
  resume_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON resume FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON resume FOR ALL USING (auth.role() = 'authenticated');

-- Insert default resume data
INSERT INTO resume (personal_info, summary, resume_url) 
VALUES (
  '{"full_name": "Dhyey Visodiya", "email": "visodiyadhyey@gmail.com", "phone": "+91 9913191735", "location": "Rajkot, Gujarat", "website": "https://dhyeyvisodiya.dev", "linkedin": "https://linkedin.com/in/dhyey-visodiya", "github": "https://github.com/dhyeyvisodiya"}',
  'Passionate software engineer with expertise in full-stack development, mobile applications, and modern web technologies.',
  ''
) ON CONFLICT DO NOTHING;
