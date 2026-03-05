import * as React from 'react';
import { Button } from './ui';

export const PageHeader = () => {
  return (
    <header className="px-8 py-6 border-b border-border-subtle bg-bg-surface sticky top-0 z-20 flex items-center justify-between">

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Threat Intelligence Dashboard</h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Real-time threat indicators and campaign intelligence
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-text-tertiary flex items-center gap-2 mr-2">
          <span className="w-1.5 h-1.5 bg-status-active rounded-full shadow-[0_0_6px_#48c774]" />
          Live feed
        </span>
        <Button variant="secondary" size="sm">⬇ Export</Button>
        <Button variant="primary" size="sm">+ Add Indicator</Button>
      </div>
    </header>
  );
};
