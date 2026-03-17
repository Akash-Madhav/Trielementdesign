import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { X, ArrowRight } from 'lucide-react';

const allProjects = [
  {
    id: 1,
    name: 'Park Hyatt',
    location: 'Zanzibar',
    scope: 'MEP Design · Supervision',
    sector: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1671798746335-a30fd8b2e2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBhcmNoaXRlY3R1cmUlMjB6YW56aWJhcnxlbnwxfHx8fDE3NzM3MzI4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'WASL Tower',
    location: 'UAE',
    scope: 'MEP Design',
    sector: 'Commercial',
    image: 'https://images.unsplash.com/photo-1735320864933-601d2cac9371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHRvd2VyJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzczMjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Mandarin JBR',
    location: 'UAE',
    scope: 'MEP Design · Sustainability',
    sector: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1592904083165-8c001f6e8d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM3MzI4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Commerz 3',
    location: 'UAE',
    scope: 'MEP Design',
    sector: 'Commercial',
    image: 'https://images.unsplash.com/photo-1604488382778-ff54757c0f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBkdWJhaXxlbnwxfHx8fDE3NzM3MzI4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'IMG World',
    location: 'UAE',
    scope: 'MEP Design · Supervision',
    sector: 'Sports',
    image: 'https://images.unsplash.com/photo-1725715443900-7cffb30ed2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzczNzMyODIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Sunrise Bay',
    location: 'UAE',
    scope: 'MEP Design',
    sector: 'Residential',
    image: 'https://images.unsplash.com/photo-1747555094127-9a922d56a64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzczMjgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    name: 'Luxury Resort',
    location: 'India',
    scope: 'MEP Design',
    sector: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1689369954621-ee843cea8bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNzMzMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'City Mall',
    location: 'India',
    scope: 'Peer Review',
    sector: 'Retail',
    image: 'https://images.unsplash.com/photo-1631565030253-c76d1c0c5664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczNzMzMDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    name: 'Medical Center',
    location: 'UAE',
    scope: 'MEP Design · Supervision',
    sector: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1vZGVybiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzY1NzkxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const scopes = ['All', 'MEP Design', 'Peer Review', 'Supervision'];
const locations = ['All', 'UAE', 'India', 'Africa'];
const sectors = ['All', 'Hospitality', 'Commercial', 'Residential', 'Sports', 'Retail', 'Healthcare'];

export default function Projects() {
  const [selectedScope, setSelectedScope] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');

  const filteredProjects = allProjects.filter((project) => {
    const scopeMatch = selectedScope === 'All' || project.scope.includes(selectedScope);
    const locationMatch = selectedLocation === 'All' || project.location.includes(selectedLocation);
    const sectorMatch = selectedSector === 'All' || project.sector === selectedSector;
    return scopeMatch && locationMatch && sectorMatch;
  });

  const clearFilters = () => {
    setSelectedScope('All');
    setSelectedLocation('All');
    setSelectedSector('All');
  };

  const hasActiveFilters = selectedScope !== 'All' || selectedLocation !== 'All' || selectedSector !== 'All';

  return (
    <div className="bg-[#0A0A0C] pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-10 blur-sm">
          {allProjects.slice(0, 9).map((project, i) => (
            <div key={i} className="relative h-full">
              <img src={project.image} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[#0A0A0C]/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
              Our Work
            </h1>
            <p className="text-xl text-[#8A8A9A] font-['Inter'] mb-8">
              300+ projects across 20+ countries — shaping skylines and communities.
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="text-3xl font-['Cormorant_Garamond'] text-[#C8972B]">300+</span>
                <p className="text-[#8A8A9A] font-['Inter']">Projects</p>
              </div>
              <div>
                <span className="text-3xl font-['Cormorant_Garamond'] text-[#C8972B]">20+</span>
                <p className="text-[#8A8A9A] font-['Inter']">Countries</p>
              </div>
              <div>
                <span className="text-3xl font-['Cormorant_Garamond'] text-[#C8972B]">15+</span>
                <p className="text-[#8A8A9A] font-['Inter']">Sectors</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-[#111116] border-b border-[rgba(255,255,255,0.07)] py-6 px-6 md:px-[120px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full px-4 py-2 bg-[#16161E] text-[#F0EDE8] rounded-sm border border-[rgba(255,255,255,0.07)] 
                         font-['Inter'] text-sm focus:outline-none focus:border-[#C8972B]"
              >
                <option value="" disabled>Scope</option>
                {scopes.map((scope) => (
                  <option key={scope} value={scope}>{scope}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-[#16161E] text-[#F0EDE8] rounded-sm border border-[rgba(255,255,255,0.07)] 
                         font-['Inter'] text-sm focus:outline-none focus:border-[#C8972B]"
              >
                <option value="" disabled>Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-2 bg-[#16161E] text-[#F0EDE8] rounded-sm border border-[rgba(255,255,255,0.07)] 
                         font-['Inter'] text-sm focus:outline-none focus:border-[#C8972B]"
              >
                <option value="" disabled>Sector</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-[#C8972B] border border-[#C8972B] rounded-sm font-['Inter'] text-sm 
                         hover:bg-[#C8972B] hover:text-[#0A0A0C] transition-all"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedScope !== 'All' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-[rgba(200,151,43,0.15)] border border-[#C8972B] rounded-full 
                           text-[#C8972B] text-xs font-['Inter'] flex items-center gap-2"
                >
                  {selectedScope}
                  <button onClick={() => setSelectedScope('All')} className="hover:scale-110">
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              {selectedLocation !== 'All' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-[rgba(200,151,43,0.15)] border border-[#C8972B] rounded-full 
                           text-[#C8972B] text-xs font-['Inter'] flex items-center gap-2"
                >
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('All')} className="hover:scale-110">
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              {selectedSector !== 'All' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-[rgba(200,151,43,0.15)] border border-[#C8972B] rounded-full 
                           text-[#C8972B] text-xs font-['Inter'] flex items-center gap-2"
                >
                  {selectedSector}
                  <button onClick={() => setSelectedSector('All')} className="hover:scale-110">
                    <X size={12} />
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedScope}-${selectedLocation}-${selectedSector}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-[#16161E] rounded-sm overflow-hidden cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent 
                               flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <p className="text-sm text-[#C8972B] font-['Inter'] mb-2">{project.scope}</p>
                    <div className="flex items-center gap-2 text-[#F0EDE8]">
                      <span className="font-['Inter']">View Project</span>
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#8A8A9A] font-['Inter']">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#8A8A9A] font-['Inter']">
              No projects match your current filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
