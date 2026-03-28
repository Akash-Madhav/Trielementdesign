import { Outlet, useLocation } from 'react-router';
import { useEffect, useState, useRef } from 'react';
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
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
      });
    };

    const handleHover = () => {
       gsap.to(cursorRef.current, { scale: 2.5, backgroundColor: 'transparent', borderColor: 'rgba(43, 43, 43, 0.2)', duration: 0.3 });
    };
    const handleUnhover = () => {
       gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'rgba(43, 43, 43, 0.1)', borderColor: 'transparent', duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add hover listeners to links and buttons
    const interactiveElements = document.querySelectorAll('a, button, select, input, textarea');
    interactiveElements.forEach(el => {
       el.addEventListener('mouseenter', handleHover);
       el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [location.pathname]); // Re-run on route change to catch new elements

  // Scroll to top and refresh ScrollTrigger on Route Change
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => setIsFirstLoad(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] font-[var(--font-body)] overflow-x-hidden selection:bg-[#2B2B2B]/10 selection:text-[#2B2B2B]">
      
      {/* Cinematic Custom Cursor */}
       <div 
         ref={cursorRef} 
         className="fixed top-0 left-0 w-10 h-10 border border-transparent bg-[#2B2B2B]/10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" 
       />
       <div 
         ref={cursorDotRef} 
         className="fixed top-0 left-0 w-1 h-1 bg-[#2B2B2B] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block" 
       />

      <AnimatePresence mode="wait">
        {isFirstLoad && <PageLoader key="loader" />}
      </AnimatePresence>
      
      <ScrollProgress />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}