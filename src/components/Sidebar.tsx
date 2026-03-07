import * as React from 'react';
import {
  LayoutDashboard,
  Activity,
  Search,
  Shield,
  Flag,
  Users,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavItemProps {
  icon: any;
  label: string;
  badge?: number;
  active?: boolean;
}

const NavItem = ({
  icon: Icon,
  label,
  badge,
  active,
}: NavItemProps) => (
  <a
    href="#"
    className={cn(
      'flex items-center gap-3 px-5 py-2 mx-2 rounded-md text-[13px] font-medium transition-all duration-150',
      active
        ? 'bg-bg-sidebar-active text-augur-blue'
        : 'text-text-secondary hover:bg-bg-card hover:text-text-primary'
    )}
  >
    <Icon className={cn('w-[18px] h-[18px]', active ? 'opacity-100' : 'opacity-60')} />
    <span>{label}</span>
    {badge && (
      <span className="ml-auto bg-severity-critical text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
        {badge}
      </span>
    )}
  </a>
);

export const Sidebar = () => {
  return (
    <aside className="w-[220px] bg-bg-sidebar border-r border-border-subtle flex flex-col h-screen sticky top-0 overflow-y-auto pt-5 pb-5">
      <div className="px-5 mb-6 flex items-center gap-3">
        <div className="size-5 flex items-center justify-center">
          <svg viewBox="0 0 28 28" fill="none"><path d="M14 2L2 26h24L14 2z" stroke="#fff" stroke-width="2" fill="none"/><path d="M14 10l-5 10h10l-5-10z" fill="#6383ff" opacity="0.3"/></svg>
        </div>

        <span className="font-bold text-[18px] tracking-[3px] uppercase text-white font-display">
          Augur
        </span>
      </div>

      <nav className="flex-1">
        <div className="mb-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Activity} label="Augur Events" />
          <NavItem icon={Search} label="Investigate" />
        </div>

        <div className="mb-2">
          <div className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-text-tertiary">
            Intelligence
          </div>
          <NavItem icon={Shield} label="Threat Indicators" />
          <NavItem icon={Flag} label="Campaigns" />
          <NavItem icon={Users} label="Actors" />
        </div>

        <div className="mb-2">
          <div className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-text-tertiary">
            Reports
          </div>
          <NavItem icon={FileText} label="Executive Reports" />
          <NavItem icon={BarChart3} label="Analytics" />
        </div>

        <div>
          <div className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-text-tertiary">
            Settings
          </div>
          <NavItem icon={Settings} label="Integrations" />
        </div>
      </nav>
    </aside>
  );
};
