import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import BrandName from '../components/BrandName';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { 
    year: 'MECHANICAL', 
    accent: '#D4AF37', 
    tags: 'HVAC · THERMAL · ENERGY',
    code: 'UNIT_MECH_01',
    event: 'Critical Environment Climate Control', 
    description: 'Precision HVAC design for hospitals, high-rise towers, and large-format commercial spaces — where thermal performance directly defines the quality of every working hour inside the building.' 
  },
  { 
    year: 'ELECTRICAL', 
    accent: '#4B5568', 
    tags: 'POWER · LIGHTING · SOLAR',
    code: 'SYS_ELEC_04',
    event: 'Power & Lighting Across Landmark Projects', 
    description: 'Intelligent lighting, solar PV integration, and HV/LV distribution — electrical systems engineered for resilience, efficiency, and the long operational life of every building we touch.' 
  },
  { 
    year: 'PLUMBING', 
    accent: '#005C8E', 
    tags: 'WATER · DRAINAGE · FIRE',
    code: 'FLOW_PLMB_09',
    event: 'Water Systems for Complex Structures', 
    description: 'Potable water, drainage, and fire suppression systems designed with healthcare-grade compliance — built to serve the building reliably across its entire lifespan, not just handover day.' 
  },
  { 
    year: 'BIM · COORDINATION', 
    accent: '#4B5320', 
    tags: 'REVIT · NAVISWORKS · 4D',
    code: 'DATA_BIM_02',
    event: 'Zero-Conflict MEP Coordination', 
    description: 'Every project is fully coordinated in a shared BIM model across footprints from 1 lakh to 50 lakh square feet. Clashes are resolved before construction begins — not discovered on site.' 
  },
];

