import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { PageLoader } from '../components/PageLoader';

export default function Root() {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstLoad) {
      setTimeout(() => setIsFirstLoad(false), 1500);
    }
  }, [isFirstLoad]);

  return (
    <div className="min-h-screen bg-white font-['Inter'] overflow-x-hidden">
      {isFirstLoad && <PageLoader />}
      <CustomCursor />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}