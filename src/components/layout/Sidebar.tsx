import React from "react";
import {
  LayoutDashboard,
  Cpu,
  Activity,
  Bell,
  Stethoscope,
  Bot,
  Wrench,
  History as HistoryIcon,
  BookOpen,
  FileText,
  Zap,
} from "lucide-react";
import { C } from "../../lib/colors";

interface SidebarProps {
  current: string;
  onNav: (page: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Cpu,
  Activity,
  Bell,
  Stethoscope,
  Bot,
  Wrench,
  History: HistoryIcon,
  BookOpen,
  FileText,
};

const navItems = [
  { section: "MAIN", items: [{ icon: "LayoutDashboard", label: "Dashboard", page: "dashboard" }] },
  {
    section: "MONITORING",
    items: [
      { icon: "Cpu", label: "Machines", page: "machines" },
      { icon: "Activity", label: "Live Sensors", page: "sensors" },
      { icon: "Bell", label: "Alerts", page: "alerts", badge: 3 },
    ],
  },
  {
    section: "AI",
    items: [
      { icon: "Stethoscope", label: "Diagnosis", page: "diagnosis" },
      { icon: "Bot", label: "AI Assistant", page: "assistant" },
    ],
  },
  {
    section: "MAINTENANCE",
    items: [
      { icon: "Wrench", label: "Maintenance", page: "maintenance" },
      { icon: "History", label: "History", page: "history" },
    ],
  },
  {
    section: "KNOWLEDGE",
    items: [{ icon: "BookOpen", label: "Knowledge Base", page: "knowledge" }],
  },
  {
    section: "REPORTS",
    items: [{ icon: "FileText", label: "Reports", page: "reports" }],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ current, onNav, collapsed }) => {
  return (
    <aside
      className="flex flex-col h-full select-none transition-all duration-200 border-r"
      style={{
        background: C.dark,
        borderColor: C.darkLight,
        width: collapsed ? 68 : 230,
      }}
    >
      {/* Brand Header */}
      <div
        className="flex items-center gap-3 px-4 py-4.5 border-b"
        style={{ borderColor: C.darkLight }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ background: C.green }}
        >
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
              MITA
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800/60">
                AI PRO
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 truncate">Multimodal Industrial Assistant</div>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navItems.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <div
                className="text-[10px] font-bold px-2.5 mb-1 tracking-widest"
                style={{ color: "#717D77" }}
              >
                {section}
              </div>
            )}
            <div className="space-y-0.5">
              {items.map(({ icon: iconName, label, page, badge }) => {
                const IconComponent = iconMap[iconName] || LayoutDashboard;
                const active = current === page;
                return (
                  <button
                    key={page}
                    onClick={() => onNav(page)}
                    className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all relative group"
                    style={{
                      background: active ? "rgba(45, 190, 120, 0.14)" : "transparent",
                      color: active ? C.greenBright : "#9BA7A1",
                    }}
                    title={collapsed ? label : undefined}
                  >
                    <IconComponent
                      size={17}
                      className="flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ color: active ? C.greenBright : "#828F89" }}
                    />
                    {!collapsed && (
                      <span
                        className={`text-xs font-medium truncate ${
                          active ? "text-white font-semibold" : "group-hover:text-zinc-200"
                        }`}
                      >
                        {label}
                      </span>
                    )}
                    {badge && !collapsed && (
                      <span
                        className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full font-bold shadow-xs"
                        style={{ background: C.red, color: "#fff" }}
                      >
                        {badge}
                      </span>
                    )}
                    {badge && collapsed && (
                      <span
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2 ring-[#202522]"
                        style={{ background: C.red }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t p-3 space-y-2" style={{ borderColor: C.darkLight }}>
        {!collapsed ? (
          <>
            <div
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs"
              style={{ background: C.darkMid }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.greenBright }} />
                <span className="text-[11px] text-zinc-300 font-medium">Plant Alpha Online</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">v2.4</span>
            </div>
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#2A302D] transition-colors cursor-pointer">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-1 ring-emerald-500/30"
                style={{ background: "rgba(45, 190, 120, 0.2)", color: C.greenBright }}
              >
                RK
              </div>
              <div className="min-w-0">
                <div className="font-medium text-white text-xs truncate">Rajesh Kumar</div>
                <div className="text-[10px] text-zinc-400 truncate">Lead Reliability Tech</div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <span className="w-2 h-2 rounded-full" style={{ background: C.greenBright }} />
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "rgba(45, 190, 120, 0.2)", color: C.greenBright }}
            >
              RK
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
