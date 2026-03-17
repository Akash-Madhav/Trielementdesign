import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-8">
          <span
            className="font-['Cormorant_Garamond'] text-[#C8972B]"
            style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', opacity: 0.2 }}
          >
            404
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-[#6B6B7A] font-['Inter'] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#C8972B] text-white 
                   rounded-sm font-['Inter'] hover:bg-[#d4a535] transition-all"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}