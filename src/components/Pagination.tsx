import * as React from 'react';

import { useDashboardStore } from '../store/useDashboardStore';

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

  const renderPageButtons = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page, '...', totalPages);
      }
    }

    return pages.map((p, idx) => (
      <button
        key={idx}
        disabled={p === '...'}
        onClick={() => typeof p === 'number' && setPage(p)}
        className={`w-[30px] h-[30px] flex items-center justify-center border rounded-[4px] text-[12px] font-medium transition-all duration-150 ${
          p === page
            ? 'bg-augur-blue border-augur-blue text-white'
            : p === '...'
            ? 'border-transparent text-text-tertiary cursor-default'
            : 'border-border-default text-text-secondary hover:bg-bg-card hover:border-border-hover'
        }`}
      >
        {p}
      </button>
    ));
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
        {renderPageButtons()}
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
