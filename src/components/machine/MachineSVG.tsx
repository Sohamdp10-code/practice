import React, { useState } from "react";
import { C } from "../../lib/colors";
import type { Machine } from "../../data/mockData";

interface MachineSVGProps {
  machine: Machine;
  activeComponent?: string | null;
  onSelectComponent?: (comp: string) => void;
}

export const MachineSVG: React.FC<MachineSVGProps> = ({
  machine,
  activeComponent,
  onSelectComponent,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const isWarningOrCritical = machine.status !== "HEALTHY";

  const handleComponentClick = (name: string) => {
    if (onSelectComponent) {
      onSelectComponent(name);
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg
        viewBox="0 0 440 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[300px] select-none"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="diagGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8E5" strokeWidth="0.75" />
          </pattern>
          {/* Linear gradient for metal casing */}
          <linearGradient id="metalCasing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F4F3" />
            <stop offset="100%" stopColor="#D9E2DE" />
          </linearGradient>
          {/* Rotor gradient */}
          <linearGradient id="rotorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CAD5D0" />
            <stop offset="50%" stopColor="#E5ECE9" />
            <stop offset="100%" stopColor="#B6C4BF" />
          </linearGradient>
          {/* Warning pulsing glow */}
          <radialGradient id="faultGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.orange} stopOpacity="0.8" />
            <stop offset="60%" stopColor={C.orange} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Blueprint background grid */}
        <rect x="0" y="0" width="440" height="260" fill="url(#diagGrid)" rx="8" />

        {/* Mounting Base Plate */}
        <rect
          x="30"
          y="200"
          width="380"
          height="14"
          rx="3"
          fill="#333D39"
          stroke="#202522"
          strokeWidth="1.5"
        />
        {/* Foundation Mount Bolts */}
        <circle cx="55" cy="207" r="3.5" fill="#72807B" />
        <circle cx="160" cy="207" r="3.5" fill="#72807B" />
        <circle cx="280" cy="207" r="3.5" fill="#72807B" />
        <circle cx="385" cy="207" r="3.5" fill="#72807B" />

        {/* Stator Frame / Main Motor Housing */}
        <g
          className="cursor-pointer transition-opacity hover:opacity-95"
          onClick={() => handleComponentClick("Motor Housing")}
          onMouseEnter={() => setHovered("Motor Housing")}
          onMouseLeave={() => setHovered(null)}
        >
          <rect
            x="50"
            y="65"
            width="170"
            height="135"
            rx="6"
            fill="url(#metalCasing)"
            stroke={hovered === "Motor Housing" || activeComponent === "Motor Housing" ? C.greenBright : "#9EAEA7"}
            strokeWidth={hovered === "Motor Housing" || activeComponent === "Motor Housing" ? 2.5 : 1.5}
          />
          {/* Cooling Fins */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={62 + i * 18}
              y="52"
              width="10"
              height="13"
              rx="1.5"
              fill="#BAC8C2"
              stroke="#9EAEA7"
              strokeWidth="1"
            />
          ))}
          <text
            x="135"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.text}
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            letterSpacing="0.5"
          >
            STATOR / MOTOR
          </text>
          <text
            x="135"
            y="148"
            textAnchor="middle"
            fontSize="9.5"
            fill={C.textSec}
            fontFamily="Inter, sans-serif"
          >
            {machine.rpm} RPM · {machine.temp}°C
          </text>
        </g>

        {/* Terminal Box */}
        <rect
          x="100"
          y="35"
          width="70"
          height="18"
          rx="2"
          fill="#53605B"
          stroke="#39423E"
          strokeWidth="1"
        />
        <text
          x="135"
          y="48"
          textAnchor="middle"
          fontSize="8"
          fill="#FFF"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          POWER 415V
        </text>

        {/* Drive Shaft */}
        <g
          className="cursor-pointer"
          onClick={() => handleComponentClick("Drive Shaft")}
          onMouseEnter={() => setHovered("Drive Shaft")}
          onMouseLeave={() => setHovered(null)}
        >
          <rect
            x="220"
            y="122"
            width="155"
            height="26"
            rx="2"
            fill="url(#rotorGrad)"
            stroke={hovered === "Drive Shaft" || activeComponent === "Drive Shaft" ? C.greenBright : "#8A9C95"}
            strokeWidth={hovered === "Drive Shaft" || activeComponent === "Drive Shaft" ? 2 : 1.5}
          />
          {/* Keyway */}
          <line x1="330" y1="126" x2="365" y2="126" stroke="#687771" strokeWidth="2" />
        </g>

        {/* Bearing #1 (Drive-End Inner) */}
        <g
          className="cursor-pointer"
          onClick={() => handleComponentClick("Bearing #1")}
          onMouseEnter={() => setHovered("Bearing #1")}
          onMouseLeave={() => setHovered(null)}
        >
          <rect
            x="235"
            y="102"
            width="28"
            height="66"
            rx="4"
            fill="#D3DED9"
            stroke={hovered === "Bearing #1" || activeComponent === "Bearing #1" ? C.greenBright : "#92A49D"}
            strokeWidth={hovered === "Bearing #1" || activeComponent === "Bearing #1" ? 2 : 1.5}
          />
          <circle cx="249" cy="120" r="4.5" fill="#8EA099" />
          <circle cx="249" cy="135" r="4.5" fill="#8EA099" />
          <circle cx="249" cy="150" r="4.5" fill="#8EA099" />
          <text
            x="249"
            y="180"
            textAnchor="middle"
            fontSize="8.5"
            fill={C.textSec}
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            BRG-1
          </text>
        </g>

        {/* Bearing #2 (Outboard Bearing - Fault Anomaly Zone) */}
        <g
          className="cursor-pointer"
          onClick={() => handleComponentClick("Bearing #2")}
          onMouseEnter={() => setHovered("Bearing #2")}
          onMouseLeave={() => setHovered(null)}
        >
          {isWarningOrCritical && (
            <>
              {/* Radial Warning Halo */}
              <circle cx="320" cy="135" r="32" fill="url(#faultGlow)" />
              <circle
                cx="320"
                cy="135"
                r="28"
                fill="none"
                stroke={C.orange}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-spin"
                style={{ transformOrigin: "320px 135px", animationDuration: "12s" }}
              />
            </>
          )}

          <rect
            x="306"
            y="102"
            width="28"
            height="66"
            rx="4"
            fill={isWarningOrCritical ? "#FFF4EB" : "#D3DED9"}
            stroke={
              isWarningOrCritical
                ? C.orange
                : hovered === "Bearing #2" || activeComponent === "Bearing #2"
                ? C.greenBright
                : "#92A49D"
            }
            strokeWidth={isWarningOrCritical ? 2.5 : 1.5}
          />
          <circle cx="320" cy="120" r="4.5" fill={isWarningOrCritical ? C.orange : "#8EA099"} />
          <circle cx="320" cy="135" r="4.5" fill={isWarningOrCritical ? C.orange : "#8EA099"} />
          <circle cx="320" cy="150" r="4.5" fill={isWarningOrCritical ? C.orange : "#8EA099"} />

          <text
            x="320"
            y="180"
            textAnchor="middle"
            fontSize="8.5"
            fill={isWarningOrCritical ? C.orange : C.textSec}
            fontFamily="Inter, sans-serif"
            fontWeight={isWarningOrCritical ? "700" : "500"}
          >
            BRG-2 {isWarningOrCritical ? "(FAULT)" : ""}
          </text>

          {isWarningOrCritical && (
            <g transform="translate(310, 78)">
              <rect x="0" y="0" width="20" height="18" rx="3" fill={C.orange} />
              <text x="10" y="13" textAnchor="middle" fontSize="12" fill="#FFF" fontWeight="bold">
                !
              </text>
            </g>
          )}
        </g>

        {/* Coupling Flange */}
        <rect
          x="375"
          y="112"
          width="16"
          height="46"
          rx="2"
          fill="#4A5652"
          stroke="#2A3330"
          strokeWidth="1.5"
        />

        {/* Real-time Telemetry Callout Overlay */}
        <g transform="translate(340, 20)">
          <rect x="0" y="0" width="90" height="34" rx="4" fill="#FFFFFF" stroke={C.border} strokeWidth="1" />
          <text x="8" y="14" fontSize="8" fill={C.textSec} fontFamily="Inter, sans-serif">VIB PEAK</text>
          <text
            x="8"
            y="27"
            fontSize="11"
            fill={machine.vibration > 6 ? C.orange : C.green}
            fontFamily="Inter, sans-serif"
            fontWeight="bold"
          >
            {machine.vibration} mm/s
          </text>
        </g>
      </svg>
    </div>
  );
};
