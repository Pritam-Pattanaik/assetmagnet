import { cn } from '../../utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function Skeleton({ 
  className, 
  variant = 'rectangular', 
  width, 
  height, 
  lines = 1 
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '2rem'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseStyles,
              variants[variant],
              index === lines - 1 ? 'w-3/4' : 'w-full',
              className
            )}
            style={{ height: style.height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
    />
  );
}

// Predefined skeleton components
export function SkeletonCard() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton variant="rectangular" height="200px" />
      <Skeleton variant="text" lines={2} />
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1">
          <Skeleton variant="text" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton variant="circular" width="48px" height="48px" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}
