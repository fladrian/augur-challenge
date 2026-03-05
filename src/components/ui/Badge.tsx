import { Severity } from '../../types/indicator';
import { cn } from '../../utils/cn';


interface BadgeProps {
  severity: Severity;
  className?: string;
}

export const Badge = ({ severity, className }: BadgeProps) => {
  const styles: Record<Severity, string> = {
    critical: 'bg-[var(--severity-critical-bg)] text-[var(--severity-critical)] border-[var(--severity-critical-border)]',
    high: 'bg-[var(--severity-high-bg)] text-[var(--severity-high)] border-[var(--severity-high-border)]',
    medium: 'bg-[var(--severity-medium-bg)] text-[var(--severity-medium)] border-[var(--severity-medium-border)]',
    low: 'bg-[var(--severity-low-bg)] text-[var(--severity-low)] border-[var(--severity-low-border)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-bold capitalize tracking-tight border',

        styles[severity],
        className
      )}
    >
      {severity}
    </span>
  );
};
