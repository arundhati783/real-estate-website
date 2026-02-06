export interface Project {
  id: string;
  name: string;
  location: string;
  category: string;
  price: string;
  completionDate: string;
  developer: string;
  image: string;
  featured: boolean;
  status: "Pre Launch" | "On Sale" | "Sold Out";
}

export interface Property {
  id: string;
  name: string;
  image: string;
  beds: number;
  baths: number;
  area: number;
  price: string;
  featured: boolean;
  type: "Renting" | "For Sale";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  content: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Mock Projects Data
export const projects: Project[] = [
  {
    id: "1",
    name: "Rise By Athlon 1",
    location: "Wadi Al Safa 5, Dubai",
    category: "Apartment",
    price: "AED 1.88M",
    completionDate: "30-12-2029",
    developer: "Aldar",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    featured: true,
    status: "Pre Launch",
  },
  {
    id: "2",
    name: "Breez",
    location: "Maritime City, Dubai",
    category: "Apartment",
    price: "AED 1.36M",
    completionDate: "30-06-2029",
    developer: "Danube PROPERTIES",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    featured: true,
    status: "On Sale",
  },
  {
    id: "3",
    name: "Chevalia Estate",
    location: "Dubai Investment Park Second, Dubai",
    category: "Villa",
    price: "Inquire Price",
    completionDate: "30-06-2029",
    developer: "Emaar",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
    status: "Pre Launch",
  },
  {
    id: "4",
    name: "The Palace Villas Ostra",
    location: "Me'Aisem Second, Dubai",
    category: "Villa",
    price: "Inquire Price",
    completionDate: "30-09-2029",
    developer: "Emaar",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: false,
    status: "Pre Launch",
  },
  {
    id: "5",
    name: "Sobha Orbis",
    location: "Motor City, Dubai",
    category: "Apartment",
    price: "AED 975K",
    completionDate: "31-12-2027",
    developer: "Sobha Realty",
    image: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80",
    featured: false,
    status: "On Sale",
  },
  {
    id: "6",
    name: "Mayfair Residence (UniEstate)",
    location: "Jumeirah Village Circle (JVC), Dubai",
    category: "Apartment",
    price: "AED 879K",
    completionDate: "30-06-2026",
    developer: "UniEstate Properties",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    featured: false,
    status: "On Sale",
  },
  {
    id: "7",
    name: "Marina Heights",
    location: "Dubai Marina, Dubai",
    category: "Penthouse",
    price: "AED 5.2M",
    completionDate: "31-03-2028",
    developer: "Select Group",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: true,
    status: "Pre Launch",
  },
  {
    id: "8",
    name: "Palm Residences",
    location: "Palm Jumeirah, Dubai",
    category: "Townhouse",
    price: "AED 3.8M",
    completionDate: "30-09-2027",
    developer: "Nakheel",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    featured: false,
    status: "On Sale",
  },
];

// Mock Properties Data (for Best Property Value section)
export const properties: Property[] = [
  {
    id: "1",
    name: "Jawaher Residences Maryam Island",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    beds: 7,
    baths: 2,
    area: 810,
    price: "AED 22.23M",
    featured: true,
    type: "Renting",
  },
  {
    id: "2",
    name: "Al Habtoor Tower",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    beds: 1,
    baths: 3,
    area: 870,
    price: "AED 1012.23M",
    featured: true,
    type: "Renting",
  },
  {
    id: "3",
    name: "Ramhan Island Villas",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    beds: 10,
    baths: 2,
    area: 860,
    price: "AED 181.85M",
    featured: true,
    type: "Renting",
  },
  {
    id: "4",
    name: "Damac Hills 2 - Camelia Villas",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 2,
    baths: 2,
    area: 60,
    price: "AED 83.22M",
    featured: true,
    type: "Renting",
  },
];

// Mock Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Johnson",
    role: "Happy Buyer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
    content: "Working with this real estate agency made the entire home-buying process seamless. Their professionalism and market knowledge ensured that we found the perfect home!",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Happy Seller",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    content: "The team provided excellent guidance throughout the entire selling process. From staging my home to negotiating the best offer, they made it stress-free.",
  },
  {
    id: "3",
    name: "Noman Ali",
    role: "Satisfied Client",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    content: "I was impressed by their dedication and attention to detail. They went above and beyond to help me find the right property. Thank you!",
  },
  {
    id: "4",
    name: "Emily Chen",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    content: "As an investor, I appreciate their market insights and professional approach. They helped me secure multiple properties with excellent returns.",
  },
];

// Mock Partners Data
export const partners: Partner[] = [
  { id: "1", name: "MAG", logo: "/partners/mag.svg" },
  { id: "2", name: "EMAAR", logo: "/partners/emaar.svg" },
  { id: "3", name: "Select Group", logo: "/partners/select-group.svg" },
  { id: "4", name: "DAMAC", logo: "/partners/damac.svg" },
  { id: "5", name: "SOBHA", logo: "/partners/sobha.svg" },
];

// Mock Benefits Data
export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Proven Expertise",
    description: "Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.",
    icon: "expertise",
  },
  {
    id: "2",
    title: "Customized Solutions",
    description: "We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.",
    icon: "solutions",
  },
  {
    id: "3",
    title: "Transparent Partnerships",
    description: "Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.",
    icon: "partnerships",
  },
];

// Mock Stats Data
export const stats = [
  { id: "1", value: 90, label: "SATISFIED", sublabel: "CLIENTS" },
  { id: "2", value: 50, label: "DEALS", sublabel: "CLOSED" },
  { id: "3", value: 50, label: "SUCCESSFUL", sublabel: "TRANSACTIONS" },
  { id: "4", value: 80, label: "MONTHLY", sublabel: "TRAFFIC" },
];

// API-like functions (replace with actual database queries)
export async function getProjects(category?: string): Promise<Project[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (category && category !== "View All") {
    return projects.filter(p => p.category === category);
  }
  return projects;
}

export async function getProperties(): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return properties;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return testimonials;
}

export async function getPartners(): Promise<Partner[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return partners;
}

export async function getBenefits(): Promise<Benefit[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return benefits;
}

export async function getStats() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return stats;
}
