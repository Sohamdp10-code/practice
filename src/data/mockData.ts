import type { StatusType, PriorityType } from "../lib/colors";

// ─── TYPES ──────────────────────────────────────────────────────────────────────
export interface Machine {
  id: string;
  name: string;
  type: string;
  status: StatusType;
  health: number;
  faults: number;
  lastMaint: string;
  location: string;
  rpm: number;
  temp: number;
  vibration: number;
}

export interface Alert {
  id: number;
  sev: "CRITICAL" | "WARNING";
  machine: string;
  name: string;
  msg: string;
  time: string;
  ts: string;
  action: string;
}

export interface MaintenanceTask {
  machine: string;
  component: string;
  task: string;
  priority: PriorityType;
  due: string;
  est: string;
}

export interface HistoryEntry {
  date: string;
  machine: string;
  task: string;
  status: StatusType;
  tech: string;
  notes: string;
}

export interface KnowledgeDoc {
  id: number;
  title: string;
  type: string;
  pages: number;
  indexed: boolean;
  updated: string;
  tags: string[];
}

export interface Report {
  id: number;
  title: string;
  machine: string;
  date: string;
  type: string;
  size: string;
}

export interface SensorReading {
  time: string;
  temp: number;
  vibration: number;
  rpm: number;
}

export interface EvidenceItem {
  modality: string;
  icon: string;
  color: string;
  conf: number;
  finding: string;
  status: StatusType;
}

// ─── MACHINES ───────────────────────────────────────────────────────────────────
export const machines: Machine[] = [
  { id: "M-101", name: "Industrial Motor #1", type: "Motor", status: "HEALTHY", health: 96, faults: 0, lastMaint: "12 Aug 2026", location: "Bay A", rpm: 1480, temp: 68, vibration: 3.2 },
  { id: "M-102", name: "CNC Motor Unit", type: "Motor", status: "WARNING", health: 72, faults: 2, lastMaint: "04 Aug 2026", location: "Bay B", rpm: 1465, temp: 82, vibration: 7.8 },
  { id: "M-103", name: "Hydraulic Pump #1", type: "Pump", status: "CRITICAL", health: 41, faults: 4, lastMaint: "28 Jul 2026", location: "Bay C", rpm: 960, temp: 94, vibration: 11.2 },
  { id: "M-104", name: "Conveyor Drive", type: "Drive", status: "HEALTHY", health: 88, faults: 0, lastMaint: "10 Aug 2026", location: "Line 1", rpm: 720, temp: 54, vibration: 2.8 },
  { id: "M-105", name: "Compressor Unit", type: "Compressor", status: "WARNING", health: 79, faults: 1, lastMaint: "06 Aug 2026", location: "Bay D", rpm: 1200, temp: 76, vibration: 5.4 },
  { id: "M-106", name: "Industrial Motor #2", type: "Motor", status: "HEALTHY", health: 94, faults: 0, lastMaint: "14 Aug 2026", location: "Bay A", rpm: 1480, temp: 65, vibration: 2.9 },
  { id: "M-107", name: "Cooling Tower Fan", type: "Fan", status: "WARNING", health: 83, faults: 1, lastMaint: "01 Aug 2026", location: "Roof", rpm: 650, temp: 48, vibration: 4.1 },
  { id: "M-108", name: "Hydraulic Pump #2", type: "Pump", status: "HEALTHY", health: 91, faults: 0, lastMaint: "15 Aug 2026", location: "Bay C", rpm: 960, temp: 58, vibration: 3.5 },
];

