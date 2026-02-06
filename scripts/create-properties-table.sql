-- Drop existing table if it exists (to ensure clean schema)
DROP TABLE IF EXISTS properties CASCADE;

-- Create properties table for individual property listings (different from projects)
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  location VARCHAR(255),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price DECIMAL(15, 2),
  price_type VARCHAR(50) DEFAULT 'sale', -- 'sale' or 'rent'
  property_type VARCHAR(100), -- Apartment, Villa, Townhouse, etc.
  status VARCHAR(50) DEFAULT 'selling', -- 'selling', 'renting', 'sold', 'rented'
  featured BOOLEAN DEFAULT FALSE,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10, 2), -- in square meters
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);

-- Insert sample property data
INSERT INTO properties (name, slug, description, location, price, price_type, property_type, status, featured, bedrooms, bathrooms, area, image, latitude, longitude) VALUES
('Selling 1 BHK Ready Apartment', 'selling-1-bhk-ready-apartment', 'Modern 1 bedroom apartment in prime location with stunning views and premium finishes.', 'Dubai, Dubai', 2100000, 'sale', 'Apartment', 'selling', false, 1, 1, 800, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', 25.2048, 55.2708),
('Rent Out 2 BHK Ready Apartment', 'rent-out-2-bhk-ready-apartment', 'Spacious 2 bedroom apartment available for rent in a sought-after community.', 'Dubai, Dubai', 300000, 'rent', 'Apartment', 'renting', false, 2, 2, 1200, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', 25.1972, 55.2744),
('Spacious Studio | Burj Views', 'spacious-studio-burj-views', 'Bela Vista Homes Real Estate is delighted to present this stunning 2-bedroom apartment located in Azizi Riviera.', 'Dubai, Dubai', 70000, 'rent', 'Apartment', 'renting', false, 1, 1, 348, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', 25.0657, 55.1713),
('Rent Out 2 BHK Ready Premium', 'rent-out-2-bhk-ready-premium', 'Premium 2 bedroom apartment with high-end finishes and excellent amenities.', 'Dubai, Dubai', 270000, 'rent', 'Apartment', 'renting', false, 2, 3, 1650, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', 25.2285, 55.2876),
('Ramhan Island Villas', 'ramhan-island-villas', 'Exclusive waterfront villas with private beach access and marina views.', 'Abu Dhabi, UAE', 8500000, 'rent', 'Villa', 'renting', true, 10, 2, 860, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', 24.4539, 54.3773),
('Damac Hills 2 - Camelia Villas', 'damac-hills-2-camelia-villas', 'Beautiful family villas in the heart of Damac Hills community.', 'Dubai, Dubai', 1800000, 'rent', 'Villa', 'renting', true, 2, 2, 60, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', 25.0136, 55.2531),
('Jawaher Residences Tower', 'jawaher-residences-tower', 'Luxury high-rise living with panoramic city views and world-class amenities.', 'Dubai Marina, Dubai', 22230000, 'sale', 'Apartment', 'selling', false, 7, 2, 810, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', 25.0805, 55.1403),
('Al Habtoor Tower', 'al-habtoor-tower', 'Prestigious address with exceptional finishes and prime downtown location.', 'Downtown Dubai, Dubai', 1012230000, 'sale', 'Apartment', 'selling', false, 1, 3, 870, 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=600&q=80', 25.1972, 55.2744),
('Harbour Gate', 'harbour-gate', 'Modern waterfront living with stunning harbour views.', 'Dubai Creek Harbour, Dubai', 3500000, 'sale', 'Apartment', 'selling', false, 3, 2, 1500, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 25.2048, 55.3489),
('Deansgate By ADE', 'deansgate-by-ade', 'Contemporary urban living in the heart of Business Bay.', 'Business Bay, Dubai', 2800000, 'sale', 'Apartment', 'selling', false, 2, 2, 1100, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', 25.1857, 55.2619),
('Palm Jumeirah Villa', 'palm-jumeirah-villa', 'Exclusive beachfront villa on the iconic Palm Jumeirah.', 'Palm Jumeirah, Dubai', 45000000, 'sale', 'Villa', 'selling', true, 6, 7, 1200, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', 25.1124, 55.1390),
('Marina Penthouse', 'marina-penthouse', 'Stunning duplex penthouse with floor-to-ceiling windows and private pool.', 'Dubai Marina, Dubai', 28000000, 'sale', 'Apartment', 'selling', true, 4, 5, 650, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80', 25.0805, 55.1403)
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on properties" ON properties
  FOR SELECT TO anon, authenticated
  USING (true);
