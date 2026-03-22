import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

type GlassVariant = 'standard' | 'heavy' | 'thin' | 'liquid';

interface GlassPanelProps {
  children: ReactNode;
  variant?: GlassVariant;
  className?: string;
  enableHoverPhysics?: boolean;
  enableRefraction?: boolean;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

export function GlassPanel({
  children,
  variant = 'standard',
  className = '',
  enableHoverPhysics = true,
  enableRefraction = true,
  as = 'div',
  ...props
}: GlassPanelProps) {
  const Component = motion[as] as any;
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking for refraction highlight
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position to percentage for gradient
  const gradientX = useTransform(smoothX, (v) => `${v}%`);
  const gradientY = useTransform(smoothY, (v) => `${v}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current || !enableRefraction) return;
    
    const rect = panelRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Glass variant styles
  const getGlassStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      willChange: 'transform' as const,
    };

    const variantStyles: Record<GlassVariant, React.CSSProperties> = {
      standard: {
        background: 'var(--glass-fill)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        borderRadius: 'var(--glass-radius)',
        border: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border-bottom)',
        borderRight: '1px solid var(--glass-border-right)',
        boxShadow: `
          0 2px 8px rgba(0, 0, 0, 0.04),
          0 8px 32px var(--glass-shadow-outer),
          inset 0 1px 0 var(--glass-highlight),
          inset 0 -1px 0 rgba(255, 255, 255, 0.2)
        `,
      },
      heavy: {
        background: 'var(--glass-heavy-fill)',
        backdropFilter: 'blur(var(--glass-heavy-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        WebkitBackdropFilter: 'blur(var(--glass-heavy-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        borderRadius: 'var(--glass-radius)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        borderRight: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.06),
          0 12px 48px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 var(--glass-highlight),
          inset 0 -1px 0 rgba(255, 255, 255, 0.25)
        `,
      },
      thin: {
        background: 'var(--glass-thin-fill)',
        backdropFilter: 'blur(var(--glass-thin-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        WebkitBackdropFilter: 'blur(var(--glass-thin-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        borderRadius: 'var(--glass-radius)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
        borderRight: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: `
          0 1px 4px rgba(0, 0, 0, 0.03),
          0 4px 16px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.7),
          inset 0 -1px 0 rgba(255, 255, 255, 0.15)
        `,
      },
      liquid: {
        background: 'var(--glass-fill)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness))',
        borderRadius: 'var(--glass-radius)',
        border: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border-bottom)',
        borderRight: '1px solid var(--glass-border-right)',
        boxShadow: `
          0 2px 8px rgba(0, 0, 0, 0.04),
          0 8px 32px var(--glass-shadow-outer),
          inset 0 1px 0 var(--glass-highlight),
          inset 0 -1px 0 rgba(255, 255, 255, 0.2)
        `,
      },
    };

    return { ...baseStyles, ...variantStyles[variant] };
  };

  // Hover animation variants
  const hoverVariants = enableHoverPhysics
    ? {
        initial: { scale: 1 },
        hover: {
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }
    : {};

  return (
    <Component
      ref={panelRef}
      style={getGlassStyles()}
      className={`glass-panel ${className}`}
      variants={hoverVariants}
      initial="initial"
      whileHover={enableHoverPhysics ? "hover" : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(50);
        mouseY.set(50);
      }}
      {...props}
    >
      {/* Refraction Highlight Layer */}
      {enableRefraction && (variant === 'liquid' || variant === 'standard' || variant === 'heavy') && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 'var(--glass-radius)',
            background: `radial-gradient(ellipse 400px 300px at ${gradientX} ${gradientY}, rgba(255, 255, 255, 0.5) 0%, transparent 60%)`,
            opacity: isHovered ? 0.6 : 0.3,
            mixBlendMode: 'overlay',
          }}
          transition={{
            opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Enhanced border glow on hover */}
      {enableHoverPhysics && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 'var(--glass-radius)',
            border: '1px solid rgba(255, 255, 255, 0)',
            opacity: 0,
          }}
          animate={{
            borderColor: isHovered
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(255, 255, 255, 0)',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      )}
    </Component>
  );
}

// Utility component for glass button
interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function GlassButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: GlassButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <GlassPanel
      as="button"
      variant={isPrimary ? 'heavy' : 'thin'}
      enableHoverPhysics={!disabled}
      enableRefraction={!disabled}
      className={`
        px-6 py-3 sm:px-8 sm:py-4 
        text-sm sm:text-base
        font-[var(--font-body)] font-medium
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isPrimary ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]'}
        ${className}
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        background: isPrimary
          ? 'rgba(196, 97, 58, 0.12)'
          : 'var(--glass-thin-fill)',
        border: isPrimary
          ? '1px solid rgba(196, 97, 58, 0.4)'
          : '1px solid rgba(255, 255, 255, 0.6)',
      }}
    >
      {children}
    </GlassPanel>
  );
}