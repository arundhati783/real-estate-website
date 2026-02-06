-- =====================================================
-- NORMALIZED DATABASE SCHEMA FOR PROJECT DETAILS
-- This creates proper relational tables instead of JSONB
-- =====================================================

-- 1. Developers Table (one developer can have many projects)
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo TEXT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Project Images Table (gallery images for each project)
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Project Typical Units Table (unit types with details)
CREATE TABLE IF NOT EXISTS project_typical_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  bedrooms INTEGER NOT NULL,
  price_min TEXT NOT NULL,
  price_max TEXT NOT NULL,
  area_min INTEGER NOT NULL,
  area_max INTEGER NOT NULL,
  floor_plan_image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Project Files Table (downloadable attachments)
CREATE TABLE IF NOT EXISTS project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'pdf',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Project Payment Plans Table (payment milestones)
CREATE TABLE IF NOT EXISTS project_payment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL DEFAULT 'Standard',
  milestone TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  payment_count INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Project Amenities Table (amenities with images)
CREATE TABLE IF NOT EXISTS project_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Project Nearby Places Table (nearby locations with distances)
CREATE TABLE IF NOT EXISTS project_nearby_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  distance TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Project Parkings Table (parking information per unit type)
CREATE TABLE IF NOT EXISTS project_parkings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  unit_type TEXT NOT NULL,
  parking_count INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add developer_id to projects table for proper foreign key relationship
ALTER TABLE projects ADD COLUMN IF NOT EXISTS developer_id UUID REFERENCES developers(id);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS coordinates TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_typical_units_project_id ON project_typical_units(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_payment_plans_project_id ON project_payment_plans(project_id);
CREATE INDEX IF NOT EXISTS idx_project_amenities_project_id ON project_amenities(project_id);
CREATE INDEX IF NOT EXISTS idx_project_nearby_places_project_id ON project_nearby_places(project_id);
CREATE INDEX IF NOT EXISTS idx_project_parkings_project_id ON project_parkings(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_developer_id ON projects(developer_id);

-- Enable RLS on all new tables
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_typical_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_nearby_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_parkings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on developers" ON developers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_typical_units" ON project_typical_units FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_files" ON project_files FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_payment_plans" ON project_payment_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_amenities" ON project_amenities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_nearby_places" ON project_nearby_places FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_parkings" ON project_parkings FOR SELECT USING (true);
