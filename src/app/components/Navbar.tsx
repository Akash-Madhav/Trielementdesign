import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import BrandWordmark from '../../imports/BrandWordmark';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Project Locations', path: '/project-locations' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Transform blur based on scroll
  const blurValue = useTransform(scrollY, [0, 80], [12, 24]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
        className="fixed top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`rounded-xl sm:rounded-2xl border transition-all duration-300 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4 md:py-5'}`}
          style={{
            background: scrolled ? 'var(--glass-fill)' : 'var(--glass-thin-fill)',
            backdropFilter: scrolled ? 'blur(24px) saturate(1.8) brightness(1.05)' : 'blur(12px) saturate(1.8) brightness(1.05)',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8) brightness(1.05)' : 'blur(12px) saturate(1.8) brightness(1.05)',
            borderColor: scrolled ? 'var(--glass-border)' : 'rgba(255, 255, 255, 0.6)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              : '0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
          }}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="relative group">
                <span className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] tracking-wider">
                  <BrandWordmark showStudio={false} className="text-2xl" />
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link to={link.path} className="relative z-10 px-4 py-2 block">
                      <span
                        className={`text-sm font-[var(--font-body)] transition-colors ${
                          location.pathname === link.path
                            ? 'text-[var(--color-accent-signal)]'
                            : 'text-[var(--color-ink)]'
                        }`}
                      >
                        {link.name}
                      </span>
                    </Link>
                    
                    {/* Glass pill on hover */}
                    <AnimatePresence>
                      {(hoveredLink === link.path || location.pathname === link.path) && (
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                          style={{
                            background: 'var(--glass-thin-fill)',
                            backdropFilter: 'blur(8px) saturate(1.5)',
                            WebkitBackdropFilter: 'blur(8px) saturate(1.5)',
                            borderRadius: '100px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* CTA Button - Heavy Glass */}
              <Link
                to="/contact"
                className="hidden lg:block relative overflow-hidden"
                style={{
                  background: 'rgba(196, 97, 58, 0.12)',
                  backdropFilter: 'blur(40px) saturate(1.8) brightness(1.05)',
                  WebkitBackdropFilter: 'blur(40px) saturate(1.8) brightness(1.05)',
                  border: '1px solid rgba(196, 97, 58, 0.4)',
                  borderRadius: '100px',
                  padding: '10px 24px',
                  boxShadow: '0 4px 12px rgba(196, 97, 58, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
              >
                <span className="relative z-10 text-sm font-[var(--font-body)] text-[var(--color-ink)]">
                  Request a Quote
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[var(--color-ink)]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Heavy Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--glass-heavy-fill)',
              backdropFilter: 'blur(40px) saturate(1.8) brightness(1.05)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.8) brightness(1.05)',
              paddingTop: scrolled ? '80px' : '96px',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-[var(--font-display)] transition-colors ${
                      location.pathname === link.path
                        ? 'text-[var(--color-accent-signal)]'
                        : 'text-[var(--color-ink)] hover:text-[var(--color-accent-signal)]'
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