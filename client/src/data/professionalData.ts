import { 
  Palette, Video, Globe, FileText, BarChart3
} from 'lucide-react';

export const serviceCategories = [
  { 
    id: 'graphic-design', 
    name: 'Graphic Design & Branding', 
    icon: Palette, 
    color: 'from-pink-500 to-rose-500',
    description: 'Creative designs for logos, marketing, and branding.',
    emoji: '🎨'
  },
  { 
    id: 'video-editing', 
    name: 'Video Editing & Production', 
    icon: Video, 
    color: 'from-red-500 to-orange-500',
    description: 'Professional video editing for your projects and ads.',
    emoji: '🎬'
  },
  { 
    id: 'web-development', 
    name: 'Website Design & Development', 
    icon: Globe, 
    color: 'from-green-500 to-emerald-600',
    description: 'Modern, responsive websites tailored to your needs.',
    emoji: '💻'
  },
  { 
    id: 'resume-writing', 
    name: 'Resume/CV Writing & Career Coaching', 
    icon: FileText, 
    color: 'from-blue-500 to-indigo-600',
    description: 'Stand out with expert resume writing and career advice.',
    emoji: '📄'
  },
  { 
    id: 'data-analysis', 
    name: 'Data Analysis & Visualization', 
    icon: BarChart3, 
    color: 'from-purple-500 to-pink-500',
    description: 'Make data-driven decisions with professional analysis.',
    emoji: '📊'
  }
];

export const dummyProfessionals = [
  {
    id: 'alice_mfo',
    name: 'Alice Mfo',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b69d0e?w=150',
    category: 'graphic-design',
    rating: 4.9,
    trustCount: 120,
    bio: 'Expert in branding and logo creation with 7 years experience. Specialized in creating stunning visual identities for Bamenda businesses.',
    username: 'alice_mfo',
    location: 'Commercial Avenue, Bamenda',
    experience: 7,
    rate: '25,000 FCFA/project',
    completedProjects: 89,
    verified: true,
    services: ['Logo Design', 'Business Cards', 'Flyers', 'Social Media Graphics']
  },
  {
    id: 'jean_pierre',
    name: 'Jean Pierre',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    category: 'video-editing',
    rating: 4.7,
    trustCount: 95,
    bio: 'Video editor specializing in social media content and promotional videos for local businesses.',
    username: 'jean_pierre',
    location: 'Up Station, Bamenda',
    experience: 5,
    rate: '35,000 FCFA/project',
    completedProjects: 156,
    verified: true,
    services: ['Social Media Videos', 'Promotional Videos', 'Event Coverage', 'YouTube Content']
  },
  {
    id: 'frank_tech',
    name: 'Frank Ndi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    category: 'web-development',
    rating: 4.8,
    trustCount: 67,
    bio: 'Full-stack web developer creating modern, responsive websites for local businesses and startups.',
    username: 'frank_tech',
    location: 'Ntarikon, Bamenda',
    experience: 6,
    rate: '85,000 FCFA/project',
    completedProjects: 78,
    verified: true,
    services: ['Business Websites', 'E-commerce Sites', 'Landing Pages', 'Mobile Apps']
  },
  {
    id: 'mary_writer',
    name: 'Mary Asanga',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    category: 'resume-writing',
    rating: 4.9,
    trustCount: 134,
    bio: 'Professional resume writer and career coach helping job seekers land their dream positions.',
    username: 'mary_writer',
    location: 'Nkwen, Bamenda',
    experience: 8,
    rate: '15,000 FCFA/resume',
    completedProjects: 203,
    verified: true,
    services: ['Resume Writing', 'Cover Letters', 'LinkedIn Profiles', 'Career Coaching']
  },
  {
    id: 'data_paul',
    name: 'Paul Awah',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    category: 'data-analysis',
    rating: 4.6,
    trustCount: 87,
    bio: 'Data analyst and visualization expert helping businesses make informed decisions through data insights.',
    username: 'data_paul',
    location: 'Commercial Avenue, Bamenda',
    experience: 4,
    rate: '45,000 FCFA/project',
    completedProjects: 92,
    verified: true,
    services: ['Data Analysis', 'Business Intelligence', 'Report Creation', 'Dashboard Design']
  },
  {
    id: 'design_sarah',
    name: 'Sarah Fru',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    category: 'graphic-design',
    rating: 4.8,
    trustCount: 156,
    bio: 'Creative graphic designer specializing in modern branding and marketing materials for startups.',
    username: 'design_sarah',
    location: 'Up Station, Bamenda',
    experience: 6,
    rate: '30,000 FCFA/project',
    completedProjects: 112,
    verified: true,
    services: ['Brand Identity', 'Marketing Materials', 'Package Design', 'Web Graphics']
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
  services: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  emoji: string;
}