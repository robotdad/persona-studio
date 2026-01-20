
export interface ImageMetadata {
  character?: string;
  costume_phase?: string;
  fabrication_time?: string;
  primary_materials?: string | string[];
  technique?: string;
  design_phase?: string;
  build_phase?: string;
  timeframe?: string;
  photographer?: string;
  performance_date?: string;
  scene?: string;
  artisans?: string[];
  photography?: any;
  [key: string]: any;
}

export interface PhotoSpec {
  id: string;
  filepath: string; // Full relative path e.g. "profile/headshot.jpg"
  filename: string; // Just the name for display if needed, but filepath is key
  type?: string; // e.g. 'headshot_primary', 'selfie'
  prompt: string;
  caption: string;
  title?: string;
  altText?: string;
  detailedDescription: string;
  tags: string[];
  isFeatured: boolean; // "Featured" in JSON
  isIdentity: boolean; // If true, requires the specific persona face
  status: 'pending' | 'generating' | 'completed' | 'error';
  url?: string;
  error?: string;
  imageMetadata?: ImageMetadata;
}

export interface ProjectDetails {
  role?: string;
  venue?: string;
  location?: string;
  year?: number;
  runDates?: string;
  performances?: number;
  budget?: string;
  timeline?: string;
  scale?: string;
  team?: any;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  projectDetails?: ProjectDetails;
  projectContent?: any;
  challenges?: string[];
  techniques?: string[];
  recognition?: any;
  photos: PhotoSpec[];
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryContent?: any;
  statistics?: any;
  featuredPhoto?: string;
  projects: Project[];
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  basePrompt: string;
  location?: string;
  bio?: string;
  contact?: any;
  yearsActive?: string;
  professionalAffiliations?: string[];
  profileImages: PhotoSpec[]; 
  categories: CategoryData[];
}

export type ModelType = 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview';
