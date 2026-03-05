import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { 
  Globe, 
  AtSign, 
  Hash, 
  Link as LinkIcon 
} from 'lucide-react';
import { Indicator, Severity } from '../types/indicator';
import { Badge, Tag } from './ui';
import { useDashboardStore } from '../store/useDashboardStore';
import { cn } from '../utils/cn';

interface IndicatorTableProps {
  data: Indicator[];
  isLoading?: boolean;
}

const typeIconMap = {
  ip: Globe,
  domain: AtSign,
  hash: Hash,
  url: LinkIcon,
};

const columnHelper = createColumnHelper<Indicator>();

export const IndicatorTable = ({ data, isLoading }: IndicatorTableProps) => {
  const { setSelectedIndicatorId, selectedIndicatorId } = useDashboardStore();
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => [
    columnHelper.display({
      id: 'selection',
      header: ({ table }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 rounded border-border-default bg-bg-input cursor-pointer accent-augur-blue transition-all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 rounded border-border-default bg-bg-input cursor-pointer accent-augur-blue transition-all shadow-sm"
          />
        </div>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Indicator',
      cell: (info) => (
        <span className="font-mono text-[13px] font-medium text-augur-blue">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => {
        const type = info.getValue();
        const Icon = typeIconMap[type] || Globe;
        return (
          <div className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-text-tertiary opacity-70" />
            <span className="text-[12px] text-text-secondary capitalize">
              {type}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('severity', {
      header: 'Severity',
      cell: (info) => <Badge severity={info.getValue()} />,
    }),
    columnHelper.accessor('confidence', {
      header: 'Confidence',
      cell: (info) => {
        const value = info.getValue();
        const severity = info.row.original.severity;
        const colors: Record<Severity, string> = {
          critical: 'bg-severity-critical',
          high: 'bg-severity-high',
          medium: 'bg-severity-medium',
          low: 'bg-severity-low',
        };

        return (
          <div className="flex items-center gap-2">
            <div className="w-[60px] h-1 bg-bg-elevated rounded-sm overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', colors[severity])}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className={cn('font-mono text-[11.5px] font-bold min-w-[28px]', 
              severity === 'critical' ? 'text-severity-critical' : 
              severity === 'high' ? 'text-severity-high' : 
              severity === 'medium' ? 'text-severity-medium' : 'text-severity-low'
            )}>
              {value}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('source', {
      header: 'Source',
      cell: (info) => (
        <span className="text-[12px] text-text-secondary">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {info.getValue().length > 2 && (
            <span className="text-[10px] text-text-tertiary">+{info.getValue().length - 2}</span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('lastSeen', {
      header: 'Last Seen',
      cell: (info) => {
        const date = new Date(info.getValue());
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let timeStr = '';
        if (diffDays > 0) timeStr = `${diffDays}d ago`;
        else if (diffHours > 0) timeStr = `${diffHours}h ago`;
        else timeStr = `${diffMins}m ago`;

        return (
          <span className="text-[12px] text-text-tertiary whitespace-nowrap">
            {timeStr}
          </span>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
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
          <thead className="sticky top-0 bg-bg-card z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border-default">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-[11px] font-bold text-text-tertiary uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
