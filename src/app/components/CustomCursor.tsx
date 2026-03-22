import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'project' | 'link'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(mousePosition.x, { damping: 30, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(mousePosition.y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check if target is an Element before using closest
      if (!target || !(target instanceof Element)) return;
      
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
        if (target.closest('[data-cursor-type="project"]')) {
          setHoverType('project');
        } else {
          setHoverType('link');
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof Element)) return;
      
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
        setHoverType('default');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Only hide if mouse leaves the window
      if (e.relatedTarget === null) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Main Cursor - Glass Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {hoverType === 'project' ? (
          <motion.div
            className="text-white px-5 py-2.5 rounded-full text-sm font-[var(--font-body)] font-medium whitespace-nowrap"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'rgba(196, 97, 58, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 12px rgba(196, 97, 58, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            View Project
          </motion.div>
        ) : (
          <div className="relative" style={{ transform: 'translate(-50%, -50%)' }}>
            {/* Outer Glass Ring */}
            <motion.div
              className="rounded-full"
              style={{
                background: 'var(--glass-thin-fill)',
                backdropFilter: 'blur(8px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(8px) saturate(1.5)',
                border: '1.5px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
              animate={{
                width: isHovering ? '48px' : '40px',
                height: isHovering ? '48px' : '40px',
              }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            
            {/* Inner Dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-accent-signal)] rounded-full"
              animate={{
                width: isHovering ? '8px' : '6px',
                height: isHovering ? '8px' : '6px',
                opacity: isHovering ? 1 : 0.7,
              }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )}
      </motion.div>

      {/* Follower Cursor - Glass Circle */}
      {hoverType !== 'project' && (
        <motion.div
          className="fixed pointer-events-none z-[9998] hidden lg:block rounded-full"
          style={{
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            transform: 'translate(-50%, -50%)',
            background: 'rgba(196, 97, 58, 0.08)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(196, 97, 58, 0.15)',
          }}
          animate={{
            width: isHovering ? '80px' : '60px',
            height: isHovering ? '80px' : '60px',
            opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05,
          }}
        />
      )}
    </>
  );
}