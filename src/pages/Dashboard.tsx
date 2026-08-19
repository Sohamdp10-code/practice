import React from "react";
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { alerts, sensorData } from "../data/mockData";

interface DashboardProps {
  onNav: (page: string, machineId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNav }) => {
  const kpis = [
    {
      label: "Machines Monitored",
      value: "24",
      icon: Cpu,
      trend: "+2 this month",
      trendPositive: true,
      color: C.green,
      desc: "Active in network",
    },
    {
      label: "Healthy Machines",
      value: "21",
      icon: CheckCircle2,
      trend: "87.5% fleet uptime",
      trendPositive: true,
      color: C.greenBright,
      desc: "Operating normally",
    },
    {
      label: "Active Faults",
      value: "3",
      icon: AlertTriangle,
      trend: "1 critical, 2 warnings",
      trendPositive: false,
      color: C.red,
      desc: "Requires attention",
    },
    {
      label: "Maintenance Due",
      value: "5",
      icon: Wrench,
      trend: "Next in 18 hrs",
      trendPositive: true,
      color: C.orange,
      desc: "Scheduled actions",
    },
  ];

  const healthDist = [
    { name: "Healthy", value: 21, color: C.greenBright, count: "21 units" },
    { name: "Warning", value: 2, color: C.orange, count: "2 units" },
    { name: "Critical", value: 1, color: C.red, count: "1 unit" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight" style={{ color: C.text }}>
              Industrial Operations
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              Live Fleet
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            AI-powered multimodal machine health diagnostics & predictive telemetry
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white shadow-2xs"
            style={{ borderColor: C.border }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.greenBright }} />
            <span className="font-medium text-zinc-700">System Online</span>
          </div>
          <div
            className="px-3 py-1.5 rounded-lg border bg-white text-zinc-600 font-mono text-[11px]"
            style={{ borderColor: C.border }}
          >
            Sync: 09:43:12
          </div>
          <button
            onClick={() => onNav("diagnosis")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-xs transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
            style={{ background: C.green }}
          >
            <Zap size={13} /> Quick Diagnose
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, trend, trendPositive, color, desc }) => (
          <Card key={label} className="p-4 hover:border-zinc-300 transition-all shadow-2xs">
            <div className="flex items-start justify-between mb-2.5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon size={19} style={{ color }} />
              </div>
              <div
                className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 ${
                  trendPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                }`}
              >
                {trendPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trend}
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight mb-0.5" style={{ color: C.text }}>
              {value}
            </div>
            <div className="text-xs font-semibold text-zinc-800">{label}</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">{desc}</div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Health Distribution & Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Machine Health Overview */}
        <Card className="p-4.5 flex flex-col justify-between">
          <div>
            <SectionTitle sub="Fleet condition breakdown across 24 units">
              Machine Health Distribution
            </SectionTitle>

            <div className="flex items-center justify-center gap-4 my-2">
              <div className="w-[120px] h-[120px] relative flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={56}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#FFF"
                    >
                      {healthDist.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-bold text-zinc-800">87.5%</span>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">
                    Healthy
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {healthDist.map(({ name, value, color, count }) => (
                  <div key={name} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-700">
                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                        {name}
                      </span>
                      <span className="font-mono font-semibold text-zinc-800">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden bg-zinc-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(value / 24) * 100}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>Critical machine flagged:</span>
            <button
              onClick={() => onNav("machinedetail", "M-103")}
              className="font-semibold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              M-103 Hydraulic Pump <ArrowRight size={11} />
            </button>
          </div>
        </Card>

        {/* Active Alerts */}
        <Card className="p-4.5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <SectionTitle sub="Real-time threshold breaches & anomaly detections">
              Active Fault Alerts
            </SectionTitle>
            <button
              onClick={() => onNav("alerts")}
              className="text-xs font-semibold flex items-center gap-1 text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              View all 5 alerts <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {alerts.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border transition-colors"
                style={{
                  borderColor: a.sev === "CRITICAL" ? `${C.red}30` : `${C.orange}30`,
                  background: a.sev === "CRITICAL" ? `${C.red}06` : `${C.orange}06`,
                }}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="mt-0.5 flex-shrink-0">
                    <AlertTriangle
                      size={16}
                      style={{ color: a.sev === "CRITICAL" ? C.red : C.orange }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <StatusBadge status={a.sev} />
                      <span className="text-xs font-bold text-zinc-900">{a.machine}</span>
                      <span className="text-xs text-zinc-500 truncate">({a.name})</span>
                      <span className="text-[11px] text-zinc-400 font-mono">· {a.time}</span>
                    </div>
                    <p className="text-xs text-zinc-600 line-clamp-1">{a.msg}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onNav("machinedetail", a.machine)}
                    className="text-xs px-2.5 py-1 rounded border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => onNav("diagnosis")}
                    className="text-xs px-2.5 py-1 rounded font-semibold text-white transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
                    style={{ background: C.green }}
                  >
                    Diagnose
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Machine Performance Time-Series Telemetry */}
      <Card className="p-4.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <SectionTitle sub="24-Hour continuous vibration amplitude (mm/s) & bearing temperature (°C)">
              Machine Performance Telemetry — M-102 (CNC Motor Unit)
            </SectionTitle>
          </div>
          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg text-xs self-start sm:self-auto">
            {["1H", "6H", "24H", "7D"].map((t) => (
              <button
                key={t}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  t === "24H" ? "bg-white text-zinc-900 font-semibold shadow-2xs" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5ECE9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: C.textSec }} interval={2} />
              <YAxis
                yAxisId="temp"
                domain={[55, 95]}
                tick={{ fontSize: 10, fill: C.textSec }}
                unit="°C"
              />
              <YAxis
                yAxisId="vib"
                orientation="right"
                domain={[0, 14]}
                tick={{ fontSize: 10, fill: C.textSec }}
                unit="mm"
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
              />
              <ReferenceLine
                yAxisId="temp"
                y={80}
                stroke={C.red}
                strokeDasharray="4 4"
                label={{ value: "Temp Alert (80°C)", fontSize: 9, fill: C.red, position: "insideTopLeft" }}
              />
              <ReferenceLine
                yAxisId="vib"
                y={6.5}
                stroke={C.orange}
                strokeDasharray="4 4"
                label={{ value: "Vib Limit (6.5mm/s)", fontSize: 9, fill: C.orange, position: "insideBottomRight" }}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temp"
                stroke={C.red}
                strokeWidth={2}
                dot={false}
                name="Temp (°C)"
              />
              <Line
                yAxisId="vib"
                type="monotone"
                dataKey="vibration"
                stroke={C.orange}
                strokeWidth={2}
                dot={false}
                name="Vibration (mm/s)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-red-500 inline-block" /> Temperature (°C)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-orange-500 inline-block" /> Vibration Amplitude (mm/s)
            </span>
          </div>
          <span className="text-[11px] text-zinc-400">
            Last anomaly burst detected at 20:00 (Bearing #2 spall contact)
          </span>
        </div>
      </Card>
    </div>
  );
};
