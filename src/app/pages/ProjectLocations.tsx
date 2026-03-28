import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    id: 1,
    name: 'Park Hyatt Zanzibar',
    location: 'Zanzibar, Tanzania',
    scope: 'MEP Design · Supervision',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1671798746335-a30fd8b2e2e7?auto=format&fit=crop&q=80&w=1500',
  },
  {
    id: 2,
    name: 'WASL Tower',
    location: 'Dubai, UAE',
    scope: 'MEP Design',
    category: 'High-rise',
    image: 'https://images.unsplash.com/photo-1735320864933-601d2cac9371?auto=format&fit=crop&q=80&w=1500',
  },
  {
    id: 3,
    name: 'Mandarin JBR',
    location: 'Dubai, UAE',
    scope: 'MEP Design · Sustainability',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1592904083165-8c001f6e8d7e?auto=format&fit=crop&q=80&w=1500',
  },
  {
    id: 4,
    name: 'Commerz 3',
    location: 'Dubai, UAE',
    scope: 'MEP Design',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1604488382778-ff54757c0f42?auto=format&fit=crop&q=80&w=1500',
  },
  {
    id: 5,
    name: 'Sunrise Bay',
    location: 'Dubai, UAE',
    scope: 'MEP Design',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1747555094127-9a922d56a64c?auto=format&fit=crop&q=80&w=1500',
  },
  {
    id: 6,
    name: 'IMG World of Adventure',
    location: 'Dubai, UAE',
    scope: 'MEP Design · Supervision',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1725715443900-7cffb30ed2a5?auto=format&fit=crop&q=80&w=1500',
  },
];

const categories = ['All', 'Hospitality', 'High-rise', 'Luxury', 'Commercial', 'Residential', 'Entertainment'];

export default function ProjectLocations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = allProjects.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.projects-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: 'expo.out',
        delay: 0.3
      });

      // Project Cards Entrance
      gsap.from('.project-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-40 pb-64 px-6 md:px-12 selection:bg-[#2B2B2B]/10">
      
      {/* --- PREMIUM HERO --- */}
      <section className="max-w-[1440px] mx-auto mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
           <div className="max-w-3xl">
              <span className="projects-reveal block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 mb-8 font-medium">Portfolio</span>
              <h1 className="projects-reveal text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter mb-8">
                Global <i>Impact</i>, <br /> Built for <i>Generations</i>.
              </h1>
           </div>
           <div className="projects-reveal text-right pb-4">
              <p className="text-sm font-medium tracking-widest text-[#2B2B2B]/40 uppercase">
                 {filteredProjects.length} Selected Works
              </p>
           </div>
        </div>

        {/* --- MINIMAL FILTERS --- */}
        <div className="projects-reveal flex flex-wrap gap-x-12 gap-y-4 border-y border-[#E5E2DB]/50 py-10">
           {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 relative py-2 ${
                   activeCategory === cat ? 'text-[#2B2B2B]' : 'text-[#2B2B2B]/30 hover:text-[#2B2B2B]'
                }`}
              >
                 {cat}
                 {activeCategory === cat && (
                    <motion.div 
                      layoutId="active-cat" 
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B]" 
                    />
                 )}
              </button>
           ))}
        </div>
      </section>

      {/* --- PROJECT GALLERY: MINIMAL GRID --- */}
      <section className="max-w-[1440px] mx-auto project-grid">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            <AnimatePresence mode="popLayout">
               {filteredProjects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="project-item group cursor-pointer"
                  >
                     <div className="aspect-[4/5] overflow-hidden mb-10 bg-[#F5F1EA]">
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                     </div>
                     <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/40 font-medium">
                           {p.location} / {p.category}
                        </span>
                        <h3 className="text-2xl font-[var(--font-display)] group-hover:italic transition-all duration-500">
                           {p.name}
                        </h3>
                        <div className="h-px w-0 group-hover:w-full bg-[#2B2B2B]/20 transition-all duration-700" />
                        <p className="text-xs text-[#2B2B2B]/50 font-[var(--font-body)] italic opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                           {p.scope}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-64 text-center section-reveal">
         <span className="text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-10 block">Collaborate with Us</span>
         <h2 className="text-4xl md:text-7xl mb-16 italic opacity-20">Transforming Vision into Structure.</h2>
         <Link to="/contact" className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:scale-105 active:scale-95">
           Inquire Today
         </Link>
      </section>

    </div>
  );
}