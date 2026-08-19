import React, { useState } from "react";
import {
  Camera,
  Volume2,
  Activity,
  MessageSquare,
  Layers,
  Wrench,
  Download,
  Bot,
  ArrowLeft,
  Check,
} from "lucide-react";
import { C } from "../lib/colors";
import { Card, SectionTitle } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { diagnosisProcedure } from "../data/mockData";
import type { Machine } from "../data/mockData";

interface DiagnosisResultProps {
  machine: Machine;
  onNav: (page: string) => void;
  onReset: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  machine,
  onNav,
  onReset,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [workflowStarted, setWorkflowStarted] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const evidence = [
    {
      modality: "1. Image Vision Analysis",
      icon: Camera,
      color: "#7C3AED",
      conf: 88,
      status: "WARNING",
      finding:
        "Surface spalling & micro-pitting detected on the outer raceway of Bearing #2. Minor discoloration indicates localized frictional heat above 120°C.",
      model: "Vision CNN (ResNet-50)",
    },
    {
      modality: "2. Acoustic Harmonic Analysis",
      icon: Volume2,
      color: "#0EA5E9",
      conf: 94,
      status: "CRITICAL",
      finding:
        "Clear Outer Race Fault Frequency (BPFO = 380 Hz) with 0.12s cyclic impulse repetition. Harmonics indicate advanced Stage 3 spalling wear.",
      model: "Audio FFT Spectrogram Net",
    },
    {
      modality: "3. Multi-Sensor Telemetry",
      icon: Activity,
      color: C.orange,
      conf: 91,
      status: "WARNING",
      finding:
        "Thermal gradient elevated (+18% over nominal 68°C to 82°C). Vibration amplitude peak at 7.8 mm/s RMS (31% over ISO boundary). RPM steady at 1,465 RPM.",
      model: "Temporal Transformer Anomaly",
    },
    {
      modality: "4. Technician Context & Voice",
      icon: MessageSquare,
      color: C.green,
      conf: 85,
      status: "WARNING",
      finding:
        "Technician report confirmed audible rhythmic grinding during load cycles, correlating precisely with acoustic impact markers.",
      model: "LLM Clinical Reasoner",
    },
  ];

