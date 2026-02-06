-- Add additional fields to projects table for detail page
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS price_max TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS general_plan_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS typical_units JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS payment_plans JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS files JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS developer_info JSONB DEFAULT '{}'::jsonb;

-- Update existing projects with slugs and additional data
UPDATE projects SET 
  slug = LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', '')),
  description = 'Experience luxury living in one of Dubai''s most sought-after developments. This premium project offers world-class amenities and stunning architectural design.',
  price_max = 'AED 2.14M',
  video_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  general_plan_image = 'https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2000',
  gallery_images = '[
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
  ]'::jsonb,
  amenities = '[
    {"name": "Resort-style pool", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800"},
    {"name": "Fitness Centre", "description": "Image for general understanding", "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"},
    {"name": "Jacuzzi", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"},
    {"name": "Yoga & meditation zone", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800"},
    {"name": "Landscaped garden", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800"},
    {"name": "Clubhouse", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=800"},
    {"name": "F&B street", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"},
    {"name": "Restaurant", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800"},
    {"name": "Sport Area", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800"},
    {"name": "Kids pool", "description": "Visualisation from developer", "image": "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=800"}
  ]'::jsonb,
  typical_units = '[
    {"type": "Studio", "size": "400 sq.ft", "price": "AED 975K"},
    {"type": "1 Bedroom", "size": "750 sq.ft", "price": "AED 1.2M"},
    {"type": "2 Bedroom", "size": "1100 sq.ft", "price": "AED 1.6M"},
    {"type": "3 Bedroom", "size": "1500 sq.ft", "price": "AED 2.14M"}
  ]'::jsonb,
  payment_plans = '[
    {"milestone": "Booking", "percentage": "10%"},
    {"milestone": "During Construction", "percentage": "50%"},
    {"milestone": "On Handover", "percentage": "40%"}
  ]'::jsonb,
  latitude = 25.0657,
  longitude = 55.2108,
  developer_info = '{
    "name": "Sobha Realty",
    "description": "Sobha Realty is a leading international luxury real estate developer.",
    "logo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200",
    "projects_count": 25,
    "established": 1976
  }'::jsonb
WHERE slug IS NULL;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
