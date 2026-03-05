import * as React from 'react';

import { cn } from '../../utils/cn';


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
        'bg-bg-card border border-border-subtle rounded-lg p-5 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-border-active hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-[1px] text-text-tertiary">
          {label}
        </span>
        {Icon && <Icon className="w-3.5 h-3.5 text-text-tertiary" />}
      </div>
      <div className={cn('text-[38px] font-bold tracking-tight leading-none my-1', colorStyles[variant])}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {subValue && <div className="text-[12px] text-text-tertiary font-medium">{subValue}</div>}
    </div>

  );
}

