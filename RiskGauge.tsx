import React from 'react';
import { RiskLevel } from '../types/agri';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskGaugeProps {
  score: number; // 0 to 100
  level: RiskLevel;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level }) => {
  // Semi-circle gauge math
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = -180 + (clampedScore / 100) * 180;

  const radius = 70;
  const strokeWidth = 12;
  const center = 90;

  const needleLength = 58;
  const needleRad = (angle * Math.PI) / 180;
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);

  const getLevelColor = () => {
    switch (level) {
      case 'SEVERE':
        return '#f43f5e';
      case 'HIGH':
        return '#f97316';
      case 'MODERATE':
        return '#fbbf24';
      case 'LOW':
      default:
        return '#10b981';
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3 flex flex-col items-center justify-between text-center relative">
      <div className="w-full flex items-center justify-between text-[10px] text-stone-400 mb-0.5">
        <span className="font-semibold uppercase tracking-wider font-mono">
          Severity Dial
        </span>
        <span className="font-mono text-stone-500">
          0-100
        </span>
      </div>

      {/* Compact SVG Radial Gauge */}
      <div className="relative w-40 h-22 my-0.5 flex items-center justify-center">
        <svg viewBox="0 0 180 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="#292524"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active colored arc */}
          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            stroke="#f5f5f4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Center Pivot Point */}
          <circle cx={center} cy={center} r="5" fill="#1c1917" stroke="#f5f5f4" strokeWidth="2" />
        </svg>

        {/* Center Readout in arc */}
        <div className="absolute bottom-0 text-center">
          <span className="text-xl font-black font-mono tracking-tight text-stone-100">
            {score}
          </span>
          <span className="text-[9px] text-stone-400 block font-mono">INDEX</span>
        </div>
      </div>

      {/* Threat Level Badge */}
      <div className="w-full mt-1.5 pt-1.5 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
        <span className="text-stone-400 text-[10px]">Threat Level:</span>
        <span
          className="font-bold text-[10px] px-2 py-0.2 rounded uppercase tracking-wider font-mono"
          style={{
            backgroundColor: `${getLevelColor()}20`,
            color: getLevelColor(),
            border: `1px solid ${getLevelColor()}50`,
          }}
        >
          {level}
        </span>
      </div>
    </div>
  );
};
