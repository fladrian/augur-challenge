import * as React from 'react';
import { Sidebar } from '../components/Sidebar';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { FilterToolbar } from '../components/FilterToolbar';
import { IndicatorTable } from '../components/IndicatorTable';
import { Pagination } from '../components/Pagination';
import { DetailPanel } from '../components/DetailPanel';
import { useIndicators, useIndicatorStats } from '../hooks/useIndicators';
import { Shield } from 'lucide-react';

const DashboardPage = () => {
  const { data: indicatorsRes, isLoading: tableLoading } = useIndicators();
  const { data: stats } = useIndicatorStats();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-root">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <PageHeader />
        
        <div className="flex-1 overflow-auto custom-scrollbar">


        <div className="grid grid-cols-5 gap-3 px-8 py-5">
          <StatCard
            label="Total Indicators"
            value={stats?.total || 0}
            subValue="↑ 12% from last week"
            icon={Shield}
            variant="total"
          />
          <StatCard
            label="Critical"
            value={stats?.critical || 0}
            subValue="Requires immediate action"
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
