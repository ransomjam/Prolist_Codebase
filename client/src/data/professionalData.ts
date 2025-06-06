import { 
  Building2, Wrench, Snowflake, Monitor, Printer, Laptop, 
  Globe, Palette, Video, Smartphone, Zap, Scissors, 
  Sparkles, Calendar, BarChart3, Camera, Hammer, TreePine 
} from 'lucide-react';

export const serviceCategories = [
  { id: 'architecture', name: 'Architecture & Building Design', icon: Building2, color: 'from-blue-500 to-indigo-600' },
  { id: 'plumbing', name: 'Plumbing & Pipe Repairs', icon: Wrench, color: 'from-orange-500 to-red-500' },
  { id: 'fridge-ac', name: 'Fridge & AC Repairs', icon: Snowflake, color: 'from-cyan-500 to-blue-500' },
  { id: 'electronics', name: 'Electronics Repairs (TVs, Radios, etc.)', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { id: 'printer', name: 'Printer & Copier Repairs', icon: Printer, color: 'from-gray-500 to-slate-600' },
  { id: 'computer', name: 'Laptop & Computer Repairs', icon: Laptop, color: 'from-indigo-500 to-purple-600' },
  { id: 'webdev', name: 'Web Development & Maintenance', icon: Globe, color: 'from-green-500 to-emerald-600' },
  { id: 'graphics', name: 'Graphic Design & Branding', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 'video', name: 'Video Editing & Production', icon: Video, color: 'from-red-500 to-orange-500' },
  { id: 'mobile', name: 'Mobile Phone Repairs', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
  { id: 'electrical', name: 'Electrical Installations & Repairs', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'tailoring', name: 'Tailoring & Clothing Alterations', icon: Scissors, color: 'from-purple-500 to-indigo-500' },
  { id: 'cleaning', name: 'Cleaning & Housekeeping Services', icon: Sparkles, color: 'from-teal-500 to-cyan-600' },
  { id: 'events', name: 'Event Planning & Management', icon: Calendar, color: 'from-amber-500 to-yellow-500' },
  { id: 'marketing', name: 'Digital Marketing & Social Media Management', icon: BarChart3, color: 'from-emerald-500 to-green-600' },
  { id: 'photography', name: 'Photography & Videography', icon: Camera, color: 'from-rose-500 to-pink-500' },
  { id: 'welding', name: 'Welding & Metal Fabrication', icon: Hammer, color: 'from-gray-600 to-slate-700' },
  { id: 'carpentry', name: 'Carpentry & Furniture Making', icon: TreePine, color: 'from-amber-600 to-orange-600' }
];

export const dummyProfessionals = [
  {
    id: 'john_doe',
    name: 'John Nkembi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'architecture',
    rating: 4.8,
    trustCount: 120,
    bio: 'Licensed architect specializing in modern residential and commercial designs for Bamenda.',
    username: 'john_doe',
    location: 'Commercial Avenue, Bamenda',
    experience: 10,
    rate: '50,000 FCFA/project',
    completedProjects: 45,
    verified: true
  },
  {
    id: 'marie_mbah',
    name: 'Marie Mbah',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    category: 'plumbing',
    rating: 4.9,
    trustCount: 89,
    bio: 'Professional plumber with expertise in pipe repairs and water system maintenance.',
    username: 'marie_mbah',
    location: 'Ntarikon, Bamenda',
    experience: 7,
    rate: '15,000 FCFA/hour',
    completedProjects: 156,
    verified: true
  },
  {
    id: 'frank_tech',
    name: 'Frank Ndi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    category: 'webdev',
    rating: 4.7,
    trustCount: 67,
    bio: 'Full-stack web developer creating modern websites for local businesses.',
    username: 'frank_tech',
    location: 'Up Station, Bamenda',
    experience: 5,
    rate: '75,000 FCFA/project',
    completedProjects: 78,
    verified: true
  },
  {
    id: 'power_electric',
    name: 'Emmanuel Tabe',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    category: 'electrical',
    rating: 4.6,
    trustCount: 134,
    bio: 'Licensed electrician providing electrical installations and repairs.',
    username: 'power_electric',
    location: 'Nkwen, Bamenda',
    experience: 12,
    rate: '25,000 FCFA/day',
    completedProjects: 203,
    verified: true
  },
  {
    id: 'mobile_fix',
    name: 'David Achiri',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
    category: 'mobile',
    rating: 4.7,
    trustCount: 203,
    bio: 'Mobile phone repair specialist for all brands and models.',
    username: 'mobile_fix',
    location: 'Commercial Avenue, Bamenda',
    experience: 9,
    rate: '8,000 FCFA/repair',
    completedProjects: 205,
    verified: true
  }
];

export interface Professional {
  id: string;
  name: string;
  photo: string;
  avatar: string;
  category: string;
  rating: number;
  trustCount: number;
  bio: string;
  username: string;
  location: string;
  experience: number;
  rate: string;
  completedProjects: number;
  verified: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
}