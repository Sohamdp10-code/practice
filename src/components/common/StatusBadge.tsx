import React from "react";
import type { StatusType } from "../../lib/colors";

interface StatusBadgeProps {
  status: StatusType | string;
  size?: "sm" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const cfg: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    HEALTHY: { bg: "#DCFCE7", text: "#166534", dot: "#22C55E", label: "Healthy" },
    WARNING: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B", label: "Warning" },
    CRITICAL: { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444", label: "Critical" },
    OFFLINE: { bg: "#F3F4F6", text: "#374151", dot: "#9CA3AF", label: "Offline" },
    MAINTENANCE: { bg: "#FEF3C7", text: "#78350F", dot: "#F59E0B", label: "Maintenance" },
    RUNNING: { bg: "#DCFCE7", text: "#166534", dot: "#22C55E", label: "Running" },
    COMPLETED: { bg: "#DCFCE7", text: "#166534", dot: "#22C55E", label: "Completed" },
    RESOLVED: { bg: "#E0F2FE", text: "#0369A1", dot: "#0EA5E9", label: "Resolved" },
  };

  const c = cfg[status] || cfg.OFFLINE;
  const px = size === "lg" ? "px-3 py-1 text-xs font-semibold" : "px-2 py-0.5 text-xs font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${px}`}
      style={{ background: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
};
