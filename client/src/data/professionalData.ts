export const serviceCategories = [
  { id: 'architecture', name: 'Architecture & Design', icon: '🏛️', color: 'from-blue-500 to-indigo-600' },
  { id: 'plumbing', name: 'Plumbing & Repairs', icon: '🔧', color: 'from-orange-500 to-red-500' },
  { id: 'webdev', name: 'Web Development', icon: '💻', color: 'from-purple-500 to-pink-500' },
  { id: 'electrical', name: 'Electrical Services', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  { id: 'construction', name: 'Construction', icon: '🏗️', color: 'from-gray-600 to-gray-800' },
  { id: 'landscaping', name: 'Landscaping', icon: '🌱', color: 'from-green-500 to-emerald-600' },
  { id: 'cleaning', name: 'Cleaning Services', icon: '🧽', color: 'from-teal-500 to-cyan-600' },
  { id: 'photography', name: 'Photography', icon: '📸', color: 'from-pink-500 to-rose-500' },
  { id: 'tutoring', name: 'Tutoring & Education', icon: '📚', color: 'from-indigo-500 to-purple-600' },
  { id: 'automotive', name: 'Automotive Services', icon: '🚗', color: 'from-red-500 to-pink-500' },
  { id: 'security', name: 'Security Services', icon: '🛡️', color: 'from-slate-600 to-gray-700' },
  { id: 'catering', name: 'Catering & Events', icon: '🍽️', color: 'from-amber-500 to-orange-600' }
];

export const dummyProfessionals = [
  {
    id: 'john_doe',
    name: 'John Doe',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'architecture',
    rating: 4.8,
    trustCount: 120,
    bio: 'Experienced architect with 10+ years in residential and commercial design. Specialized in sustainable building practices.',
    username: 'john_doe',
    location: 'Commercial Avenue, Bamenda',
    experience: '10 years',
    completedProjects: 45,
    verified: true
  },
  {
    id: 'marie_mbah',
    name: 'Marie Mbah',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    category: 'plumbing',
    rating: 4.9,
    trustCount: 89,
    bio: 'Professional plumber and repair specialist. Available 24/7 for emergency repairs and installations.',
    username: 'marie_mbah',
    location: 'Ntarikon, Bamenda',
    experience: '7 years',
    completedProjects: 156,
    verified: true
  },
  {
    id: 'frank_tech',
    name: 'Frank Teknologi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    category: 'webdev',
    rating: 4.7,
    trustCount: 67,
    bio: 'Full-stack web developer specializing in React, Node.js, and modern web applications for local businesses.',
    username: 'frank_tech',
    location: 'Up Station, Bamenda',
    experience: '5 years',
    completedProjects: 78,
    verified: true
  },
  {
    id: 'power_electric',
    name: 'Emmanuel Power',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    category: 'electrical',
    rating: 4.6,
    trustCount: 134,
    bio: 'Licensed electrician with expertise in residential and commercial electrical installations and repairs.',
    username: 'power_electric',
    location: 'Nkwen, Bamenda',
    experience: '12 years',
    completedProjects: 203,
    verified: true
  },
  {
    id: 'build_master',
    name: 'Samuel Builder',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    category: 'construction',
    rating: 4.8,
    trustCount: 98,
    bio: 'Construction contractor specializing in residential buildings, renovations, and commercial structures.',
    username: 'build_master',
    location: 'Main Market, Bamenda',
    experience: '15 years',
    completedProjects: 67,
    verified: true
  },
  {
    id: 'green_thumb',
    name: 'Grace Garden',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    category: 'landscaping',
    rating: 4.5,
    trustCount: 76,
    bio: 'Professional landscaper creating beautiful outdoor spaces with native plants and sustainable designs.',
    username: 'green_thumb',
    location: 'Mile 4, Bamenda',
    experience: '8 years',
    completedProjects: 112,
    verified: false
  },
  {
    id: 'clean_pro',
    name: 'Patricia Clean',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    category: 'cleaning',
    rating: 4.9,
    trustCount: 156,
    bio: 'Professional cleaning services for homes and offices. Eco-friendly products and reliable service.',
    username: 'clean_pro',
    location: 'Commercial Avenue, Bamenda',
    experience: '6 years',
    completedProjects: 289,
    verified: true
  },
  {
    id: 'lens_master',
    name: 'David Lens',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'photography',
    rating: 4.7,
    trustCount: 89,
    bio: 'Wedding and event photographer capturing your special moments with artistic flair and professional quality.',
    username: 'lens_master',
    location: 'Ntarikon, Bamenda',
    experience: '9 years',
    completedProjects: 234,
    verified: true
  }
];

export interface Professional {
  id: string;
  name: string;
  photo: string;
  category: string;
  rating: number;
  trustCount: number;
  bio: string;
  username: string;
  location: string;
  experience: string;
  completedProjects: number;
  verified: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}