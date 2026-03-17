import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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
    body: 'Design governs the cost and performance of any project. Every engineer at TRI-ELEMENT is empowered to consider the smallest of details — and their cascading impact at every level.',
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
  const heroParallax = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Blueprint Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y: heroParallax }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(10,10,12,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10,10,12,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </motion.div>

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
        }} />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-[#6B6B7A] text-xs tracking-[0.3em] uppercase font-['JetBrains_Mono'] mb-8">
              Global Engineering Services & Consultancy
            </p>
          </motion.div>

          <motion.h1
            className="font-['Cormorant_Garamond'] text-[#0A0A0C] mb-8 flex items-center justify-center gap-2 flex-wrap"
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', letterSpacing: '0.2em' }}
          >
            {['T', 'R', 'I', '-', 'E', 'L'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + 6 * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              className="inline-flex flex-col gap-[3px] mx-[2px]"
            >
              <span className="w-[16px] md:w-[20px] h-[3px] md:h-[4px] bg-[#0A0A0C] rounded-full"></span>
              <span className="w-[16px] md:w-[20px] h-[3px] md:h-[4px] bg-[#0A0A0C] rounded-full"></span>
              <span className="w-[16px] md:w-[20px] h-[3px] md:h-[4px] bg-[#0A0A0C] rounded-full"></span>
            </motion.span>
            {['M', 'E', 'N', 'T'].map((letter, index) => (
              <motion.span
                key={index + 7}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + (index + 7) * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <div className="mb-6 overflow-hidden flex justify-center items-center">
            {['Design.', 'Integrate.', 'Sustain.'].map((word, index) => (
              <motion.span
                key={word}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0 0 0)' }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                className="inline-block text-2xl md:text-4xl font-['Cormorant_Garamond'] text-[#C8972B] italic mx-2"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-[#6B6B7A] text-lg md:text-xl font-['Inter'] mb-12 max-w-3xl mx-auto"
          >
            Engineering the world's most iconic spaces — from concept to completion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-[#C8972B] text-white rounded-sm font-['Inter'] overflow-hidden"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Link>
            <Link
              to="/services"
              className="group px-8 py-4 border border-[#C8972B] text-[#C8972B] rounded-sm font-['Inter'] hover:bg-[#C8972B] hover:text-white transition-all"
            >
              EXPLORE SERVICES
            </Link>
          </motion.div>
        </div>

        {/* Partner Ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-16 backdrop-blur-md bg-[rgba(0,0,0,0.02)] border-t border-[rgba(0,0,0,0.08)] overflow-hidden">
          <motion.div
            className="flex items-center h-full gap-12 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <span key={index} className="text-[#6B6B7A] text-sm font-['Inter'] tracking-wider">
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-12">
            Explore Some of Our Work
          </h2>
        </ScrollReveal>

        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-6 w-max">
            {projects.map((project, index) => (
              <ScrollReveal key={project.name} delay={index * 0.08}>
                <motion.div
                  className="group relative w-[340px] h-[520px] bg-[#F0F0F5] rounded-sm overflow-hidden cursor-pointer border border-[rgba(0,0,0,0.08)]"
                  whileHover={{ y: -12 }}
                >
                  <div className="relative h-[70%] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="p-6 h-[30%] flex flex-col justify-center">
                    <h3 className="text-xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-2">
                      {project.name} · {project.location}
                    </h3>
                    <p className="text-sm text-[#6B6B7A] font-['Inter']">{project.scope}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#C8972B]/80 via-[#C8972B]/40 to-transparent 
                               flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white font-['Inter'] flex items-center gap-2">
                      View Project <ArrowRight size={16} />
                    </span>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#C8972B] font-['Inter'] mt-8 hover:gap-4 transition-all"
          >
            VIEW MORE <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </section>

      {/* Statistics Band */}
      <section
        ref={statsRef}
        className="py-16 bg-[#F8F8FA] border-y border-[rgba(0,0,0,0.08)]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[120px]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center border-r border-[rgba(0,0,0,0.08)] last:border-r-0"
              >
                <div className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#C8972B] mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    inView={statsInView}
                  />
                </div>
                <div className="text-sm text-[#6B6B7A] font-['Inter']">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Sections */}
      <section className="scroll-snap-y">
        {philosophies.map((philosophy, index) => (
          <div
            key={philosophy.number}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-[120px] py-24 scroll-snap-start"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="font-['Cormorant_Garamond'] text-[#0A0A0C] select-none"
                style={{ fontSize: 'clamp(10rem, 30vw, 25rem)', opacity: 0.02 }}
              >
                {philosophy.number}
              </span>
            </div>

            <ScrollReveal className="relative z-10 max-w-4xl">
              <p className="text-[#C8972B] text-sm tracking-[0.3em] uppercase font-['JetBrains_Mono'] mb-4">
                {philosophy.number} · {philosophy.title}
              </p>
              <h3 className="text-4xl md:text-6xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
                {philosophy.heading}
              </h3>
              <p className="text-lg md:text-xl text-[#6B6B7A] font-['Inter'] leading-relaxed">
                {philosophy.body}
              </p>
            </ScrollReveal>
          </div>
        ))}
      </section>

      {/* Partners Marquee Section */}
      <section className="py-24 bg-[#F8F8FA]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[120px] mb-12">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
              Globally Collaborative
            </h2>
            <p className="text-lg text-[#6B6B7A] font-['Inter'] max-w-3xl mb-4">
              TRI-ELEMENT has built associations with renowned architects and design firms around the world, 
              delivering services true to our philosophy of Design, Integration & Sustainability.
            </p>
            <p className="text-sm text-[#6B6B7A] font-['Inter'] italic">
              Trusted by global leaders in architecture and development since 2005.
            </p>
          </ScrollReveal>
        </div>

        <div className="overflow-hidden py-8">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <span
                key={index}
                className="inline-block px-6 py-3 border border-[rgba(0,0,0,0.1)] rounded-full 
                         text-[#6B6B7A] font-['Inter'] text-sm"
              >
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Fullscreen Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: useTransform(scrollY, [0, 1000], [0, 400]) }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1725715443900-7cffb30ed2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzczNzMyODIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
              Begin Your Journey with TRI-ELEMENT
            </h2>
            <p className="text-lg md:text-xl text-[#6B6B7A] font-['Inter'] mb-12">
              From feasibility to final handover — we engineer what others can only imagine.
            </p>
            <Link
              to="/contact"
              className="group relative inline-block px-12 py-4 bg-[#C8972B] text-white rounded-sm 
                       font-['Inter'] text-lg overflow-hidden"
            >
              <span className="relative z-10">REQUEST A QUOTE</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}