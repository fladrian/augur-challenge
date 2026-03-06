import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { 
  ChevronUp,
  ChevronDown,
  ChevronsUpDown
} from 'lucide-react';
import { AlertCircle, Database, SearchX } from 'lucide-react';
import { Indicator } from '../../types/indicator';
import { useDashboardStore } from '../../store/useDashboardStore';
import { cn } from '../../utils/cn';
import { useIndicatorColumns } from './columns';

export interface IndicatorTableProps {
  data: Indicator[];
  isLoading?: boolean;
  isError?: boolean;
}

export const IndicatorTable = ({ data, isLoading, isError }: IndicatorTableProps) => {
  const { setSelectedIndicatorId, selectedIndicatorId } = useDashboardStore();
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useIndicatorColumns();

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  if (isLoading) {
    return (
      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="h-10 bg-bg-card border-b border-border-default animate-pulse" />
        <div className="flex-1 p-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-bg-elevated rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-lg shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-severity-critical/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-severity-critical" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">Failed to load indicators</h3>
        <p className="text-text-tertiary text-sm text-center max-w-sm mb-6">
          There was an error connecting to the threat intelligence service. Please try again or contact support if the problem persists.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-augur-blue text-white rounded-md text-sm font-bold shadow-lg shadow-augur-blue/20 hover:bg-augur-blue/90 transition-all active:scale-95"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-lg shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-bg-elevated/50 flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-text-tertiary" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">No indicators found</h3>
        <p className="text-text-tertiary text-sm text-center max-w-sm mb-6">
          No threat indicators match your current filter criteria. Try adjusting your search or filters to see more results.
        </p>
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-text-tertiary" />
          <span className="text-[12px] text-text-tertiary font-medium">Monitoring 24/7 for new threats</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-bg-surface border border-border-subtle rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-bg-card z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border-default">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-4 py-3 text-left text-[11px] font-bold text-text-tertiary uppercase tracking-wider group",
                      header.column.getCanSort() && "cursor-pointer select-none hover:bg-bg-elevated/20 transition-colors"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <div className="inline-flex items-center justify-center">
                          {{
                            asc: <ChevronUp className="w-3.5 h-3.5 text-augur-blue stroke-3" />,
                            desc: <ChevronDown className="w-3.5 h-3.5 text-augur-blue stroke-3" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ChevronsUpDown className="w-3 h-3 text-text-tertiary opacity-20 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedIndicatorId(row.original.id)}
                className={cn(
                  'border-b border-border-subtle transition-colors cursor-pointer group hover:bg-bg-card',
                  (selectedIndicatorId === row.original.id || row.getIsSelected()) && 'bg-bg-card shadow-[inset_4px_0_0_0_#6383FF]'
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
