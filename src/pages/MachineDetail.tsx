import React, { useState } from "react";
import {
  ArrowLeft,
  Thermometer,
  Activity,
  Gauge,
  AlertTriangle,
  Stethoscope,
  HelpCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { MachineSVG } from "../components/machine/MachineSVG";
import { machines } from "../data/mockData";
import type { Machine } from "../data/mockData";

interface MachineDetailProps {
  machine?: Machine;
  onNav: (page: string) => void;
}

export const MachineDetail: React.FC<MachineDetailProps> = ({
  machine = machines[1], // defaults to M-102
  onNav,
}) => {
  const [selectedComp, setSelectedComp] = useState<string | null>("Bearing #2");

  const components = [
    {
      name: "Motor Housing / Stator",
      status: "HEALTHY",
      desc: "Operating within thermal limits (62°C)",
      specs: "415V 3-Phase · 15 kW Class F",
    },
    {
      name: "Bearing #1 (Drive End)",
      status: "HEALTHY",
      desc: "Vibration 2.8 mm/s within ISO 10816 Class II",
      specs: "SKF 6308 Deep Groove Ball",
    },
    {
      name: "Bearing #2 (Outboard)",
      status: machine.status,
      desc:
        machine.status !== "HEALTHY"
          ? "High frequency acoustic spalling signature detected (7.8 mm/s peak)"
          : "Nominal operational telemetry",
      specs: "SKF 6308 Deep Groove Ball",
    },
    {
      name: "Drive Shaft & Coupler",
      status: "HEALTHY",
      desc: "Shaft runout < 0.03 mm",
      specs: "Forged Alloy Steel 4340",
    },
    {
      name: "Cooling Fan Assembly",
      status: "HEALTHY",
      desc: "Forced airflow 450 CFM",
      specs: "6-blade poly impeller",
    },
  ];

  // 12-hour health degradation curve
  const trendData = [
    { t: "12h ago", health: 94 },
    { t: "10h ago", health: 92 },
    { t: "8h ago", health: 89 },
    { t: "6h ago", health: 85 },
    { t: "4h ago", health: 81 },
    { t: "2h ago", health: 76 },
    { t: "Current", health: machine.health },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <button
            onClick={() => onNav("machines")}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors mb-1 cursor-pointer"
          >
            <ArrowLeft size={13} /> Back to Machine Fleet
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              {machine.name}
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-800 font-bold">
              {machine.id}
            </span>
            <StatusBadge status={machine.status} size="lg" />
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Location: {machine.location} · Asset Class: {machine.type} · Commissioned: Feb 2024
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNav("diagnosis")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
            style={{ background: C.green }}
          >
            <Stethoscope size={14} /> Run AI Multimodal Diagnosis
          </button>
          <button
            onClick={() => onNav("assistant")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-zinc-700 text-xs font-semibold hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
            style={{ borderColor: C.border }}
          >
            <HelpCircle size={14} className="text-emerald-700" /> Ask AI Copilot
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Health Score Gauge */}
        <Card className="p-3 flex flex-col items-center justify-center text-center">
          <div className="text-[11px] font-semibold text-zinc-500 mb-1">Health Score</div>
          <div className="relative w-16 h-16 my-0.5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#E5ECE9"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={machine.health >= 80 ? C.greenBright : machine.health >= 60 ? C.orange : C.red}
                strokeWidth="10"
                strokeDasharray={`${machine.health * 2.51} 251`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-zinc-900">{machine.health}%</span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-400">Calculated by Fusion Model</span>
        </Card>

        {/* Temperature */}
        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold">Temperature</span>
            <Thermometer size={15} className={machine.temp > 80 ? "text-red-500" : "text-zinc-400"} />
          </div>
          <div>
            <div
              className="text-xl font-bold font-mono"
              style={{ color: machine.temp > 80 ? C.red : C.text }}
            >
              {machine.temp}°C
            </div>
            <div className="text-[10px] text-zinc-400">Baseline limit: 75°C</div>
          </div>
          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (machine.temp / 100) * 100)}%`,
                background: machine.temp > 80 ? C.red : C.greenBright,
              }}
            />
          </div>
        </Card>

        {/* Vibration Amplitude */}
        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold">Vibration (RMS)</span>
            <Activity size={15} className={machine.vibration > 6 ? "text-amber-500" : "text-zinc-400"} />
          </div>
          <div>
            <div
              className="text-xl font-bold font-mono"
              style={{ color: machine.vibration > 6 ? C.orange : C.text }}
            >
              {machine.vibration} <span className="text-xs font-normal">mm/s</span>
            </div>
            <div className="text-[10px] text-zinc-400">ISO 10816 Limit: 4.5 mm/s</div>
          </div>
          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (machine.vibration / 12) * 100)}%`,
                background: machine.vibration > 6 ? C.orange : C.greenBright,
              }}
            />
          </div>
        </Card>

        {/* Rotor Speed */}
        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold">Operating Speed</span>
            <Gauge size={15} className="text-zinc-400" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-zinc-900">
              {machine.rpm} <span className="text-xs font-normal">RPM</span>
            </div>
            <div className="text-[10px] text-zinc-400">Rated: 1,500 RPM synchronous</div>
          </div>
          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: "98%" }} />
          </div>
        </Card>

        {/* Active Faults Count */}
        <Card className="p-3 flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-semibold">Active Faults</span>
            <AlertTriangle size={15} className={machine.faults > 0 ? "text-red-500" : "text-zinc-400"} />
          </div>
          <div>
            <div
              className="text-xl font-bold font-mono"
              style={{ color: machine.faults > 0 ? C.red : C.greenBright }}
            >
              {machine.faults} detected
            </div>
            <div className="text-[10px] text-zinc-400">Last event 18m ago</div>
          </div>
          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, machine.faults * 25)}%`,
                background: machine.faults > 0 ? C.red : C.greenBright,
              }}
            />
          </div>
        </Card>
      </div>

      {/* Main Schematic & Component Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Schematic Card */}
        <Card className="p-4 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle sub="Interactive SVG schematic — click any subcomponent to inspect status">
              Machine Internal Assembly Schematic
            </SectionTitle>
            {selectedComp && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono">
                Selected: {selectedComp}
              </span>
            )}
          </div>

          <div className="flex-1 bg-zinc-50/70 rounded-lg border border-zinc-200/80 p-2 min-h-[260px] flex items-center justify-center">
            <MachineSVG
              machine={machine}
              activeComponent={selectedComp}
              onSelectComponent={(c) => setSelectedComp(c)}
            />
          </div>
        </Card>

        {/* Subcomponent Health Breakdown */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <SectionTitle sub="Component telemetry status">
              Subcomponent Breakdown
            </SectionTitle>

            <div className="space-y-2 mt-2">
              {components.map((c) => {
                const isSelected = selectedComp === c.name || (selectedComp?.startsWith("Bearing #2") && c.name.startsWith("Bearing #2"));
                return (
                  <div
                    key={c.name}
                    onClick={() => setSelectedComp(c.name)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/40 shadow-xs"
                        : "border-zinc-200/80 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-zinc-900">{c.name}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-tight mb-1">{c.desc}</p>
                    <div className="text-[10px] text-zinc-400 font-mono">{c.specs}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-zinc-100">
            <button
              onClick={() => onNav("diagnosis")}
              className="w-full py-2 rounded-lg text-xs font-semibold text-white shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: C.green }}
            >
              Analyze Flagged Component with AI
            </button>
          </div>
        </Card>
      </div>

      {/* Health Score Degradation Trend */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <SectionTitle sub="Model-inferred health index based on acoustic, vibration, and thermal telemetry over the last 12 hours">
            Health Degradation Curve (12-Hour Progression)
          </SectionTitle>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Degrading Trend (-22% since 00:00)
          </span>
        </div>

        <div className="h-[140px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.orange} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.orange} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5ECE9" />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: C.textSec }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: C.textSec }} unit="%" />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                }}
              />
              <Area
                type="monotone"
                dataKey="health"
                stroke={C.orange}
                strokeWidth={2.5}
                fill="url(#healthGrad)"
                name="Health %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
