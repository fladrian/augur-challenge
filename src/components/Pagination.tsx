import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/utils/cn';

interface PaginationProps {
  totalItems: number;
  totalPages: number;
}

export const Pagination = ({ totalItems, totalPages }: PaginationProps) => {
  const { page, setPage, limit } = useDashboardStore();

  const startIdx = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, totalItems);

  if (totalPages <= 1) {
     return (
        <div className="flex items-center justify-between px-8 py-3 pb-5">
          <span className="text-[12px] text-text-tertiary">
            Showing {startIdx}-{endIdx} of {totalItems.toLocaleString()} indicators
          </span>
        </div>
     );
  }

  const getPages = () => {
    return Array.from(new Set([
      1,
      Math.max(2, page - 1),
      page,
      Math.min(totalPages - 1, page + 1),
      totalPages
    ]))
      .sort((pageA, pageB) => pageA - pageB)
      .reduce((paginationItems, pageNum, index, pagesArray) => {
        const prevPageNum = pagesArray[index - 1];
        if (index > 0 && prevPageNum !== undefined && pageNum - prevPageNum > 1) paginationItems.push('...');
        paginationItems.push(pageNum);
        return paginationItems;
      }, [] as Array<number | string>);
  };

  return (
    <div className="flex items-center justify-between px-8 py-3 pb-5">
      <span className="text-[12px] text-text-tertiary">
        Showing {startIdx}-{endIdx} of {totalItems.toLocaleString()} indicators
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="w-[30px] h-[30px] flex items-center justify-center border border-border-default rounded-[4px] text-text-secondary disabled:opacity-30 disabled:pointer-events-none hover:bg-bg-card transition-colors"
        >
          ‹
        </button>
        {getPages().map((pageItem, index) => (
          <button
            key={index}
            disabled={pageItem === '...'}
            onClick={() => typeof pageItem === 'number' && setPage(pageItem)}
            className={cn(
              "w-[30px] h-[30px] flex items-center justify-center border rounded-[4px] text-[12px] font-medium transition-all duration-150",
              pageItem === page && "bg-augur-blue border-augur-blue text-white",
              pageItem === '...' && "border-transparent text-text-tertiary cursor-default",
              pageItem !== page && pageItem !== '...' && "border-border-default text-text-secondary hover:bg-bg-card hover:border-border-hover"
            )}
          >
            {pageItem}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="w-[30px] h-[30px] flex items-center justify-center border border-border-default rounded-[4px] text-text-secondary disabled:opacity-30 disabled:pointer-events-none hover:bg-bg-card transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
};
