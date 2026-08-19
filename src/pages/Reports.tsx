import React, { useState } from "react";
import { Download, Eye, Plus, CheckCircle2, FileBarChart2 } from "lucide-react";
import { C } from "../lib/colors";
import { Card } from "../components/common/CommonComponents";
import { reports } from "../data/mockData";
import type { Report } from "../data/mockData";

export const Reports: React.FC = () => {
  const [reportList, setReportList] = useState<Report[]>(reports);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [viewingReport, setViewingReport] = useState<Report | null>(null);

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Audit & Diagnostic Reports
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
              PDF Generator
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Automated maintenance compliance documents, multimodal diagnosis findings, and plant shift summaries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newRep: Report = {
                id: reportList.length + 1,
                title: "Real-Time Fleet Health Summary (24 Machines)",
                machine: "Fleet-Wide",
                date: "Today",
                type: "Executive",
                size: "2.8 MB",
              };
              setReportList((p) => [newRep, ...p]);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white font-semibold text-xs shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            <Plus size={14} /> Generate Custom Report
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reportList.map((r) => (
          <Card
            key={r.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 transition-colors shadow-2xs"
          >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${C.green}18`, color: C.green }}
              >
                <FileBarChart2 size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-zinc-900 truncate">{r.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                  <span className="font-mono text-zinc-700 font-semibold">{r.machine}</span>
                  <span>·</span>
                  <span>{r.date}</span>
                  <span>·</span>
                  <span className="font-mono text-zinc-400">{r.size}</span>
                  <span>·</span>
                  <span className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 font-medium">
                    {r.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => setViewingReport(r)}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 font-semibold cursor-pointer"
              >
                <Eye size={12} /> Preview
              </button>

              <button
                onClick={() => handleDownload(r.id)}
                className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg font-bold text-white shadow-2xs transition-all cursor-pointer"
                style={{
                  background: downloadingId === r.id ? C.greenBright : C.green,
                }}
              >
                {downloadingId === r.id ? (
                  <>
                    <CheckCircle2 size={13} /> Downloading...
                  </>
                ) : (
                  <>
                    <Download size={13} /> PDF
                  </>
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Preview Modal */}
      {viewingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <Card className="max-w-xl w-full p-6 space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {viewingReport.type} REPORT
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-1">{viewingReport.title}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Asset: {viewingReport.machine} · Generated: {viewingReport.date}
                </p>
              </div>
              <button
                onClick={() => setViewingReport(null)}
                className="text-zinc-400 hover:text-zinc-700 text-xs px-2 py-1 rounded border cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 text-xs text-zinc-700 space-y-3 font-sans">
              <div className="font-bold text-zinc-900 border-b pb-1">
                Executive Multimodal Diagnosis Summary
              </div>
              <p>
                <strong>Diagnosis:</strong> Bearing Degradation (Outer race spall) detected on asset{" "}
                <strong>{viewingReport.machine}</strong>.
              </p>
              <p>
                <strong>Evidence Confidence:</strong> 91% Bayesian convergence across 4 modalities
                (CNN Vision, Acoustic FFT 380 Hz, ISO 10816 vibration peak 7.8 mm/s, and technician logs).
              </p>
              <p>
                <strong>Action Taken:</strong> SOP-004 Bearing replacement scheduled within 24-hour maintenance window.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(viewingReport.id)}
                className="flex-1 py-2 rounded-lg text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ background: C.green }}
              >
                <Download size={13} /> Download Formatted PDF
              </button>
              <button
                onClick={() => setViewingReport(null)}
                className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
