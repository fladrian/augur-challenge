import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  RowSelectionState,
} from '@tanstack/react-table';
import { 
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  SearchX
} from 'lucide-react';
import { Indicator } from '@/types/indicator';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/utils/cn';
import { useIndicatorColumns } from './columns';

interface IndicatorTableProps {
  data: Indicator[];
  isLoading?: boolean;
}

export const IndicatorTable = ({ data, isLoading }: IndicatorTableProps) => {
  const { setSelectedIndicatorId, selectedIndicatorId } = useDashboardStore();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
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
      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="h-10 bg-bg-card border-b border-border-default animate-pulse" />
        <div className="flex-1 p-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-bg-elevated rounded animate-pulse" />
          ))}
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-text-tertiary">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
                      <SearchX className="w-6 h-6 text-text-tertiary/50" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[13px] font-medium text-text-secondary">No indicators found</p>
                      <p className="text-[12px] text-text-tertiary">Try adjusting your search or filters.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
