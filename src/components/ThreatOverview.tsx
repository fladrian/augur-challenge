import { useState } from 'react';
import { 
  LayoutGrid, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { SeverityChart } from './SeverityChart';
import { StatCardsGroup } from './StatCardsGroup';
import { Tabs } from './ui';
import { IndicatorStats } from '@/types/indicator';

interface ThreatOverviewProps {
  stats?: IndicatorStats;
}

export const ThreatOverview = ({ stats }: ThreatOverviewProps) => {
  const [activeTab, setActiveTab] = useState('chart');

  const tabs = [
    { id: 'chart', label: 'Threat Distribution', icon: PieChartIcon },
    { id: 'cards', label: 'Severity Cards', icon: LayoutGrid },
  ];

  return (
    <div className="col-span-9 bg-bg-card border border-border-subtle rounded-lg p-6 flex flex-col h-[300px] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] font-semibold uppercase tracking-[1px] text-text-tertiary">
            Threat Overview
          </span>
          <h3 className="text-sm font-bold text-text-primary">
            {activeTab === 'chart' ? 'Threat Distribution' : 'Severity Breakdown'}
          </h3>
        </div>
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        {activeTab === 'chart' ? (
          <div className="w-full h-full animate-in fade-in zoom-in-95 duration-300">
            {stats ? (
              <SeverityChart stats={stats} />
            ) : (
              <div className="flex items-center gap-12 h-full w-full px-8 py-2">
                <div className="flex-1 max-w-[300px] h-full flex items-center justify-center">
                  <div className="w-[176px] h-[176px] rounded-full border-[7px] border-bg-elevated animate-pulse flex items-center justify-center">
                    <div className="w-20 h-8 bg-bg-elevated rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 justify-center py-2 grow min-w-[180px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border-subtle/20 last:border-0 px-2 -mx-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm bg-bg-elevated animate-pulse" />
                        <div className="w-20 h-3 bg-bg-elevated rounded animate-pulse" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-4 bg-bg-elevated rounded animate-pulse" />
                        <div className="w-10 h-5 bg-bg-elevated rounded-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <StatCardsGroup stats={stats} variant="grid-4" />
        )}
      </div>
    </div>
  );
};
