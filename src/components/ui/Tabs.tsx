import { ComponentType } from 'react';
import { cn } from '../../utils/cn';

interface Tab<T> {
  id: T;
  label: string;
  icon?: ComponentType<{ className?: string }>;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

export const Tabs = <T extends string>({ tabs, activeTab, onChange, className }: TabsProps<T>) => {
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
            {Icon && <Icon className={cn("size-3.5 text-text-tertiary", isActive && "text-augur-blue")} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
