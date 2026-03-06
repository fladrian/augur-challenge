import { useState } from 'react';
import { 
  Shield,
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
  ThreatOverview,
} from '@/components';
import { StatCard } from '@/components/ui';
import { useIndicators, useIndicatorStats } from '@/hooks';



const DashboardPage = () => {
  const { data: indicatorsRes, isLoading: tableLoading, isError: tableError } = useIndicators();
  const { data: stats } = useIndicatorStats();

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
            <ThreatOverview stats={stats} />
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
