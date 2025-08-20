import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn';
  delay?: number;
  className?: string;
}

export default function AnimatedContainer({ 
  children, 
  animation = 'fadeIn', 
  delay = 0,
  className 
}: AnimatedContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const animations = {
    fadeIn: 'opacity-0 animate-fade-in',
    slideUp: 'opacity-0 translate-y-8 animate-slide-up',
    slideDown: 'opacity-0 -translate-y-8 animate-slide-down',
    scaleIn: 'opacity-0 scale-95 animate-scale-in',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isIntersecting ? 'opacity-100 translate-y-0 scale-100' : animations[animation],
        className
      )}
      style={{
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
