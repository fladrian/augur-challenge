import { Sidebar } from '../components/Sidebar';

import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { FilterToolbar } from '../components/FilterToolbar';
import { IndicatorTable } from '../components/IndicatorTable';
import { Pagination } from '../components/Pagination';
import { DetailPanel } from '../components/DetailPanel';
import { useIndicators, useIndicatorStats } from '../hooks/useIndicators';
import { Shield } from 'lucide-react';
import { SeverityChart } from '../components/SeverityChart';


const DashboardPage = () => {
  const { data: indicatorsRes, isLoading: tableLoading } = useIndicators();
  const { data: stats } = useIndicatorStats();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-root">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <PageHeader />
        
        <div className="flex-1 overflow-auto custom-scrollbar">


        <div className="grid grid-cols-12 gap-5 px-8 py-5">
          {/* Total Card */}
          <div className="col-span-3">
            <StatCard
              label="Total Indicators"
              value={stats?.total || 0}
              subValue="↑ 12% from last week"
              icon={Shield}
              variant="total"
              className="h-full"
            />
          </div>

          {/* 2x2 Severity Cards */}
          <div className="col-span-5 grid grid-cols-2 gap-3">
            <StatCard
              label="Critical"
              value={stats?.critical || 0}
              subValue="Requires action"
              variant="critical"
            />
            <StatCard
              label="High"
              value={stats?.high || 0}
              subValue="Active monitoring"
              variant="high"
            />
            <StatCard
              label="Medium"
              value={stats?.medium || 0}
              subValue="Under review"
              variant="medium"
            />
            <StatCard
              label="Low"
              value={stats?.low || 0}
              subValue="Informational"
              variant="low"
            />
          </div>
          
          {/* Large Distribution Chart */}
          <div className="col-span-4 bg-bg-card border border-border-subtle rounded-lg p-4 flex flex-col h-full min-h-[160px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.8px] text-text-tertiary">
                Threat Distribution
              </span>
              <Shield className="w-4 h-4 text-text-tertiary" />
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center">
              {stats ? (
                <SeverityChart stats={stats} />
              ) : (
                <div className="h-full w-full bg-bg-elevated animate-pulse rounded-full aspect-square max-h-[140px]" />
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
