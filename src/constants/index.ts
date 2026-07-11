import type { NavItem } from '@/types'

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'hero',           label: 'Home',       href: '#hero' },
  { id: 'about',          label: 'About',      href: '#about' },
  { id: 'tech-stack',     label: 'Stack',      href: '#tech-stack' },
  { id: 'projects',       label: 'Work',       href: '#projects' },
  { id: 'ai-engineering', label: 'AI',         href: '#ai-engineering' },
  { id: 'playground',     label: 'AI Lab',     href: '#playground' },
  { id: 'contact',        label: 'Contact',    href: '#contact' },
];

export const TRANSITIONS = {
  spring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  premium: {
    ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo / easePremium
    duration: 0.8,
  },
  hover: {
    ease: 'easeInOut',
    duration: 0.2,
  },
} as const;

export const MOTION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  }
};
