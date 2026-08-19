import React from "react";
import { Menu, Clock, Bell, Settings, ShieldCheck } from "lucide-react";
import { C } from "../../lib/colors";

interface TopBarProps {
  onToggleSidebar: () => void;
  onNavigateAlerts?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, onNavigateAlerts }) => {
  return (
    <header
      className="flex items-center justify-between px-4 py-2.5 bg-white border-b sticky top-0 z-30"
      style={{ borderColor: C.border }}
    >
      {/* Left: Sidebar toggle + breadcrumb / context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          title="Toggle Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-500">
          <span className="font-semibold text-zinc-800">Facility:</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700">
            Plant Alpha · Sector 4
          </span>
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-semibold text-[11px]">
            <ShieldCheck size={13} /> Edge Gateways Syncing
          </span>
        </div>
      </div>

      {/* Right: Quick actions & status */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200/70">
          <Clock size={13} className="text-zinc-400" />
          <span className="font-mono font-medium text-zinc-700">18 Aug 2026</span>
          <span className="text-zinc-400">·</span>
          <span className="font-mono font-medium text-zinc-700">09:43 AM IST</span>
        </div>

        <div className="h-4 w-px bg-zinc-200 hidden md:block" />

        <button
          onClick={onNavigateAlerts}
          className="relative p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          title="3 Active System Alerts"
        >
          <Bell size={17} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ring-white"
            style={{ background: C.red }}
          />
        </button>

        <button
          className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          title="System Configuration"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
};
