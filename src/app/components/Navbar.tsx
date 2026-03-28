import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import BrandWordmark from '../../imports/BrandWordmark';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled 
            ? 'py-4 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#E5E2DB]' 
            : 'py-8 bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-[110]">
              <BrandWordmark className="text-xl md:text-2xl tracking-tighter" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="relative group py-1"
                >
                  <span
                    className={`text-[12px] uppercase tracking-[0.25em] font-[var(--font-body)] transition-all duration-500 ${
                      location.pathname === link.path
                        ? 'text-[#2B2B2B]'
                        : 'text-[#2B2B2B]/40 hover:text-[#2B2B2B]'
                    }`}
                  >
                    {link.name}
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B] origin-left"
                    initial={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                    animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button - Elegant Minimal */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center px-10 py-3 rounded-full border border-[#2B2B2B]/10 hover:border-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-[#FAF9F6] transition-all duration-700 group relative overflow-hidden"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-[var(--font-body)] font-medium relative z-10 transition-colors duration-700">
                Request a Quote
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-[110] text-[#2B2B2B] p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1} /> : <Menu size={22} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Surface Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden bg-[#FAF9F6] flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex flex-col items-center gap-10 px-6 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 1,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <Link
                    to={link.path}
                    className={`text-5xl md:text-6xl font-[var(--font-display)] transition-all duration-700 italic ${
                      location.pathname === link.path
                        ? 'text-[#2B2B2B]'
                        : 'text-[#2B2B2B]/20 hover:text-[#2B2B2B]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}