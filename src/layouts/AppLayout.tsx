import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ITEMS } from '@/constants';
import { useScrollSpy } from '@/hooks';
import { ScrollProgress } from '@/components';
import { cn } from '@/utils/cn';

// Custom inline SVG icons for social platforms inside mobile drawer
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Motion SVG path helper for hamburger transition
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Structural layout shell that provides the primary navigation system.
 * Features scroll-driven floating header states, mobile fullscreen glass menus,
 * lock body scrolls, and keyboard accessibility.
 */
export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track active section using custom IntersectionObserver scroll spy
  const activeSection = useScrollSpy(NAVIGATION_ITEMS.map((item) => item.id));

  // Detect page scroll to switch between transparent and floating glass navbar states
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock document body scroll when fullscreen mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle accessibility keydown triggers (closes drawer on Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
      // Update hash without screen snap
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Header Animation States: transforms into a floating rounded glass pill on scroll
  const headerVariants = {
    top: {
      y: 0,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0px",
      backgroundColor: "rgba(8, 8, 10, 0)",
      borderColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      paddingLeft: "24px",
      paddingRight: "24px",
      height: "80px", // Comfortably padded height
    },
    scrolled: {
      y: 16,
      width: "calc(100% - 2rem)",
      maxWidth: "1120px", // Align with layout max-w-6xl
      borderRadius: "16px",
      backgroundColor: "rgba(14, 14, 18, 0.75)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.45), 0 0 1px 1px rgba(255, 255, 255, 0.04)",
      paddingLeft: "32px",
      paddingRight: "32px",
      height: "60px", // Floating header height
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-text-primary">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Accessibility Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-accent focus:text-bg-primary focus:font-mono focus:font-semibold focus:rounded-premium-sm focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Premium Sticky / Floating Header */}
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 -translate-x-1/2 z-sticky-nav flex items-center justify-between border-b backdrop-blur-md"
      >
        {/* Typographic Logo with Connected Nodes Geometry Mark */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')} 
          className="flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="Mesud - Home"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-accent group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <circle cx="6" cy="17" r="2" fill="currentColor" />
              <circle cx="18" cy="17" r="2" fill="currentColor" />
              <line x1="12" y1="7" x2="6.5" y2="15" />
              <line x1="12" y1="7" x2="17.5" y2="15" />
              <line x1="8" y1="17" x2="16" y2="17" />
            </svg>
          </div>
          <span className="font-display font-bold tracking-tight text-white group-hover:text-gradient-orange transition-all duration-300 text-lg">
            Mesud
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider relative py-2 transition-colors duration-300 focus-visible:outline-none",
                  isActive ? "text-orange-accent" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-accent rounded-premium-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-5 py-2 text-xs font-semibold font-mono uppercase tracking-wider text-[#08080a] bg-orange-accent rounded-premium-md hover:bg-orange-accent-hover hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,96,0,0.35)] transition-all duration-300 transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent focus-visible:ring-offset-2"
          >
            Let's Talk
          </a>
        </div>

        {/* Premium Mobile Menu Morph Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 md:hidden text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent rounded-premium-sm relative z-tooltip"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-text-primary">
            <Path
              variants={{
                closed: { d: "M 2 4.5 L 18 4.5" },
                open: { d: "M 3 16.5 L 17 3.5" }
              }}
              animate={mobileMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <Path
              d="M 2 9.5 L 18 9.5"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              animate={mobileMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
            />
            <Path
              variants={{
                closed: { d: "M 2 14.5 L 18 14.5" },
                open: { d: "M 3 3.5 L 17 16.5" }
              }}
              animate={mobileMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>
      </motion.header>

      {/* Fullscreen Mobile Drawer Glass Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-screen h-screen bg-[#08080a]/92 backdrop-blur-2xl z-overlay flex flex-col p-8 pt-28 justify-between md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Nav Menu Links */}
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation links">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "text-2xl font-display font-medium py-2 border-b border-white/[0.04] transition-all duration-300 focus-visible:outline-none focus-visible:text-orange-accent",
                      isActive ? "text-orange-accent pl-2 border-orange-accent/30" : "text-text-secondary pl-0 hover:text-text-primary"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Bottom Actions Panel */}
            <div className="flex flex-col gap-8">
              {/* Mobile CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full text-center py-3.5 font-display font-semibold uppercase tracking-wider text-[#08080a] bg-orange-accent rounded-premium-lg hover:bg-orange-accent-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-accent"
              >
                Let's Talk
              </a>

              {/* Mobile Socials */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.04]" aria-label="Social profiles">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/40 text-text-secondary hover:text-orange-accent hover:border-orange-accent/30 glass transition-colors duration-300"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/40 text-text-secondary hover:text-orange-accent hover:border-orange-accent/30 glass transition-colors duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:mesud@example.com" 
                  className="p-2.5 rounded-premium-md border border-border-secondary bg-[#0e0e12]/40 text-text-secondary hover:text-orange-accent hover:border-orange-accent/30 glass transition-colors duration-300"
                  aria-label="Send Email"
                >
                  <MailIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main id="main-content" className="pt-20 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {/* Unified Footer */}
      <footer className="border-t border-white/[0.04] bg-[#0e0e12] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <circle cx="6" cy="17" r="2" fill="currentColor" />
              <circle cx="18" cy="17" r="2" fill="currentColor" />
              <line x1="12" y1="7" x2="6.5" y2="15" />
              <line x1="12" y1="7" x2="17.5" y2="15" />
              <line x1="8" y1="17" x2="16" y2="17" />
            </svg>
            <span className="font-display font-bold text-sm tracking-tight text-text-secondary">
              Mesud
            </span>
          </div>
          <p className="text-xs text-text-muted font-mono">
            &copy; {new Date().getFullYear()} Mesud. Built with React 19, R3F & Tailwind CSS v4.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-text-secondary">
            <a href="https://github.com" className="hover:text-orange-accent transition-colors">GITHUB</a>
            <span className="text-[#16161d]">/</span>
            <a href="https://linkedin.com" className="hover:text-orange-accent transition-colors">LINKEDIN</a>
            <span className="text-[#16161d]">/</span>
            <a href="#" className="hover:text-orange-accent transition-colors">RESUME</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
