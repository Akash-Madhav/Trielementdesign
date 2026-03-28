import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2008', event: 'The Genesis', description: 'Trielement begins its journey in the heart of Dubai, driven by a vision of engineering excellence.' },
  { year: '2012', event: 'Beyond Borders', description: 'Expansion into India, bringing bespoke technical expertise to Bangalore and Kochi.' },
  { year: '2018', event: 'Global Footprint', description: '500+ projects completed across 20 countries, establishing a legacy of precision.' },
  { year: '2024', event: 'Ethereal Future', description: 'Pioneering sustainable, light-focused engineering for the next generation of architecture.' },
];

const values = [
  { title: 'Excellence', description: 'The pursuit of the sublime in every calculation, every design, every detail.' },
  { title: 'Integrity', description: 'A foundation of transparency and ethical clarity in all our partnerships.' },
  { title: 'Innovation', description: 'Embracing the avant-garde of technology to solve the challenges of tomorrow.' },
  { title: 'Sustain', description: 'Designing for longevity, ensuring our creations respect the world they inhabit.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-32 pb-40 px-6 md:px-12 selection:bg-[#2B2B2B]/10">
      
      {/* --- PREMIUM HERO --- */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center mb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <motion.div 
             ref={heroImageRef}
             style={{ y: yParallax }}
             className="w-full h-full"
           >
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
               alt="Architectural Texture" 
               className="w-full h-full object-cover grayscale"
             />
           </motion.div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-6">
          <span className="about-reveal block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 mb-8 font-medium">
            Our Narrative
          </span>
          <h1 className="about-reveal text-[clamp(3rem,10vw,8rem)] italic leading-[1.05] mb-10">
            Engineered for <br /> <i>Timelessness.</i>
          </h1>
          <p className="about-reveal text-lg md:text-xl text-[#2B2B2B]/60 max-w-2xl mx-auto font-[var(--font-body)] leading-relaxed">
            Since 2008, Trielement has been the silent intelligence behind the world's most 
            prestigious structures. We don't just design systems; we craft the atmosphere.
          </p>
        </div>
      </section>

      {/* --- PHILOSOPHY / MISSION --- */}
      <section className="section-reveal max-w-[1440px] mx-auto mb-64 flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-1/2">
           <div className="aspect-square bg-[#F5F1EA] p-12 flex items-center justify-center">
              <p className="font-[var(--font-display)] text-3xl md:text-4xl text-[#2B2B2B]/80 leading-relaxed italic text-center">
                "We believe that the most advanced engineering is the one you never notice, yet always feel."
              </p>
           </div>
        </div>
        <div className="w-full md:w-1/2">
           <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Our Ethos</span>
           <h2 className="text-4xl md:text-6xl mb-10">The invisible foundation of luxury.</h2>
           <p className="text-[#2B2B2B]/70 text-lg leading-relaxed max-w-xl mb-12">
             Our mission is to bridge the gap between architectural ambition and technical feasibility. 
             Through a lens of sustainability and precision, we ensure that every environment we touch 
             is optimized for human comfort and planetary respect.
           </p>
           <div className="w-20 h-[1px] bg-[#2B2B2B]" />
        </div>
      </section>

      {/* --- MILESTONES --- */}
      <section className="mb-64">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
          {milestones.map((m, i) => (
            <div key={i} className="section-reveal flex flex-col gap-6">
               <span className="text-5xl font-[var(--font-display)] text-[#2B2B2B]/20">{m.year}</span>
               <h3 className="text-2xl italic">{m.event}</h3>
               <p className="text-sm text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)]">
                 {m.description}
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES: MINIMAL BLOCKS --- */}
      <section className="section-reveal py-40 border-t border-[#E5E2DB]/50">
        <div className="max-w-[1440px] mx-auto text-center mb-24">
           <h2 className="text-4xl md:text-7xl">Driven by Purpose.</h2>
        </div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E2DB]/50 border border-[#E5E2DB]/50">
          {values.map((v, i) => (
            <div key={i} className="bg-[#FAF9F6] p-12 md:p-20 group hover:bg-[#F5F1EA] transition-colors duration-700">
               <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Value 0{i+1}</span>
               <h3 className="text-3xl md:text-4xl mb-6 italic">{v.title}</h3>
               <p className="text-base text-[#2B2B2B]/60 max-w-sm leading-relaxed font-[var(--font-body)]">
                 {v.description}
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA TEASER --- */}
      <section className="section-reveal py-40 text-center">
         <h2 className="text-3xl md:text-5xl mb-12 italic opacity-40">Ready to explore our solutions?</h2>
         <Link to="/services" className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:scale-105 active:scale-95">
           Discover Services
         </Link>
      </section>

    </div>
  );
}