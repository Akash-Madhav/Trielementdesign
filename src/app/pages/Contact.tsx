import { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MapPin, Phone, Mail, Download, CheckCircle } from 'lucide-react';

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
    <div className="bg-[#0A0A0C] pt-24">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
              Let's Build Something Exceptional
            </h1>
            <p className="text-xl text-[#8A8A9A] font-['Inter'] flex items-center gap-2">
              <Mail size={20} />
              Reach out to us at{' '}
              <a href="mailto:contact@seedengineering.com" className="text-[#C8972B] hover:underline">
                contact@seedengineering.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Office Cards Grid */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-12">
            Our Offices
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <ScrollReveal key={office.city} delay={index * 0.05}>
              <motion.div
                className="p-6 bg-[#16161E] border border-[rgba(255,255,255,0.07)] rounded-sm 
                         hover:border-[#C8972B] transition-all relative overflow-hidden group"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8972B]"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-1">
                  {office.city}
                </h3>
                <p className="text-sm text-[#C8972B] font-['Inter'] mb-4">{office.country}</p>
                <div className="space-y-3">
                  <div className="flex gap-3 text-[#8A8A9A] font-['Inter'] text-sm">
                    <MapPin size={16} className="flex-shrink-0 mt-1" />
                    <span>{office.address}</span>
                  </div>
                  {office.phone && (
                    <div className="flex gap-3 text-[#8A8A9A] font-['Inter'] text-sm">
                      <Phone size={16} className="flex-shrink-0 mt-1" />
                      <a href={`tel:${office.phone}`} className="hover:text-[#C8972B] transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-[#8A8A9A] font-['Inter'] leading-relaxed mb-8">
                Whether you're looking to start a new project, explore partnership opportunities, 
                or join our team, we'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all
                           placeholder-transparent peer"
                  placeholder="Name"
                  id="name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-5 text-sm text-[#8A8A9A] font-['Inter'] transition-all
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                           peer-focus:-top-5 peer-focus:text-sm peer-focus:text-[#C8972B]"
                >
                  Name
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all
                           placeholder-transparent peer"
                  placeholder="Phone"
                  id="phone"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-4 -top-5 text-sm text-[#8A8A9A] font-['Inter'] transition-all
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                           peer-focus:-top-5 peer-focus:text-sm peer-focus:text-[#C8972B]"
                >
                  Phone
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all
                           placeholder-transparent peer"
                  placeholder="Email"
                  id="email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-5 text-sm text-[#8A8A9A] font-['Inter'] transition-all
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                           peer-focus:-top-5 peer-focus:text-sm peer-focus:text-[#C8972B]"
                >
                  Email
                </label>
              </div>

              {/* Country Dropdown */}
              <div className="relative">
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all"
                >
                  <option value="" className="bg-[#16161E]">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-[#16161E]">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Query Type */}
              <div className="relative">
                <select
                  required
                  value={formData.queryType}
                  onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all"
                >
                  <option value="" className="bg-[#16161E]">Nature of Query</option>
                  {queryTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#16161E]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border-b-2 border-[rgba(255,255,255,0.1)] 
                           text-[#F0EDE8] font-['Inter'] focus:outline-none focus:border-[#C8972B] transition-all
                           placeholder-transparent peer resize-none"
                  placeholder="Message"
                  id="message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-5 text-sm text-[#8A8A9A] font-['Inter'] transition-all
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                           peer-focus:-top-5 peer-focus:text-sm peer-focus:text-[#C8972B]"
                >
                  Message
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="relative w-full px-8 py-4 bg-[#C8972B] text-[#0A0A0C] rounded-sm font-['Inter'] 
                         overflow-hidden disabled:opacity-50"
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    Message Sent!
                  </span>
                ) : (
                  <span>SEND MESSAGE</span>
                )}
                {!isSubmitting && !isSubmitted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Brochure CTA */}
      <section className="py-16 px-6 md:px-[120px] max-w-[1440px] mx-auto bg-[#111116] text-center">
        <ScrollReveal>
          <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-4">
            Get to know SEED Engineering through its 40+ industry-leading projects.
          </h3>
          <button
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C8972B] text-[#C8972B] 
                     rounded-sm font-['Inter'] hover:bg-[#C8972B] hover:text-[#0A0A0C] transition-all"
          >
            <Download size={18} />
            DOWNLOAD BROCHURE
          </button>
        </ScrollReveal>
      </section>
    </div>
  );
}
