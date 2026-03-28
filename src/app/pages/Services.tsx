import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'MEP Engineering',
    category: 'Precision',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=1000',
    description: 'The vital organs of architecture. We design electrical, plumbing, and HVAC systems that breathe life into structures.',
    features: ['HVAC Design', 'Power Systems', 'Specialized Plumbing', 'Fire Protection'],
  },
  {
    title: 'Sustainability',
    category: 'Legacy',
    image: 'https://images.unsplash.com/photo-1466611653911-95282ee3356d?auto=format&fit=crop&q=80&w=1000',
    description: 'Engineering for the planet. Integrated green solutions that achieve net-zero ambitions without compromise.',
    features: ['LEED / WELL', 'Solar Intel', 'Energy Modeling', 'Lifecycle Analysis'],
  },
  {
    title: 'BIM & Digital Twin',
    category: 'Intelligence',
    image: 'https://images.unsplash.com/photo-1536412597336-ade7b523ecac?auto=format&fit=crop&q=80&w=1000',
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
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-40 pb-64 px-6 md:px-12 selection:bg-[#2B2B2B]/10">
      
      {/* --- PREMIUM HERO --- */}
      <section className="max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
           <div>
              <span className="services-reveal block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 mb-8 font-medium">Our Specialties</span>
              <h1 className="services-reveal text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] tracking-tighter mb-10">
                The <i>Art</i> of <br /> Engineering.
              </h1>
           </div>
           <div className="services-reveal max-w-md pb-10">
              <p className="text-lg md:text-xl text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)]">
                We provide a comprehensive suite of technical services that ensure the 
                vitality and longevity of architectural masterpieces.
              </p>
           </div>
        </div>
        <div className="services-reveal w-full h-[1px] bg-[#E5E2DB]" />
      </section>

      {/* --- MAIN SERVICES: GALLERY LAYOUT --- */}
      <section className="max-w-[1440px] mx-auto space-y-40 md:space-y-72 mb-80">
        {services.map((s, i) => (
           <div key={i} className="service-item grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 items-center">
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                 <div className="relative overflow-hidden group aspect-[16/10]">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover brightness-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                 </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                 <span className="text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-6 block">Service 0{i+1} / {s.category}</span>
                 <h2 className="text-4xl md:text-6xl mb-10 italic">{s.title}</h2>
                 <p className="text-lg text-[#2B2B2B]/60 mb-12 leading-relaxed max-w-sm">
                   {s.description}
                 </p>
                 <div className="grid grid-cols-2 gap-4">
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
      <section className="bg-[#1A1A1A] text-[#F5F1EA] py-40 md:py-64 -mx-6 md:-mx-12 px-6 md:px-12">
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
      <section className="section-reveal py-64 text-center">
         <h2 className="text-[clamp(2.5rem,6vw,5rem)] mb-16 leading-tight">
           Crafting the <i>Next</i> <br /> Generation of <i>Space</i>.
         </h2>
         <Link to="/contact" className="inline-block px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95">
           Inquire Now
         </Link>
      </section>

    </div>
  );
}