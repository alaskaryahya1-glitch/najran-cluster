interface NajranDividerProps {
  variant?: 'default' | 'inverted' | 'subtle';
  className?: string;
}

export function NajranCrenellation({ variant = 'default', className = '' }: NajranDividerProps) {
  const variantClass = variant === 'inverted' 
    ? 'najran-crenellation-inverted' 
    : variant === 'subtle' 
    ? 'najran-crenellation-subtle'
    : 'najran-crenellation';
  
  return <div className={`${variantClass} ${className}`} aria-hidden="true" />;
}

interface NajranBackgroundProps {
  pattern?: 'geometric' | 'triangles' | 'diamond';
  children: React.ReactNode;
  className?: string;
}

export function NajranBackground({ pattern = 'geometric', children, className = '' }: NajranBackgroundProps) {
  const patternClass = pattern === 'triangles' 
    ? 'najran-triangles-bg' 
    : pattern === 'diamond' 
    ? 'najran-diamond-pattern'
    : 'najran-geometric-bg';
  
  return (
    <div className={`relative ${patternClass} ${className}`}>
      {children}
    </div>
  );
}

export function NajranSectionDivider() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg 
        viewBox="0 0 1200 40" 
        preserveAspectRatio="none" 
        className="w-full h-8"
        fill="none"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <polygon
            key={i}
            points={`${i * 30},40 ${i * 30 + 15},0 ${i * 30 + 30},40`}
            className="fill-[#1691D0]"
            opacity={0.9}
          />
        ))}
      </svg>
    </div>
  );
}

export function NajranSectionDividerSubtle() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg 
        viewBox="0 0 1200 30" 
        preserveAspectRatio="none" 
        className="w-full h-6"
        fill="none"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <polygon
            key={i}
            points={`${i * 30},30 ${i * 30 + 15},0 ${i * 30 + 30},30`}
            className="fill-[#1691D0]/10"
          />
        ))}
      </svg>
    </div>
  );
}
