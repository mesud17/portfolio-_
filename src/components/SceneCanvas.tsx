import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
}

/**
 * A highly optimized React Three Fiber Canvas wrapper.
 * Integrates reduced-motion overrides, device pixel ratio optimization, 
 * and power-saving performance settings.
 */
export function SceneCanvas({ children, className, camera }: SceneCanvasProps) {
  const reducedMotion = useReducedMotion();

  // Disable 3D rendering if user prefers reduced motion to prevent motion sickness and save CPU cycles
  if (reducedMotion) {
    return (
      <div 
        className={cn("flex items-center justify-center text-text-muted text-xs font-mono border border-border-primary rounded-premium-lg bg-bg-secondary/40", className)}
        aria-label="3D animation disabled due to system motion preference"
      >
        [ 3D Render Disabled ]
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: false
        }}
        dpr={[1, 1.5]} // Performance optimization: Cap pixel-ratio at 1.5x to prevent lag on 4K/retina displays
        camera={camera ?? { position: [0, 0, 5], fov: 50 }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
export default SceneCanvas;
