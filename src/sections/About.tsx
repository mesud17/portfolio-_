import { SectionContainer } from '@/layouts/SectionContainer';
import { GlassCard } from '@/components';
import { motion } from 'framer-motion';

const ABOUT_CARDS = [
  {
    title: 'AI Development',
    description:
      'Designing and integrating intelligent features — from LLM-powered workflows to practical automation that enhances real products.',
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'Building end-to-end systems with modern frontends, robust backends, and well-structured databases that scale with the product.',
  },
  {
    title: 'Performance',
    description:
      'Optimizing load times, rendering, and architecture so applications stay fast, responsive, and reliable under real-world usage.',
  },
  {
    title: 'Continuous Learning',
    description:
      'Staying current with modern tools, frameworks, and AI practices to keep solutions sharp, maintainable, and future-ready.',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  return (
    <SectionContainer id="about" className="border-t border-border-primary pb-24 pt-24">
      {/* Background Ambience Glow */}
      <div className="absolute top-[30%] right-[-10%] w-72 h-72 rounded-full bg-[rgba(255,96,0,0.015)] blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full max-w-6xl mx-auto"
      >
        {/* Left Column — Portrait image in glassmorphic frame */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 w-full flex justify-center lg:justify-start"
        >
          <div className="relative group p-3 rounded-2xl md:rounded-premium-xl 
            bg-[rgba(14,14,18,0.45)] backdrop-blur-md 
            border border-[rgba(255,255,255,0.06)] 
            shadow-glass transition-all duration-500 
            hover:shadow-premium-glow hover:border-[rgba(255,96,0,0.22)] 
            w-full max-w-sm md:max-w-md lg:max-w-full aspect-[4/5] overflow-hidden"
          >
            {/* Ambient inner soft orange gradient on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-[rgba(255,96,0,0.08)] to-transparent pointer-events-none z-10" 
              aria-hidden="true"
            />
            
            {/* Portrait Image */}
            <img 
              src="/profile-image.jpg" 
              alt="Mesud - Professional Portrait" 
              className="w-full h-full object-cover rounded-xl md:rounded-premium-lg 
                grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] 
                scale-[1.02] group-hover:scale-100"
              loading="lazy"
            />
            
            {/* AI startup style tech corner visual markers */}
            <div className="absolute top-5 left-5 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-orange-accent/60 transition-colors duration-500 z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-5 right-5 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-orange-accent/60 transition-colors duration-500 z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-orange-accent/60 transition-colors duration-500 z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 right-5 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-orange-accent/60 transition-colors duration-500 z-10 pointer-events-none" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Right Column — Text introduction + Grid of Cards */}
        <div className="lg:col-span-7 space-y-10 w-full">
          {/* Main Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase font-mono block">
                01. Overview
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-text-primary">
                About Me
              </h2>
              <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
            </div>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed font-sans">
              I enjoy building AI-powered web applications that solve real problems.
              I focus on writing clean, scalable code while creating modern, responsive,
              and user-friendly experiences. I believe good software combines strong
              engineering with thoughtful design.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          >
            {ABOUT_CARDS.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <GlassCard
                  className="h-full flex flex-col gap-3 p-6 md:p-7"
                  interactive
                >
                  <h3 className="text-base md:text-lg font-semibold font-display text-text-primary tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