  const rootCauses = [
    { cause: "Insufficient / Degraded Lubricant Grease", prob: 72 },
    { cause: "Prolonged High-Frequency Vibration Stress", prob: 61 },
    { cause: "Excessive Radial Mechanical Cutting Load", prob: 48 },
    { cause: "Bearing Subsurface Material Fatigue", prob: 39 },
  ];

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors mb-1 cursor-pointer"
          >
            <ArrowLeft size={13} /> Run Another Diagnosis
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              AI Multimodal Diagnosis Report
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold">
              {machine.id}
            </span>
            <span className="text-xs text-zinc-500">· 18 Aug 2026, 09:43 IST</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setReportGenerated(true);
              setTimeout(() => onNav("reports"), 800);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border bg-white text-zinc-700 text-xs font-semibold hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
            style={{ borderColor: C.border }}
          >
            <Download size={14} />
            {reportGenerated ? "Report Saved!" : "Export PDF Report"}
          </button>
          <button
            onClick={() => onNav("assistant")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white font-semibold text-xs shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            <Bot size={14} /> Consult AI Copilot
          </button>
        </div>
      </div>

      {/* Main Diagnosis Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card
          className="p-5 lg:col-span-2 border-l-4 shadow-2xs"
          style={{ borderLeftColor: C.orange }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                PRIMARY FAULT CLASSIFICATION
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                Bearing Degradation (Outer Race Spall)
              </h2>
              <p className="text-xs text-zinc-600 mt-1">
                Asset: <span className="font-semibold text-zinc-800">{machine.name}</span> · Component:{" "}
                <span className="font-semibold text-amber-700">Outboard Bearing #2 (SKF 6308)</span>
              </p>
            </div>
            <StatusBadge status="CRITICAL" size="lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-zinc-100">
            {/* Confidence */}
            <div>
              <div className="text-[11px] font-semibold text-zinc-400 mb-1">
                MULTIMODAL FUSION CONFIDENCE
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-3xl font-black text-emerald-700 font-mono">91%</span>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  High Certainty
                </span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "91%",
                    background: `linear-gradient(90deg, ${C.green}, ${C.greenBright})`,
                  }}
                />
              </div>
            </div>

            {/* Severity */}
            <div>
              <div className="text-[11px] font-semibold text-zinc-400 mb-1">SEVERITY LEVEL</div>
              <div className="text-2xl font-bold font-mono text-amber-600 mb-1">HIGH</div>
              <div className="text-[11px] text-zinc-500">Action recommended within 24 hours</div>
            </div>

            {/* Downtime risk */}
            <div>
              <div className="text-[11px] font-semibold text-zinc-400 mb-1">ESTIMATED DOWNTIME</div>
              <div className="text-2xl font-bold font-mono text-zinc-900 mb-1">2.5 Hours</div>
              <div className="text-[11px] text-zinc-500">Planned outage prevents 18h failure</div>
            </div>
          </div>
        </Card>

        {/* Root Cause Probabilities */}
        <Card className="p-4.5 flex flex-col justify-between">
          <div>
            <SectionTitle sub="Bayesian root cause probability ranking">
              Possible Root Causes
            </SectionTitle>
            <div className="space-y-2.5 mt-2">
              {rootCauses.map(({ cause, prob }) => (
                <div key={cause}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-zinc-800 truncate pr-2">{cause}</span>
                    <span className="font-mono font-bold text-zinc-700">{prob}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${prob}%`,
                        background: prob > 65 ? C.orange : prob > 50 ? C.greenBright : "#9BA7A1",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 mt-2">
            Inferred from acoustic spectral harmonic peaks & lubrication history.
          </div>
        </Card>
      </div>

      {/* Multimodal Evidence Breakdown Section */}
      <div>
        <SectionTitle sub="Independent evidence contribution from all 4 sensory modalities">
          Multimodal Evidence Breakdown
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
          {evidence.map(({ modality, icon: Icon, color, conf, status, finding, model }) => (
            <Card key={modality} className="p-4 hover:border-zinc-300 transition-colors shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18`, color }}
                  >
                    <Icon size={15} />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">{modality}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold" style={{ color }}>
                    {conf}% Conf
                  </span>
                  <StatusBadge status={status} />
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/70 p-2.5 rounded-lg border border-zinc-200/60 mb-2">
                {finding}
              </p>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>Model: {model}</span>
                <span className="text-emerald-700 font-medium">Validated</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Multimodal Fusion Summary Banner */}
        <Card
          className="mt-3.5 p-4 border-l-4 shadow-2xs"
          style={{ borderLeftColor: C.green }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${C.green}18`, color: C.green }}
            >
              <Layers size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 mb-0.5">
                Multimodal Neural Fusion Assessment
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All four sensory inputs demonstrate strong cross-modal alignment. The acoustic model
                detected the signature 380 Hz outer race defect frequency, reinforced by elevated
                thermal telemetry (+18%) and surface pitting indicators on visual inspection.
                Technician subjective testimony corroborates harmonic impact timing.
                <strong>
                  {" "}
                  Immediate scheduled inspection & bearing replacement is advised within 24 hours.
                </strong>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Action & Step-by-Step Procedure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recommended Action Summary */}
        <Card className="p-4.5 flex flex-col justify-between">
          <div>
            <SectionTitle sub="Prescriptive maintenance recommendation">
              Recommended Action
            </SectionTitle>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg my-2">
              <div className="text-xs font-bold text-amber-900">Inspect & Replace Bearing #2</div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Prevent catastrophic rotor seizure and stator core damage.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Target Part:</span>
                <span className="font-mono font-semibold text-zinc-800">SKF 6308 Ball Bearing</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Priority:</span>
                <span className="font-bold text-red-600">HIGH (24 Hr Window)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">Est. Downtime:</span>
                <span className="font-mono font-semibold text-zinc-800">2.5 Hours</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Warehouse Inventory:</span>
                <span className="font-semibold text-emerald-700">In Stock (Bin C-14)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-zinc-100 space-y-2">
            <button
              onClick={() => setWorkflowStarted(true)}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white shadow-2xs transition-all hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ background: workflowStarted ? C.greenBright : C.green }}
            >
              <Wrench size={14} />
              {workflowStarted ? "Workflow Active (Assigned)" : "Start Maintenance Workflow"}
            </button>
            <button
              onClick={() => onNav("assistant")}
              className="w-full py-2 rounded-lg text-xs font-semibold border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              Ask AI for Procedure Details
            </button>
          </div>
        </Card>

        {/* Step-by-Step Maintenance Procedure */}
        <Card className="p-4.5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <SectionTitle sub="Interactive SOP-004 checklist — click to verify completed steps">
              Standard Operating Procedure (SOP-004)
            </SectionTitle>
            <span className="text-[11px] font-mono text-zinc-500">
              {completedSteps.length} of {diagnosisProcedure.length} completed
            </span>
          </div>

          <div className="space-y-2">
            {diagnosisProcedure.map((step, i) => {
              const isDone = completedSteps.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => toggleStep(i)}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isDone
                      ? "bg-emerald-50/60 border-emerald-300 text-zinc-500 line-through"
                      : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-800"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 transition-colors ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                    }`}
                  >
                    {isDone ? <Check size={13} /> : String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-xs leading-relaxed flex-1">{step}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
