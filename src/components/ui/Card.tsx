import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardProps } from '../../types';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = false, glass = false, ...props }, ref) => {
    const baseStyles = 'rounded-xl border transition-all duration-300';
    
    const variants = {
      default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm',
      glass: 'bg-white/10 dark:bg-black/10 backdrop-blur-md border-white/20 dark:border-white/10 shadow-lg',
    };
    
    const hoverStyles = hover ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          glass ? variants.glass : variants.default,
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
