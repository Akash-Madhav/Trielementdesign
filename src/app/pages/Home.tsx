import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Zap, Shield, Leaf } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { Link } from 'react-router';
import BrandWordmark from '../../imports/BrandWordmark';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Zap,
    title: 'Design',
    description: 'Innovative MEP solutions that push boundaries while respecting constraints',
  },
  {
    icon: Shield,
    title: 'Integrate',
    description: 'Seamless coordination across all building systems and disciplines',
  },
  {
    icon: Leaf,
    title: 'Sustain',
    description: 'Environmentally conscious engineering for a better tomorrow',
  },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '100+', label: 'Expert Engineers' },
  { value: '12', label: 'Countries Served' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -200]);

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    
    // Services Cards Reveal
    gsap.fromTo(
      '.service-card',
      {
        opacity: 0,
        y: 100,
        rotateY: -15,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      }
    );

    // Stats Counter Animation
    const statElements = document.querySelectorAll('.stat-value');
    statElements.forEach((el) => {
      const target = el.getAttribute('data-value') || '0';
      const numericValue = parseInt(target.replace(/\D/g, ''));
      const suffix = target.replace(/[0-9]/g, '');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, {
            innerText: numericValue,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.ceil(this.targets()[0].innerText) + suffix;
            },
          });
        },
      });
    });

    // Philosophy Section Pin
    ScrollTrigger.create({
      trigger: philosophyRef.current,
      start: 'top top',
      end: '+=500',
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    // Parallax layers
    gsap.to('.parallax-slow', {
      y: -150,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });

    gsap.to('.parallax-fast', {
      y: -300,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo Mark */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <div className="flex justify-center">
              <BrandWordmark showStudio={false} className="text-sm tracking-[0.4em] uppercase" />
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4 mb-8">
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-[var(--font-display)] text-[var(--color-ink)] leading-[0.9]">
              Design.
            </h1>
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-[var(--font-display)] text-[var(--color-ink)] leading-[0.9]">
              Integrate.
            </h1>
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-[var(--font-display)] text-[var(--color-ink)] leading-[0.9]">
              Sustain.
            </h1>
          </div>

          <p className="hero-subtitle text-xl md:text-2xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] max-w-3xl mx-auto mb-12">
            Engineering excellence through innovative MEP solutions that shape the future of the built environment
          </p>
        </div>
      </motion.section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Parallax Decorative Elements */}
          <div className="parallax-slow absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--color-accent-signal)] opacity-10 blur-3xl" />
          <div className="parallax-fast absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[var(--color-structural)] opacity-20 blur-3xl" />

          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
              Our Approach
            </p>
            <h2 className="text-5xl md:text-7xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
              Three Pillars of Excellence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassPanel
                  key={service.title}
                  variant="standard"
                  className="service-card p-8 md:p-12 relative overflow-hidden group"
                  enableHoverPhysics={true}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={48} className="text-[var(--color-accent-signal)]" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-3xl font-[var(--font-display)] text-[var(--color-ink)] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[var(--color-accent-signal)] opacity-0 blur-3xl group-hover:opacity-20 transition-opacity duration-500"
                  />
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <GlassPanel variant="heavy" className="p-12 md:p-20" enableRefraction={true}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="stat-value text-5xl md:text-6xl font-[var(--font-display)] text-[var(--color-accent-signal)] mb-3"
                    data-value={stat.value}
                  >
                    0
                  </div>
                  <div className="text-sm md:text-base text-[var(--color-ink)] opacity-60 font-[var(--font-body)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* Philosophy Section - Pinned */}
      <section ref={philosophyRef} className="relative min-h-screen flex items-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <GlassPanel variant="standard" className="p-12 md:p-20" enableRefraction={true}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-6">
                Our Philosophy
              </p>
              <h2 className="text-4xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-8 leading-tight">
                Engineering solutions that respect both innovation and environment
              </h2>
              <p className="text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed mb-8">
                At <BrandWordmark showStudio={false} className="text-xl" />, we believe that exceptional engineering is born from the harmonious 
                integration of design, functionality, and sustainability. Our approach combines 
                cutting-edge technology with time-tested principles to deliver MEP solutions 
                that stand the test of time.
              </p>
              <Link to="/about">
                <motion.button
                  className="group px-6 py-3 bg-transparent border border-[var(--color-accent-signal)] text-[var(--color-accent-signal)] rounded-full font-[var(--font-body)] font-medium inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent-signal)', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </GlassPanel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-12">
              Let's collaborate to bring your vision to life with engineering excellence
            </p>
            <Link to="/contact">
              <motion.button
                className="px-10 py-5 bg-[var(--color-accent-signal)] text-white text-lg rounded-full font-[var(--font-body)] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}