import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion, useTypewriter } from '@/hooks';
import { SceneCanvas, NetworkNodes } from '@/components';

// Custom inline SVG icons to ensure cross-platform rendering independent of lucide-react versions
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const TYPING_PHRASES = [
  "Building intelligent web experiences.",
  "Designing scalable AI systems.",
  "Turning complex ideas into elegant products.",
  "Engineering software for real-world impact."
];

/**
 * Static SVG network graph fallback when reduced-motion is requested 
 * or WebGL is disabled. Ensures visual continuity and performance.
 */
function StaticNetworkFallback() {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center relative select-none">
      <svg className="w-4/5 h-4/5 opacity-40 text-orange-accent/40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connecting Lines */}
        <line x1="200" y1="200" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="200" x2="300" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="200" x2="260" y2="280" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="200" x2="140" y2="280" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="200" x2="60" y2="250" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="200" x2="340" y2="250" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        
        <line x1="100" y1="100" x2="300" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="300" y1="100" x2="340" y2="250" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="260" y1="280" x2="140" y2="280" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="60" y1="250" x2="140" y2="280" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

        {/* Nodes */}
        {/* Core AI */}
        <circle cx="200" cy="200" r="16" fill="currentColor" className="text-orange-accent" />
        <circle cx="200" cy="200" r="26" stroke="currentColor" strokeWidth="1" className="text-orange-accent/40 animate-pulse" />
        
        {/* Secondary Nodes */}
        <circle cx="100" cy="100" r="6" fill="#9ca3af" />
        <circle cx="300" cy="100" r="6" fill="#9ca3af" />
        <circle cx="260" cy="280" r="6" fill="#6b7280" />
        <circle cx="140" cy="280" r="6" fill="#6b7280" />
        <circle cx="60" cy="250" r="6" fill="#6b7280" />
        <circle cx="340" cy="250" r="6" fill="#6b7280" />
      </svg>
      
      {/* Overlay Labels */}
      <div className="absolute top-[20%] left-[15%] px-2 py-0.5 rounded border border-white/[0.04] bg-[#0e0e12]/80 text-text-secondary text-[9px] font-mono font-semibold uppercase">
        Frontend UI
      </div>
      <div className="absolute top-[20%] right-[15%] px-2 py-0.5 rounded border border-white/[0.04] bg-[#0e0e12]/80 text-text-secondary text-[9px] font-mono font-semibold uppercase">
        Backend Core
      </div>
      <div className="absolute top-[45%] left-[36%] px-2 py-0.5 rounded border border-orange-accent/35 bg-orange-accent-dim/40 text-orange-accent text-[9px] font-mono font-semibold uppercase shadow-[0_0_12px_rgba(255,96,0,0.15)]">
        Core AI Engine
      </div>
      <div className="absolute bottom-[25%] left-[20%] px-2 py-0.5 rounded border border-white/[0.04] bg-[#0e0e12]/80 text-text-secondary text-[9px] font-mono font-semibold uppercase">
        Cloud Infra
      </div>
      <div className="absolute bottom-[25%] right-[20%] px-2 py-0.5 rounded border border-white/[0.04] bg-[#0e0e12]/80 text-text-secondary text-[9px] font-mono font-semibold uppercase">
        Vector DB
      </div>
      <div className="absolute bottom-[35%] left-[2%] px-2 py-0.5 rounded border border-white/[0.04] bg-[#0e0e12]/80 text-text-secondary text-[9px] font-mono font-semibold uppercase">
        API Gateway
      </div>
    </div>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const typedText = useTypewriter(TYPING_PHRASES);

  // Transition variants for staggered loading entries
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const // premium easeOutExpo curve
      }
    }
  };

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#about');
    }
  };

  const handleCTAWorkClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('projects');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#projects');
    }
  };

  const handleCTAConnectClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction Screen"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#08080a]" aria-hidden="true">
        {/* Layer 1 & 2: Radial Gradient Background & Radial Lighting Glow */}
        <div className="absolute inset-0 radial-glow-hero bg-[radial-gradient(circle_at_center,var(--color-bg-secondary)_0%,var(--color-bg-primary)_100%)] opacity-95" />
        
        {/* Layer 4: Blueprint Blueprint Grid System */}
        <div className="absolute inset-0 blueprint-grid-sub opacity-[0.4]" />
        <div className="absolute inset-0 blueprint-grid opacity-[0.25]" />
        
        {/* Layer 3: Animated Soft Noise overlay */}
        <div className="noise-overlay-container" />
      </div>

      {/* ================= LAYOUT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)] pt-24 pb-20 lg:pt-0 lg:pb-0">
        
        {/* LEFT COLUMN: Hero content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left"
        >
          {/* Tagline Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-medium text-orange-accent bg-orange-accent-dim border border-border-orange/20 rounded-premium-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-accent animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Primary Name Header */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-display">
              Mesud Ali
            </h1>
            <h2 className="text-xl md:text-2xl font-bold font-display text-gradient-gray">
              AI-Powered Full-Stack Engineer
            </h2>
          </motion.div>

          {/* Typewriter Terminal Console Line */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center h-8 font-mono text-xs md:text-sm text-text-secondary select-none"
          >
            <span className="text-orange-accent mr-2">&gt;</span>
            <span>{typedText}</span>
            <span className="w-1.5 h-3.5 bg-orange-accent ml-1 typewriter-cursor" />
          </motion.div>

          {/* Supporting Statement */}
          <motion.div variants={itemVariants}>
            <p className="max-w-md text-sm md:text-base text-text-secondary leading-relaxed font-sans">
              Focus on building production-ready web applications powered by modern AI technologies.
              Committing to craftsmanship, scalability, high performance, and user-centered design.
            </p>
          </motion.div>

          {/* Call To Actions Wrapper */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Filled CTA */}
            <a
              href="#projects"
              onClick={handleCTAWorkClick}
              className="px-6 py-3 rounded-premium-md bg-orange-accent hover:bg-orange-accent-hover text-[#08080a] font-semibold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,96,0,0.35)] transition-all duration-300 transform active:scale-95 flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
            >
              <span>View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Secondary Glassmorphic CTA */}
            <a
              href="#contact"
              onClick={handleCTAConnectClick}
              className="px-6 py-3 rounded-premium-md border border-border-secondary bg-[#0e0e12]/40 text-text-primary hover:text-orange-accent hover:border-orange-accent/30 font-semibold text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 glass hover:shadow-premium-glow flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
            >
              <span>Let's Connect</span>
            </a>
          </motion.div>

          {/* Social Links Panel */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com/mesud17"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/30 text-text-secondary hover:text-orange-accent hover:border-border-orange/20 glass hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mesud-ali-a823ba409"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/30 text-text-secondary hover:text-orange-accent hover:border-border-orange/20 glass hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:mesud@example.com"
              className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/30 text-text-secondary hover:text-orange-accent hover:border-border-orange/20 glass hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
              aria-label="Send Email Link"
            >
              <MailIcon className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Understated Trust Indicator */}
          <motion.div variants={itemVariants} className="border-t border-white/[0.04] pt-6 mt-4 w-full">
            <p className="text-[11px] font-mono text-text-muted leading-relaxed max-w-sm">
              Building modern, scalable, AI-powered applications with a focus on performance and user experience.
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: R3F Network Diagram Visualization */}
        <div className="lg:col-span-6 w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center relative">
          {reducedMotion ? (
            <StaticNetworkFallback />
          ) : (
            <Suspense fallback={<StaticNetworkFallback />}>
              <SceneCanvas 
                camera={{ position: [0, 0, 4.2], fov: 60 }} 
                className="w-full h-full"
              >
                <NetworkNodes />
              </SceneCanvas>
            </Suspense>
          )}
        </div>
      </div>

      {/* ================= SCROLL CUE INDICATOR ================= */}
      <a
        href="#about"
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent p-1"
        aria-label="Scroll to About section"
      >
        <div className="w-5 h-8 border border-text-muted/60 rounded-premium-full p-1 flex justify-center group-hover:border-orange-accent transition-colors duration-300">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 bg-text-muted group-hover:bg-orange-accent rounded-premium-full transition-colors duration-300"
          />
        </div>
        <span className="text-[8px] font-mono text-text-muted tracking-[0.2em] uppercase group-hover:text-text-primary transition-colors duration-300">
          Scroll
        </span>
      </a>
    </section>
  );
}

export default Hero;
