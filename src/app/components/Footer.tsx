import { Link } from 'react-router';
import { Facebook, Youtube, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Partnerships', path: '/partnerships' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="bg-[#F8F8FA] border-t border-[rgba(0,0,0,0.08)] py-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#0A0A0C] tracking-wider mb-2 flex items-center gap-1">
                TRI - EL
                <span className="inline-flex flex-col gap-[2px] mx-[1px]">
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                  <span className="w-[10px] h-[2px] bg-[#0A0A0C] rounded-full"></span>
                </span>
                MENT
              </h3>
            </Link>
            <p className="text-[#6B6B7A] text-sm font-['Inter'] max-w-xs">
              Design. Integrate. Sustain.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#6B6B7A] hover:text-[#C8972B] transition-colors text-sm font-['Inter']"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 md:justify-end">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[rgba(0,0,0,0.1)] 
                         flex items-center justify-center text-[#6B6B7A] 
                         hover:text-[#C8972B] hover:border-[#C8972B] transition-all"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[rgba(0,0,0,0.08)]">
          <p className="text-[#6B6B7A] text-xs font-['Inter'] text-center md:text-left">
            © TRI-ELEMENT Engineering 2005–2026. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}