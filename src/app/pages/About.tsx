import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { Building2, Users, Globe2, Award } from 'lucide-react';
import BrandWordmark from '../../imports/BrandWordmark';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2008', event: 'Founded in Dubai', description: (<><BrandWordmark showStudio={false} className="text-xs inline-flex" /> begins its journey</>) },
  { year: '2012', event: 'Expanded to India', description: 'Opened offices in Bangalore and Kochi' },
  { year: '2015', event: 'Singapore Office', description: 'Established Southeast Asian presence' },
  { year: '2018', event: '500th Project', description: 'Milestone achievement in project delivery' },
  { year: '2020', event: 'Sustainability Focus', description: 'Launched green engineering initiative' },
  { year: '2024', event: 'Global Recognition', description: 'Award-winning MEP solutions worldwide' },
];

const values = [
  {
    icon: Building2,
    title: 'Excellence',
    description: 'We pursue the highest standards in every project, from concept to completion.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Success comes from seamless teamwork across disciplines and borders.',
  },
  {
    icon: Globe2,
    title: 'Innovation',
    description: 'We embrace emerging technologies and pioneering engineering solutions.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'Ethical practices and transparent communication guide all our relationships.',
  },
];

export default function About() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    
    // Hero entrance
    gsap.fromTo(
      '.about-hero-title',
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    );

    // Horizontal Scroll Section
    const horizontalSection = horizontalRef.current;
    if (horizontalSection) {
      const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel');
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + horizontalSection.offsetWidth * 2,
          invalidateOnRefresh: true,
        },
      });
    }

    // Values cards stagger
    gsap.fromTo(
      '.value-card',
      {
        opacity: 0,
        y: 80,
        rotateX: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 70%',
          invalidateOnRefresh: true,
        },
      }
    );

    // Floating timeline dots
    gsap.to('.timeline-dot', {
      scale: 1.3,
      opacity: 0.5,
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true,
      },
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-24">
        <motion.div
          className="max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.p
            className="about-hero-title text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            About Us
          </motion.p>
          <h1 className="about-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[var(--font-display)] text-[var(--color-ink)] mb-6 sm:mb-8 leading-tight">
            Shaping the Future of Engineering
          </h1>
          <p className="about-hero-title text-lg sm:text-xl md:text-2xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
            With over a decade of experience across multiple continents, <BrandWordmark showStudio={false} className="text-xl md:text-2xl" /> delivers 
            world-class MEP engineering solutions that transform visions into reality.
          </p>
        </motion.div>

        {/* Floating Glass Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full"
            style={{
              background: 'var(--glass-thin-fill)',
              backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(80px)',
            }}
            animate={{
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </section>

      {/* Horizontal Scrolling Timeline */}
      <section ref={horizontalRef} className="relative h-screen overflow-hidden">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="flex gap-8 px-6 md:px-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="horizontal-panel flex-shrink-0 w-[90vw] md:w-[600px]"
              >
                <GlassPanel variant="heavy" className="h-[500px] p-12 flex flex-col justify-center" enableRefraction={true}>
                  <motion.div
                    className="timeline-dot w-4 h-4 rounded-full bg-[var(--color-accent-signal)] mb-6"
                    style={{ boxShadow: '0 0 20px var(--color-accent-signal)' }}
                  />
                  <div className="text-7xl md:text-9xl font-[var(--font-display)] text-[var(--color-accent-signal)] mb-4 opacity-20">
                    {milestone.year}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-[var(--font-display)] text-[var(--color-ink)] mb-4">
                    {milestone.event}
                  </h3>
                  <p className="text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)]">
                    {milestone.description}
                  </p>
                </GlassPanel>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <GlassPanel variant="standard" className="p-12 md:p-20" enableRefraction={true}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-6">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-8 leading-tight">
                To deliver sustainable, innovative MEP solutions that exceed expectations and 
                create lasting value for our clients and communities.
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] mb-4">Vision</h3>
                  <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
                    To be the most trusted MEP engineering partner globally, known for our 
                    commitment to innovation, sustainability, and excellence in every project.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] mb-4">Approach</h3>
                  <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
                    We combine technical expertise with collaborative partnerships, ensuring 
                    seamless integration across all building systems while prioritizing environmental responsibility.
                  </p>
                </div>
              </div>
            </motion.div>
          </GlassPanel>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
              Core Values
            </p>
            <h2 className="text-5xl md:text-7xl font-[var(--font-display)] text-[var(--color-ink)]">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <GlassPanel
                  key={value.title}
                  variant="standard"
                  className="value-card p-8 group"
                  enableHoverPhysics={true}
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={40} className="text-[var(--color-accent-signal)]" />
                  </motion.div>
                  <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <GlassPanel variant="heavy" className="p-12 md:p-20 text-center" enableRefraction={true}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
                Meet the People Behind Our Success
              </h2>
              <p className="text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-10">
                Our team of expert engineers and technical professionals brings decades of 
                combined experience to every project.
              </p>
              <motion.a
                href="/contact"
                className="inline-block px-8 py-4 bg-[var(--color-accent-signal)] text-white rounded-full font-[var(--font-body)] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}