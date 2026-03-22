import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GlassPanel, GlassButton } from '../components/GlassPanel';
import BrandWordmark from '../../imports/BrandWordmark';

const projects = [
  {
    name: 'Park Hyatt',
    location: 'Zanzibar',
    scope: 'MEP Design · Supervision',
    image: 'https://images.unsplash.com/photo-1671798746335-a30fd8b2e2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBhcmNoaXRlY3R1cmUlMjB6YW56aWJhcnxlbnwxfHx8fDE3NzM3MzI4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'WASL Tower',
    location: 'Dubai',
    scope: 'MEP Design',
    image: 'https://images.unsplash.com/photo-1735320864933-601d2cac9371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHRvd2VyJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzczMjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Mandarin JBR',
    location: 'Dubai',
    scope: 'MEP Design · Sustainability',
    image: 'https://images.unsplash.com/photo-1592904083165-8c001f6e8d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM3MzI4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Commerz 3',
    location: 'Dubai',
    scope: 'MEP Design',
    image: 'https://images.unsplash.com/photo-1604488382778-ff54757c0f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBkdWJhaXxlbnwxfHx8fDE3NzM3MzI4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'IMG World',
    location: 'Dubai',
    scope: 'MEP Design · Supervision',
    image: 'https://images.unsplash.com/photo-1725715443900-7cffb30ed2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzczNzMyODIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Sunrise Bay',
    location: 'Dubai',
    scope: 'MEP Design',
    image: 'https://images.unsplash.com/photo-1747555094127-9a922d56a64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzczMjgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const partners = ['WASL', 'TBC Bank', 'Commerz', 'Emaar', 'Hilton', 'Park Hyatt', 'Mandarin Oriental', 'Radisson', 'Marriott', 'Sobha', 'IMG Group'];

const stats = [
  { value: 300, label: 'Projects', suffix: '+' },
  { value: 15, label: 'Sectors', suffix: '+' },
  { value: 5, label: 'Project Value', prefix: '$', suffix: 'Bn' },
  { value: 50, label: 'Sq Ft Designed', suffix: 'Mn+' },
  { value: 20, label: 'Countries', suffix: '+' },
];

const philosophies = [
  {
    number: '01',
    title: 'DESIGN',
    heading: 'From Whole to Parts.',
    body: (<>Design governs the cost and performance of any project. Every engineer at <BrandWordmark showStudio={false} className="text-base inline-flex" /> is empowered to consider the smallest of details — and their cascading impact at every level.</>),
  },
  {
    number: '02',
    title: 'INTEGRATE',
    heading: 'Technology Meets Human Experience.',
    body: 'This step influences the efficiency and economics of operations. Promoting a blend of technology, keen observation and human experience enables seamless integration of each service into the system.',
  },
  {
    number: '03',
    title: 'SUSTAIN',
    heading: 'Built for Tomorrow.',
    body: 'Transcend industry expectations by planning systems and technologies to last the test of time. Our designers tackle the challenge of not only meeting today\'s expectations, but foreseeing tomorrow\'s demands.',
  },
];

function AnimatedCounter({ value, prefix = '', suffix = '', inView }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const { scrollY } = useScroll();

  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Diagonal Split Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-24 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
        {/* Hero Content - Centered Layout */}
        <div className="max-w-[900px] mx-auto w-full relative z-10">
          {/* Text Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[var(--color-ink)] opacity-60 text-[0.625rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-[var(--font-mono)] mb-8 sm:mb-12"
            >
              Global Engineering Services
            </motion.p>

            <motion.h1
              className="font-[var(--font-display)] text-[var(--color-ink)] mb-6 sm:mb-8 md:mb-10 px-2"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 7.5rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandWordmark showStudio={false} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-6 sm:mb-8 md:mb-10 px-4"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[var(--font-display)] text-[var(--color-accent-signal)]">
                Design. Integrate. Sustain.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-[var(--color-ink)] opacity-70 text-base sm:text-lg md:text-xl font-[var(--font-body)] mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Engineering the world's most iconic spaces — from concept to completion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <Link to="/project-locations">
                <GlassButton variant="primary">
                  VIEW PROJECT LOCATIONS
                </GlassButton>
              </Link>
              <Link to="/services">
                <GlassButton variant="secondary">
                  EXPLORE SERVICES
                </GlassButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Partner Ticker - Thin Glass */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <div
            style={{
              background: 'var(--glass-thin-fill)',
              backdropFilter: 'blur(12px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
              borderTop: '1px solid rgba(255, 255, 255, 0.6)',
            }}
            className="h-full"
          >
            <motion.div
              className="flex items-center h-full gap-12 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <span key={index} className="text-[var(--color-ink)] opacity-60 text-sm font-[var(--font-body)] tracking-wider">
                  {partner}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics - Heavy Glass Panels */}
      <section ref={statsRef} className="py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.08}>
                <GlassPanel
                  variant="heavy"
                  className="p-6 md:p-8 text-center"
                  enableRefraction={true}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={statsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-4xl md:text-5xl font-[var(--font-display)] text-[var(--color-accent-signal)] mb-2">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        inView={statsInView}
                      />
                    </div>
                    <div className="text-sm text-[var(--color-ink)] opacity-60 font-[var(--font-body)]">
                      {stat.label}
                    </div>
                  </motion.div>
                </GlassPanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Sections - Standard Glass Cards */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto space-y-12">
          {philosophies.map((philosophy, index) => (
            <ScrollReveal key={philosophy.number} delay={index * 0.1}>
              <GlassPanel
                variant="standard"
                className="p-8 md:p-12 relative overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span
                    className="font-[var(--font-display)] text-[var(--color-ink)]"
                    style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', opacity: 0.03 }}
                  >
                    {philosophy.number}
                  </span>
                </div>

                <div className="relative z-10 max-w-3xl">
                  <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
                    {philosophy.number} · {philosophy.title}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
                    {philosophy.heading}
                  </h3>
                  <p className="text-lg text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
                    {philosophy.body}
                  </p>
                </div>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Partnerships Infinite Marquee */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-[var(--font-display)] text-[var(--color-ink)] mb-6 text-center">
              Globally Collaborative
            </h2>
            <p className="text-lg text-[var(--color-ink)] opacity-70 font-[var(--font-body)] max-w-3xl mb-16 text-center mx-auto">
              <BrandWordmark showStudio={false} className="text-lg inline-flex" /> has built associations with renowned architects and design firms around the world,
              delivering services true to our philosophy of Design, Integration & Sustainability.
            </p>
          </ScrollReveal>

          {/* Infinite Scrolling Marquee with Better Visibility */}
          <div className="relative">
            <GlassPanel variant="standard" className="overflow-hidden py-12">
              {/* First Row - Left to Right */}
              <div className="mb-8">
                <motion.div
                  className="flex gap-8 md:gap-12 whitespace-nowrap"
                  animate={{ x: [0, -1400] }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                >
                  {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                    <span
                      key={index}
                      className="text-2xl md:text-3xl font-[var(--font-display)] text-[var(--color-ink)] opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                      {partner}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Second Row - Right to Left */}
              <div>
                <motion.div
                  className="flex gap-8 md:gap-12 whitespace-nowrap"
                  animate={{ x: [-1400, 0] }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                >
                  {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                    <span
                      key={index}
                      className="text-2xl md:text-3xl font-[var(--font-display)] text-[var(--color-ink)] opacity-40 hover:opacity-100 transition-opacity duration-300"
                    >
                      {partner}
                    </span>
                  ))}
                </motion.div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* CTA Section - Heavy Glass Panel */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1725715443900-7cffb30ed2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzczNzMyODIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Architecture"
            className="w-full h-full object-cover"
            style={{ filter: 'var(--img-filter)' }}
          />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <GlassPanel
              variant="heavy"
              className="p-12 md:p-16 text-center"
              enableRefraction={true}
            >
              <h2 className="text-4xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
                Begin Your Journey with <BrandWordmark showStudio={false} />
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-12 max-w-2xl mx-auto">
                From feasibility to final handover — we engineer what others can only imagine.
              </p>
              <Link to="/contact">
                <GlassButton variant="primary">
                  REQUEST A QUOTE
                </GlassButton>
              </Link>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}