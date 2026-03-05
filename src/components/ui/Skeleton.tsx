import * as React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'bg-bg-elevated animate-shimmer bg-gradient-to-r from-bg-elevated via-white/5 to-bg-elevated bg-[length:200%_100%]',
        className
      )}
    />
  );
};
