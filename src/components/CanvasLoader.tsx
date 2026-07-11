import { Html, useProgress } from '@react-three/drei';

/**
 * A fallback loader for Three.js assets.
 * Placed inside a R3F Canvas and React.Suspense boundary.
 */
export function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html
      center
      as="div"
      className="flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center p-6 rounded-premium-lg glass border border-border-orange bg-bg-secondary/90 max-w-[180px]">
        <div 
          className="w-8 h-8 border-2 border-orange-accent border-t-transparent rounded-premium-full animate-spin mb-3"
          role="status"
          aria-label="Loading 3D asset"
        />
        <span className="text-xs font-mono font-medium text-orange-accent tracking-wider">
          {progress.toFixed(0)}% LOADED
        </span>
      </div>
    </Html>
  );
}
