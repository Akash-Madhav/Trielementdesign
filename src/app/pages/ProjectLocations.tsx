import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { X, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Project data - TRI-ELEMENT Portfolio
const allProjects = [
  {
    id: 1,
    name: 'Project Alpha',
    location: 'City A',
    country: 'UAE',
    scope: 'MEP Design · Supervision',
    sector: 'Hospitality',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM3MzI4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Project Beta',
    location: 'City B',
    country: 'UAE',
    scope: 'MEP Design',
    sector: 'Commercial',
    coordinates: { lat: 25.1124, lng: 55.1390 },
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM3MzI4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Project Gamma',
    location: 'City C',
    country: 'UAE',
    scope: 'MEP Design · Sustainability',
    sector: 'Hospitality',
    coordinates: { lat: 24.4539, lng: 54.3773 },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzczMjgyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Project Delta',
    location: 'City D',
    country: 'UAE',
    scope: 'MEP Design',
    sector: 'Commercial',
    coordinates: { lat: 25.3463, lng: 55.4209 },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczNzMyODI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Project Epsilon',
    location: 'City E',
    country: 'UAE',
    scope: 'MEP Design · Supervision',
    sector: 'Sports',
    coordinates: { lat: 25.0657, lng: 55.3103 },
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NzM3MzI4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Project Zeta',
    location: 'City F',
    country: 'India',
    scope: 'MEP Design',
    sector: 'Residential',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzczMjgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    name: 'Project Eta',
    location: 'City G',
    country: 'India',
    scope: 'MEP Design',
    sector: 'Hospitality',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NzM3MzMwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'Project Theta',
    location: 'City H',
    country: 'India',
    scope: 'Peer Review',
    sector: 'Retail',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZXxlbnwxfHx8fDE3NzM3MzMwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    name: 'Project Iota',
    location: 'City I',
    country: 'Tanzania',
    scope: 'MEP Design · Supervision',
    sector: 'Healthcare',
    coordinates: { lat: -6.1659, lng: 39.2026 },
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczNjU3OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const scopes = ['All', 'MEP Design', 'Peer Review', 'Supervision'];
const countries = ['All', 'UAE', 'India', 'Tanzania'];
const sectors = ['All', 'Hospitality', 'Commercial', 'Residential', 'Sports', 'Retail', 'Healthcare'];

export default function ProjectLocations() {
  const [selectedScope, setSelectedScope] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);
  const [showMap, setShowMap] = useState(false); // Start with map hidden to avoid errors
  
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = allProjects.filter((project) => {
    const scopeMatch = selectedScope === 'All' || project.scope.includes(selectedScope);
    const countryMatch = selectedCountry === 'All' || project.country === selectedCountry;
    const sectorMatch = selectedSector === 'All' || project.sector === selectedSector;
    return scopeMatch && countryMatch && sectorMatch;
  });

  const clearFilters = () => {
    setSelectedScope('All');
    setSelectedCountry('All');
    setSelectedSector('All');
  };

  const hasActiveFilters = selectedScope !== 'All' || selectedCountry !== 'All' || selectedSector !== 'All';

  const handleProjectCardClick = (project: typeof allProjects[0]) => {
    setSelectedProject(project);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    
    // Hero Animation
    gsap.fromTo(
      '.projects-hero-content',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }
    );

    // Animate project cards when they appear
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
            scroller: window,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredProjects]);

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12">
      <div className="relative max-w-[1440px] mx-auto">{/* Added relative positioning */}
        {/* Header */}
        <div ref={heroRef} className="mb-16">
          <p className="projects-hero-content text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
            Portfolio
          </p>
          <h1 className="projects-hero-content text-5xl md:text-7xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
            Project Locations
          </h1>
          <p className="projects-hero-content text-lg text-[var(--color-ink)] opacity-70 font-[var(--font-body)] max-w-3xl">
            Explore our diverse portfolio of engineering excellence across multiple sectors and geographies.
          </p>
        </div>

        {/* Interactive Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <GlassPanel variant="standard" className="overflow-hidden">
            <div className="relative h-[500px] w-full bg-gradient-to-br from-[var(--color-accent-structural)] to-[var(--glass-fill)] rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="text-[var(--color-accent-signal)] mx-auto mb-4" />
                <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] mb-2">
                  Interactive Map
                </h3>
                <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-6">
                  {filteredProjects.length} projects across {countries.length - 1} countries
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {filteredProjects.slice(0, 6).map((project) => (
                    <motion.button
                      key={project.id}
                      onClick={() => handleProjectCardClick(project)}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-[var(--font-body)] hover:bg-white transition-colors shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPin size={14} className="inline mr-2" />
                      {project.location}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Filters - Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassPanel variant="standard" className="p-6 md:p-8 mb-12">
            <div className="flex flex-col gap-6">
              {/* Scope Filter */}
              <div>
                <label className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-3">
                  Scope
                </label>
                <div className="flex flex-wrap gap-2">
                  {scopes.map((scope) => (
                    <motion.button
                      key={scope}
                      onClick={() => setSelectedScope(scope)}
                      className={`px-4 py-2 rounded-full text-sm font-[var(--font-body)] transition-all ${
                        selectedScope === scope
                          ? 'bg-[var(--color-accent-signal)] text-white'
                          : 'bg-[var(--glass-thin-fill)] text-[var(--color-ink)] hover:bg-[var(--glass-fill)]'
                      }`}
                      style={{
                        backdropFilter: selectedScope !== scope ? 'blur(8px)' : 'none',
                        WebkitBackdropFilter: selectedScope !== scope ? 'blur(8px)' : 'none',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {scope}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-3">
                  Country
                </label>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <motion.button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-4 py-2 rounded-full text-sm font-[var(--font-body)] transition-all ${
                        selectedCountry === country
                          ? 'bg-[var(--color-accent-signal)] text-white'
                          : 'bg-[var(--glass-thin-fill)] text-[var(--color-ink)] hover:bg-[var(--glass-fill)]'
                      }`}
                      style={{
                        backdropFilter: selectedCountry !== country ? 'blur(8px)' : 'none',
                        WebkitBackdropFilter: selectedCountry !== country ? 'blur(8px)' : 'none',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {country}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sector Filter */}
              <div>
                <label className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-3">
                  Sector
                </label>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((sector) => (
                    <motion.button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-4 py-2 rounded-full text-sm font-[var(--font-body)] transition-all ${
                        selectedSector === sector
                          ? 'bg-[var(--color-accent-signal)] text-white'
                          : 'bg-[var(--glass-thin-fill)] text-[var(--color-ink)] hover:bg-[var(--glass-fill)]'
                      }`}
                      style={{
                        backdropFilter: selectedSector !== sector ? 'blur(8px)' : 'none',
                        WebkitBackdropFilter: selectedSector !== sector ? 'blur(8px)' : 'none',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {sector}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={clearFilters}
                  className="self-start flex items-center gap-2 px-4 py-2 text-[var(--color-accent-signal)] font-[var(--font-body)] text-sm hover:opacity-70 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                >
                  <X size={16} />
                  Clear all filters
                </motion.button>
              )}
            </div>
          </GlassPanel>
        </motion.div>

        {/* Projects Count */}
        <p className="text-sm text-[var(--color-ink)] opacity-60 font-[var(--font-body)] mb-8">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </p>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="project-card"
              >
                <GlassPanel
                  variant="standard"
                  className="group cursor-pointer overflow-hidden h-full"
                  enableHoverPhysics={true}
                  onClick={() => handleProjectCardClick(project)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{ filter: 'var(--img-filter)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-[var(--color-ink)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <MapPin size={20} className="text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Location Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-[var(--font-body)] text-[var(--color-ink)]">
                      <MapPin size={12} className="inline mr-1" />
                      {project.country}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-[var(--color-accent-signal)] font-[var(--font-body)]">
                        {project.sector}
                      </span>
                    </div>
                    <h3 className="text-xl font-[var(--font-display)] text-[var(--color-ink)] mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink)] opacity-60 font-[var(--font-body)] mb-2 flex items-center gap-1">
                      <MapPin size={14} />
                      {project.location}, {project.country}
                    </p>
                    <p className="text-xs text-[var(--color-ink)] opacity-50 font-[var(--font-body)]">
                      {project.scope}
                    </p>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassPanel variant="heavy" className="p-12 text-center">
              <p className="text-lg text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-4">
                No projects found matching your filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-[var(--color-accent-signal)] font-[var(--font-body)] hover:opacity-70 transition-opacity"
              >
                Clear filters
              </button>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </div>
  );
}