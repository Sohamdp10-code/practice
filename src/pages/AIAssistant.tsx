import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Cpu,
} from "lucide-react";
import { C } from "../lib/colors";
import { Card } from "../components/common/CommonComponents";
import { aiResponses } from "../data/mockData";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
  evidence?: string[];
  timestamp: string;
}

let messageCounter = 1;
const getNextId = (): string => {
  messageCounter += 1;
  return `msg-${messageCounter}-${Date.now()}`;
};

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hello Rajesh. I am your MITA Maintenance Copilot. I have live telemetry streams from 24 machines, recent multimodal fault diagnoses, and full RAG indexing on plant manuals.\n\nMachine **M-102 (CNC Motor Unit)** currently shows a **High Severity Bearing Fault (91% confidence)**. How can I assist you with this asset?",
      evidence: ["Edge Telemetry (M-102)", "Multimodal Fusion Engine", "SOP-004 Manual"],
      timestamp: "09:43 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Why is this machine failing?",
    "Explain the detected fault",
    "What should I inspect first?",
    "Show maintenance procedure",
    "Compare with previous failures",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: getNextId(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let responseText = aiResponses[query];
      if (!responseText) {
        responseText = `Based on active telemetry for M-102, bearing temperature is at 82°C (+14°C above baseline) and vibration amplitude is 7.8 mm/s.\n\nOur multimodal fusion model identifies progressive outer race spalling on Bearing #2. I recommend reviewing SOP-004 for replacement steps and confirming lubrication delivery.`;
      }

      const aiMsg: Message = {
        id: getNextId(),
        role: "ai",
        text: responseText,
        evidence: [
          "Sensor Telemetry (18 Aug 2026)",
          "Acoustic FFT (380 Hz)",
          "Machine History Log",
          "Maintenance Knowledge Base (SOP-004)",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSend("Why is this machine failing?");
      }, 2500);
    }
  };

  const renderFormattedText = (content: string) => {
    return content.split("\n").map((line, idx) => {
      if (line.startsWith("|")) {
        return (
          <div key={idx} className="font-mono text-xs overflow-x-auto py-0.5 text-zinc-700">
            {line}
          </div>
        );
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 text-xs text-zinc-700">
            <span className="text-emerald-700 font-bold">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <div key={idx} className="font-bold text-xs text-zinc-900 mt-2 mb-1">
            {line.replace(/\*\*/g, "")}
          </div>
        );
      }
      return (
        <p key={idx} className={`text-xs leading-relaxed text-zinc-700 ${line === "" ? "h-2" : ""}`}>
          {line.replace(/\*\*(.*?)\*\*/g, "$1")}
        </p>
      );
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto h-[calc(100vh-60px)] flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Maintenance AI Copilot
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              RAG & Diagnostics Active
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Ask technical questions, query fault mechanics, or request step-by-step repair guidance
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-mono text-[11px]">
            <Cpu size={13} className="text-emerald-600" />
            <span>Target Context: M-102 (CNC Motor)</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <Card className="flex-1 overflow-y-auto p-4 space-y-4 border border-zinc-200 bg-zinc-50/40 shadow-inner">
        {messages.map((m) => {
          const isAI = m.role === "ai";
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isAI ? "" : "ml-auto flex-row-reverse"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-2xs ${
                  isAI
                    ? "bg-emerald-700 text-white"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {isAI ? <Bot size={16} /> : "RK"}
              </div>

              {/* Message bubble */}
              <div className="space-y-1.5 max-w-[85%]">
                <div
                  className={`p-4 rounded-xl text-xs shadow-2xs border ${
                    isAI
                      ? "bg-white border-zinc-200/80 rounded-tl-sm"
                      : "bg-emerald-700 text-white border-emerald-800 rounded-tr-sm"
                  }`}
                >
                  {isAI ? (
                    renderFormattedText(m.text)
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  )}
                </div>

                {/* Evidence sources tags for AI responses */}
                {isAI && m.evidence && (
                  <div className="flex flex-wrap items-center gap-1.5 px-1">
                    <span className="text-[10px] font-semibold text-zinc-400">Sources:</span>
                    {m.evidence.map((src) => (
                      <span
                        key={src}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-mono font-medium"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                )}
                <div className={`text-[10px] text-zinc-400 px-1 ${isAI ? "" : "text-right"}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-700 text-white flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3.5 rounded-xl rounded-tl-sm bg-white border border-zinc-200 flex items-center gap-2 shadow-2xs">
              <span className="text-xs text-zinc-500 font-medium">Synthesizing evidence...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse-dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse-dot-2" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* Voice Waveform Overlay during recording */}
      {isListening && (
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
            <Mic size={16} className="animate-bounce" />
            <span>Listening to technician voice query... ("Why is this machine failing?")</span>
          </div>
          <div className="flex items-center gap-1">
            {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-red-500 rounded-full"
                style={{ height: `${h}%`, minHeight: 12 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0">
        <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1 whitespace-nowrap pl-1">
          <Sparkles size={12} className="text-emerald-600" /> Suggested:
        </span>
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:border-emerald-500 hover:bg-emerald-50/40 hover:text-emerald-800 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-300 bg-white shadow-2xs flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask a technical question about M-102 (e.g. 'What is the torque spec for SKF 6308?')..."
          className="flex-1 text-xs px-2.5 py-1.5 outline-none text-zinc-800 placeholder-zinc-400 bg-transparent"
        />

        <button
          onClick={handleVoiceToggle}
          className={`p-2 rounded-lg transition-all cursor-pointer ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          }`}
          title="Voice query"
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        <button
          onClick={() => handleSend()}
          className="p-2 rounded-lg text-white transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
          style={{ background: C.green }}
          title="Send query"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
