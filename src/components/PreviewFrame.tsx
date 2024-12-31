import { forwardRef } from 'react';

interface PreviewFrameProps {
  children: React.ReactNode;
  padding: number;
  radius: number;
  showGradient: boolean;
  theme: string;
}

export const PreviewFrame = forwardRef<HTMLDivElement, PreviewFrameProps>(
  ({ children, padding, radius, showGradient, theme }, ref) => {
    const gradientStyles = showGradient
      ? {
          backgroundImage:
            theme === 'light'
              ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)'
              : 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        }
      : {};

    return (
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 rounded-xl opacity-30 blur group-hover:opacity-50 animate-gradient-x transition-opacity duration-300" />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main frame */}
        <div
          ref={ref}
          className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 backdrop-blur-sm"
          style={{
            padding: `${padding}px`,
            borderRadius: `${radius}px`,
            backgroundColor: theme === 'light' 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(30, 30, 30, 0.95)',
            ...gradientStyles,
          }}
        >
          {/* Window controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          
          {/* Code container */}
          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);