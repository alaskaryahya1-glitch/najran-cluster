import starImage from "@assets/ربع_نجمه_1767471163828.png";
import fullStarImage from "@assets/ربع_نجمه_1767472477009.png";

interface BrandIconProps {
  children: React.ReactNode;
  className?: string;
  showStar?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function BrandIcon({ 
  children, 
  className = "", 
  showStar = true,
  size = "md" 
}: BrandIconProps) {
  const containerSizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  return (
    <div className={`${containerSizes[size]} bg-white/20 rounded-xl flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

interface CardStarProps {
  size?: "sm" | "md" | "lg";
}

export function CardStar({ size = "md" }: CardStarProps) {
  const starSizes = {
    sm: "h-[60%]",
    md: "h-[70%]",
    lg: "h-[80%]"
  };

  return (
    <div className="absolute bottom-0 left-0 z-0 pointer-events-none" style={{ transform: "translateY(20%)" }}>
      <img 
        src={fullStarImage}
        alt=""
        className={`${starSizes[size]} w-auto opacity-[0.05]`}
        style={{
          filter: "brightness(1.5) saturate(0) contrast(1.2)",
          mixBlendMode: "soft-light"
        }}
      />
    </div>
  );
}
