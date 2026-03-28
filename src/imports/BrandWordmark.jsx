export default function BrandWordmark({ className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/src/assets/brand/logo.svg" 
        className="h-14 md:h-22 w-auto object-contain" 
        alt="Trielement Studio" 
      />
    </div>
  )
}
