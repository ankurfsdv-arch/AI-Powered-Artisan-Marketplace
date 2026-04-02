import { Palette, Star } from 'lucide-react';

interface KalaKritiLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function KalaKritiLogo({ className = '', showText = true, size = 'md' }: KalaKritiLogoProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizes[size]} bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center relative shadow-lg`}>
        {/* Traditional Indian Pattern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl">
          <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
            {/* Traditional Mandala Pattern */}
            <circle cx="20" cy="20" r="3" fill="white" opacity="0.3"/>
            <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="20" cy="20" r="9" stroke="white" strokeWidth="0.3" opacity="0.3"/>
            {/* Decorative elements */}
            <g opacity="0.3">
              <circle cx="20" cy="12" r="1" fill="white"/>
              <circle cx="28" cy="20" r="1" fill="white"/>
              <circle cx="20" cy="28" r="1" fill="white"/>
              <circle cx="12" cy="20" r="1" fill="white"/>
            </g>
          </svg>
        </div>
        
        {/* Main Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-white transform -rotate-12" />
          <Star className="w-3 h-3 text-yellow-200 absolute -top-1 -right-1" />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col items-start">
          <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent`}>
            KalaKriti
          </span>
          <span className="text-xs text-muted-foreground -mt-1 tracking-wide">
            कला • Craft • Connect
          </span>
        </div>
      )}
    </div>
  );
}