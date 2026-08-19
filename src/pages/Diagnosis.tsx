import React, { useState } from "react";
import {
  Camera,
  Volume2,
  Database,
  MessageSquare,
  Mic,
  Upload,
  CheckCircle2,
  X,
  Stethoscope,
  Play,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import { C } from "../lib/colors";
import { Card } from "../components/common/CommonComponents";
import { StatusBadge } from "../components/common/StatusBadge";
import { machines } from "../data/mockData";
import { DiagnosisResult } from "./DiagnosisResult";

interface DiagnosisProps {
  onNav: (page: string) => void;
}

export const Diagnosis: React.FC<DiagnosisProps> = ({ onNav }) => {
  const [phase, setPhase] = useState<"input" | "analyzing" | "result">("input");
  const [selectedMachineId, setSelectedMachineId] = useState<string>("M-102");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [progress, setProgress] = useState(0);

  // Uploaded state simulations
  const [inputs, setInputs] = useState({
    image: "bearing_housing_surface_macro.jpg",
    audio: "cnc_spindle_outboard_acc.wav",
    csv: "sensor_telemetry_24h_highres.csv",
    text: "Motor M-102 produces an audible rhythmic grinding noise above 1,200 RPM. Outboard bearing housing temperature reached 82°C during continuous cut operation.",
  });

  const targetMachine = machines.find((m) => m.id === selectedMachineId) || machines[1];

  const handleRunDiagnosis = () => {
    setPhase("analyzing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("result"), 400);
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  if (phase === "result") {
    return (
      <DiagnosisResult
        machine={targetMachine}
        onNav={onNav}
        onReset={() => setPhase("input")}
      />
    );
  }

  if (phase === "analyzing") {
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center min-h-[560px] max-w-4xl mx-auto">
        <Card className="p-8 sm:p-10 text-center w-full max-w-lg border border-zinc-200 shadow-lg">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-pulse"
            style={{ background: `${C.green}18` }}
          >
            <Stethoscope size={32} style={{ color: C.green }} />
          </div>

          <h2 className="text-lg font-bold text-zinc-900 mb-1">
            Running Multimodal Neural Fusion
          </h2>
          <p className="text-xs text-zinc-500 mb-6">
            Cross-referencing Vision, Acoustic Spectrograms, ISO Sensor Baselines & Technician Context
          </p>

          {/* Step-by-step processing checks */}
          <div className="space-y-3 text-left mb-6 bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/70">
            {[
              { label: "Vision: Surface Spall Pattern Recognition (CNN)", done: progress > 20 },
              { label: "Acoustic: FFT Spectrogram & Outer Race Harmonics (380 Hz)", done: progress > 45 },
              { label: "Sensor: Thermal Gradient & Vibration RMS Anomaly Analysis", done: progress > 70 },
              { label: "NLP: Technician Symptom Embeddings & Knowledge Graph Match", done: progress > 85 },
              { label: "Multimodal Fusion: Bayesian Probability Calibration", done: progress >= 100 },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: done ? C.greenBright : "#DDE3E0" }}
                  >
                    {done && <CheckCircle2 size={11} color="#FFF" />}
                  </div>
                  <span className={done ? "text-zinc-800 font-medium" : "text-zinc-400"}>
                    {label}
                  </span>
                </div>
                {done ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-700">OK</span>
                ) : (
                  <span className="text-[10px] text-zinc-400 font-mono animate-pulse">Running...</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-zinc-100 overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${C.green}, ${C.greenBright})`,
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-zinc-500">
            <span>Inferring fault signature...</span>
            <span className="font-bold text-zinc-800">{progress}%</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight" style={{ color: C.text }}>
              Multimodal Machine Diagnosis
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              4-Modal AI Engine
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Analyze machine health using computer vision, acoustic signatures, sensor telemetry, and technician logs.
          </p>
        </div>

        {/* Selected target machine selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-2xs" style={{ borderColor: C.border }}>
          <span className="text-xs text-zinc-500 font-medium">Target Machine:</span>
          <select
            value={selectedMachineId}
            onChange={(e) => setSelectedMachineId(e.target.value)}
            className="text-xs font-bold text-zinc-800 bg-transparent outline-none cursor-pointer"
          >
            {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id} — {m.name} ({m.status})
              </option>
            ))}
          </select>
          <StatusBadge status={targetMachine.status} />
        </div>
      </div>

      {/* 4 Modality Input Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Modality 1: Image Analysis */}
        <Card className="p-4.5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#7C3AED18", color: "#7C3AED" }}
                >
                  <Camera size={17} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">1. Machine Image / Visual Inspection</h3>
                  <p className="text-[11px] text-zinc-500">Surface pitting, corrosion, cracks, debris</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                CNN Vision
              </span>
            </div>

            {inputs.image ? (
              <div className="rounded-lg p-3 border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded bg-zinc-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-zinc-600 font-bold text-[10px] border border-zinc-300">
                    IMG_RAW
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 truncate">{inputs.image}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">2.4 MB · 2048x1536 · Macro Lens</div>
                  </div>
                </div>
                <button
                  onClick={() => setInputs((p) => ({ ...p, image: "" }))}
                  className="text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setInputs((p) => ({ ...p, image: "bearing_housing_surface_macro.jpg" }))}
                className="w-full border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-purple-400 hover:bg-purple-50/20 transition-all cursor-pointer"
              >
                <Upload size={20} className="text-purple-600 mb-1" />
                <span className="text-xs font-semibold text-zinc-700">Upload Machine Image</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">Supports JPG, PNG, Thermal FLIR formats</span>
              </button>
            )}
          </div>
          <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
            <span>Model: ResNet50-Industrial-v3</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </div>
        </Card>

        {/* Modality 2: Acoustic Audio */}
        <Card className="p-4.5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#0EA5E918", color: "#0EA5E9" }}
                >
                  <Volume2 size={17} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">2. Machine Acoustic Audio</h3>
                  <p className="text-[11px] text-zinc-500">Contact microphone or sound recorder WAV</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                Acoustic FFT
              </span>
            </div>

            {inputs.audio ? (
              <div className="rounded-lg p-3 border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 flex-shrink-0">
                    <Play size={13} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 truncate">{inputs.audio}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">44.1 kHz · 45 sec sample · 16-bit PCM</div>
                  </div>
                </div>
                <button
                  onClick={() => setInputs((p) => ({ ...p, audio: "" }))}
                  className="text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setInputs((p) => ({ ...p, audio: "cnc_spindle_outboard_acc.wav" }))}
                className="w-full border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-sky-400 hover:bg-sky-50/20 transition-all cursor-pointer"
              >
                <Upload size={20} className="text-sky-600 mb-1" />
                <span className="text-xs font-semibold text-zinc-700">Upload Acoustic Recording</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">Supports WAV, MP3, Flac (Contact Mic)</span>
              </button>
            )}
          </div>
          <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
            <span>Model: AudioSpectrogram-Transformer</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </div>
        </Card>

        {/* Modality 3: Sensor CSV Data */}
        <Card className="p-4.5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${C.orange}18`, color: C.orange }}
                >
                  <Database size={17} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">3. Multi-Sensor Timeseries Data</h3>
                  <p className="text-[11px] text-zinc-500">Temperature, 3-axis vibration, pressure, current</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                Timeseries
              </span>
            </div>

            {inputs.csv ? (
              <div className="rounded-lg p-3 border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                    <FileSpreadsheet size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 truncate">{inputs.csv}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">1,440 timesteps · 6 channels (Vib, Temp, RPM)</div>
                  </div>
                </div>
                <button
                  onClick={() => setInputs((p) => ({ ...p, csv: "" }))}
                  className="text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setInputs((p) => ({ ...p, csv: "sensor_telemetry_24h_highres.csv" }))}
                className="w-full border-2 border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-amber-400 hover:bg-amber-50/20 transition-all cursor-pointer"
              >
                <Upload size={20} className="text-amber-600 mb-1" />
                <span className="text-xs font-semibold text-zinc-700">Upload Sensor CSV / JSON</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">Real-time edge gateway exports</span>
              </button>
            )}
          </div>
          <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
            <span>Model: Temporal-TFT-Anomaly-Net</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </div>
        </Card>

        {/* Modality 4: Technician Text & Voice */}
        <Card className="p-4.5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${C.green}18`, color: C.green }}
                >
                  <MessageSquare size={17} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">4. Technician Observation & Voice Note</h3>
                  <p className="text-[11px] text-zinc-500">Qualitative symptom logs, smell, noise notes</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                LLM / Whisper
              </span>
            </div>

            <div className="space-y-2">
              <textarea
                value={inputs.text}
                onChange={(e) => setInputs((p) => ({ ...p, text: e.target.value }))}
                placeholder="Describe observed machine behavior, noises, shifts, or abnormal heating..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-emerald-600 text-zinc-800 resize-none font-sans"
              />

              <button
                type="button"
                onClick={() => {
                  setIsRecordingVoice(!isRecordingVoice);
                  if (!isRecordingVoice) {
                    setTimeout(() => {
                      setIsRecordingVoice(false);
                      setInputs((p) => ({
                        ...p,
                        text: "Voice transcription: Motor is producing severe cyclic grinding noise and bearing temperature is running 14 degrees above normal.",
                      }));
                    }, 2000);
                  }
                }}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isRecordingVoice
                    ? "bg-red-50 text-red-700 border-red-300 font-semibold animate-pulse"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                <Mic size={14} className={isRecordingVoice ? "text-red-600" : "text-zinc-500"} />
                {isRecordingVoice ? "Listening to technician voice..." : "Dictate via Voice Input"}
              </button>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-100">
            <span>Model: Whisper-Large-v3 + Domain LLM</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </div>
        </Card>
      </div>

      {/* Primary Call to Action Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6 space-y-2">
        <button
          onClick={handleRunDiagnosis}
          className="flex items-center gap-3 px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenBright})` }}
        >
          <Layers size={18} />
          RUN AI MULTIMODAL DIAGNOSIS
        </button>
        <span className="text-[11px] text-zinc-400">
          Evaluates all 4 modalities simultaneously to generate confidence scores and maintenance steps
        </span>
      </div>
    </div>
  );
};
