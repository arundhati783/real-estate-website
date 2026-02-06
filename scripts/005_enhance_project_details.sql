-- Enhance projects table with additional detail page fields
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS parking_info JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS nearby_places JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS developer_description TEXT,
ADD COLUMN IF NOT EXISTS developer_logo TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS coordinates TEXT;

-- Update existing projects with enhanced data
UPDATE projects SET 
  typical_units = '[
    {"bedrooms": 1, "price_min": "AED 975K", "price_max": "AED 1.83M", "area_min": 536, "area_max": 929, "image": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800"},
    {"bedrooms": 2, "price_min": "AED 1.78M", "price_max": "AED 2.14M", "area_min": 985, "area_max": 1156, "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800"},
    {"bedrooms": 3, "price_min": "AED 2.5M", "price_max": "AED 3.2M", "area_min": 1400, "area_max": 1650, "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"}
  ]'::jsonb,
  files = '[
    {"name": "Project Brochure", "url": "/files/brochure.pdf"},
    {"name": "All Units PDF", "url": "/files/all-units.pdf"},
    {"name": "Floor Plans", "url": "/files/floor-plans.pdf"}
  ]'::jsonb,
  parking_info = '[
    {"type": "1br, 2br apartment", "count": 1},
    {"type": "studio apartment", "count": 3},
    {"type": "3br apartment", "count": 4}
  ]'::jsonb,
  nearby_places = '[
    {"name": "Caston Park", "distance": "0.4KM"},
    {"name": "First Avenue Mall - Motor City", "distance": "0.7 KM"},
    {"name": "Jebel Ali Village Nursery", "distance": "1.2 KM"},
    {"name": "Sufouh Beach", "distance": "14 KM"},
    {"name": "Dubai International Airport", "distance": "30.1 KM"}
  ]'::jsonb,
  payment_plans = '[
    {
      "name": "payment plan 60/40",
      "milestones": [
        {"phase": "On Booking", "percentage": 20, "payments": 4},
        {"phase": "On Construction", "percentage": 40, "payments": 4},
        {"phase": "On Handover", "percentage": 40, "payments": 1}
      ]
    },
    {
      "name": "payment plan 40/60",
      "milestones": [
        {"phase": "On Booking", "percentage": 10, "payments": 2},
        {"phase": "On Construction", "percentage": 30, "payments": 6},
        {"phase": "On Handover", "percentage": 60, "payments": 2}
      ]
    }
  ]'::jsonb,
  developer_description = 'We are an international luxury real estate developer committed to redefining the art of living by building sustainable communities. Founded in 1976 by PNC Menon, a legendary innovator in the real estate industry, as an interior design business in Oman, we have established our presence all over the world with developments and investments in UAE, Oman, Bahrain, Brunei and India.',
  developer_logo = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200',
  address = 'Motor City, Dubai',
  coordinates = '25°02''58.1"N 55°14''56.7"E'
WHERE slug IS NOT NULL;
