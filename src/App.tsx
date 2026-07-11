import { Suspense } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Hero, About, TechStack, Projects, AIEngineering, Contact } from '@/sections';

/**
 * Main application entry shell.
 * Coordinates section rendering inside the AppLayout and manages loading suspension.
 */
function App() {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <div 
            className="flex min-h-screen w-full flex-col items-center justify-center bg-bg-primary"
            role="status"
            aria-label="Loading portfolio ecosystem"
          >
            <div className="flex flex-col items-center gap-4 p-6 rounded-premium-lg glass border border-border-orange/20 bg-bg-secondary/40">
              <div className="w-10 h-10 border-2 border-orange-accent border-t-transparent rounded-premium-full animate-spin" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-orange-accent uppercase animate-pulse">
                Initializing Ecosystem...
              </span>
            </div>
          </div>
        }
      >
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <AIEngineering />
        <Contact />
      </Suspense>
    </AppLayout>
  );
}

export default App;
