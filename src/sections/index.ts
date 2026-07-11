import { lazy } from 'react';

// Lazy load sections for optimized initial paint and smaller bundle sizes
export const Hero = lazy(() => import('./Hero'));
export const About = lazy(() => import('./About'));
export const TechStack = lazy(() => import('./TechStack'));
export const Skills = lazy(() => import('./Skills'));
export const Projects = lazy(() => import('./Projects'));
export const AIEngineering = lazy(() => import('./AIEngineering'));
export const AIPlayground = lazy(() => import('./AIPlayground'));
export const Contact = lazy(() => import('./Contact'));