// ─── ALERTS ─────────────────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id: 1, sev: "CRITICAL", machine: "M-103", name: "Hydraulic Pump #1", msg: "Bearing temperature exceeded safe threshold (94°C). Immediate inspection required.", time: "2 min ago", ts: "18 Aug 2026 09:41", action: "Inspect bearing assembly and check lubrication" },
  { id: 2, sev: "WARNING", machine: "M-102", name: "CNC Motor Unit", msg: "Abnormal vibration detected (7.8 mm/s). Possible bearing degradation.", time: "18 min ago", ts: "18 Aug 2026 09:25", action: "Schedule bearing inspection within 24 hours" },
  { id: 3, sev: "WARNING", machine: "M-107", name: "Cooling Tower Fan", msg: "Maintenance interval exceeded. Last service was 17 days ago.", time: "2 hr ago", ts: "18 Aug 2026 07:43", action: "Perform routine maintenance inspection" },
  { id: 4, sev: "WARNING", machine: "M-105", name: "Compressor Unit", msg: "Oil pressure slightly below nominal range (4.2 bar vs 5.0 bar target).", time: "4 hr ago", ts: "18 Aug 2026 05:31", action: "Check oil level and inspect pressure relief valve" },
  { id: 5, sev: "CRITICAL", machine: "M-103", name: "Hydraulic Pump #1", msg: "Vibration amplitude increasing trend detected. Risk of catastrophic failure.", time: "6 hr ago", ts: "18 Aug 2026 03:22", action: "Halt machine operation if vibration exceeds 12 mm/s" },
];

// ─── MAINTENANCE ────────────────────────────────────────────────────────────────
export const maintenance: MaintenanceTask[] = [
  { machine: "M-102", component: "Bearing #2", task: "Bearing Inspection & Replacement", priority: "HIGH", due: "20 Aug 2026", est: "2.5 hr" },
  { machine: "M-107", component: "Cooling System", task: "Fan Blade Cleaning & Balance Check", priority: "MEDIUM", due: "22 Aug 2026", est: "1.5 hr" },
  { machine: "M-103", component: "Hydraulic Seals", task: "Seal Replacement", priority: "HIGH", due: "19 Aug 2026", est: "3.0 hr" },
  { machine: "M-104", component: "Motor", task: "Lubrication & Belt Inspection", priority: "LOW", due: "25 Aug 2026", est: "1.0 hr" },
  { machine: "M-105", component: "Compressor", task: "Oil Change & Filter Replacement", priority: "MEDIUM", due: "23 Aug 2026", est: "2.0 hr" },
];

// ─── HISTORY ────────────────────────────────────────────────────────────────────
export const history: HistoryEntry[] = [
  { date: "18 Aug 2026", machine: "M-102", task: "AI Fault Diagnosis – Bearing Degradation", status: "COMPLETED", tech: "Rajesh Kumar", notes: "Diagnosis initiated via multimodal analysis. Bearing #2 flagged." },
  { date: "12 Aug 2026", machine: "M-101", task: "Routine Lubrication", status: "COMPLETED", tech: "Priya Sharma", notes: "All bearings lubricated. No anomalies detected." },
  { date: "10 Aug 2026", machine: "M-104", task: "Belt Tension Adjustment", status: "COMPLETED", tech: "Arjun Mehta", notes: "Drive belt re-tensioned to 850 N. Vibration reduced." },
  { date: "04 Aug 2026", machine: "M-102", task: "Vibration Anomaly Investigation", status: "RESOLVED", tech: "Rajesh Kumar", notes: "Increased vibration traced to loose coupling. Tightened and monitored." },
  { date: "28 Jul 2026", machine: "M-103", task: "Hydraulic Seal Inspection", status: "COMPLETED", tech: "Priya Sharma", notes: "Minor seal wear detected. Scheduled replacement for next service." },
  { date: "22 Jul 2026", machine: "M-106", task: "Routine Motor Inspection", status: "COMPLETED", tech: "Arjun Mehta", notes: "Motor windings checked, insulation resistance within spec." },
];

