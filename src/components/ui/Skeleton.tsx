import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
