import React from 'react';
import type { SectionProps } from '@/types';
import { cn } from '@/utils/cn';

interface SectionContainerProps extends SectionProps {
  children: React.ReactNode;
}

/**
 * Standard layout wrapper for all sections.
 * Handles responsive layout grids, padding, accessibility landmarks, and consistent spacing.
 */
export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section
      id={id}
      data-section
      className={cn(
        "relative flex min-h-screen w-full flex-col justify-center px-6 py-20 md:px-12 lg:px-24",
        "max-w-7xl mx-auto focus:outline-none scroll-mt-20",
        className
      )}
      tabIndex={-1}
      aria-label={`${id.charAt(0).toUpperCase() + id.slice(1)} Section`}
    >
      {children}
    </section>
  );
}
