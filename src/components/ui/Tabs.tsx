import { ComponentType } from 'react';
import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={cn("flex items-center gap-1 bg-bg-elevated/50 p-1 rounded-lg border border-border-subtle", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-200 uppercase tracking-wider",
              isActive 
                ? "bg-bg-card text-text-primary shadow-sm border border-border-subtle" 
                : "text-text-tertiary hover:text-text-secondary hover:bg-bg-card/50 border border-transparent"
            )}
          >
            {Icon && <Icon className={cn("w-3.5 h-3.5", isActive ? "text-augur-blue" : "text-text-tertiary")} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
