import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Partnerships', path: '/partnerships' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
        className={`fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-50 transition-all duration-400 rounded-2xl overflow-hidden
          shadow-[0_8px_32px_0_rgba(200,151,43,0.12)]
          before:absolute before:inset-0 before:backdrop-blur-xl before:bg-gradient-to-br 
          before:from-[rgba(255,255,255,0.95)] before:via-[rgba(255,255,255,0.9)] before:to-[rgba(255,255,255,0.85)]
          before:-z-10 before:rounded-2xl
          after:absolute after:inset-0 after:bg-gradient-to-b 
          after:from-[rgba(255,255,255,0.4)] after:to-transparent 
          after:rounded-2xl after:pointer-events-none
          border border-[rgba(200,151,43,0.2)]
          ${scrolled ? 'py-3' : 'py-5'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative group">
              <span className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#0A0A0C] tracking-wider flex items-center gap-1">
                TRI - EL
                <span className="inline-flex flex-col gap-[2px] mx-[1px]">
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                </span>
                MENT
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <span
                    className={`text-sm font-['Inter'] transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#C8972B]'
                        : 'text-[#0A0A0C] hover:text-[#C8972B]'
                    }`}
                  >
                    {link.name}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#C8972B]"
                    initial={{ width: 0 }}
                    animate={{
                      width: location.pathname === link.path ? '100%' : 0,
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden lg:block px-6 py-2.5 border border-[#C8972B] text-[#C8972B] rounded-full
                       hover:bg-[#C8972B] hover:text-white transition-all duration-300 text-sm font-['Inter']
                       shadow-[0_4px_16px_rgba(200,151,43,0.15)] hover:shadow-[0_6px_24px_rgba(200,151,43,0.25)]"
            >
              Request a Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#0A0A0C] p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute right-4 top-4 bottom-4 w-full sm:w-80 
                backdrop-blur-xl bg-gradient-to-br from-[rgba(255,255,255,0.95)] via-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.85)]
                p-8 pt-24 border border-[rgba(200,151,43,0.2)] rounded-2xl
                shadow-[0_8px_32px_0_rgba(200,151,43,0.15)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-xl font-['Inter'] block ${
                        location.pathname === link.path
                          ? 'text-[#C8972B]'
                          : 'text-[#0A0A0C] hover:text-[#C8972B]'
                      } transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                >
                  <Link
                    to="/contact"
                    className="inline-block mt-4 px-6 py-3 bg-[#C8972B] text-white rounded-full
                             font-['Inter'] hover:bg-[#d4a535] transition-all
                             shadow-[0_4px_16px_rgba(200,151,43,0.25)]"
                  >
                    Request a Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}