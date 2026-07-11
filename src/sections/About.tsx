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
    <SectionContainer id="about" className="border-t border-border-primary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full"
      >
        {/* Left — Introduction */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase">
              01. Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              About Me
            </h2>
            <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
            I enjoy building AI-powered web applications that solve real problems.
            I focus on writing clean, scalable code while creating modern, responsive,
            and user-friendly experiences. I believe good software combines strong
            engineering with thoughtful design.
          </p>
        </motion.div>

        {/* Right — Glass cards */}
        <motion.div
          variants={containerVariants}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
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
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