// ─── KNOWLEDGE BASE ─────────────────────────────────────────────────────────────
export const knowledgeDocs: KnowledgeDoc[] = [
  { id: 1, title: "Industrial Motor Maintenance Manual", type: "Manual", pages: 142, indexed: true, updated: "15 Aug 2026", tags: ["motor", "lubrication", "bearing"] },
  { id: 2, title: "Bearing Failure Diagnosis Guide", type: "Guide", pages: 68, indexed: true, updated: "10 Aug 2026", tags: ["bearing", "vibration", "wear"] },
  { id: 3, title: "CNC Machine Maintenance SOP", type: "SOP", pages: 94, indexed: true, updated: "08 Aug 2026", tags: ["cnc", "motor", "calibration"] },
  { id: 4, title: "Industrial Safety Standards Manual", type: "Safety", pages: 210, indexed: true, updated: "01 Aug 2026", tags: ["safety", "ppe", "lockout"] },
  { id: 5, title: "Hydraulic Pump Troubleshooting Guide", type: "Guide", pages: 55, indexed: true, updated: "12 Aug 2026", tags: ["hydraulic", "pump", "pressure"] },
  { id: 6, title: "Vibration Analysis Handbook", type: "Reference", pages: 88, indexed: false, updated: "18 Aug 2026", tags: ["vibration", "fft", "analysis"] },
];

// ─── REPORTS ────────────────────────────────────────────────────────────────────
export const reports: Report[] = [
  { id: 1, title: "Bearing Fault Diagnosis Report – M-102", machine: "M-102", date: "18 Aug 2026", type: "Fault", size: "1.2 MB" },
  { id: 2, title: "Monthly Maintenance Summary", machine: "All", date: "17 Aug 2026", type: "Maintenance", size: "3.4 MB" },
  { id: 3, title: "Critical Alert Report – M-103", machine: "M-103", date: "17 Aug 2026", type: "Alert", size: "0.8 MB" },
  { id: 4, title: "Sensor Anomaly Analysis – M-102", machine: "M-102", date: "15 Aug 2026", type: "Sensor", size: "2.1 MB" },
];

// ─── SENSOR DATA GENERATOR ─────────────────────────────────────────────────────
export const generateSensorData = (): SensorReading[] =>
  Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    temp: 72 + Math.sin(i / 4) * 6 + (i > 18 ? 8 : 0) + Math.random() * 2,
    vibration: 4.2 + Math.sin(i / 3) * 1.5 + (i > 20 ? 3 : 0) + Math.random() * 0.5,
    rpm: 1480 + (Math.random() - 0.5) * 20,
  }));

export const sensorData: SensorReading[] = generateSensorData();

