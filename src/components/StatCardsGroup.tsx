import { Severity } from '@/types/indicator';
import { StatCard } from './ui';

interface StatCardsGroupProps {
  stats?: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  variant: 'grid-4' | 'grid-5';
}

interface StatConfig {
  label: string;
  key: 'critical' | 'high' | 'medium' | 'low';
  subValue: string;
  variant: Severity;
}

const STATS_CONFIG: StatConfig[] = [
  {
    label: 'Critical',
    key: 'critical',
    subValue: 'Requires action',
    variant: 'critical',
  },
  {
    label: 'High',
    key: 'high',
    subValue: 'Active monitoring',
    variant: 'high',
  },
  {
    label: 'Medium',
    key: 'medium',
    subValue: 'Under review',
    variant: 'medium',
  },
  {
    label: 'Low',
    key: 'low',
    subValue: 'Informational',
    variant: 'low',
  },
];

export const StatCardsGroup = ({ stats, variant }: StatCardsGroupProps) => {
  if (variant === 'grid-4') {
    return (
      <div className="grid grid-cols-4 gap-4 w-full h-full animate-in fade-in slide-in-from-bottom-2 duration-300 items-center">
        {STATS_CONFIG.map((config) => (
          <StatCard
            key={config.key}
            label={config.label}
            value={stats?.[config.key] || 0}
            subValue={config.subValue}
            variant={config.variant}
            className="h-full flex flex-col justify-center"
          />
        ))}
      </div>
    );
  }

  // Implementation for grid-5 or other variants could go here if needed
  return null;
};
