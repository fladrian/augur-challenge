import { useState } from 'react';
import { 
  Shield, 
  LayoutGrid, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import {
  Sidebar,
  PageHeader,
  FilterToolbar,
  IndicatorTable,
  Pagination,
  DetailPanel,
  SeverityChart,
  StatCardsGroup,
} from '@/components';
import { StatCard, Tabs } from '@/components/ui';
import { useIndicators, useIndicatorStats } from '@/hooks';



const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('chart');
  const { data: indicatorsRes, isLoading: tableLoading, isError: tableError } = useIndicators();
  const { data: stats } = useIndicatorStats();

  const tabs = [
    { id: 'chart', label: 'Distribution', icon: PieChartIcon },
    { id: 'cards', label: 'Severity Cards', icon: LayoutGrid },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-bg-root">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <PageHeader />
        
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="grid grid-cols-12 gap-5 px-8 pt-5 pb-2">
            {/* Total Card - Now fixed width */}
            <div className="col-span-3 h-[300px]">
              <StatCard
                label="Total Indicators"
                value={stats?.total || 0}
                subValue="↑ 12% from last week"
                icon={Shield}
                variant="total"
                className="h-full"
              />
            </div>

            {/* Consolidated Stats Detail - 9 columns */}
            <div className="col-span-9 bg-bg-card border border-border-subtle rounded-lg p-6 flex flex-col h-[300px] shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[1px] text-text-tertiary">
                    Threat Overview
                  </span>
                  <h3 className="text-sm font-bold text-text-primary">
                    {activeTab === 'chart' ? 'Security Distribution' : 'Severity Breakdown'}
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
                      <div className="h-full w-full bg-bg-elevated animate-pulse rounded-full aspect-square max-h-[140px] mx-auto" />
                    )}
                  </div>
                ) : (
                  <StatCardsGroup stats={stats} variant="grid-4" />
                )}
              </div>
            </div>
          </div>

          <FilterToolbar />

          <div className="flex-1 flex flex-col px-8 py-4">
            <IndicatorTable 
              data={indicatorsRes?.data || []} 
              isLoading={tableLoading} 
              isError={tableError}
            />
            <Pagination 
              totalItems={indicatorsRes?.total || 0} 
              totalPages={indicatorsRes?.totalPages || 0} 
            />
          </div>
        </div>
      </main>

      <DetailPanel />
    </div>
  );
};


export default DashboardPage;
