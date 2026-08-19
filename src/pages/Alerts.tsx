import React, { useState } from "react";
import { AlertTriangle, Wrench, ArrowRight, Search } from "lucide-react";
import { C } from "../lib/colors";
import { Card } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { alerts } from "../data/mockData";

interface AlertsProps {
  onNav: (page: string, machineId?: string) => void;
}

export const Alerts: React.FC<AlertsProps> = ({ onNav }) => {
  const [tab, setTab] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filteredAlerts = alerts.filter((a) => {
    const matchesTab = tab === "All" ? true : a.sev === tab.toUpperCase();
    const matchesSearch =
      a.machine.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.msg.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Industrial Alert Center
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800 border border-red-200">
              3 Active Threshold Events
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Automated sensor anomalies, vibration exceedances, and scheduled service deadline alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav("diagnosis")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            Run Multimodal Diagnosis
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <Card className="p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {["All", "Critical", "Warning", "Resolved"].map((t) => {
            const count =
              t === "All"
                ? alerts.length
                : alerts.filter((a) => a.sev === t.toUpperCase()).length;

            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  tab === t
                    ? "bg-zinc-900 text-white shadow-2xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <span>{t}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    tab === t ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-zinc-50/50 w-full sm:w-72"
          style={{ borderColor: C.border }}
        >
          <Search size={14} className="text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by machine or text..."
            className="text-xs bg-transparent outline-none w-full text-zinc-800 placeholder-zinc-400"
          />
        </div>
      </Card>

      {/* Alert Cards Feed */}
      <div className="space-y-3">
        {filteredAlerts.map((a) => {
          const isCritical = a.sev === "CRITICAL";
          return (
            <Card
              key={a.id}
              className="p-4 transition-all hover:border-zinc-300 shadow-2xs border"
              style={{
                borderLeftWidth: 4,
                borderLeftColor: isCritical ? C.red : C.orange,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isCritical ? `${C.red}18` : `${C.orange}18`,
                      color: isCritical ? C.red : C.orange,
                    }}
                  >
                    <AlertTriangle size={18} />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={a.sev} />
                      <span className="font-mono font-bold text-xs text-zinc-900">{a.machine}</span>
                      <span className="text-xs font-semibold text-zinc-700">· {a.name}</span>
                      <span className="text-[11px] font-mono text-zinc-400">· {a.ts}</span>
                    </div>

                    <p className="text-xs text-zinc-800 font-medium leading-relaxed">{a.msg}</p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-mono">
                      <Wrench size={11} className="text-zinc-500" />
                      <span>Recommended Action: {a.action}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onNav("machinedetail", a.machine)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 font-semibold cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => onNav("diagnosis")}
                    className="text-xs px-3.5 py-1.5 rounded-lg font-bold text-white shadow-2xs transition-opacity hover:opacity-90 flex items-center gap-1 cursor-pointer"
                    style={{ background: C.green }}
                  >
                    Diagnose <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
