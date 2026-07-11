import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from '@/layouts/SectionContainer';

// ─── Custom inline SVG icons ──────────────────────────────────────────────────
// Using self-contained SVGs to avoid library version issues (same pattern as Hero).

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);

const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2M20 14h2M9 13v2M15 13v2" />
  </svg>
);

// ─── Card data ────────────────────────────────────────────────────────────────
interface AICapability {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Tailwind color class for the icon */
  iconColor: string;
  /** Subtle tinted ring stop colour for the icon wrapper */
  ringColor: string;
}

const AI_CAPABILITIES: AICapability[] = [
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description:
      'Integrating OpenAI and Google Gemini APIs to build intelligent user experiences that feel natural and responsive.',
    Icon: BrainIcon,
    iconColor: '#ff6000',
    ringColor: 'rgba(255,96,0,0.15)',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description:
      'Designing structured prompts that produce reliable and consistent AI responses across a range of use cases.',
    Icon: MessageSquareIcon,
    iconColor: '#a78bfa',
    ringColor: 'rgba(167,139,250,0.15)',
  },
  {
    id: 'semantic-search',
    title: 'Semantic Search',
    description:
      'Using embeddings and similarity search to improve search quality and surface the most relevant content for users.',
    Icon: SearchIcon,
    iconColor: '#38bdf8',
    ringColor: 'rgba(56,189,248,0.15)',
  },
  {
    id: 'automation',
    title: 'Automation',
    description:
      'Building AI-powered workflows that automate repetitive tasks, reduce manual effort, and improve overall productivity.',
    Icon: BotIcon,
    iconColor: '#34d399',
    ringColor: 'rgba(52,211,153,0.15)',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Capability card ──────────────────────────────────────────────────────────
function CapabilityCard({ cap }: { cap: AICapability }) {
  const { title, description, Icon, iconColor, ringColor } = cap;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow:
          '0 18px 48px 0 rgba(0,0,0,0.72), 0 0 36px rgba(255,96,0,0.14)',
        borderColor: 'rgba(255,96,0,0.26)',
        transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group relative flex flex-col gap-5 p-6 md:p-7 rounded-premium-lg
        bg-[rgba(14,14,18,0.65)] backdrop-blur-[16px]
        border border-[rgba(255,255,255,0.05)]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
        transition-colors duration-300 overflow-hidden"
    >
      {/* Ambient orange glow from bottom on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse at 50% 115%, rgba(255,96,0,0.10) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Light refraction shimmer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Icon wrapper */}
      <div
        className="relative z-10 w-12 h-12 flex items-center justify-center rounded-premium-md
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:scale-110"
        style={{
          background: ringColor,
          border: `1px solid ${ringColor}`,
        }}
        aria-hidden="true"
      >
        <Icon
          className="w-6 h-6"
          style={{ color: iconColor }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-2.5">
        <h3 className="text-base md:text-lg font-bold font-display tracking-tight text-text-primary group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent line — grows on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-accent/0 via-orange-accent to-orange-accent/0 rounded-b-premium-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function AIEngineering() {
  return (
    <SectionContainer id="ai-engineering" className="border-t border-border-primary">
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
            04. AI ENGINEERING
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Building Intelligent Applications
          </h2>
          <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            I build AI-powered applications that combine modern web technologies with
            intelligent features to solve real-world problems.
          </p>
        </motion.div>

        {/* ── Capability grid ── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
        >
          {AI_CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.id} cap={cap} />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
