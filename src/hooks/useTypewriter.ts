import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Custom hook to create a realistic, responsive typing effect.
 * Alternates between a list of phrases.
 * Bypasses animations and displays static, rotating text if system reduced motion is enabled.
 */
export function useTypewriter(
  phrases: string[],
  typingSpeed: number = 75,
  deletingSpeed: number = 35,
  pauseDuration: number = 2200
): string {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Accessibility fallback: if user prefers reduced motion, bypass typewriter animations
    if (reducedMotion) {
      setDisplayText(phrases[currentPhraseIndex]);
      const interval = setInterval(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, pauseDuration + 1000);
      return () => clearInterval(interval);
    }

    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Character typing phase
      if (displayText.length < currentPhrase.length) {
        // Add random variation for more organic, human-like typing
        const humanDelay = typingSpeed + (Math.random() * 40 - 20);
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, Math.max(20, humanDelay));
      } else {
        // Completed typing: pause at the end of the phrase
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Character deleting phase (typically faster than typing)
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to the next phrase in sequence
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    reducedMotion
  ]);

  return displayText;
}
export default useTypewriter;
