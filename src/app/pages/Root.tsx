import { Outlet, useLocation } from 'react-router';
import { useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { ScrollProgress } from '../components/ScrollProgress';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Root() {
  const location = useLocation();


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



  return (
    <div className="relative min-h-screen bg-[#FAF9F6] font-[var(--font-body)] overflow-x-hidden selection:bg-[#2B2B2B]/10 selection:text-[#2B2B2B]">      
      <ScrollProgress />
      <Navbar />
      <WhatsAppButton />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}