import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { TRANSITIONS } from '@/constants';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  glow?: boolean;
  interactive?: boolean;
}

/**
 * Reusable premium Glassmorphic card surface.
 * Includes micro-animations, border glow changes, and a high-performance refractor overlay.
 */
export function GlassCard({ 
  children, 
  className, 
  glow = false,
  interactive = true,
  ...props 
}: GlassCardProps) {
  const motionProps = interactive ? {
    whileHover: { 
      y: -4, 
      boxShadow: glow 
        ? "0 12px 40px 0 rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 96, 0, 0.18)"
        : "0 12px 40px 0 rgba(0, 0, 0, 0.7)"
    },
    transition: TRANSITIONS.spring
  } : {};

  return (
    <motion.div
      className={cn(
        "glass rounded-premium-lg p-6 relative overflow-hidden",
        glow && "shadow-premium-glow border-border-orange",
        interactive && "cursor-pointer hover:border-border-secondary/60",
        className
      )}
      {...motionProps}
      {...props}
    >
      {/* Light refraction effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
export default GlassCard;
