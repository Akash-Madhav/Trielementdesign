import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageLoader } from '../components/PageLoader';
import { ScrollProgress } from '../components/ScrollProgress';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Root() {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to top on route change with transition effect
  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    
    // Scroll to top instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Refresh ScrollTrigger after a short delay to recalculate positions
    const scrollTriggerTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    // End transition after animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTriggerTimer);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstLoad) {
      setTimeout(() => setIsFirstLoad(false), 1500);
    }
  }, [isFirstLoad]);

  return (
    <div className="relative min-h-screen bg-white font-['Inter'] overflow-x-hidden">
      {isFirstLoad && <PageLoader />}
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Page Transition Loader */}
      <AnimatePresence>
        {isTransitioning && !isFirstLoad && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-12 h-12 border-2 border-[var(--color-accent-signal)] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative min-h-screen"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}