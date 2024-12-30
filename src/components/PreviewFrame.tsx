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
            'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)',
        }
      : {};

    return (
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 rounded-xl opacity-30 blur group-hover:opacity-50 animate-gradient-x" />
        
        {/* Main frame */}
        <div
          ref={ref}
          className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            padding: `${padding}px`,
            borderRadius: `${radius}px`,
            backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
            ...gradientStyles,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);