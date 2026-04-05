import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2008', accent: '#D4AF37', event: 'The Genesis', description: 'Trielement begins its journey in the heart of Dubai, driven by a vision of engineering excellence.' },
  { year: '2012', accent: '#4A5568', event: 'Beyond Borders', description: 'Expansion into India, bringing bespoke technical expertise to Bangalore and Kochi.' },
  { year: '2018', accent: '#005C8E', event: 'Global Footprint', description: '500+ projects completed across 20 countries, establishing a legacy of precision.' },
  { year: '2024', accent: '#4B5320', event: 'Ethereal Future', description: 'Pioneering sustainable, light-focused engineering for the next generation of architecture.' },
];

const values = [
  { title: 'Excellence', accent: '#D4AF37', description: 'The pursuit of the sublime in every calculation, every design, every detail.' },
  { title: 'Integrity', accent: '#4A5568', description: 'A foundation of transparency and ethical clarity in all our partnerships.' },
  { title: 'Innovation', accent: '#005C8E', description: 'Embracing the avant-garde of technology to solve the challenges of tomorrow.' },
  { title: 'Sustain', accent: '#4B5320', description: 'Designing for longevity, ensuring our creations respect the world they inhabit.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 350]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Media Reveal (consistent with Contact)
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

      // --- TYPOGRAPHIC STORYTELLING TIERS ---
      
      // Tier 1: 3D Split-Word Reveals
      gsap.utils.toArray<HTMLElement>('.tier-1').forEach((el) => {
        gsap.from(el, {
          y: 40,
          rotateX: -30,
          opacity: 0,
          duration: 1.8,
          ease: 'expo.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          }
        });
      });

      // Section Reveals
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        });
      });

      // Milestone Horizontal Scroll
      const milestoneContainer = document.querySelector('.milestone-container') as HTMLElement;
      if (milestoneContainer) {
        gsap.to(milestoneContainer, {
          x: () => -(milestoneContainer.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            id: 'milestone-scroll',
            trigger: '.milestone-section',
            pin: true,
            scrub: 1,
            start: 'center center',
            end: () => `+=${milestoneContainer.scrollWidth * 1.2}`, // Added extra scroll distance for cleaner exit
            invalidateOnRefresh: true,
          }
        });
      }

      // Milestone Year Parallax (Subtle)
      gsap.utils.toArray<HTMLElement>('.milestone-year').forEach((year) => {
        gsap.to(year, {
          x: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: year,
            start: 'left right',
            end: 'right left',
            scrub: true,
            containerAnimation: gsap.getById('milestone-scroll') || undefined
          }
        });
      });

      // --- NATIVE-FEEL SNAP INTEGRATION ---
      const sections = gsap.utils.toArray<HTMLElement>('section:not(.milestone-section)');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          snap: {
            snapTo: 1,
            duration: { min: 0.5, max: 0.8 },
            delay: 0.1,
            ease: 'power2.inOut'
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen selection:bg-[#2B2B2B]/10 overflow-hidden">
      
      {/* --- PREMIUM HERO --- */}
      <section className="relative min-h-[100dvh] md:h-screen flex items-end pb-24 md:pb-32 overflow-hidden bg-[#FAF9F6] px-6 md:px-12">
        {/* Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
           <motion.div 
             style={{ y: yParallax }}
             className="w-full h-full relative"
           >
             <img 
               src="/images/about_hero.png" 
               alt="Architectural Texture" 
               loading="lazy"
               className="w-full h-full object-cover grayscale-0 brightness-[0.7] contrast-[1.1]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           </motion.div>
        </div>
        
        <div className="about-hero-content relative z-10 max-w-[1440px] w-full mx-auto px-6 text-left">
          <div className="overflow-hidden mb-6">
            <span className="about-reveal tier-3 block text-[9px] uppercase tracking-[0.5em] text-[#FAF9F6]/60 font-bold">
              Our Narrative
            </span>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="about-reveal tier-1 text-[clamp(1.8rem,7.5vw,6.3rem)] italic leading-[0.95] text-[#FAF9F6] font-[var(--font-display)] drop-shadow-xl">
              Engineered for <br /> <i className="font-bold">Timelessness.</i>
              <div className="mt-6 opacity-40 text-[8px] tracking-[1.4em] font-mono animate-pulse text-[#FAF9F6]">
                [ LUX_ENGINEERING ]
              </div>
            </h1>
          </div>
          <div className="about-reveal tier-2 border-l border-[#FAF9F6]/20 pl-6 max-w-xl">
            <p className="text-lg md:text-xl text-[#FAF9F6]/90 font-medium leading-relaxed font-[var(--font-body)] drop-shadow-lg">
              Since 2008, Trielement has been the silent intelligence behind the world's most 
              prestigious structures. We don't just design systems; we craft the atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY / MISSION --- */}
      <section className="section-reveal min-h-[100dvh] max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center px-6 md:px-12 pt-32 md:pt-0">
        <div className="w-full md:w-1/2">
           <GlassPanel variant="thin" className="p-12 md:p-20 flex items-center justify-center rounded-[3rem]">
              <p className="font-[var(--font-display)] text-3xl md:text-5xl text-[#2B2B2B]/80 leading-relaxed italic text-center">
                "We believe that the most advanced engineering is the one you never notice, yet always feel."
              </p>
           </GlassPanel>
        </div>
        <div className="w-full md:w-1/2">
           <span className="tier-3 text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Our Ethos</span>
           <h2 className="tier-1 text-4xl md:text-6xl mb-10">The invisible foundation of luxury.</h2>
           <p className="tier-2 text-[#2B2B2B]/70 text-lg leading-relaxed max-w-xl mb-12">
             Our mission is to bridge the gap between architectural ambition and technical feasibility. 
             Through a lens of sustainability and precision, we ensure that every environment we touch 
             is optimized for human comfort and planetary respect.
           </p>
           <div className="w-20 h-[1px] bg-[#2B2B2B]" />
        </div>
      </section>

      {/* --- MILESTONES: HORIZONTAL TIMELINE --- */}
      <section className="milestone-section relative min-h-[100dvh] w-full flex flex-col pt-32 pb-16 overflow-hidden border-t border-[#E5E2DB]/50 cursor-drag bg-white z-[1]">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row justify-between items-end gap-6 flex-shrink-0">
           <h2 className="tier-1 text-5xl md:text-7xl leading-tight">Progressive <br /> <i className="italic">Legacy.</i></h2>
           <span className="tier-3 text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/40 mb-2 block font-medium">Navigate through Time</span>
        </div>
        
        {/* Adaptive height container */}
        <div className="milestone-container flex flex-nowrap h-full flex-grow items-stretch w-max pl-6 md:pl-[calc(50vw-720px+3rem)] xl:pl-[calc(50vw-680px)]">
          {milestones.map((m, i) => (
             <div 
               key={i} 
               className="milestone-item relative flex-shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] h-full flex flex-col justify-between p-8 md:p-12 border-r border-[#E5E2DB]/50 group"
               style={{ backgroundColor: `${m.accent}0a` }} // Ultra-subtle tint (approx 4% opacity)
             >
                {/* Year Accent Line */}
                <div className="w-12 h-1 bg-[#2B2B2B]/20 mb-6 transition-all duration-700 group-hover:w-24 group-hover:bg-[#2B2B2B]/60" />

                <div className="relative z-10">
                  <span className="milestone-year text-5xl md:text-7xl font-[var(--font-display)] text-[#2B2B2B]/10 block mb-4 transition-colors duration-700 group-hover:text-[#2B2B2B]/30">
                    {m.year}
                  </span>
                  <h3 className="text-3xl md:text-4xl italic font-serif leading-tight mb-6 text-[#2B2B2B]">{m.event}</h3>
                </div>

                <div className="max-w-md border-t border-[#2B2B2B]/10 pt-6 mt-6">
                  <p className="text-base md:text-lg text-[#2B2B2B]/70 leading-relaxed font-[var(--font-body)]">
                    {m.description}
                  </p>
                </div>

                {/* Aesthetic Corner Indicator */}
                <div 
                  className="absolute bottom-6 right-6 text-[9px] uppercase tracking-[0.2em] opacity-20"
                  style={{ color: m.accent }}
                >
                  STORY_{m.year}
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES: MINIMAL BLOCKS --- */}
      <section className="section-reveal relative z-10 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-24 md:py-32 border-t border-[#E5E2DB]/50">
        <div className="max-w-[1440px] mx-auto text-center mb-16 md:mb-24">
           <h2 className="tier-1 text-4xl md:text-7xl">Driven by Purpose.</h2>
        </div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E2DB]/50 border border-[#E5E2DB]/50">
          {values.map((v, i) => (
            <div key={i} className="relative bg-[#FAF9F6] p-12 md:p-20 group transition-all duration-700 overflow-hidden">
               {/* Persistent Aesthetic Background Hint */}
               <div 
                 className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none" 
                 style={{ backgroundColor: v.accent }}
               />
               
               {/* Large Background Indicator */}
               <div 
                 className="absolute -bottom-10 -right-10 text-[12rem] font-[var(--font-display)] opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-700"
                 style={{ color: v.accent }}
               >
                 0{i+1}
               </div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span 
                      className="text-[10px] uppercase tracking-[0.3em] font-bold block"
                      style={{ color: v.accent }}
                    >
                      Value 0{i+1}
                    </span>
                    <div 
                      className="w-2 h-2 rounded-full transform scale-100 group-hover:scale-150 transition-transform duration-700 shadow-lg"
                      style={{ backgroundColor: v.accent }}
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl mb-6 italic group-hover:translate-x-2 transition-transform duration-700">{v.title}</h3>
                  <p className="text-base text-[#2B2B2B]/60 max-w-sm leading-relaxed font-[var(--font-body)]">
                    {v.description}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA TEASER --- */}
      <section className="section-reveal relative z-10 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center items-center py-24 md:py-32 text-center">
         <h2 className="text-3xl md:text-5xl mb-8 md:mb-12 italic opacity-40">Ready to explore our solutions?</h2>
         <div ref={magneticBtnRef} className="inline-block">
            <Link to="/services" className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:scale-105 active:scale-95 shadow-xl">
              Discover Services
            </Link>
         </div>
      </section>

    </div>
  );
}