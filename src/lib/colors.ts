// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const C = {
  bg: "#F4F6F5",
  card: "#FFFFFF",
  text: "#171A19",
  textSec: "#66706C",
  green: "#1F7A4D",
  greenBright: "#2DBE78",
  orange: "#F28C28",
  red: "#D64545",
  border: "#DDE3E0",
  dark: "#202522",
  darkMid: "#2C3030",
  darkLight: "#38403D",
} as const;

export type StatusType =
  | "HEALTHY"
  | "WARNING"
  | "CRITICAL"
  | "OFFLINE"
  | "MAINTENANCE"
  | "RUNNING"
  | "COMPLETED"
  | "RESOLVED";

export type PriorityType = "HIGH" | "MEDIUM" | "LOW";
