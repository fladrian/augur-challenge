import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ElementType;
  variant?: 'total' | 'critical' | 'high' | 'medium' | 'low';
  className?: string;
}


export function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  variant = 'total',
  className,
}: StatCardProps) {
  const colorStyles: Record<string, string> = {
    total: 'text-text-primary',
    critical: 'text-severity-critical',
    high: 'text-severity-high',
    medium: 'text-severity-medium',
    low: 'text-severity-low',
  };


  return (
    <div
      className={cn(
        'bg-bg-card border border-border-subtle rounded-lg p-4 flex flex-col gap-1 transition-colors hover:border-border-hover',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.8px] text-text-tertiary">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-text-tertiary" />}
      </div>
      <div className={cn('text-[26px] font-bold tracking-tight leading-none', colorStyles[variant])}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {subValue && <div className="text-[11px] text-text-tertiary">{subValue}</div>}
    </div>
  );
}

