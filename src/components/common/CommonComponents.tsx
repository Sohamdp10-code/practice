import React from "react";
import { C } from "../../lib/colors";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = "", style = {}, ...props }) => (
  <div
    className={`bg-white rounded-xl border transition-shadow ${className}`}
    style={{ borderColor: C.border, ...style }}
    {...props}
  >
    {children}
  </div>
);

interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, sub, className = "" }) => (
  <div className={`mb-3 ${className}`}>
    <h2 className="text-sm font-semibold tracking-tight" style={{ color: C.text }}>
      {children}
    </h2>
    {sub && <p className="text-xs mt-0.5" style={{ color: C.textSec }}>{sub}</p>}
  </div>
);

interface HealthBarProps {
  value: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({ value }) => {
  const color = value >= 80 ? C.greenBright : value >= 60 ? C.orange : C.red;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
        />
      </div>
      <span className="text-xs font-semibold w-9 text-right" style={{ color }}>
        {value}%
      </span>
    </div>
  );
};

interface MetricValueProps {
  value: string | number;
  unit?: string;
  color?: string;
}

export const MetricValue: React.FC<MetricValueProps> = ({ value, unit, color }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-2xl font-bold tracking-tight" style={{ color: color || C.text }}>
      {value}
    </span>
    {unit && (
      <span className="text-xs font-normal" style={{ color: C.textSec }}>
        {unit}
      </span>
    )}
  </div>
);
