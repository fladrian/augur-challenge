import {
  Sidebar,
  PageHeader,
  FilterToolbar,
  IndicatorTable,
  Pagination,
  DetailPanel,
  SeverityChart,
} from '../components';
import { StatCard } from '../components/ui';
import { useIndicators, useIndicatorStats } from '../hooks/useIndicators';
import { Shield, LayoutGrid, PieChart as PieChartIcon } from 'lucide-react';
import { useState } from 'react';
import { Tabs } from '../components/ui';



const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('chart');
  const { data: indicatorsRes, isLoading: tableLoading } = useIndicators();
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
                  <div className="grid grid-cols-4 gap-4 w-full h-full animate-in fade-in slide-in-from-bottom-2 duration-300 items-center">
                    <StatCard
                      label="Critical"
                      value={stats?.critical || 0}
                      subValue="Requires action"
                      variant="critical"
                      className="h-full flex flex-col justify-center"
                    />
                    <StatCard
                      label="High"
                      value={stats?.high || 0}
                      subValue="Active monitoring"
                      variant="high"
                      className="h-full flex flex-col justify-center"
                    />
                    <StatCard
                      label="Medium"
                      value={stats?.medium || 0}
                      subValue="Under review"
                      variant="medium"
                      className="h-full flex flex-col justify-center"
                    />
                    <StatCard
                      label="Low"
                      value={stats?.low || 0}
                      subValue="Informational"
                      variant="low"
                      className="h-full flex flex-col justify-center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <FilterToolbar />

          <div className="flex-1 flex flex-col px-8 py-4">
            <IndicatorTable 
              data={indicatorsRes?.data || []} 
              isLoading={tableLoading} 
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
