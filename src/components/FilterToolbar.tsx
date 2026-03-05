import * as React from 'react';
import { Search } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { Severity, IndicatorType } from '../types/indicator';
import { useDebounce } from '@uidotdev/usehooks';

export const FilterToolbar = () => {
  const { 
    search, 
    setSearch, 
    severity, 
    setSeverity, 
    type, 
    setType, 
    source,
    setSource,
    resetFilters 
  } = useDashboardStore();
  const [localSearch, setLocalSearch] = React.useState(search);
  const debouncedSearch = useDebounce(localSearch, 300);

  React.useEffect(() => {
    setSearch(debouncedSearch as string);
  }, [debouncedSearch, setSearch]);

  // Sync local search when store search changes (e.g. on reset)
  React.useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search);
    }
  }, [search]);

  const sources = [
    'AbuseIPDB',
    'VirusTotal',
    'Silent Push',
    'MalwareBazaar',
    'PhishTank',
    'GreyNoise',
    'URLHaus'
  ];

  return (
    <div className="px-8 py-4 flex items-center gap-3 bg-bg-surface border-b border-border-subtle flex-wrap">
      <div className="relative w-[260px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search indicators..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full bg-bg-input border border-border-default rounded-md text-[12.5px] text-text-primary px-3 py-[7px] pl-[34px] outline-none transition-all focus:border-augur-blue focus:ring-2 focus:ring-augur-blue/15 placeholder:text-text-tertiary"
        />
      </div>


      <div className="w-px h-6 bg-border-default mx-2" />

      <div className="flex items-center gap-2">
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity | 'all')}
          className="appearance-none bg-bg-input border border-border-default rounded-md text-[12.5px] text-text-primary px-3 py-[7px] pr-8 outline-none cursor-pointer focus:border-augur-blue focus:ring-2 focus:ring-augur-blue/15 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_fill=%22%235c6170%22_viewBox=%220_0_24_24%22%3E%3Cpath_d=%22M7_10l5_5_5-5z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center]"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as IndicatorType | 'all')}
          className="appearance-none bg-bg-input border border-border-default rounded-md text-[12.5px] text-text-primary px-3 py-[7px] pr-8 outline-none cursor-pointer focus:border-augur-blue focus:ring-2 focus:ring-augur-blue/15 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_fill=%22%235c6170%22_viewBox=%220_0_24_24%22%3E%3Cpath_d=%22M7_10l5_5_5-5z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center]"
        >
          <option value="all">All Types</option>
          <option value="ip">IP Address</option>
          <option value="domain">Domain</option>
          <option value="hash">File Hash</option>
          <option value="url">URL</option>
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="appearance-none bg-bg-input border border-border-default rounded-md text-[12.5px] text-text-primary px-3 py-[7px] pr-8 outline-none cursor-pointer focus:border-augur-blue focus:ring-2 focus:ring-augur-blue/15 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%2212%22_fill=%22%235c6170%22_viewBox=%220_0_24_24%22%3E%3Cpath_d=%22M7_10l5_5_5-5z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center]"
        >
          <option value="all">All Sources</option>
          {sources.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="ml-auto">
        <button
          onClick={resetFilters}
          className="text-text-secondary hover:text-text-primary transition-colors text-[11.5px] font-semibold px-2 py-1 h-8 bg-transparent border-none"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};
