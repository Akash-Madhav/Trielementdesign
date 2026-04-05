import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'MEP Engineering',
    category: 'Precision',
    image: '/images/services_mep.png',
    description: 'The vital organs of architecture. We design electrical, plumbing, and HVAC systems that breathe life into structures.',
    features: ['HVAC Design', 'Power Systems', 'Specialized Plumbing', 'Fire Protection'],
  },
  {
    title: 'Sustainability',
    category: 'Legacy',
    image: '/images/services_sustain.png',
    description: 'Engineering for the planet. Integrated green solutions that achieve net-zero ambitions without compromise.',
    features: ['LEED / WELL', 'Solar Intel', 'Energy Modeling', 'Lifecycle Analysis'],
  },
  {
    title: 'BIM & Digital Twin',
    category: 'Intelligence',
    image: '/images/services_bim.png',
    description: 'The data-driven ghost of construction. Immersive 3D coordination that eliminates conflict before the first stone is laid.',
    features: ['3D Coordination', 'Asset Management', 'Virtual Mockups', 'Clash Detection'],
  },
];

const processSteps = [
  { step: '01', title: 'Conceptualization', text: 'Defining the technical soul of the project.' },
  { step: '02', title: 'Integration', text: 'Harmonizing systems with architectural form.' },
  { step: '03', title: 'Validation', text: 'Rigorous analysis for performance and cost.' },
  { step: '04', title: 'Execution', text: 'Precision delivery and field oversight.' },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const inquireBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);

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

      // Hero Entrance
      gsap.from('.services-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: 'expo.out',
        delay: 0.3
      });

      // Service Blocks reveal
      gsap.utils.toArray<HTMLElement>('.service-item').forEach((item) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        });
      });

      // Directional Reveals (Zigzag)
      gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
        gsap.from(el, {
          x: -100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el) => {
        gsap.from(el, {
          x: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      // Drawing Line Animation for Process
      gsap.utils.toArray<HTMLElement>('.process-line').forEach((line) => {
        gsap.fromTo(line, 
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
            }
          }
        );
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

      // --- NATIVE-FEEL SNAP INTEGRATION ---
      const sections = gsap.utils.toArray<HTMLElement>('section');
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
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pb-32 md:pb-64 selection:bg-[#2B2B2B]/10 overflow-hidden">
      
      {/* --- PREMIUM HERO: CINEMATIC MEDIA --- */}
      <section className="relative min-h-[100dvh] md:h-screen flex items-end pb-24 md:pb-32 overflow-hidden px-6 bg-[#FAF9F6]">
        {/* Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-x-0 w-full h-full overflow-hidden z-0">
          <motion.div 
            style={{ y: yParallax }}
            className="w-full h-full relative"
          >
            <img 
              src="/images/services_hero.png" 
              alt="Architectural Precision" 
              loading="lazy"
              className="w-full h-full object-cover grayscale-0 brightness-[0.7] contrast-[1.1]"
            />
            {/* Cinematic dark bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </div>

        {/* Hero Content Over Media - Aligned to bottom like Contact */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto text-left px-6">
            <div className="overflow-hidden mb-6">
              <span className="services-reveal tier-3 block text-[9px] uppercase tracking-[0.4em] text-[#FAF9F6]/60 font-bold">Our Specialties</span>
            </div>
            <div className="overflow-hidden mb-10">
              <h1 className="services-reveal tier-1 text-[clamp(1.8rem,7.5vw,6.3rem)] leading-[0.95] tracking-tighter text-[#FAF9F6] font-[var(--font-display)] drop-shadow-xl">
                The <i className="font-bold font-[var(--font-display)] text-[#FAF9F6]">Art</i> of <br /> Engineering.
              </h1>
            </div>
            
            <div className="services-reveal tier-2 max-w-xl border-l border-[#FAF9F6]/20 pl-6">
               <p className="text-lg md:text-xl text-[#FAF9F6]/90 font-medium leading-relaxed font-[var(--font-body)] drop-shadow-lg">
                  Precise MEP solutions, sustainable lifecycle planning, and collaborative BIM environments—bridging the gap between theory and legacy.
               </p>
            </div>
        </div>


        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] px-6">
           <div className="services-reveal w-full h-[1px] bg-[#E5E2DB]/50" />
        </div>
      </section>

      {/* --- MAIN SERVICES: FULL-SCREEN GALLERY --- */}
      {services.map((s, i) => (
        <section key={i} className="min-h-[100dvh] md:h-screen flex items-center px-6 md:px-12 border-b border-[#E5E2DB]/30 bg-white/30">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="service-item grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 items-center overflow-hidden cursor-view">
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''} ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
                 <div className="relative overflow-hidden group aspect-[16/10] rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    />
                 </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''} ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
                 <span className="tier-3 text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-6 block">Service 0{i+1} / {s.category}</span>
                 <h2 className="tier-1 text-4xl md:text-6xl mb-10 italic leading-tight">{s.title}</h2>
                 <p className="tier-2 text-lg text-[#2B2B2B]/60 mb-12 leading-relaxed max-w-sm">
                    {s.description}
                 </p>
                 <div className="tier-3-container grid grid-cols-2 gap-4">
                    {s.features.map(f => (
                       <div key={f} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B5B0A8]" />
                          <span className="text-[11px] uppercase tracking-wider text-[#2B2B2B]/70">{f}</span>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* --- PROCESS: MINIMAL TIMELINE --- */}
      <section className="methodology-section bg-[#1A1A1A] text-[#F5F1EA] min-h-[100dvh] md:h-screen flex flex-col justify-center py-16 md:py-32 -mx-6 md:-mx-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
           <div className="mb-24 section-reveal">
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4CFC7]/50 mb-8 block font-medium">Our Methodology</span>
              <h2 className="text-4xl md:text-7xl">Precision in <i>Motion</i>.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
              {processSteps.map((p, i) => (
                 <div key={i} className="section-reveal group cursor-default">
                    <div className="text-4xl font-[var(--font-display)] mb-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">{p.step}</div>
                    <div className="w-full h-px bg-[#D4CFC7]/20 mb-8 group-hover:bg-[#D4CFC7] transition-all duration-700 origin-left scale-x-50 group-hover:scale-x-100" />
                    <h3 className="text-xl mb-4 italic">{p.title}</h3>
                    <p className="text-sm text-[#F5F1EA]/60 font-[var(--font-body)] leading-relaxed">
                       {p.text}
                    </p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FINAL CTA TEASER --- */}
      <section className="section-reveal min-h-[100dvh] md:h-screen flex flex-col justify-center py-20 md:py-32 text-center bg-white/10">
         <h2 className="text-[clamp(2.5rem,6vw,5rem)] mb-16 leading-tight">
           Crafting the <i>Next</i> <br /> Generation of <i>Space</i>.
         </h2>
         <div ref={inquireBtnRef} className="inline-block">
            <Link to="/contact" className="inline-block px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
              Inquire Now
            </Link>
         </div>
      </section>

    </div>
  );
}