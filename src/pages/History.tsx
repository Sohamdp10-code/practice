import React from "react";
import { CheckCircle2, RotateCw, User } from "lucide-react";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { history } from "../data/mockData";

export const HistoryPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Maintenance History & Audits
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
              ISO 55000 Log
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Historical fault records, completed service procedures, and verified maintenance logs
          </p>
        </div>
      </div>

      {/* Timeline Card */}
      <Card className="p-6">
        <SectionTitle sub="Chronological intervention history across fleet assets">
          Service Intervention Timeline
        </SectionTitle>

        <div className="relative mt-6 pl-4 sm:pl-6">
          {/* Vertical timeline spine */}
          <div
            className="absolute left-6 top-3 bottom-3 w-0.5"
            style={{ background: "#DDE3E0" }}
          />

          <div className="space-y-6">
            {history.map((h, i) => (
              <div key={i} className="flex items-start gap-4 relative group">
                {/* Status indicator node */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 bg-white border-2 transition-transform group-hover:scale-110"
                  style={{
                    borderColor: h.status === "COMPLETED" ? C.greenBright : "#0EA5E9",
                  }}
                >
                  {h.status === "COMPLETED" ? (
                    <CheckCircle2 size={16} style={{ color: C.greenBright }} />
                  ) : (
                    <RotateCw size={15} style={{ color: "#0EA5E9" }} />
                  )}
                </div>

                {/* Content Box */}
                <div className="flex-1 bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/70 shadow-2xs hover:border-zinc-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900">{h.task}</span>
                      <StatusBadge status={h.status} />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 font-medium">
                      {h.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-2">
                    <span className="font-mono font-semibold text-zinc-700 bg-white px-2 py-0.5 rounded border border-zinc-200">
                      Asset: {h.machine}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-zinc-400" /> Technician: {h.tech}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed bg-white p-2.5 rounded-lg border border-zinc-100">
                    {h.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
