interface BrandWordmarkProps {
  className?: string;
}

export default function BrandWordmark({ className = '' }: BrandWordmarkProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.svg" 
        className="h-16 md:h-20 lg:h-24 w-auto object-contain" 
        alt="Trielement Design" 
        width="160"
        height="96"
      />
    </div>
  );
}