// ─── AI RESPONSES ───────────────────────────────────────────────────────────────
export const aiResponses: Record<string, string> = {
  "Why is this machine failing?": `Based on multimodal analysis of M-102, the primary cause is **bearing degradation** in Bearing #2.\n\nKey evidence:\n• Vibration amplitude of **7.8 mm/s** (31% above baseline)\n• Surface temperature elevated to **82°C** (+18% above nominal)\n• Acoustic analysis detected high-frequency signatures at 340–420 Hz consistent with bearing spalling\n• Technician reports grinding noise during operation\n\nAll four data modalities converge on the same diagnosis with **91% confidence**.`,

  "Explain the detected fault": `The detected fault is **Bearing Degradation** – specifically, progressive surface spalling on the outer race of Bearing #2 in the CNC Motor Unit (M-102).\n\n**Mechanism:** Metal fatigue caused by repeated stress cycles leads to micro-cracks in the bearing surface. These cracks propagate, causing material to break away (spalling). This produces:\n• Increased friction → elevated temperature\n• Impact forces → elevated vibration\n• Characteristic acoustic signature\n\n**Stage:** Based on current evidence, the bearing is in Stage 2–3 of a 4-stage failure progression. Replacement within 24 hours is recommended.`,

  "What should I inspect first?": `Recommended inspection sequence for M-102:\n\n**1. Bearing #2 (Priority: Immediate)**\n   Visually inspect for discoloration, pitting, or debris in the housing\n\n**2. Lubrication System**\n   Check grease condition and quantity. Look for contamination or darkening\n\n**3. Shaft Alignment**\n   Verify coupling alignment – misalignment accelerates bearing wear\n\n**4. Vibration Isolation Mounts**\n   Check for wear or hardening that could transmit excessive load\n\nBegin with the bearing inspection since that is where all evidence currently points.`,

  "Show maintenance procedure": `**Bearing Replacement Procedure for M-102:**\n\n01. **SAFETY** – Isolate power at MCC panel. Apply lockout/tagout per Safety SOP-004\n02. **SHUTDOWN** – Confirm motor has reached rest. Check with tachometer\n03. **ACCESS** – Remove motor end-cover. Photograph condition before disassembly\n04. **EXTRACTION** – Use bearing puller to remove Bearing #2. Do not hammer\n05. **INSPECTION** – Examine shaft surface, housing bore, and old bearing for wear patterns\n06. **CLEANING** – Clean housing bore. Remove all old grease and metal particles\n07. **INSTALLATION** – Press-fit new SKF 6308 bearing. Apply specified grease (80 g)\n08. **REASSEMBLY** – Reinstall end-cover. Torque bolts to 45 Nm per spec\n09. **VERIFICATION** – Run at low load for 15 min. Monitor vibration (<4.5 mm/s) and temp\n10. **DOCUMENTATION** – Record work in maintenance log. Update maintenance schedule`,

  "Compare with previous failures": `**Historical Bearing Failures on Similar Motors:**\n\n| Machine | Date | Fault | Resolution | Downtime |\n|---------|------|-------|-----------|----------|\n| M-102 | Aug 2026 | Bearing #2 spalling | *Current* | TBD |\n| M-102 | Jan 2025 | Bearing #1 wear | Replaced | 3.5 hr |\n| M-106 | Oct 2024 | Bearing overheating | Re-lubricated | 1.0 hr |\n| M-101 | Mar 2024 | Bearing failure | Replaced | 4.0 hr |\n\n**Pattern observed:** M-102 has had bearing issues twice in 18 months. Recommend reviewing lubrication intervals and checking for possible misalignment causing accelerated wear.`,
};

// ─── DIAGNOSIS DATA ─────────────────────────────────────────────────────────────
export const diagnosisProcedure = [
  "Isolate power supply and apply lockout/tagout (Safety SOP-004)",
  "Allow motor to reach complete rest state. Verify with tachometer",
  "Remove motor end-cover. Photograph internal condition",
  "Extract Bearing #2 using appropriate bearing puller — do not use impact",
  "Inspect shaft surface and housing bore for secondary damage",
  "Clean bearing housing, removing all old grease and metallic particles",
  "Press-fit new SKF 6308 bearing. Apply specified grease (80 g per spec)",
  "Reinstall end-cover. Torque fasteners to 45 Nm",
  "Run motor at low load for 15 minutes. Verify vibration < 4.5 mm/s",
];

// ─── NAV CONFIG ─────────────────────────────────────────────────────────────────
export interface NavItem {
  icon: string;
  label: string;
  page: string;
  badge?: number;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  { section: "MAIN", items: [{ icon: "LayoutDashboard", label: "Dashboard", page: "dashboard" }] },
  {
    section: "MONITORING",
    items: [
      { icon: "Cpu", label: "Machines", page: "machines" },
      { icon: "Activity", label: "Live Sensors", page: "sensors" },
      { icon: "Bell", label: "Alerts", page: "alerts", badge: 3 },
    ],
  },
  {
    section: "AI",
    items: [
      { icon: "Stethoscope", label: "Diagnosis", page: "diagnosis" },
      { icon: "Bot", label: "AI Assistant", page: "assistant" },
    ],
  },
  {
    section: "MAINTENANCE",
    items: [
      { icon: "Wrench", label: "Maintenance", page: "maintenance" },
      { icon: "History", label: "History", page: "history" },
    ],
  },
  {
    section: "KNOWLEDGE",
    items: [{ icon: "BookOpen", label: "Knowledge Base", page: "knowledge" }],
  },
  {
    section: "REPORTS",
    items: [{ icon: "FileText", label: "Reports", page: "reports" }],
  },
];
