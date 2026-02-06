-- Seed data for normalized project tables

-- First, insert developers
INSERT INTO developers (name, logo, description) VALUES
('Sobha Realty', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'We are an international luxury real estate developer committed to redefining the art of living by building sustainable communities. Founded in 1976 by PNC Menon, a legendary innovator in the real estate industry.'),
('Emaar Properties', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200', 'Emaar Properties is a global property developer and provider of premium lifestyles based in Dubai, UAE. Emaar has delivered iconic projects including the world''s tallest building, Burj Khalifa.'),
('DAMAC Properties', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200', 'DAMAC Properties has been at the forefront of the Middle East''s luxury real estate market since 2002, delivering award-winning residential, commercial and leisure properties.'),
('Nakheel', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200', 'Nakheel is a world-leading developer based in Dubai whose innovative, iconic projects form an important part of the emirate''s landscape.'),
('Meraas', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200', 'Meraas is a Dubai-based holding company with operations and investments in real estate, hospitality, retail, leisure, entertainment, food and beverage, and healthcare.')
ON CONFLICT (name) DO NOTHING;

-- Get project IDs for seeding
DO $$
DECLARE
    proj_record RECORD;
    dev_id UUID;
    img_order INT;
BEGIN
    -- Loop through all projects
    FOR proj_record IN SELECT id, name, image, developer FROM projects LOOP
        
        -- Get or create developer reference
        SELECT id INTO dev_id FROM developers WHERE name = proj_record.developer LIMIT 1;
        IF dev_id IS NULL THEN
            INSERT INTO developers (name, description) 
            VALUES (proj_record.developer, 'A leading real estate developer in the UAE.')
            RETURNING id INTO dev_id;
        END IF;
        
        -- Update project with developer_id
        UPDATE projects SET developer_id = dev_id WHERE id = proj_record.id;
        
        -- Insert project images (5 images per project for gallery)
        INSERT INTO project_images (project_id, image_url, alt_text, is_primary, display_order) VALUES
        (proj_record.id, COALESCE(proj_record.image, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'), proj_record.name || ' - Main View', true, 1),
        (proj_record.id, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', proj_record.name || ' - Interior Living Room', false, 2),
        (proj_record.id, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', proj_record.name || ' - Interior Bedroom', false, 3),
        (proj_record.id, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', proj_record.name || ' - Exterior Pool', false, 4),
        (proj_record.id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', proj_record.name || ' - Exterior View', false, 5)
        ON CONFLICT DO NOTHING;
        
        -- Insert typical units
        INSERT INTO project_typical_units (project_id, bedrooms, price_min, price_max, area_min, area_max, floor_plan_image, display_order) VALUES
        (proj_record.id, 0, 'AED 450K', 'AED 650K', 350, 500, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800', 1),
        (proj_record.id, 1, 'AED 975K', 'AED 1.83M', 536, 929, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800', 2),
        (proj_record.id, 2, 'AED 1.78M', 'AED 2.14M', 985, 1156, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800', 3),
        (proj_record.id, 3, 'AED 2.5M', 'AED 3.5M', 1400, 1800, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800', 4)
        ON CONFLICT DO NOTHING;
        
        -- Insert project files
        INSERT INTO project_files (project_id, name, file_url, file_type, display_order) VALUES
        (proj_record.id, 'Project Brochure', '/files/brochure.pdf', 'pdf', 1),
        (proj_record.id, 'All Units PDF', '/files/all-units.pdf', 'pdf', 2),
        (proj_record.id, 'Floor Plans', '/files/floor-plans.pdf', 'pdf', 3),
        (proj_record.id, 'Price List', '/files/price-list.pdf', 'pdf', 4)
        ON CONFLICT DO NOTHING;
        
        -- Insert payment plans
        INSERT INTO project_payment_plans (project_id, plan_name, milestone, percentage, payment_count, display_order) VALUES
        (proj_record.id, '60/40 Payment Plan', 'On Booking', 20, 4, 1),
        (proj_record.id, '60/40 Payment Plan', 'On Construction', 40, 4, 2),
        (proj_record.id, '60/40 Payment Plan', 'On Handover', 40, 1, 3),
        (proj_record.id, '40/60 Payment Plan', 'On Booking', 10, 2, 1),
        (proj_record.id, '40/60 Payment Plan', 'On Construction', 30, 6, 2),
        (proj_record.id, '40/60 Payment Plan', 'On Handover', 60, 2, 3)
        ON CONFLICT DO NOTHING;
        
        -- Insert amenities
        INSERT INTO project_amenities (project_id, name, description, image, display_order) VALUES
        (proj_record.id, 'Swimming Pool', 'Temperature-controlled infinity pool with city views', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800', 1),
        (proj_record.id, 'Fitness Centre', 'State-of-the-art gym with personal trainers', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', 2),
        (proj_record.id, 'Jacuzzi', 'Relaxing jacuzzi and spa facilities', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', 3),
        (proj_record.id, 'Yoga Zone', 'Dedicated yoga and meditation area', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800', 4),
        (proj_record.id, 'Kids Play Area', 'Safe and fun playground for children', 'https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=800', 5),
        (proj_record.id, 'BBQ Area', 'Outdoor BBQ and entertainment space', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 6)
        ON CONFLICT DO NOTHING;
        
        -- Insert nearby places
        INSERT INTO project_nearby_places (project_id, name, distance, display_order) VALUES
        (proj_record.id, 'Caston Park', '0.4 KM', 1),
        (proj_record.id, 'First Avenue Mall - Motor City', '0.7 KM', 2),
        (proj_record.id, 'Jebel Ali Village Nursery', '1.2 KM', 3),
        (proj_record.id, 'Sufouh Beach', '14 KM', 4),
        (proj_record.id, 'Dubai International Airport', '30.1 KM', 5)
        ON CONFLICT DO NOTHING;
        
        -- Insert parking info
        INSERT INTO project_parkings (project_id, unit_type, parking_count, display_order) VALUES
        (proj_record.id, '1br, 2br apartment', 1, 1),
        (proj_record.id, 'studio apartment', 1, 2),
        (proj_record.id, '3br apartment', 2, 3),
        (proj_record.id, 'penthouse', 3, 4)
        ON CONFLICT DO NOTHING;
        
    END LOOP;
END $$;

-- Update projects with address and coordinates
UPDATE projects SET 
    address = location || ', Dubai, UAE',
    coordinates = '25°02''58.1"N 55°14''56.7"E'
WHERE address IS NULL;
