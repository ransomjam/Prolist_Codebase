export const serviceCategories = [
  { id: 'architecture', name: 'Architecture & Building Design', icon: '🏗️', color: 'from-blue-500 to-indigo-600' },
  { id: 'plumbing', name: 'Plumbing & Pipe Repairs', icon: '🔧', color: 'from-orange-500 to-red-500' },
  { id: 'fridge-ac', name: 'Fridge & AC Repairs', icon: '❄️', color: 'from-cyan-500 to-blue-500' },
  { id: 'electronics', name: 'Electronics Repairs (TVs, Radios, etc.)', icon: '📺', color: 'from-purple-500 to-pink-500' },
  { id: 'printer', name: 'Printer & Copier Repairs', icon: '🖨️', color: 'from-gray-500 to-slate-600' },
  { id: 'computer', name: 'Laptop & Computer Repairs', icon: '💻', color: 'from-indigo-500 to-purple-600' },
  { id: 'webdev', name: 'Web Development & Maintenance', icon: '🌐', color: 'from-green-500 to-emerald-600' },
  { id: 'graphics', name: 'Graphic Design & Branding', icon: '🎨', color: 'from-pink-500 to-rose-500' },
  { id: 'video', name: 'Video Editing & Production', icon: '🎬', color: 'from-red-500 to-orange-500' },
  { id: 'mobile', name: 'Mobile Phone Repairs', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { id: 'electrical', name: 'Electrical Installations & Repairs', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  { id: 'tailoring', name: 'Tailoring & Clothing Alterations', icon: '✂️', color: 'from-purple-500 to-indigo-500' },
  { id: 'cleaning', name: 'Cleaning & Housekeeping Services', icon: '🧽', color: 'from-teal-500 to-cyan-600' },
  { id: 'events', name: 'Event Planning & Management', icon: '🎉', color: 'from-amber-500 to-yellow-500' },
  { id: 'marketing', name: 'Digital Marketing & Social Media Management', icon: '📊', color: 'from-emerald-500 to-green-600' },
  { id: 'photography', name: 'Photography & Videography', icon: '📸', color: 'from-rose-500 to-pink-500' },
  { id: 'welding', name: 'Welding & Metal Fabrication', icon: '🔨', color: 'from-gray-600 to-slate-700' },
  { id: 'carpentry', name: 'Carpentry & Furniture Making', icon: '🪵', color: 'from-amber-600 to-orange-600' }
];

export const dummyProfessionals = [
  {
    id: 'john_doe',
    name: 'John Nkembi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'architecture',
    rating: 4.8,
    trustCount: 120,
    bio: 'Licensed architect specializing in modern residential and commercial designs for Bamenda. Expert in local building codes and sustainable construction.',
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
    bio: 'Professional plumber with expertise in pipe repairs, installations, and water system maintenance. Available for emergency repairs.',
    username: 'marie_mbah',
    location: 'Ntarikon, Bamenda',
    experience: '7 years',
    completedProjects: 156,
    verified: true
  },
  {
    id: 'frank_tech',
    name: 'Frank Ndi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    category: 'webdev',
    rating: 4.7,
    trustCount: 67,
    bio: 'Full-stack web developer creating modern websites and applications for local businesses. Specializes in e-commerce and business automation.',
    username: 'frank_tech',
    location: 'Up Station, Bamenda',
    experience: '5 years',
    completedProjects: 78,
    verified: true
  },
  {
    id: 'power_electric',
    name: 'Emmanuel Tabe',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    category: 'electrical',
    rating: 4.6,
    trustCount: 134,
    bio: 'Licensed electrician providing electrical installations, repairs, and maintenance for homes and businesses in Bamenda.',
    username: 'power_electric',
    location: 'Nkwen, Bamenda',
    experience: '12 years',
    completedProjects: 203,
    verified: true
  },
  {
    id: 'fridge_master',
    name: 'Peter Foncha',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    category: 'fridge-ac',
    rating: 4.8,
    trustCount: 98,
    bio: 'Specialist in refrigerator and air conditioning repairs. Expert with all major brands and models. Quick and reliable service.',
    username: 'fridge_master',
    location: 'Main Market, Bamenda',
    experience: '8 years',
    completedProjects: 187,
    verified: true
  },
  {
    id: 'tech_repair',
    name: 'Grace Che',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    category: 'electronics',
    rating: 4.5,
    trustCount: 76,
    bio: 'Electronics repair specialist for TVs, radios, speakers, and home appliances. Fast diagnosis and affordable repairs.',
    username: 'tech_repair',
    location: 'Mile 4, Bamenda',
    experience: '6 years',
    completedProjects: 234,
    verified: false
  },
  {
    id: 'clean_pro',
    name: 'Patricia Yuh',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    category: 'cleaning',
    rating: 4.9,
    trustCount: 156,
    bio: 'Professional cleaning and housekeeping services for homes and offices. Reliable, thorough, and uses eco-friendly products.',
    username: 'clean_pro',
    location: 'Commercial Avenue, Bamenda',
    experience: '4 years',
    completedProjects: 289,
    verified: true
  },
  {
    id: 'lens_master',
    name: 'David Tamfu',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'photography',
    rating: 4.7,
    trustCount: 89,
    bio: 'Professional photographer and videographer specializing in weddings, events, and corporate photography in Bamenda.',
    username: 'lens_master',
    location: 'Ntarikon, Bamenda',
    experience: '9 years',
    completedProjects: 156,
    verified: true
  },
  {
    id: 'mobile_fix',
    name: 'Collins Fon',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    category: 'mobile',
    rating: 4.6,
    trustCount: 143,
    bio: 'Mobile phone repair specialist. Screen replacements, battery changes, software issues, and water damage repairs for all phone brands.',
    username: 'mobile_fix',
    location: 'Food Market, Bamenda',
    experience: '5 years',
    completedProjects: 312,
    verified: true
  },
  {
    id: 'tailor_pro',
    name: 'Beatrice Ngam',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    category: 'tailoring',
    rating: 4.8,
    trustCount: 167,
    bio: 'Expert tailor specializing in traditional and modern clothing. Alterations, custom designs, and fashion consulting services.',
    username: 'tailor_pro',
    location: 'Nkwen, Bamenda',
    experience: '11 years',
    completedProjects: 523,
    verified: true
  },
  {
    id: 'computer_doc',
    name: 'Samuel Tebug',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    category: 'computer',
    rating: 4.7,
    trustCount: 92,
    bio: 'Computer and laptop repair technician. Hardware repairs, software installation, virus removal, and system optimization.',
    username: 'computer_doc',
    location: 'Commercial Avenue, Bamenda',
    experience: '7 years',
    completedProjects: 198,
    verified: true
  },
  {
    id: 'event_queen',
    name: 'Florence Nji',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    category: 'events',
    rating: 4.9,
    trustCount: 134,
    bio: 'Professional event planner and manager. Weddings, corporate events, birthdays, and cultural celebrations. Full-service planning.',
    username: 'event_queen',
    location: 'Up Station, Bamenda',
    experience: '8 years',
    completedProjects: 87,
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