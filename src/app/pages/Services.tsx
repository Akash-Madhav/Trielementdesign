import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import { Zap, Droplets, Wind, Sun, Shield, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Zap,
    title: 'Electrical Systems',
    description: 'Comprehensive electrical design including power distribution, lighting, and emergency systems.',
    features: ['Power Distribution', 'Lighting Design', 'Emergency Systems', 'Energy Management'],
  },
  {
    icon: Droplets,
    title: 'Plumbing Systems',
    description: 'Complete plumbing solutions from water supply to drainage and specialized systems.',
    features: ['Water Supply', 'Drainage Systems', 'Fire Protection', 'Water Treatment'],
  },
  {
    icon: Wind,
    title: 'HVAC Systems',
    description: 'Advanced climate control systems designed for comfort and energy efficiency.',
    features: ['Air Conditioning', 'Ventilation', 'Heat Recovery', 'IAQ Management'],
  },
  {
    icon: Sun,
    title: 'Sustainable Design',
    description: 'Green engineering solutions that minimize environmental impact and maximize efficiency.',
    features: ['Solar Integration', 'Energy Modeling', 'LEED Consultation', 'Net Zero Design'],
  },
  {
    icon: Shield,
    title: 'Fire Protection',
    description: 'Life safety systems designed to protect people and property.',
    features: ['Sprinkler Systems', 'Fire Alarms', 'Smoke Control', 'Code Compliance'],
  },
  {
    icon: Lightbulb,
    title: 'Smart Building',
    description: 'Integrated building management systems for intelligent facility control.',
    features: ['BMS Integration', 'IoT Sensors', 'Automation', 'Data Analytics'],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We begin by understanding your project goals, constraints, and vision.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Our engineers develop innovative solutions tailored to your specific needs.',
  },
  {
    step: '03',
    title: 'Coordination',
    description: 'Seamless integration with architectural and structural teams ensures harmony.',
  },
  {
    step: '04',
    title: 'Documentation',
    description: 'Comprehensive drawings and specifications guide the construction phase.',
  },
  {
    step: '05',
    title: 'Support',
    description: 'We provide ongoing technical support throughout construction and beyond.',
  },
];

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    
    // Service cards stagger animation
    const cards = gsap.utils.toArray<HTMLElement>('.service-detail-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotateY: index % 2 === 0 ? -30 : 30,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Process Timeline Animation
    ScrollTrigger.create({
      trigger: processRef.current,
      start: 'top center',
      end: 'bottom center',
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to('.process-line', {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        });
      },
    });

    gsap.fromTo(
      '.process-step',
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 70%',
        },
      }
    );

    // Floating features
    gsap.to('.feature-tag', {
      y: -10,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
      duration: 1.5,
      ease: 'sine.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 md:pt-0">
        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <p className="services-hero-content text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-6">
            What We Do
          </p>
          <h1 className="services-hero-content text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[var(--font-display)] text-[var(--color-ink)] mb-6 sm:mb-8 leading-tight">
            Comprehensive MEP Engineering Solutions
          </h1>
          <p className="services-hero-content text-lg sm:text-xl md:text-2xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed max-w-3xl">
            From concept to completion, we deliver integrated mechanical, electrical, and plumbing 
            systems that power modern buildings.
          </p>
        </motion.div>

        {/* Background Gradient */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(196, 97, 58, 0.1), transparent)',
            scale: heroScale,
          }}
        />
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassPanel
                  key={service.title}
                  variant="standard"
                  className="service-detail-card p-10 group relative overflow-hidden"
                  enableHoverPhysics={true}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--glass-thin-fill)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} className="text-[var(--color-accent-signal)]" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-3xl font-[var(--font-display)] text-[var(--color-ink)] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="feature-tag px-3 py-1 text-xs font-[var(--font-body)] text-[var(--color-ink)] rounded-full"
                        style={{
                          background: 'var(--glass-thin-fill)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--color-accent-signal)] opacity-0 blur-3xl group-hover:opacity-15 transition-opacity duration-500"
                  />
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="relative py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
              Our Process
            </p>
            <h2 className="text-5xl md:text-7xl font-[var(--font-display)] text-[var(--color-ink)]">
              How We Work
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 w-0.5 h-full bg-[var(--color-structural)]">
              <div
                className="process-line w-full h-0 bg-[var(--color-accent-signal)] origin-top"
                style={{ transformOrigin: 'top', scaleY: 0 }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {process.map((item) => (
                <GlassPanel
                  key={item.step}
                  variant="thin"
                  className="process-step ml-20 p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-5xl font-[var(--font-display)] text-[var(--color-accent-signal)] opacity-30">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-ink)] opacity-70 font-[var(--font-body)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <GlassPanel variant="heavy" className="p-12 md:p-20 text-center" enableRefraction={true}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
                Let's Discuss Your Project
              </h2>
              <p className="text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] mb-10">
                Whether you need MEP design, sustainability consulting, or full project support, 
                we're here to help bring your vision to life.
              </p>
              <motion.a
                href="/contact"
                className="inline-block px-10 py-5 bg-[var(--color-accent-signal)] text-white text-lg rounded-full font-[var(--font-body)] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Conversation
              </motion.a>
            </motion.div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}