import { SectionContainer } from '@/layouts/SectionContainer';
import { motion } from 'framer-motion';
import { MOTION_VARIANTS } from '@/constants';

export default function AIPlayground() {
  return (
    <SectionContainer id="playground" className="border-t border-border-primary">
      <motion.div
        variants={MOTION_VARIANTS.fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-6"
      >
        <span className="text-sm font-semibold tracking-widest text-orange-accent uppercase">
          04. Interactive
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          AI Playground
        </h2>
        <div className="h-[2px] w-20 bg-orange-accent rounded-premium-full" />
        <p className="max-w-3xl text-lg text-text-secondary">
          A sandboxed space designed to support browser-based model execution, interactive neural-net visualizers, and shader art.
        </p>
      </motion.div>
    </SectionContainer>
  );
}
