import { motion } from 'motion/react';

export function WhatsAppButton() {
  const whatsappNumber = "+97142564882"; // Dubai number from Contact page
  const message = encodeURIComponent("Hello, I'm interested in learning more about Trielement Studio's services.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[200] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: 1.5, 
        duration: 1.2, 
        ease: [0.19, 1, 0.22, 1] 
      }}
      aria-label="Contact us on WhatsApp"
    >
      {/* Official WhatsApp Logo SVG */}
      <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className="w-full h-full fill-white transition-all duration-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048a11.827 11.827 0 001.592 5.928L0 24l6.102-1.6c1.867.518 3.827.79 5.795.792h.005c6.636 0 12.048-5.412 12.051-12.048a11.845 11.845 0 00-3.41-8.514z" />
        </svg>
      </div>

      {/* Hover Tooltip */}
      <div className="absolute right-full mr-6 px-4 py-2 bg-[#2B2B2B] text-white text-[10px] uppercase tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 whitespace-nowrap pointer-events-none font-medium">
        Chat with us
      </div>
    </motion.a>
  );
}
