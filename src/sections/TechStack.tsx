import React from 'react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiDocker,
  SiPython,
} from 'react-icons/si';
import { SectionContainer } from '@/layouts/SectionContainer';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

// ─── Custom REST API icon ────────────────────────────────────────────────────
function RestApiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 7h6M4 12h10M4 17h8" />
      <path d="M16 7l4 5-4 5" />
    </svg>
  );
}

// ─── Custom OpenAI icon (official logomark shape) ─────────────────────────────
function OpenAiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Technology {
  name: string;
  Icon: IconType | typeof RestApiIcon;
  color: string;
}

const TECHNOLOGIES: Technology[] = [
  { name: 'React',         Icon: SiReact,        color: '#61DAFB' },
  { name: 'TypeScript',    Icon: SiTypescript,   color: '#3178C6' },
  { name: 'JavaScript',   Icon: SiJavascript,   color: '#F7DF1E' },
  { name: 'Node.js',       Icon: SiNodedotjs,    color: '#339933' },
  { name: 'Express.js',    Icon: SiExpress,      color: '#ffffff' },
  { name: 'Tailwind CSS',  Icon: SiTailwindcss,  color: '#06B6D4' },
  { name: 'MySQL',         Icon: SiMysql,        color: '#4479A1' },
  { name: 'Git',           Icon: SiGit,          color: '#F05032' },
  { name: 'GitHub',        Icon: SiGithub,       color: '#ffffff' },
  { name: 'REST API',      Icon: RestApiIcon,    color: '#FF6000' },
  { name: 'Google Gemini', Icon: SiGooglegemini, color: '#8E75FF' },
  { name: 'OpenAI',        Icon: OpenAiIcon,     color: '#ffffff' },
  { name: 'Python',        Icon: SiPython,       color: '#3776AB' },
  { name: 'Docker',        Icon: SiDocker,       color: '#2496ED' },
];

// ─── Framer Motion variants ───────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── TechCard ────────────────────────────────────────────────────────────────
function TechCard({ tech }: { tech: Technology }) {
  const { name, Icon, color } = tech;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow:
          '0 16px 48px 0 rgba(0, 0, 0, 0.7), 0 0 36px rgba(255, 96, 0, 0.20)',
        borderColor: 'rgba(255, 96, 0, 0.30)',
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      }}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-4 px-4 py-7',
        'min-h-[132px] rounded-premium-lg cursor-pointer overflow-hidden',
        // glass base
        'bg-[rgba(14,14,18,0.65)] backdrop-blur-[16px]',
        'border border-[rgba(255,255,255,0.05)]',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]',
        'transition-colors duration-300',
      )}
    >
      {/* Orange ambient glow that blooms on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse at 50% 110%, rgba(255,96,0,0.10) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Light refraction shimmer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        style={{ color }}
        aria-hidden="true"
      >
        <Icon className="h-9 w-9 md:h-10 md:w-10 drop-shadow-sm" />
      </div>

      {/* Name */}
      <span className="relative z-10 text-[11px] font-mono font-medium uppercase tracking-wider text-text-secondary transition-colors duration-300 group-hover:text-text-primary text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function TechStack() {
  return (
    <SectionContainer id="tech-stack" className="border-t border-border-primary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="w-full space-y-14 md:space-y-16"
      >
        {/* ── Section header ── */}
        <motion.div variants={headerVariants} className="space-y-6 max-w-3xl">
          <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase">
            02. TECHNOLOGY STACK
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Technology Stack
          </h2>
          <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            The technologies I use to build scalable, production-ready web and AI applications.
          </p>
        </motion.div>

        {/* ── Card grid ── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
        >
          {TECHNOLOGIES.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
