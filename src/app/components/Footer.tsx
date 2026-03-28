import { Link } from 'react-router';
import { motion } from 'motion/react';
import BrandWordmark from '../../imports/BrandWordmark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Project Locations', path: '/project-locations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#FAF9F6] pt-16 pb-12 px-6 md:px-12 border-t border-[#E5E2DB]/50">
      <div className="max-w-[1440px] mx-auto text-center">
        {/* Brand/Logo */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <Link to="/" className="inline-block scale-125">
            <BrandWordmark className="text-3xl md:text-4xl tracking-tighter" />
          </Link>
        </motion.div>

        {/* Links */}
        <motion.nav 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-20"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[11px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 hover:text-[#2B2B2B] transition-all duration-500 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </motion.nav>

        {/* Newsletter/CTA Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-32"
        >
          <p className="font-[var(--font-display)] text-2xl md:text-3xl italic text-[#2B2B2B]/80 leading-relaxed">
            "Every section should feel intentional, calm, and architecturally inspired."
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[#E5E2DB]/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/40">
            © {currentYear} Trielement Engineering. Crafted for Excellence.
          </p>
          <div className="flex gap-10">
            <Link
              to="#"
              className="text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/30 hover:text-[#2B2B2B] transition-colors duration-500"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/30 hover:text-[#2B2B2B] transition-colors duration-500"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}