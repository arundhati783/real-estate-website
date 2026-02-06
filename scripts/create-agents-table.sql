-- Create agents table for real estate agents
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  image TEXT,
  bio TEXT,
  specialization TEXT,
  languages TEXT[],
  years_experience INTEGER,
  listings_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample agents
INSERT INTO agents (first_name, last_name, phone, email, image, bio, specialization, years_experience, listings_count)
VALUES
  ('Jhon', 'Doe', '+971558787829', 'jhondoe@remapp.ae', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', 'Experienced real estate agent specializing in luxury properties.', 'Luxury Villas', 8, 45),
  ('Sarah', 'Ahmed', '+971551234567', 'sarah.ahmed@remapp.ae', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop', 'Expert in commercial properties and investment opportunities.', 'Commercial', 12, 78),
  ('Michael', 'Johnson', '+971559876543', 'michael.j@remapp.ae', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop', 'Dedicated to finding the perfect home for families.', 'Residential', 6, 32),
  ('Fatima', 'Hassan', '+971552468135', 'fatima.h@remapp.ae', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop', 'Specializing in off-plan projects and new developments.', 'Off-Plan', 10, 56),
  ('Ahmed', 'Al-Rashid', '+971557891234', 'ahmed.r@remapp.ae', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop', 'Expert in Dubai Marina and Downtown properties.', 'Premium Locations', 15, 120),
  ('Emma', 'Wilson', '+971553692581', 'emma.w@remapp.ae', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop', 'Helping first-time buyers navigate the property market.', 'First-Time Buyers', 5, 28)
ON CONFLICT DO NOTHING;
