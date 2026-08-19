import React from "react";
import type { PriorityType } from "../../lib/colors";

interface PriorityBadgeProps {
  priority: PriorityType;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const cfg: Record<PriorityType, { bg: string; text: string }> = {
    HIGH: { bg: "#FEE2E2", text: "#991B1B" },
    MEDIUM: { bg: "#FEF3C7", text: "#92400E" },
    LOW: { bg: "#DCFCE7", text: "#166534" },
  };

  const c = cfg[priority] || cfg.LOW;

  return (
    <span
      className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
      style={{ background: c.bg, color: c.text }}
    >
      {priority}
    </span>
  );
};
