import { 
  Sidebar, 
  PageHeader, 
  StatCardsGroup, 
  FilterToolbar, 
  IndicatorTable, 
  Pagination, 
  DetailPanel 
} from '@/components';
import { useIndicators, useIndicatorStats } from '@/hooks';

const DashboardPage = () => {
  const { data: indicatorsRes, isLoading: tableLoading, isError } = useIndicators();
  const { data: stats } = useIndicatorStats();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-root">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <PageHeader />
        
        <div className="flex-1 overflow-auto custom-scrollbar">


        <StatCardsGroup stats={stats} />

        <FilterToolbar />

        <div className="flex-1 flex flex-col px-8 py-4">
          <IndicatorTable 
            data={indicatorsRes?.data ?? []} 
            isLoading={tableLoading} 
            isError={isError}
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
