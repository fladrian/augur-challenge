import * as React from 'react';
import { Shield } from 'lucide-react';
import { StatCard } from './ui/StatCard';

interface StatCardsGroupProps {
  stats?: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface StatConfig {
  label: string;
  key: keyof NonNullable<StatCardsGroupProps['stats']>;
  subValue: string;
  variant: 'total' | 'critical' | 'high' | 'medium' | 'low';
  icon?: React.ElementType;
}

const STATS_CONFIG: StatConfig[] = [
  {
    label: 'Total Indicators',
    key: 'total',
    subValue: '↑ 12% from last week',
    variant: 'total',
    icon: Shield,
  },
  {
    label: 'Critical',
    key: 'critical',
    subValue: 'Requires immediate action',
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

export const StatCardsGroup = ({ stats }: StatCardsGroupProps) => {
  return (
    <div className="grid grid-cols-5 gap-3 px-8 py-5">
      {STATS_CONFIG.map((config) => (
        <StatCard
          key={config.label}
          label={config.label}
          value={stats?.[config.key] || 0}
          subValue={config.subValue}
          variant={config.variant}
          icon={config.icon}
        />
      ))}
    </div>
  );
};
