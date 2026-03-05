import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Globe, AtSign, Hash, Link as LinkIcon } from 'lucide-react';
import { Indicator, Severity } from '@/types/indicator';
import { Badge, Tag } from '@/components/ui';
import { cn } from '@/utils/cn';

const typeIconMap = {
  ip: Globe,
  domain: AtSign,
  hash: Hash,
  url: LinkIcon,
};

const columnHelper = createColumnHelper<Indicator>();

export const useIndicatorColumns = () => {
  return useMemo(() => [
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
};
