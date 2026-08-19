import React, { useState } from "react";
import { Plus } from "lucide-react";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { PriorityBadge } from "../components/common/PriorityBadge";
import { maintenance } from "../data/mockData";
import type { MaintenanceTask } from "../data/mockData";

export const Maintenance: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(maintenance);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const handleStartTask = (taskName: string) => {
    setActiveTask(taskName);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Maintenance Management
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              5 Pending Work Orders
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Prescriptive maintenance schedules, parts allocation, and technician work orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newTask: MaintenanceTask = {
                machine: "M-101",
                component: "Rotor Shaft Coupling",
                task: "Laser Alignment Check",
                priority: "MEDIUM",
                due: "24 Aug 2026",
                est: "1.5 hr",
              };
              setTasks((p) => [newTask, ...p]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            <Plus size={14} /> Create Work Order
          </button>
        </div>
      </div>

      {/* Upcoming Work Orders Table */}
      <Card className="overflow-hidden border border-zinc-200 shadow-2xs">
        <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
          <SectionTitle sub="Ordered by priority level and due date window">
            Scheduled Preventative & Corrective Tasks
          </SectionTitle>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase border-b bg-zinc-50/80"
                style={{ borderColor: C.border }}
              >
                <th className="py-3 px-4">Machine ID</th>
                <th className="py-3 px-4">Target Component</th>
                <th className="py-3 px-4">Maintenance Task</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Est. Downtime</th>
                <th className="py-3 px-4 text-right">Work Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {tasks.map((m, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">{m.machine}</td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-800">{m.component}</td>
                  <td className="py-3.5 px-4 text-zinc-600">{m.task}</td>
                  <td className="py-3.5 px-4">
                    <PriorityBadge priority={m.priority} />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-700">{m.due}</td>
                  <td className="py-3.5 px-4 font-mono text-zinc-500">{m.est}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleStartTask(m.task)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeTask === m.task
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-100 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                    >
                      {activeTask === m.task ? "In Progress" : "Start Workflow"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
