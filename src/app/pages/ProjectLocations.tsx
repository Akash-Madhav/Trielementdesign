import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Globe, ArrowUpRight, Minus, MousePointer2 } from 'lucide-react';
import { GlassPanel } from '../components/GlassPanel';
import { useMagnetic } from '../hooks/useMagnetic';

const ProjectMap = lazy(() => import('../components/ProjectMap'));

gsap.registerPlugin(ScrollTrigger);

const projectLocations = [
  { id: 1, name: 'Central Business Tower', city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, type: 'BIM Coordination', category: 'High-rise', image: '/images/project_london.png' },
  { id: 2, name: 'Corniche Mixed-Use Complex', city: 'Abu Dhabi', country: 'UAE', lat: 24.4539, lng: 54.3773, type: 'MEP Coordination', category: 'Luxury', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1500' },
  { id: 3, name: 'Marina Bay Towers', city: 'Dubai', country: 'UAE', lat: 25.1972, lng: 55.2796, type: 'Structural Modeling', category: 'High-rise', image: '/images/project_dubai.png' },
  { id: 4, name: 'Riyadh Vision Hub', city: 'Riyadh', country: 'KSA', lat: 24.7136, lng: 46.6753, type: 'Clash Detection', category: 'Commercial', image: 'https://images.unsplash.com/photo-1586985289906-4069f0bd9d55?auto=format&fit=crop&q=80&w=1500' },
  { id: 5, name: 'West Coast Residential', city: 'Vancouver', country: 'CA', lat: 49.2827, lng: -123.1207, type: 'BIM Coordination', category: 'Residential', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1500' },
  { id: 6, name: 'Tbilisi Mixed-Use Development', city: 'Tbilisi', country: 'GE', lat: 41.7151, lng: 44.8271, type: 'MEP Coordination', category: 'Luxury', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1500' },
  { id: 7, name: 'High-Tech IT Hub', city: 'Bangalore', country: 'IN', lat: 12.9716, lng: 77.5946, type: 'Full BIM Services', category: 'Commercial', image: 'https://images.unsplash.com/photo-1596422846543-b5c64881fe53?auto=format&fit=crop&q=80&w=1500' },
];

const stats = [
  { value: '20+', label: 'Countries', icon: Globe, detail: 'Global reach across diverse markets' },
  { value: '3', label: 'Continents', icon: MapPin, detail: 'Strategic presence in key hubs' },
];

export default function ProjectLocations() {
  const [activeId, setActiveId] = useState<number | null>(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const filteredProjects = projectLocations.filter(p => !activeId || p.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Media Reveal (consistent with Home/Contact)
      gsap.fromTo(
        heroMediaRef.current,
        { clipPath: 'inset(15% 15% 15% 15% round 100px)', opacity: 0, scale: 1.2 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: 'expo.inOut',
          delay: 0.1
        }
      );

      // Hero Background Parallax
      gsap.to(heroImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // --- TYPOGRAPHIC STORYTELLING TIERS ---
      
      // Tier 1: 3D Split-Word Reveals
      gsap.utils.toArray<HTMLElement>('.tier-1').forEach((el) => {
        gsap.from(el, {
          y: 40,
          rotateX: -30,
          opacity: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          }
        });
      });

      // Tier 2: Cinematic Blur-to-Focus
      gsap.utils.toArray<HTMLElement>('.tier-2').forEach((el) => {
        gsap.from(el, {
          filter: 'blur(15px)',
          opacity: 0,
          y: 20,
          duration: 2.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          }
        });
      });

      // Tier 3: Float-in Staggers
      gsap.utils.toArray<HTMLElement>('.tier-3-container').forEach((container) => {
        gsap.from(container.children, {
          y: 15,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 96%',
          }
        });
      });

      // Global Section Reveal
      gsap.from('.reveal-section', {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.projects-reveal-trigger',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen text-[#2B2B2B] overflow-hidden selection:bg-[#2B2B2B]/10">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section relative h-[85vh] min-h-[600px] flex items-end overflow-hidden px-6 md:px-12 py-20 bg-[#FAF9F6]">
        {/* Navbar Safe Zone */}
        <div ref={heroMediaRef} className="absolute inset-x-0 top-24 bottom-0 w-full overflow-hidden bg-black">
          <img
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2500"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-60 grayscale-[0.3]"
            alt="Surveying Visual"
          />
        </div>
        <div className="absolute inset-x-0 top-24 bottom-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 z-10 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
           <div className="overflow-hidden mb-6">
              <span className="tier-3 block text-[10px] uppercase tracking-[0.5em] text-[#FAF9F6]/50 font-medium">Global Network</span>
           </div>
           <div className="overflow-hidden mb-10">
              <h1 className="tier-1 text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-[#FAF9F6] font-[var(--font-display)]">
                Built Across <br />
                <i className="inline-block">Borders.</i>
              </h1>
           </div>
           <div className="tier-2 max-w-lg mb-12">
              <p className="text-lg md:text-xl text-[#FAF9F6]/70 leading-relaxed font-light">
                From London's financial core to the Gulf's skyline — precision engineering delivered across three continents.
              </p>
           </div>
           
           <div className="flex items-center gap-12 text-[#FAF9F6]/30 font-mono text-[9px] tracking-[1em] animate-pulse">
              [ SYNCING_GLOBAL_SITES ]
              <div className="w-1 h-1 bg-[#FAF9F6] rounded-full" />
              [ 25.1972° N, 55.2744° E ]
           </div>
        </div>
      </section>

      {/* 2. STATS OVERLAY (GLASS) */}
      <section className="relative z-20 -mt-20 px-6 md:px-12 mb-32 projects-reveal-trigger">
         <div className="max-w-[1440px] mx-auto">
            <div className="tier-3-container grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
               {stats.map((stat, i) => (
                  <GlassPanel key={i} variant="heavy" enableHoverPhysics={true} className="p-10 border-[#2B2B2B]/5">
                     <div className="flex items-start justify-between">
                        <div className="space-y-6">
                           <div className="w-12 h-12 rounded-2xl bg-[#2B2B2B]/5 flex items-center justify-center text-[#2B2B2B]">
                              <stat.icon size={20} strokeWidth={1.5} />
                           </div>
                           <div>
                              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-1">{stat.value}</div>
                              <div className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 font-medium">{stat.label}</div>
                           </div>
                           <p className="text-xs text-[#2B2B2B]/50 leading-relaxed font-light">{stat.detail}</p>
                        </div>
                        <stat.icon size={80} className="opacity-[0.03] grayscale pointer-events-none" />
                     </div>
                  </GlassPanel>
               ))}
            </div>
         </div>
      </section>

      {/* 3. INTERACTIVE MAP SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-40 overflow-hidden cursor-explore">
         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
               <span className="tier-3 block text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-6 font-medium">The Network</span>
               <h2 className="tier-1 text-4xl md:text-6xl italic leading-tight font-[var(--font-display)]">Global Footprint.</h2>
            </div>
            <p className="tier-2 text-sm text-[#2B2B2B]/50 max-w-sm leading-relaxed font-light">
               Click on a city to fly to the location or filter by region to see our international impact.
            </p>
         </div>

         {/* Map Frame */}
         <div className="reveal-section relative group rounded-[4rem] overflow-hidden border border-[#2B2B2B]/5 bg-[#F5F1EA] shadow-[0_40px_100px_rgba(0,0,0,0.03)] h-[400px] md:h-[650px]">
            <Suspense fallback={
               <div className="w-full h-full flex items-center justify-center font-mono text-[10px] tracking-widest opacity-20">
                  [ INITIALIZING_MAP_ENGINE... ]
               </div>
            }>
               <ProjectMap 
                 locations={projectLocations} 
                 activeId={activeId} 
                 setActiveId={setActiveId} 
               />
            </Suspense>
         </div>

         {/* City Navigation Chips */}
         <div className="reveal-section mt-12 overflow-x-auto pb-8 no-scrollbar touch-pan-x">
            <div className="flex gap-4">
               {projectLocations.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    className={`flex items-center shrink-0 gap-3 px-8 py-4 rounded-full border text-xs font-bold uppercase tracking-widest transition-all duration-700 ${
                      activeId === project.id
                        ? 'bg-[#2B2B2B] border-[#2B2B2B] text-white shadow-2xl scale-105 sticky left-0 z-10'
                        : 'bg-white/50 backdrop-blur-sm border-[#2B2B2B]/5 text-[#2B2B2B]/40 hover:border-[#2B2B2B]/20 hover:text-[#2B2B2B]'
                    }`}
                  >
                     <MapPin size={12} className={activeId === project.id ? 'text-[#D4AF37]' : 'text-[#2B2B2B]/10'} />
                     {project.city}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* 4. ACTIVE PROJECT CONTEXT (GALLERY) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-64 cursor-view">
         <div className="reveal-section border-t border-[#2B2B2B]/5 pt-20">
            <div className="mb-20 flex justify-between items-baseline">
               <h3 className="text-2xl md:text-3xl font-[var(--font-display)] italic">
                  {activeId ? projectLocations.find(p => p.id === activeId)?.name : 'Selected Works'}
               </h3>
               <button onClick={() => setActiveId(null)} className="text-[10px] uppercase tracking-widest text-[#2B2B2B]/30 hover:text-[#2B2B2B] transition-colors font-medium">View All Data Points</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               <AnimatePresence mode="popLayout">
                  {filteredProjects.map((p, i) => (
                     <motion.div
                       key={p.id}
                       layout
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="group"
                     >
                        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#F5F1EA] mb-8 shadow-sm">
                           <img 
                              src={p.image}
                              alt={p.name} 
                              loading="lazy"
                              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.01] group-hover:scale-105"
                           />
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/40 font-medium">
                              <span>{p.city}</span>
                              <div className="w-1 h-1 bg-[#2B2B2B]/10 rounded-full" />
                              <span>{p.category}</span>
                           </div>
                           <h4 className="text-xl font-[var(--font-display)] group-hover:italic transition-all">{p.name}</h4>
                           <div className="flex items-center gap-3 text-[11px] text-[#2B2B2B]/50 font-light">
                              <MousePointer2 size={12} strokeWidth={1.5} />
                              {p.type}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="reveal-section py-40 text-center border-t border-[#2B2B2B]/5">
         <span className="block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/30 mb-8 font-medium">Initiate Collaboration</span>
         <h2 className="text-4xl md:text-7xl mb-16 italic opacity-20 font-[var(--font-display)]">Built for the Global Perspective.</h2>
         <Link to="/contact" className="inline-flex items-center gap-6 px-16 py-6 bg-[#2B2B2B] text-white rounded-full text-[12px] uppercase tracking-[0.4em] font-medium transition-all duration-700 hover:scale-[1.02] active:scale-95 group">
           Start a Conversation
           <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </Link>
      </section>
    </div>
  );
}