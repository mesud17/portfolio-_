export type SectionId = 
  | 'hero' 
  | 'about' 
  | 'tech-stack'
  | 'skills' 
  | 'projects' 
  | 'ai-engineering'
  | 'playground' 
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
  href: string;
}

export type Theme = 'dark' | 'light';

export interface SectionProps {
  id: SectionId;
  className?: string;
}
