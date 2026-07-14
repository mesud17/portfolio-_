import React from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from '@/layouts/SectionContainer';

// ─── Inline SVG icons ────────────────────────────────────────────────────────
const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// ─── Project data ─────────────────────────────────────────────────────────────
// Replace the placeholder URLs and content below when ready.
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techBadges: string[];
  featureBadges: { label: string; accent?: boolean }[];
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: 'ai-forum',
    title: 'AI Forum',
    description:
      'A community discussion platform powered by AI — threads get smart summaries, replies are enriched with LLM suggestions, and the feed is ranked by contextual relevance.',
    image: '/forum-image.png',
    techBadges: ['React', 'Node.js', 'Express.js', 'MySQL', 'Google Gemini'],
    featureBadges: [
      { label: 'AI-Powered', accent: true },
      { label: 'Full-Stack' },
      { label: 'REST API' },
    ],
    liveUrl: 'https://ai-integrated-evangadi-forum.vercel.app/',
    githubUrl: 'https://github.com/mesud17/AI-Integrated-Evangadi-Forum',
  },
  {
    id: 'ai-chatgpt-clone',
    title: 'AI ChatGPT Clone',
    description:
      'A production-grade conversational AI interface with streaming responses, multi-session history, and a fully responsive glassmorphism UI built on the OpenAI API.',
    image: '/ChatGPT-image.png',
    techBadges: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI', 'Node.js'],
    featureBadges: [
      { label: 'Gemini API', accent: true },
      { label: 'Streaming' },
    ],
    liveUrl: 'https://gpt-clone-mu-five.vercel.app/',
    githubUrl: 'https://github.com/mesud17/GPT-clone',
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    description:
      'A pixel-faithful Netflix frontend clone with dynamic movie browsing via TMDB, category rows, a hero banner, and smooth responsive layouts across all screen sizes.',
    image: '/netflix-image.png',
    techBadges: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
    featureBadges: [
      { label: 'TMDB API', accent: true },
      { label: 'Responsive' },
    ],
    liveUrl: 'https://movie-clone-rmdq0k1my-mesud17s-projects.vercel.app/',
    githubUrl: 'https://github.com/mesud17/Netflix-clone',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow:
          '0 20px 50px 0 rgba(0,0,0,0.75), 0 0 40px rgba(255,96,0,0.16)',
        borderColor: 'rgba(255,96,0,0.28)',
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group relative flex flex-col overflow-hidden rounded-premium-lg
        bg-[rgba(14,14,18,0.65)] backdrop-blur-[16px]
        border border-[rgba(255,255,255,0.05)]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
        transition-colors duration-300 cursor-default"
      aria-label={`${project.title} project card`}
    >
      {/* Ambient orange glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-premium-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,96,0,0.09) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* ── Project image ── */}
      <div className="relative overflow-hidden aspect-[16/9] w-full shrink-0">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Gradient fade into card body */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 50%, rgba(14,14,18,0.9) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Feature badges — overlaid on image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.featureBadges.map((b) => (
            <span
              key={b.label}
              className={
                b.accent
                  ? 'px-2 py-0.5 rounded-premium-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-orange-accent text-[#08080a]'
                  : 'px-2 py-0.5 rounded-premium-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[rgba(14,14,18,0.80)] backdrop-blur-sm border border-[rgba(255,255,255,0.07)] text-text-secondary'
              }
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="relative z-10 flex flex-col gap-4 p-5 md:p-6 flex-1">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-text-primary leading-snug group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.techBadges.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-premium-sm text-[10px] font-mono font-medium uppercase tracking-wider
                bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] text-text-muted
                group-hover:border-[rgba(255,96,0,0.15)] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[rgba(255,255,255,0.05)]" />

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-premium-md
              bg-orange-accent hover:bg-orange-accent-hover
              text-[#08080a] text-[11px] font-semibold font-mono uppercase tracking-wider
              hover:shadow-[0_0_18px_rgba(255,96,0,0.35)]
              transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
            aria-label={`Live demo of ${project.title}`}
          >
            <ExternalLinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-premium-md
              border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]
              text-text-secondary hover:text-orange-accent hover:border-[rgba(255,96,0,0.30)]
              text-[11px] font-semibold font-mono uppercase tracking-wider
              transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
            aria-label={`GitHub repository for ${project.title}`}
          >
            <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function FeaturedWork() {
  return (
    <SectionContainer id="projects" className="border-t border-border-primary">
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
            03. FEATURED WORK
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Featured Work
          </h2>
          <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            A selection of projects that demonstrate my experience building modern AI-powered and full-stack applications.
          </p>
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
