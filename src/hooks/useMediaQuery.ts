import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if a specific CSS media query matches in JavaScript.
 * Useful for adjusting Three.js layout configurations or pixel ratios.
 * 
 * @param query CSS media query (e.g. '(min-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
