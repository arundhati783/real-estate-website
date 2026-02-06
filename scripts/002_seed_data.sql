-- Seed projects data
INSERT INTO projects (name, location, price, completion_date, developer, category, status, featured, image) VALUES
('Rise By Athlon 1', 'Wadi Al Safa 5, Dubai', 'AED 1.88M', '30-12-2029', 'Aldar', 'Apartment', 'Pre Launch', true, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735'),
('Breez', 'Maritime city, Dubai', 'AED 1.36M', '30-06-2029', 'Danube PROPERTIES', 'Apartment', 'On Sale', true, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=870'),
('Chevalia Estate', 'Dubai Investment Park Second, Dubai', 'Inquire Price', '30-06-2029', 'Emaar', 'Villa', 'Pre Launch', true, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=871'),
('The Palace Villas Ostra', 'Me''Aisem Second, Dubai', 'Inquire Price', '30-09-2029', 'Emaar', 'Villa', 'Pre Launch', true, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=875'),
('Sobha Orbis', 'Motor City, Dubai', 'AED 975K', '31-12-2027', 'Sobha Realty', 'Apartment', 'On Sale', true, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870'),
('Mayfair Residence', 'Jumeirah Village Circle (JVC), Dubai', 'AED 879K', '30-06-2026', 'UniEstate Properties', 'Apartment', 'On Sale', true, 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=870'),
('Marina Heights', 'Dubai Marina, Dubai', 'AED 2.5M', '31-12-2028', 'Damac', 'Penthouse', 'Pre Launch', true, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=870'),
('Palm Residences', 'Palm Jumeirah, Dubai', 'AED 5.2M', '30-03-2027', 'Nakheel', 'Villa', 'On Sale', true, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=870');

-- Seed properties data
INSERT INTO properties (name, location, price, bedrooms, bathrooms, area, status, featured, image) VALUES
('Jawaher Residences Maryam Island', 'Maryam Island, Sharjah', 'AED 22.23M', 7, 2, '810 m²', 'Renting', true, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=870'),
('Al Habtoor Tower', 'Business Bay, Dubai', 'AED 1012.23M', 1, 3, '870 m²', 'Renting', true, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870'),
('Ramhan Island Villas', 'Ramhan Island, Abu Dhabi', 'AED 181.85M', 10, 2, '860 m²', 'Renting', true, 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=870'),
('Damac Hills 2 - Camelia Villas', 'Damac Hills 2, Dubai', 'AED 83.22M', 2, 2, '60 m²', 'Renting', true, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=870');

-- Seed testimonials data
INSERT INTO testimonials (name, role, content, rating, image) VALUES
('Michael Johnson', 'Happy Buyer', 'Working with this real estate agency made the entire home-buying process seamless. Their professionalism and market knowledge ensured that we found the perfect home!', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'),
('Sarah Williams', 'Happy Seller', 'The team provided excellent guidance throughout the entire selling process. From staging my home to negotiating the best offer, they made it stress-free.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'),
('Noman Ali', 'Satisfied Client', 'Exceptional service from start to finish. They understood exactly what I was looking for and delivered beyond my expectations. Highly recommend for anyone looking to invest in property. Thank you!', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200'),
('Emily Chen', 'Property Investor', 'As a first-time investor, I was nervous about the process. The team guided me every step of the way and helped me find amazing investment opportunities.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200');

-- Seed benefits data
INSERT INTO benefits (title, description, icon) VALUES
('Proven Expertise', 'Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.', 'expertise'),
('Customized Solutions', 'We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.', 'solutions'),
('Transparent Partnerships', 'Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.', 'partnerships');

-- Seed partners data
INSERT INTO partners (name, logo) VALUES
('MAG', 'MAG'),
('EMAAR', 'EMAAR'),
('SELECT GROUP', 'SELECT GROUP'),
('DAMAC', 'DAMAC'),
('SOBHA', 'SOBHA');

-- Seed stats data
INSERT INTO stats (label, value, suffix) VALUES
('SATISFIED CLIENTS', 90, '+'),
('DEALS CLOSED', 50, '+'),
('SUCCESSFUL TRANSACTIONS', 50, '+'),
('MONTHLY TRAFFIC', 80, 'K');
