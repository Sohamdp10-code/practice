import React, { useState, useMemo } from "react";
import { Search, ArrowUpDown, Plus, Eye } from "lucide-react";
import { C } from "../lib/colors";
import { Card, HealthBar } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { machines } from "../data/mockData";
import type { Machine } from "../data/mockData";

interface MachinesProps {
  onNav: (page: string) => void;
  onSelectMachine: (machine: Machine) => void;
}

export const Machines: React.FC<MachinesProps> = ({ onNav, onSelectMachine }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  const types = ["ALL", "Motor", "Pump", "Drive", "Compressor", "Fan"];

  const filteredMachines = useMemo(() => {
    return machines
      .filter((m) => {
        const matchesSearch =
          m.id.toLowerCase().includes(search.toLowerCase()) ||
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.location.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
        const matchesType = typeFilter === "ALL" || m.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") return a.health - b.health;
        if (sortOrder === "desc") return b.health - a.health;
        return 0;
      });
  }, [search, statusFilter, typeFilter, sortOrder]);

  const handleOpenDetail = (m: Machine) => {
    onSelectMachine(m);
    onNav("machinedetail");
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: C.text }}>
            Industrial Machine Fleet
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time status, health scores, vibration telemetry, and service histories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newMachine: Machine = {
                id: `M-${100 + machines.length + 1}`,
                name: "Auxiliary Turbine Generator",
                type: "Turbine",
                status: "HEALTHY",
                health: 98,
                faults: 0,
                lastMaint: "Today",
                location: "Bay E",
                rpm: 3000,
                temp: 62,
                vibration: 2.1,
              };
              handleOpenDetail(newMachine);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white font-medium text-xs shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            <Plus size={14} /> Register Machine
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3.5 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search box */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-zinc-50/50 w-full md:w-80"
            style={{ borderColor: C.border }}
          >
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, name, or bay..."
              className="text-xs bg-transparent outline-none w-full text-zinc-800 placeholder-zinc-400"
            />
          </div>

          {/* Status buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-[11px] font-semibold text-zinc-400 mr-1 hidden sm:inline">
              Status:
            </span>
            {["ALL", "HEALTHY", "WARNING", "CRITICAL"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-zinc-800 text-white shadow-2xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort & Type Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border bg-white text-zinc-700 outline-none cursor-pointer"
              style={{ borderColor: C.border }}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "ALL" ? "All Machine Types" : t}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                setSortOrder((curr) =>
                  curr === "none" ? "asc" : curr === "asc" ? "desc" : "none"
                )
              }
              className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                sortOrder !== "none"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                  : "bg-white text-zinc-600 border-zinc-200"
              }`}
              title="Sort by health percentage"
            >
              <ArrowUpDown size={12} />
              <span>
                Health {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : ""}
              </span>
            </button>
          </div>
        </div>
      </Card>

      {/* Machines Table for Desktop / Cards for Mobile */}
      <Card className="overflow-hidden border border-zinc-200 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase border-b bg-zinc-50/80"
                style={{ borderColor: C.border }}
              >
                <th className="py-3 px-4">Machine ID</th>
                <th className="py-3 px-4">Machine Name</th>
                <th className="py-3 px-4">Type / Bay</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 min-w-[140px]">Health Score</th>
                <th className="py-3 px-4 text-center">Temp</th>
                <th className="py-3 px-4 text-center">Vibration</th>
                <th className="py-3 px-4 text-center">Faults</th>
                <th className="py-3 px-4">Last Service</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {filteredMachines.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-zinc-400">
                    No machines found matching "{search}".
                  </td>
                </tr>
              ) : (
                filteredMachines.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => handleOpenDetail(m)}
                    className="hover:bg-zinc-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-emerald-600 transition-colors" />
                      {m.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-800">{m.name}</td>
                    <td className="py-3 px-4 text-zinc-500">
                      {m.type} · <span className="font-mono text-zinc-400">{m.location}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="py-3 px-4">
                      <HealthBar value={m.health} />
                    </td>
                    <td className="py-3 px-4 text-center font-mono">
                      <span
                        className={`font-semibold ${
                          m.temp > 85 ? "text-red-600" : m.temp > 75 ? "text-amber-600" : "text-zinc-700"
                        }`}
                      >
                        {m.temp}°C
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono">
                      <span
                        className={`font-semibold ${
                          m.vibration > 8
                            ? "text-red-600"
                            : m.vibration > 5
                            ? "text-amber-600"
                            : "text-zinc-700"
                        }`}
                      >
                        {m.vibration} mm/s
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono">
                      {m.faults > 0 ? (
                        <span
                          className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                          style={{
                            background: m.faults > 2 ? `${C.red}18` : `${C.orange}18`,
                            color: m.faults > 2 ? C.red : C.orange,
                          }}
                        >
                          {m.faults}
                        </span>
                      ) : (
                        <span className="text-zinc-300 font-normal">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">
                      {m.lastMaint}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(m)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        <Eye size={12} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
