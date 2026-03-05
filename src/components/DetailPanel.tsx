import * as React from 'react';
import { AlertCircle } from 'lucide-react';

import { useDashboardStore } from '@/store/useDashboardStore';
import { useIndicatorDetails } from '@/hooks';
import { Badge, Tag, Button, Skeleton } from './ui';

export const DetailPanel = () => {
  const { selectedIndicatorId, setSelectedIndicatorId } = useDashboardStore();
  const { data: indicator, isLoading } = useIndicatorDetails(selectedIndicatorId || '');

  if (!selectedIndicatorId) return null;

  return (
    <div className="fixed inset-y-4 right-4 w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col transform transition-all duration-300 ease-out z-50">
      <div className="px-5 py-4 flex items-center justify-between border-b border-border-subtle sticky top-0 bg-bg-surface z-10 rounded-t-xl">
        <h3 className="text-[14px] font-semibold text-text-primary">Indicator Details</h3>
        <button
          onClick={() => setSelectedIndicatorId(null)}
          className="text-text-tertiary hover:text-text-primary transition-colors text-lg"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ) : indicator ? (
          <div className="space-y-6">
            <div className="detail-section">
              <div className="detail-section-label">Value</div>
              <div className="detail-value text-augur-blue font-bold text-[16px]">
                {indicator.value}
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Classification</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge severity={indicator.severity} />
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                  ⬡ {indicator.type}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Confidence Score</div>
              <div className="flex items-center gap-3 mt-1">
                <div className="confidence-bar">
                  <div 
                    className="confidence-bar-fill" 
                    style={{ 
                      width: `${indicator.confidence}%`,
                      backgroundColor: `var(--severity-${indicator.severity})`
                    }} 
                  />
                </div>
                <span className="text-[18px] font-bold font-mono" style={{ color: `var(--severity-${indicator.severity})` }}>
                  {indicator.confidence}%
                </span>
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Tags</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {indicator.tags?.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Timeline</div>
              <div className="detail-row">
                <span className="detail-row-label">First Seen</span>
                <span className="detail-row-value">{indicator.firstSeen}</span>
              </div>
              <div className="detail-row">
                <span className="detail-row-label">Last Seen</span>
                <span className="detail-row-value">2 minutes ago</span>
              </div>
              <div className="detail-row border-none">
                <span className="detail-row-label">Augured On</span>
                <span className="detail-row-value text-augur-blue">2025-09-15</span>
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Source</div>
              <div className="detail-row">
                <span className="detail-row-label">Provider</span>
                <span className="detail-row-value">AbuseIPDB</span>
              </div>
              <div className="detail-row border-none">
                <span className="detail-row-label">Reports</span>
                <span className="detail-row-value">1,247</span>
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-label">Related Campaigns</div>
              <div className="mt-1">
                <a href="#" className="text-augur-blue no-underline text-[12.5px] font-medium hover:underline">
                  F5 Attack Campaign
                </a>
                <span className="text-[11px] text-text-tertiary ml-2 italic">UNC3886 • China</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="secondary" size="sm" className="flex-1">Investigate</Button>
              <Button variant="danger" size="sm" className="flex-1">Block</Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2">
            <AlertCircle className="w-10 h-10" />
            <p className="text-sm">Error loading details</p>
          </div>
        )}
      </div>
    </div>
  );
};