const values = [
  { 
    title: 'Precision over output', 
    subLabel: 'CRAFT · DETAIL · RIGOUR',
    accent: '#D4AF37', 
    description: 'We measure our work not by how fast it leaves the studio, but by how well it performs inside the building. Every specification, every coordination drawing, every site decision is held to a standard that does not bend under schedule pressure.' 
  },
  { 
    title: 'Transparency in complexity', 
    subLabel: 'CLARITY · TRUST · OPENNESS',
    accent: '#4B5568', 
    description: 'MEP engineering is inherently complex. We make it legible — to architects, contractors, and clients. When a system has a constraint, we surface it early. When a decision has a consequence, we name it. Our clients are never surprised by what is behind their walls.' 
  },
  { 
    title: 'Stewardship of resources', 
    subLabel: 'SUSTAIN · EFFICIENCY · LONGEVITY',
    accent: '#005C8E', 
    description: 'Every system we specify is evaluated through the lens of its operational life and environmental footprint. Resource efficiency is never considered a secondary goal — it is treated as a non-negotiable design input that defines the long-term stewardship of the building.' 
  },
  { 
    title: 'Ambition without compromise', 
    subLabel: 'COURAGE · VISION · RESOLVE',
    accent: '#4B5320', 
    description: 'The most demanding clients — India\'s leading corporates and real estate developers — choose engineers who push the brief, not ones who simply fulfil it. We treat every project as an opportunity to do something genuinely better than what came before it.' 
  },
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
            start: 'top 92%',
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
            start: 'top top',
            end: () => `+=${milestoneContainer.scrollWidth * 1.25}`,
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen selection:bg-[#2B2B2B]/10 overflow-hidden">
      
      {/* --- PREMIUM HERO --- */}
      <section className="relative min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 md:px-12 pt-20">
        {/* Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 will-change-transform [backface-visibility:hidden]">
           <motion.div 
             style={{ y: yParallax }}
             className="w-full h-full relative will-change-transform [backface-visibility:hidden]"
           >
             <img 
               src="/images/about_hero.png" 
               alt="Architectural Texture" 
               loading="eager"
               decoding="sync"
               className="w-full h-full object-cover grayscale-0 brightness-[0.7] contrast-[1.1]"
             />
             {/* Technical Blueprint Grid Overlay */}
             <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
               style={{ 
                 backgroundImage: `linear-gradient(#FAF9F6 1px, transparent 1px), linear-gradient(90deg, #FAF9F6 1px, transparent 1px)`,
                 backgroundSize: '40px 40px' 
               }} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           </motion.div>
        </div>
        
        <div className="about-hero-content relative z-10 max-w-[1440px] w-full mx-auto px-6 text-center md:text-left">
          <div className="overflow-hidden mb-6">
            <span className="about-reveal tier-3 block text-[9px] uppercase tracking-[0.5em] text-[#FAF9F6]/60 font-bold">
              OUR NARRATIVE
            </span>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="about-reveal tier-1 text-[clamp(1.8rem,7.5vw,6.3rem)] italic leading-[0.95] text-[#FAF9F6] font-[var(--font-display)] drop-shadow-xl relative">
              Engineered for <br /> <i className="font-bold">Timelessness.</i>
              
            </h1>
          </div>
          <div className="about-reveal tier-2 md:border-l border-[#FAF9F6]/20 md:pl-8 max-w-2xl mx-auto md:mx-0">
             <p className="text-base md:text-[clamp(1rem,1.4vw,1.35rem)] text-[#FAF9F6]/90 font-medium leading-relaxed font-[var(--font-body)] drop-shadow-lg">
               <BrandName /> Studio exists at the intersection of architectural intent and engineering precision. Our practice is defined by a decade of mastering MEP complexities across India&apos;s most significant landmarks—delivering mechanical, electrical, and plumbing systems that do not just function, but perform with a quiet, enduring conviction.
             </p>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY / MISSION --- */}
      <section className="section-reveal max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center px-6 md:px-12 py-16 md:py-24">
        <div className="w-full md:w-1/2">
           <GlassPanel variant="thin" className="p-8 md:p-14 lg:p-20 flex items-center justify-center rounded-[3rem]">
              <p className="font-[var(--font-display)] text-2xl md:text-[clamp(1.5rem,3.5vw,3rem)] text-[#2B2B2B]/80 leading-relaxed italic text-center">
                "We believe that the most advanced engineering is the one you never notice — yet always feel."
                <br />
                <span className="text-[9px] uppercase tracking-[0.4em] font-mono opacity-40 block mt-6 md:mt-10">— <BrandName /> DESIGN PHILOSOPHY</span>
              </p>
           </GlassPanel>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
           <span className="tier-3 text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-4 md:mb-6 block">Philosophy & Ethos</span>
           <h2 className="tier-1 text-3xl md:text-[clamp(2rem,4vw,3.5rem)] mb-6 md:mb-10 leading-[1.1]">Where architectural ambition meets engineering conviction</h2>
           <p className="tier-2 text-[#2B2B2B]/70 text-base md:text-lg leading-relaxed max-w-xl mb-8 md:mb-12">
             Our engineers arrive at every project not to specify what fits the schedule, but to understand the building — its purpose, its occupants, its long-term obligations — and design mechanical, electrical, and plumbing systems genuinely worthy of that vision.
             <br /><br />
             Shaped by working alongside India's top real estate firms and corporate clients, our team operates at a standard defined not by what is acceptable, but by what is exceptional.
           </p>
           <div className="w-20 h-[1px] bg-[#2B2B2B]/20" />
        </div>
      </section>

      {/* --- MILESTONES: HORIZONTAL TIMELINE --- */}
      <section className="milestone-section relative w-full flex flex-col pt-20 pb-16 overflow-hidden border-t border-[#E5E2DB]/50 cursor-drag bg-white z-10">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 mb-10 md:mb-16">
           <h2 className="tier-1 text-2xl md:text-[clamp(1.8rem,4.2vw,3.5rem)] leading-tight">Mastery earned across the most demanding project types</h2>
        </div>
        
        {/* Adaptive height container */}
        <div className="milestone-container flex flex-nowrap h-full flex-grow items-stretch w-max pl-6 md:pl-[calc(50vw-720px+3rem)] xl:pl-[calc(50vw-680px)]">
          {milestones.map((m, i) => (
             <div 
               key={i} 
               className="milestone-item relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-full flex flex-col justify-between p-8 md:p-12 border-r border-[#E5E2DB]/30 group overflow-hidden"
               style={{ backgroundColor: `${m.accent}02` }}
             >
                {/* Subtle Radial Gradient Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 70% 30%, ${m.accent}15, transparent 70%)` }}
                />
                {/* Year Accent Line */}
                <div className="relative z-10 w-12 h-[1px] bg-[#2B2B2B]/20 mb-6 transition-all duration-700 group-hover:w-24 group-hover:bg-[#2B2B2B]/60" />

                <div className="relative z-10">
                  {/* Architectural Background Label */}
                  <div className="absolute -top-12 -left-4 pointer-events-none select-none overflow-hidden">
                    <span className="milestone-year text-[12vw] font-[var(--font-display)] leading-none text-[#2B2B2B]/[0.02] uppercase tracking-tighter block transition-all duration-1000 group-hover:text-[#2B2B2B]/[0.05] group-hover:-translate-y-4">
                      {m.year.split(' ')[0]}
                    </span>
                  </div>

                  {/* Domain Tag */}
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#2B2B2B]/40 mb-2 block uppercase leading-none">
                    {m.tags}
                  </span>
                  <h3 className="text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)] italic font-serif leading-tight mb-6 text-[#2B2B2B] group-hover:translate-x-2 transition-transform duration-700 max-w-sm">
                    {m.event}
                  </h3>
                </div>

                <div className="max-w-md border-t border-[#2B2B2B]/10 pt-8 mt-6 relative z-10">
                  <p className="text-sm md:text-base text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)] font-light italic">
                    {m.description}
                  </p>
                </div>

             </div>
          ))}
        </div>
      </section>

      {/* --- SUSTAINABLE PERFORMANCE: IGBC --- */}
      <section className="section-reveal relative z-10 bg-[#FAF9F6] py-16 md:py-20 border-t border-b border-[#E5E2DB]/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
           <span className="tier-3 text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/40 mb-8 block font-medium">Sustainable Performance</span>
           <div className="overflow-hidden mb-6">
             <h2 className="tier-1 text-2xl md:text-[clamp(1.5rem,3.5vw,3rem)] italic font-serif text-[#2B2B2B]/80 leading-relaxed max-w-4xl mx-auto">
               "Our work holds IGBC certification — across <br className="hidden md:block" /> Gold, Silver, and Platinum."
             </h2>
           </div>
           <p className="tier-2 text-[9px] font-mono tracking-[0.4em] text-[#2B2B2B]/40 uppercase">
             The rating is the result. The engineering is the reason.
           </p>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="section-reveal relative z-10 bg-[#FAF9F6] flex flex-col justify-center py-20 md:py-24 border-t border-[#E5E2DB]/50">
        <div className="max-w-[1440px] mx-auto text-center mb-16 md:mb-24">
           <h2 className="tier-1 text-3xl md:text-[clamp(2rem,4.5vw,4.5rem)] leading-tight max-w-4xl mx-auto">The convictions that shape every decision</h2>
        </div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-[repeat(2,minmax(0,1fr))] h-full gap-px bg-[#E5E2DB]/50 border border-[#E5E2DB]/50">
          {values.map((v, i) => (
            <div key={i} className="relative bg-[#FAF9F6] p-10 md:p-14 lg:p-20 group transition-all duration-700 overflow-hidden border-[#E5E2DB]/50">
               {/* Accent Glow Background */}
               <div 
                 className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 pointer-events-none" 
                 style={{ backgroundColor: v.accent }}
               />
               

               {/* Large Background Indicator */}
               <div 
                 className="absolute -bottom-10 -right-10 text-[15rem] font-[var(--font-display)] opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.05] group-hover:-translate-y-4 transition-all duration-1000"
                 style={{ color: v.accent }}
               >
                 0{i+1}
               </div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex flex-col gap-2">
                       <span 
                         className="text-[9px] uppercase tracking-[0.4em] font-mono opacity-40 block"
                       >
                         {v.subLabel}
                       </span>
                       <span 
                         className="text-[9px] uppercase tracking-[0.2em] font-bold block"
                         style={{ color: v.accent }}
                       >
                         CONVICTION 0{i+1}
                       </span>
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full transform scale-100 group-hover:scale-150 transition-transform duration-700 shadow-lg"
                      style={{ backgroundColor: v.accent }}
                    />
                  </div>
                  <h3 className="text-2xl md:text-[clamp(1.5rem,3.5vw,3rem)] mb-6 italic group-hover:translate-x-2 transition-transform duration-700 font-serif text-[#2B2B2B]">{v.title}</h3>
                  <p className="text-sm md:text-base text-[#2B2B2B]/60 max-w-sm leading-relaxed font-[var(--font-body)] font-light">
                    {v.description}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA TEASER --- */}
      <section className="section-reveal relative z-10 bg-[#FAF9F6] flex flex-col justify-center items-center py-20 md:py-24 text-center">
         <h2 className="text-2xl md:text-[clamp(1.5rem,3.5vw,2.5rem)] mb-8 md:mb-12 italic opacity-40">Precision that performs. <br /> Systems that endure.</h2>
         <div ref={magneticBtnRef} className="inline-block">
            <Link to="/services" className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:scale-105 active:scale-95 shadow-xl">
              Discover Services
            </Link>
         </div>
      </section>

    </div>
  );
}