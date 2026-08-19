import React, { useState } from "react";
import { Search, Upload, CheckCircle2, ArrowUpRight } from "lucide-react";
import { C } from "../lib/colors";
import { Card } from "../components/common/CommonComponents";
import { knowledgeDocs } from "../data/mockData";
import type { KnowledgeDoc } from "../data/mockData";

export const KnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState<KnowledgeDoc[]>(knowledgeDocs);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(null);

  const filteredDocs = docs.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const typeBadgeColors: Record<string, { bg: string; text: string }> = {
    Manual: { bg: "#7C3AED18", text: "#7C3AED" },
    Guide: { bg: "#16A34A18", text: "#16A34A" },
    SOP: { bg: "#F28C2818", text: "#D97706" },
    Safety: { bg: "#D6454518", text: "#DC2626" },
    Reference: { bg: "#0EA5E918", text: "#0284C7" },
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-zinc-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Knowledge Base & RAG Repository
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Vector Index Ready
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Technical manuals, OEM specs, safety standards, and standard operating procedures (SOP) indexed for AI Copilot
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newDoc: KnowledgeDoc = {
                id: docs.length + 1,
                title: "Siemens SIMOTICS S-1FK7 Motor Service Manual",
                type: "Manual",
                pages: 184,
                indexed: true,
                updated: "Today",
                tags: ["servo", "motor", "stator", "siemens"],
              };
              setDocs((p) => [newDoc, ...p]);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white font-semibold text-xs shadow-2xs transition-opacity hover:opacity-90 cursor-pointer"
            style={{ background: C.green }}
          >
            <Upload size={14} /> Upload OEM Manual
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-zinc-50/50"
          style={{ borderColor: C.border }}
        >
          <Search size={15} className="text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search manuals, guides, SOP codes, or semantic tags (e.g. 'bearing', 'torque')..."
            className="text-xs bg-transparent outline-none w-full text-zinc-800 placeholder-zinc-400"
          />
        </div>
      </Card>

      {/* Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const badge = typeBadgeColors[doc.type] || { bg: "#F3F4F6", text: "#374151" };
          return (
            <Card
              key={doc.id}
              className="p-4.5 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {doc.type}
                  </span>

                  {doc.indexed ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 size={13} /> Indexed in RAG
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-400 font-medium">Indexing...</span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1">
                  {doc.title}
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono mb-3">
                  {doc.pages} pages · Last sync {doc.updated}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-mono font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  View Document Summary <ArrowUpRight size={12} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal Preview Simulation */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <Card className="max-w-lg w-full p-6 space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {selectedDoc.type}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-1">{selectedDoc.title}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {selectedDoc.pages} Pages · Fully Indexed for Multimodal Copilot
                </p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-zinc-400 hover:text-zinc-700 text-xs px-2 py-1 rounded border cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200 text-xs text-zinc-700 space-y-2 font-mono">
              <div className="font-bold text-zinc-800">RAG Chunking Summary:</div>
              <p>• 42 semantic embeddings vectors stored in FAISS database.</p>
              <p>• Associated with assets: Motor M-101, M-102, M-106.</p>
              <p>• Key topics: SKF bearing tolerances, ISO 10816 vibration limits, grease volume specs.</p>
            </div>

            <button
              onClick={() => setSelectedDoc(null)}
              className="w-full py-2 rounded-lg text-white font-semibold text-xs cursor-pointer"
              style={{ background: C.green }}
            >
              Done
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};
