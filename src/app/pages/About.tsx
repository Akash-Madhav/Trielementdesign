import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2008', event: 'The Genesis', description: 'Trielement begins its journey in the heart of Dubai, driven by a vision of engineering excellence.' },
  { year: '2012', event: 'Beyond Borders', description: 'Expansion into India, bringing bespoke technical expertise to Bangalore and Kochi.' },
  { year: '2018', event: 'Global Footprint', description: '500+ projects completed across 20 countries, establishing a legacy of precision.' },
  { year: '2024', event: 'Ethereal Future', description: 'Pioneering sustainable, light-focused engineering for the next generation of architecture.' },
];

const values = [
  { title: 'Excellence', accent: '#D4AF37', description: 'The pursuit of the sublime in every calculation, every design, every detail.' },
  { title: 'Integrity', accent: '#4A5568', description: 'A foundation of transparency and ethical clarity in all our partnerships.' },
  { title: 'Innovation', accent: '#005C8E', description: 'Embracing the avant-garde of technology to solve the challenges of tomorrow.' },
  { title: 'Sustain', accent: '#4B5320', description: 'Designing for longevity, ensuring our creations respect the world they inhabit.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 350]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.about-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 2,
        ease: 'expo.out',
        delay: 0.5
      });

      // Hero Narrative Pinning
      ScrollTrigger.create({
        trigger: ".about-hero-section",
        start: "top top",
        end: "+=50%",
        pin: ".about-hero-content",
        pinSpacing: false
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
      const items = gsap.utils.toArray<HTMLElement>('.milestone-item');
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
          id: 'milestone-scroll',
          trigger: '.milestone-section',
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${(document.querySelector('.milestone-container')?.scrollWidth || 2000)}`,
          invalidateOnRefresh: true,
        }
      });

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
            containerAnimation: gsap.getById('milestone-scroll') || undefined // Will need a label
          }
        });
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
            start: 'top 90%',
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
            start: 'top 90%',
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
            start: 'top 92%',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-24 md:pt-32 pb-20 md:pb-40 px-6 md:px-12 selection:bg-[#2B2B2B]/10">
      
      {/* --- PREMIUM HERO --- */}
      <section className="about-hero-section relative h-[70vh] md:h-[100vh] flex flex-col items-center justify-center text-center mb-20 md:mb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <motion.div 
             ref={heroImageRef}
             style={{ y: yParallax }}
             className="w-full h-full"
           >
             <img 
               src="/images/about_hero.png" 
               alt="Architectural Texture" 
               className="w-full h-full object-cover grayscale"
             />
           </motion.div>
        </div>
        
        <div className="about-hero-content relative z-10 max-w-5xl px-6">
          <span className="about-reveal tier-3 block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 mb-8 font-medium">
            Our Narrative
          </span>
          <h1 className="about-reveal tier-1 text-[clamp(2.5rem,10vw,8rem)] italic leading-[1.05] mb-10">
            Engineered for <br /> <i>Timelessness.</i>
            <div className="flex justify-center mt-6 opacity-30 text-[9px] tracking-[1.2em] font-mono animate-pulse">
              [ 25.1972° N, 55.2744° E ]
            </div>
          </h1>
          <p className="about-reveal tier-2 text-lg md:text-xl text-[#2B2B2B]/60 max-w-2xl mx-auto font-[var(--font-body)] leading-relaxed">
            Since 2008, Trielement has been the silent intelligence behind the world's most 
            prestigious structures. We don't just design systems; we craft the atmosphere.
          </p>
        </div>
      </section>

      {/* --- PHILOSOPHY / MISSION --- */}
      <section className="section-reveal max-w-[1440px] mx-auto mb-20 md:mb-40 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <div className="w-full md:w-1/2">
           <GlassPanel variant="thin" className="p-12 md:p-20 flex items-center justify-center">
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
      <section className="milestone-section relative min-h-screen mb-16 md:mb-32 overflow-hidden border-t border-[#E5E2DB]/50 pt-20 cursor-drag">
        <div className="max-w-[1440px] mx-auto px-6 mb-12 flex justify-between items-end">
           <h2 className="tier-1 text-5xl md:text-7xl">Progressive <br /> <i>Legacy.</i></h2>
           <span className="tier-3 text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/40 mb-2 block font-medium">Scroll to Traverse</span>
        </div>
        
        <div className="milestone-container flex flex-nowrap h-full">
          {milestones.map((m, i) => (
            <div key={i} className="milestone-item flex-shrink-0 w-full md:w-[45vw] px-6 md:px-20 py-20 border-r border-[#E5E2DB]/30 last:border-r-0">
               <span className="milestone-year text-7xl md:text-[10rem] font-[var(--font-display)] text-[#2B2B2B]/5 block mb-10">{m.year}</span>
               <div className="max-w-md">
                 <h3 className="text-3xl md:text-4xl italic mb-8">{m.event}</h3>
                 <p className="text-base md:text-lg text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)]">
                   {m.description}
                 </p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES: MINIMAL BLOCKS --- */}
      <section className="section-reveal py-12 md:py-24 border-t border-[#E5E2DB]/50">
        <div className="max-w-[1440px] mx-auto text-center mb-16 md:mb-24">
           <h2 className="tier-1 text-4xl md:text-7xl">Driven by Purpose.</h2>
        </div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E2DB]/50 border border-[#E5E2DB]/50">
          {values.map((v, i) => (
            <div key={i} className="relative bg-[#FAF9F6] p-12 md:p-20 group transition-all duration-700 overflow-hidden">
               {/* Persistent Aesthetic Background Tint */}
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
      <section className="section-reveal py-16 md:py-32 text-center">
         <h2 className="text-3xl md:text-5xl mb-8 md:mb-12 italic opacity-40">Ready to explore our solutions?</h2>
         <div ref={magneticBtnRef} className="inline-block">
            <Link to="/services" className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:scale-105 active:scale-95">
              Discover Services
            </Link>
         </div>
      </section>

    </div>
  );
}