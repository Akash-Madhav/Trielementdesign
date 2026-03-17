import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Zap, Droplets, Flame, Sun, Leaf, Network } from 'lucide-react';

const services = [
  {
    id: 'mechanical',
    name: 'Mechanical',
    icon: Zap,
    items: [
      'Ventilation',
      'Air-conditioning',
      'Heating',
      'CFD Analysis',
      'District Cooling',
      'Central Plant Design',
    ],
    description: 'SEED provides design and installation of all building mechanical services. Built by a team committed to deploying efficient systems that can stand the test of time.',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: Zap,
    items: [
      'HT & LT Power Distribution',
      'Lighting',
      'Emergency Power Backup',
      'Earthing & Lightning Protection',
      'Voice/Data Services',
      'ELV & IBMS',
    ],
    description: 'Expertise-driven solutions to power every electrical requirement. Our teams design resilient, future-ready electrical infrastructure.',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Droplets,
    items: [
      'Water Treatment',
      'Hot & Cold Supply',
      'Drainage',
      'Waste-water Treatment',
      'STP',
      'Rainwater Harvesting',
    ],
    description: 'Scalable commercial plumbing solutions for projects of every size — designed for performance, compliance, and longevity.',
  },
  {
    id: 'firefighting',
    name: 'Firefighting',
    icon: Flame,
    items: [
      'Fire Hydrants & Water Piping',
      'Sprinkler Layout',
      'Fire Alarm',
      'Public Address Systems',
    ],
    description: 'Multi-dimensional fire protection solutions. Bespoke systems engineered for every occupancy type and risk profile.',
  },
  {
    id: 'solar',
    name: 'Solar (Floating PV)',
    icon: Sun,
    items: [
      'Vendor Evaluation',
      'Mechanical & Electrical Design',
      'CFD Analysis',
      'Anchoring & Mooring Review',
      'Performance Modelling',
    ],
    description: 'Harness the power of the sun atop water bodies, maximising energy production while preserving land resources. We consult Floating Solar PV (FSPV/FPV) projects for critical design solutions.',
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    icon: Leaf,
    items: [
      'LEED',
      'ESTIDAMA',
      'IGBC/GRIHA',
      'Energy Modelling',
      'Daylight Analysis',
      'Renewable Energy',
      'Energy Audit',
    ],
    description: 'Services that span design, implementation, and assessment of environmentally conscious systems and technologies. Helping buildings achieve their green certification goals.',
  },
  {
    id: 'associated',
    name: 'Associated Services',
    icon: Network,
    items: ['Infrastructure Design & Planning'],
    description: 'Specialised solutions for complex infrastructure projects. SEED leverages its global network of partners to deliver these services at scale.',
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('mechanical');
  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
                Our Services
              </h1>
              <p className="text-lg text-[#6B6B7A] font-['Inter'] leading-relaxed">
                A comprehensive range of MEP Engineering and Sustainability practices covering every critical 
                system in every type of building.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative h-[300px] md:h-[400px]">
              <motion.svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                initial="hidden"
                animate="visible"
              >
                {/* Ducts */}
                <motion.path
                  d="M50 100 L350 100 M50 150 L350 150"
                  stroke="#C8972B"
                  strokeWidth="3"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 }
                  }}
                  transition={{ duration: 1.5, delay: 0 }}
                />
                {/* Pipes */}
                <motion.path
                  d="M100 50 L100 350 M150 50 L150 350"
                  stroke="#C8972B"
                  strokeWidth="2"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 }
                  }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                {/* Electrical */}
                <motion.circle
                  cx="250"
                  cy="200"
                  r="60"
                  stroke="#C8972B"
                  strokeWidth="2"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 }
                  }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.path
                  d="M250 140 L250 260 M190 200 L310 200"
                  stroke="#C8972B"
                  strokeWidth="2"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1 }
                  }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </motion.svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Explorer */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <div className="lg:grid lg:grid-cols-[300px,1fr] gap-12">
          {/* Desktop: Sticky Vertical Tabs */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left px-6 py-4 rounded-sm transition-all relative ${
                    activeTab === service.id
                      ? 'text-[#0A0A0C] bg-[rgba(0,0,0,0.05)]'
                      : 'text-[#6B6B7A] hover:text-[#0A0A0C] hover:bg-[rgba(0,0,0,0.02)]'
                  }`}
                >
                  {activeTab === service.id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8972B]"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="font-['Inter']">{service.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: Dropdown */}
          <div className="lg:hidden mb-8">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-6 py-4 bg-[#F0F0F5] text-[#0A0A0C] rounded-sm border border-[rgba(0,0,0,0.08)] 
                       font-['Inter'] focus:outline-none focus:border-[#C8972B]"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="min-h-[400px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <activeService.icon className="w-12 h-12 text-[#C8972B]" />
                <h3 className="text-4xl font-['Cormorant_Garamond'] text-[#0A0A0C]">
                  {activeService.name}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {activeService.items.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#C8972B]" />
                    <span className="text-[#6B6B7A] font-['Inter']">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-lg text-[#6B6B7A] font-['Inter'] leading-relaxed max-w-3xl"
              >
                {activeService.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
            Ready to discuss your project?
          </h2>
          <p className="text-lg text-[#6B6B7A] font-['Inter'] mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you bring your vision to life with precision engineering 
            and sustainable design.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-[#C8972B] text-white rounded-sm font-['Inter'] 
                     hover:bg-[#d4a535] transition-all"
          >
            Get in Touch
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}