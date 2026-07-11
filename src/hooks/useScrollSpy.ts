import { useState, useEffect } from 'react';
import type { SectionId } from '@/types';

/**
 * Tracks which section is currently active in the viewport using IntersectionObserver.
 * 
 * @param sectionIds List of HTML section IDs to track
 * @param options IntersectionObserver options
 * @returns The ID of the currently active section
 */
export function useScrollSpy(
  sectionIds: SectionId[],
  options?: IntersectionObserverInit
): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {
    const observerOptions = options ?? {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section occupies the active reading zone
      threshold: 0.1, // Trigger when at least 10% of the section is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
}
