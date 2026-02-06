-- Add slug column to properties if not exists
ALTER TABLE properties ADD COLUMN IF NOT EXISTS slug TEXT;

-- Update existing properties with slugs
UPDATE properties SET slug = LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', '')) WHERE slug IS NULL;

-- Add unique constraint on slug
CREATE UNIQUE INDEX IF NOT EXISTS properties_slug_idx ON properties(slug);
