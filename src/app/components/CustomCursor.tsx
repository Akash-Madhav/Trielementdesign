import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor state based on target attributes or classes
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setCursorText('');
      } else if (target.closest('.cursor-explore')) {
        setIsHovering(true);
        setCursorText('EXPLORE');
      } else if (target.closest('.cursor-view')) {
        setIsHovering(true);
        setCursorText('VIEW');
      } else if (target.closest('.cursor-drag')) {
        setIsHovering(true);
        setCursorText('DRAG');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-difference hidden lg:flex"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="bg-white rounded-full flex items-center justify-center overflow-hidden"
        animate={{
          width: isHovering ? (cursorText ? 80 : 40) : 10,
          height: isHovering ? (cursorText ? 80 : 40) : 10,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {cursorText && (
          <motion.span 
            className="text-[10px] font-bold tracking-widest text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}