import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Performant scroll progress indicator that runs on the GPU.
 * Displays a thin, spring-animated progress bar at the very top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-orange-accent origin-left z-tooltip"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
