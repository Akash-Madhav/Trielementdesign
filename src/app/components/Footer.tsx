import { Link } from 'react-router';
import BrandWordmark from '../../imports/BrandWordmark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Project Locations', path: '/project-locations' },
      { name: 'Contact', path: '/contact' },
    ],
    Services: [
      { name: 'MEP Engineering', path: '/services' },
      { name: 'Sustainability', path: '/services' },
      { name: 'BIM Coordination', path: '/services' },
      { name: 'Peer Review', path: '/services' },
    ],
    Connect: [
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/contact' },
      { name: 'LinkedIn', path: '#' },
    ],
  };

  return (
    <footer className="bg-[var(--color-canvas)] border-t border-[var(--color-accent-structural)]">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <BrandWordmark showStudio={false} className="text-2xl" />
            </Link>
            <p className="text-[var(--color-ink)] opacity-65 text-sm leading-relaxed max-w-[300px] font-[var(--font-body)]">
              Precision engineering consultancy specializing in MEP design, sustainability integration, and BIM coordination for world-class architecture.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[var(--color-ink)] font-[var(--font-body)] text-sm tracking-[0.1em] uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-[var(--color-ink)] opacity-65 hover:opacity-100 hover:text-[var(--color-accent-signal)] transition-all text-sm font-[var(--font-body)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-accent-structural)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-ink)] opacity-50 text-xs font-[var(--font-body)]">
            © {currentYear} <BrandWordmark showStudio={false} className="text-xs" /> Engineering. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-[var(--color-ink)] opacity-50 hover:opacity-100 text-xs font-[var(--font-body)]"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-[var(--color-ink)] opacity-50 hover:opacity-100 text-xs font-[var(--font-body)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}