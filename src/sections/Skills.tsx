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
import { GlassCard } from '@/components';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function RestApiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7h6M4 12h10M4 17h8" />
      <path d="M16 7l4 5-4 5" />
    </svg>
  );
}

function OpenaiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M21 9H3M21 15H3M12 3v18" />
      <circle cx="12" cy="9" r="2" fill="currentColor" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

interface Technology {
  name: string;
  Icon: IconType | typeof RestApiIcon | typeof OpenaiIcon;
  color: string;
  placeholder?: boolean;
}

const TECHNOLOGIES: Technology[] = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', Icon: SiExpress, color: '#FFFFFF' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
  { name: 'REST API', Icon: RestApiIcon, color: '#FF6000' },
  { name: 'OpenAI', Icon: OpenaiIcon, color: '#FFFFFF' },
  { name: 'Google Gemini', Icon: SiGooglegemini, color: '#8E75FF' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED', placeholder: true },
  { name: 'Python', Icon: SiPython, color: '#3776AB', placeholder: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface TechCardProps {
  tech: Technology;
}

function TechCard({ tech }: TechCardProps) {
  const { name, Icon, color, placeholder } = tech;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassCard
        glow
        interactive
        className={cn(
          'group flex h-full min-h-[132px] flex-col items-center justify-center gap-4 px-4 py-7 text-center',
          placeholder && 'opacity-80'
        )}
      >
        <div
          className="flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{ color }}
        >
          <Icon className="h-9 w-9 md:h-10 md:w-10" aria-hidden="true" />
        </div>
        <span className="text-xs font-medium font-mono uppercase tracking-wider text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
          {name}
        </span>
      </GlassCard>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionContainer id="skills" className="border-t border-border-primary">


      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="w-full space-y-12 md:space-y-16"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="space-y-6 max-w-3xl">
          <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase">
            02. Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Technology Stack
          </h2>
          <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            The technologies I use to build scalable, production-ready AI applications.
          </p>
        </motion.div>

        {/* Technology grid */}
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
