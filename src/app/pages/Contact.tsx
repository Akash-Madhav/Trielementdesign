import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel, GlassButton } from '../components/GlassPanel';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    city: 'Dubai',
    country: 'UAE',
    address: '#303, Old Commercial Bank Building, Abu Baker Al Siddique Road, Deira',
    phone: '+971 42 564 882',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '10 Anson Road, Office #29-10',
    phone: '+65 9887 9761',
  },
  {
    city: 'Kochi',
    country: 'India',
    address: '62/4892, Kachapilly Square, Mullassery Canal Road',
    phone: '',
  },
  {
    city: 'Bengaluru',
    country: 'India',
    address: '57, U.P. Complex, Indiranagar 2nd Stage',
    phone: '+91 80-41284668',
  },
  {
    city: 'Mumbai',
    country: 'India',
    address: 'Aurum QParc, 8th Floor, Navi Mumbai',
    phone: '',
  },
  {
    city: 'Gurugram',
    country: 'India',
    address: 'Augusta Point, Golf Course Road, Sector 53',
    phone: '',
  },
];

const countries = [
  'UAE', 'India', 'Singapore', 'Saudi Arabia', 'Qatar', 'Kenya', 'Tanzania', 'Ghana',
  'South Africa', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Other'
];

const queryTypes = ['General Inquiry', 'Job Application', 'Project Quotation'];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    queryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      '.contact-hero-content',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1 }
    );

    // Form Fields Stagger
    gsap.fromTo(
      '.form-field',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 70%',
        },
      }
    );

    // Office Cards
    gsap.fromTo(
      '.office-card',
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.offices-section',
          start: 'top 70%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        country: '',
        queryType: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 md:pt-24 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-[50vh] flex items-center mb-20">
          <div className="max-w-4xl">
            <p className="contact-hero-content text-[var(--color-accent-signal)] text-sm tracking-[0.3em] uppercase font-[var(--font-mono)] mb-4">
              Get in Touch
            </p>
            <h1 className="contact-hero-content text-5xl md:text-7xl font-[var(--font-display)] text-[var(--color-ink)] mb-6">
              Let's Build Something Exceptional
            </h1>
            <p className="contact-hero-content text-xl text-[var(--color-ink)] opacity-70 font-[var(--font-body)] flex items-center gap-2 flex-wrap">
              <Mail size={20} />
              Reach out to us at{' '}
              <a href="mailto:contact@tri-element.com" className="text-[var(--color-accent-signal)] hover:opacity-70 transition-opacity">
                contact@tri-element.com
              </a>
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Contact Form */}
          <div ref={formRef}>
            <GlassPanel variant="heavy" className="p-8 md:p-12" enableRefraction={true}>
              <h2 className="text-3xl font-[var(--font-display)] text-[var(--color-ink)] mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)]"
                    style={{
                      background: 'var(--glass-thin-fill)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      borderRadius: '8px',
                    }}
                  />
                </div>

                <div className="form-field grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)]"
                      style={{
                        background: 'var(--glass-thin-fill)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '8px',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)]"
                      style={{
                        background: 'var(--glass-thin-fill)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                </div>

                <div className="form-field grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)]"
                      style={{
                        background: 'var(--glass-thin-fill)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '8px',
                      }}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="queryType" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                      Query Type *
                    </label>
                    <select
                      id="queryType"
                      required
                      value={formData.queryType}
                      onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                      className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)]"
                      style={{
                        background: 'var(--glass-thin-fill)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '8px',
                      }}
                    >
                      <option value="">Select Type</option>
                      {queryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="block text-sm font-[var(--font-body)] text-[var(--color-ink)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 font-[var(--font-body)] text-[var(--color-ink)] resize-none"
                    style={{
                      background: 'var(--glass-thin-fill)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      borderRadius: '8px',
                    }}
                  />
                </div>

                <div className="form-field">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-[var(--color-accent-signal)] font-[var(--font-body)]"
                    >
                      <CheckCircle size={20} />
                      Message sent successfully!
                    </motion.div>
                  ) : (
                    <GlassButton
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </GlassButton>
                  )}
                </div>
              </form>
            </GlassPanel>
          </div>

          {/* Office Locations */}
          <div className="space-y-6 offices-section">
            <h2 className="text-3xl font-[var(--font-display)] text-[var(--color-ink)] mb-8">
              Our Offices
            </h2>

            {offices.map((office) => (
              <GlassPanel key={office.city} variant="standard" className="office-card p-6">
                <h3 className="text-xl font-[var(--font-display)] text-[var(--color-ink)] mb-3">
                  {office.city}, {office.country}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-[var(--color-ink)] opacity-70 font-[var(--font-body)] text-sm">
                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                  {office.phone && (
                    <div className="flex items-center gap-2 text-[var(--color-ink)] opacity-70 font-[var(--font-body)] text-sm">
                      <Phone size={16} />
                      <a href={`tel:${office.phone}`} className="hover:text-[var(--color-accent-signal)] transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  )}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}