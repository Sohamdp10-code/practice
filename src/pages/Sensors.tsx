import React, { useState } from "react";
import {
  Thermometer,
  Activity,
  Gauge,
  Zap,
  Droplets,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { sensorData, machines } from "../data/mockData";

export const Sensors: React.FC = () => {
  const [range, setRange] = useState("24H");
  const [selectedMachine, setSelectedMachine] = useState("M-102");

  const telemetryMetrics = [
    {
      label: "Bearing Temperature",
      value: "82°C",
      status: "WARNING",
      icon: Thermometer,
      color: C.red,
      nominal: "64–72°C",
      delta: "+14°C vs baseline",
    },
    {
      label: "Vibration RMS",
      value: "7.8 mm/s",
      status: "WARNING",
      icon: Activity,
      color: C.orange,
      nominal: "<4.5 mm/s (ISO 10816)",
      delta: "+31% above threshold",
    },
    {
      label: "Synchronous Speed",
      value: "1,465 RPM",
      status: "HEALTHY",
      icon: Gauge,
      color: C.greenBright,
      nominal: "1,450–1,500 RPM",
      delta: "Stable running",
    },
    {
      label: "Hydraulic Pressure",
      value: "4.2 bar",
      status: "HEALTHY",
      icon: Droplets,
      color: C.greenBright,
      nominal: "3.8–5.2 bar",
      delta: "Normal pressure",
    },
    {
      label: "Stator Phase Current",
      value: "8.7 A",
      status: "WARNING",
      icon: Zap,
      color: C.orange,
      nominal: "6.0–8.0 A (100% Load)",
      delta: "+0.7A frictional load",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Live Sensor Telemetry
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              100 Hz Sampling
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time edge gateway IoT sensor feeds, anomaly band detection, and FFT harmonics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className="px-3 py-1.5 rounded-lg border bg-white text-zinc-800 font-semibold outline-none shadow-2xs cursor-pointer"
            style={{ borderColor: C.border }}
          >
            {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id} — {m.name}
              </option>
            ))}
          </select>

          <div className="flex bg-zinc-100 p-0.5 rounded-lg">
            {["1H", "6H", "24H", "7D"].map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  range === t
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Real-Time Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {telemetryMetrics.map(({ label, value, status, icon: Icon, color, nominal, delta }) => (
          <Card key={label} className="p-3.5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: `${color}18`, color }}
              >
                <Icon size={16} />
              </div>
              <StatusBadge status={status} />
            </div>

            <div className="my-1">
              <div className="text-xl font-bold font-mono" style={{ color }}>
                {value}
              </div>
              <div className="text-xs font-semibold text-zinc-800 mt-0.5">{label}</div>
            </div>

            <div className="pt-2 border-t border-zinc-100 text-[10px] text-zinc-500 space-y-0.5">
              <div>Nominal: {nominal}</div>
              <div className={status !== "HEALTHY" ? "text-amber-700 font-medium" : "text-zinc-400"}>
                {delta}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* High-Resolution Telemetry Charts */}
      <div className="space-y-4">
        {/* Chart 1: Temperature */}
        <Card className="p-4.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <SectionTitle sub="Bearing outer race contact temperature vs nominal thermal envelope">
              Bearing Temperature (°C) vs Time
            </SectionTitle>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-red-50 text-red-700 border border-red-200 self-start sm:self-auto font-semibold">
              Upper Safe Limit: 80.0°C (Breached at 19:30)
            </span>
          </div>

          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.red} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={C.red} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5ECE9" />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: C.textSec }} interval={2} />
                <YAxis domain={[55, 95]} tick={{ fontSize: 9, fill: C.textSec }} unit="°" />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                  }}
                  formatter={(v: any) => [`${Number(v).toFixed(1)} °C`, "Temperature"]}
                />
                <ReferenceLine
                  y={80}
                  stroke={C.red}
                  strokeDasharray="4 4"
                  label={{ value: "Alarm (80°C)", fontSize: 9, fill: C.red, position: "top" }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke={C.red}
                  strokeWidth={2}
                  fill="url(#tempG)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Vibration */}
        <Card className="p-4.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <SectionTitle sub="Tri-axial velocity amplitude (mm/s RMS) with ISO 10816 Severity Bands">
              Vibration Velocity RMS (mm/s) vs Time
            </SectionTitle>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto font-semibold">
              Warning Threshold: 6.5 mm/s
            </span>
          </div>

          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="vibG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.orange} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={C.orange} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5ECE9" />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: C.textSec }} interval={2} />
                <YAxis domain={[0, 14]} tick={{ fontSize: 9, fill: C.textSec }} unit="mm" />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                  }}
                  formatter={(v: any) => [`${Number(v).toFixed(2)} mm/s`, "Vibration"]}
                />
                <ReferenceLine
                  y={6.5}
                  stroke={C.orange}
                  strokeDasharray="4 4"
                  label={{ value: "ISO Limit 6.5", fontSize: 9, fill: C.orange, position: "top" }}
                />
                <Area
                  type="monotone"
                  dataKey="vibration"
                  stroke={C.orange}
                  strokeWidth={2}
                  fill="url(#vibG)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
