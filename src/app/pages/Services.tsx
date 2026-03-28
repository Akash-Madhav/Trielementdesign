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
    image: '/images/services_mep_1774695642299.png',
    description: 'The vital organs of architecture. We design electrical, plumbing, and HVAC systems that breathe life into structures.',
    features: ['HVAC Design', 'Power Systems', 'Specialized Plumbing', 'Fire Protection'],
  },
  {
    title: 'Sustainability',
    category: 'Legacy',
    image: '/images/services_sustain_fixed_1774696052157.png',
    description: 'Engineering for the planet. Integrated green solutions that achieve net-zero ambitions without compromise.',
    features: ['LEED / WELL', 'Solar Intel', 'Energy Modeling', 'Lifecycle Analysis'],
  },
  {
    title: 'BIM & Digital Twin',
    category: 'Intelligence',
    image: '/images/services_bim_1774695683569.png',
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
  const inquireBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Subtle Background Shift
      ScrollTrigger.create({
        trigger: ".methodology-section",
        start: "top center",
        onToggle: self => {
          gsap.to(containerRef.current, {
            backgroundColor: self.isActive ? '#F5F1EA' : '#FAF9F6',
            duration: 1
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pb-32 md:pb-64 selection:bg-[#2B2B2B]/10 overflow-hidden">
      
      {/* --- PREMIUM HERO: CINEMATIC MEDIA --- */}
      <section className="relative h-[80vh] md:h-[100vh] flex flex-col items-center justify-center mb-20 md:mb-40 overflow-hidden">
        {/* Background Media Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: yParallax }}
            className="w-full h-full relative"
          >
            <img 
              src="/images/services_hero_1774700717176.png" 
              alt="Architectural Precision" 
              className="w-full h-full object-cover grayscale brightness-[1.1] contrast-[1.05] opacity-40 mix-blend-multiply"
            />
            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
            <div className="absolute inset-0 bg-[#E5E2DB]/10 mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Hero Content Over Media */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 text-center">
            <div className="overflow-hidden mb-6">
              <span className="services-reveal tier-3 block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 font-medium">Our Specialties</span>
            </div>
            <div className="overflow-hidden mb-10">
              <h1 className="services-reveal tier-1 text-[clamp(3rem,10vw,8rem)] leading-[1.05] tracking-tighter">
                The <i>Art</i> of <br /> Engineering.
                <div className="flex justify-center mt-6 opacity-30 text-[9px] tracking-[1.2em] font-mono animate-pulse">
                  [ 25.1972° N, 55.2744° E ]
                </div>
              </h1>
            </div>
            <div className="services-reveal tier-2 max-w-xl mx-auto">
              <p className="text-lg md:text-xl text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)]">
                We provide a comprehensive suite of technical services that ensure the 
                vitality and longevity of architectural masterpieces.
              </p>
            </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1440px] px-6">
           <div className="services-reveal w-full h-[1px] bg-[#E5E2DB]/50" />
        </div>
      </section>

      {/* --- MAIN SERVICES: GALLERY LAYOUT --- */}
      <section className="max-w-[1440px] mx-auto space-y-24 md:space-y-48 mb-20 md:mb-40">
        {services.map((s, i) => (
           <div key={i} className="service-item grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 items-center overflow-hidden cursor-view">
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''} ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
                 <div className="relative overflow-hidden group aspect-[16/10]">
                    <motion.img 
                      whileHover={{ scale: 1.08, rotate: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover transition-all duration-1000"
                    />
                 </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''} ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
                 <span className="tier-3 text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-6 block">Service 0{i+1} / {s.category}</span>
                 <h2 className="tier-1 text-4xl md:text-6xl mb-10 italic">{s.title}</h2>
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
        ))}
      </section>

      {/* --- PROCESS: MINIMAL TIMELINE --- */}
      <section className="methodology-section bg-[#1A1A1A] text-[#F5F1EA] py-16 md:py-32 -mx-6 md:-mx-12 px-6 md:px-12">
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
      <section className="section-reveal py-20 md:py-32 text-center">
         <h2 className="text-[clamp(2.5rem,6vw,5rem)] mb-16 leading-tight">
           Crafting the <i>Next</i> <br /> Generation of <i>Space</i>.
         </h2>
         <div ref={inquireBtnRef} className="inline-block">
            <Link to="/contact" className="inline-block px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95">
              Inquire Now
            </Link>
         </div>
      </section>

    </div>
  );
}