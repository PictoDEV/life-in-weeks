import React from 'react';

// A simple motion library replacement using CSS transitions
interface MotionProps {
  initial?: any;
  animate?: any;
  transition?: any;
  className?: string;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}

export const motion = {
  div: ({
    initial,
    animate,
    transition,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    style = {},
    ...props
  }: MotionProps) => {
    const [isAnimated, setIsAnimated] = React.useState(false);
    
    React.useEffect(() => {
      // Apply animation after a small delay to ensure initial state is applied first
      const timeoutId = setTimeout(() => {
        setIsAnimated(true);
      }, 10);
      
      return () => clearTimeout(timeoutId);
    }, []);
    
    const getStyles = (): React.CSSProperties => {
      const transitionStyle: React.CSSProperties = {
        transitionProperty: 'all',
        transitionDuration: `${transition?.duration || 0.3}s`,
        transitionDelay: `${transition?.delay || 0}s`,
        transitionTimingFunction: transition?.ease || 'ease',
      };
      
      const initialStyles = initial ? {
        opacity: initial.opacity,
        transform: initial.scale ? `scale(${initial.scale})` : undefined,
      } : {};
      
      const animateStyles = isAnimated && animate ? {
        opacity: animate.opacity,
        transform: animate.scale ? `scale(${animate.scale})` : undefined,
      } : {};
      
      return {
        ...transitionStyle,
        ...initialStyles,
        ...animateStyles,
        ...style,
      };
    };
    
    return (
      <div
        className={className}
        style={getStyles()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  },
};