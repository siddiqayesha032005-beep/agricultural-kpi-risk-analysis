import React, { useState } from 'react';
import { KRIItem, RiskLevel } from '../types/agri';
import { AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface RiskMatrixProps {
  kris: KRIItem[];
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ kris }) => {
  const [selectedKri, setSelectedKri] = useState<KRIItem | null>(kris[0] || null);

  const getCellRiskLevel = (impact: number, likelihood: number): RiskLevel => {
    const score = impact * likelihood;
    if (score >= 15) return 'SEVERE';
    if (score >= 9) return 'HIGH';
    if (score >= 4) return 'MODERATE';
    return 'LOW';
  };

  const getCellColor = (level: RiskLevel) => {
    switch (level) {
      case 'SEVERE':
        return 'bg-rose-950/60 border-rose-900/50 hover:bg-rose-900/70 text-rose-300';
      case 'HIGH':
        return 'bg-orange-950/50 border-orange-900/50 hover:bg-orange-900/60 text-orange-300';
      case 'MODERATE':
        return 'bg-amber-950/40 border-amber-900/40 hover:bg-amber-900/50 text-amber-300';
      case 'LOW':
      default:
        return 'bg-emerald-950/30 border-emerald-900/40 hover:bg-emerald-900/40 text-emerald-300';
    }
  };

  const impactLabels = ['1. Negligible', '2. Minor', '3. Moderate', '4. Severe', '5. Catastrophic'];
  const likelihoodLabels = ['5. Almost Certain', '4. Likely', '3. Possible', '2. Unlikely', '1. Rare'];

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3.5 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            5×5 Agricultural Risk Assessment Matrix
          </h3>
          <p className="text-[11px] text-stone-400">
            Likelihood vs Impact mapping for detected hazards
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-sm bg-emerald-500/40 border border-emerald-500"></span>
            Low
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-sm bg-amber-500/40 border border-amber-500"></span>
            Mod
          </span>
          <span className="flex items-center gap-1 text-orange-400">
            <span className="w-2 h-2 rounded-sm bg-orange-500/40 border border-orange-500"></span>
            High
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-2 rounded-sm bg-rose-500/40 border border-rose-500"></span>
            Severe
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Matrix Grid */}
        <div className="lg:col-span-7 select-none">
          <div className="flex">
            {/* Y-Axis Label */}
            <div className="w-6 flex items-center justify-center">
              <span className="-rotate-90 text-[10px] font-semibold uppercase tracking-wider text-stone-400 whitespace-nowrap font-mono">
                Likelihood →
              </span>
            </div>

            {/* Matrix Body */}
            <div className="flex-1">
              <div className="grid grid-rows-5 gap-1">
                {[5, 4, 3, 2, 1].map((likelihoodVal, rowIdx) => {
                  return (
                    <div key={likelihoodVal} className="flex items-center gap-1">
                      <span className="w-20 text-[9px] text-stone-400 text-right pr-1.5 truncate font-mono">
                        {likelihoodLabels[rowIdx].split(' ')[1]}
                      </span>
                      <div className="grid grid-cols-5 gap-1 flex-1">
                        {[1, 2, 3, 4, 5].map((impactVal) => {
                          const level = getCellRiskLevel(impactVal, likelihoodVal);
                          const matchingKris = kris.filter(
                            (k) => k.likelihood === likelihoodVal && k.impact === impactVal
                          );

                          return (
                            <div
                              key={`${likelihoodVal}-${impactVal}`}
                              className={`h-9 sm:h-10 rounded border p-1 flex flex-col justify-between transition-all cursor-pointer relative ${getCellColor(
                                level
                              )} ${
                                matchingKris.length > 0 ? 'ring-1 ring-white/50 shadow-sm' : ''
                              }`}
                              onClick={() => {
                                if (matchingKris.length > 0) {
                                  setSelectedKri(matchingKris[0]);
                                }
                              }}
                            >
                              <span className="text-[9px] font-mono text-stone-400/80">
                                {impactVal * likelihoodVal}
                              </span>

                              {matchingKris.length > 0 && (
                                <div className="flex flex-wrap gap-0.5">
                                  {matchingKris.map((k) => (
                                    <div
                                      key={k.id}
                                      className={`px-1 py-0.2 rounded text-[9px] font-bold truncate max-w-full flex items-center gap-1 ${
                                        selectedKri?.id === k.id
                                          ? 'bg-white text-stone-900 ring-1 ring-emerald-500'
                                          : 'bg-stone-900 text-stone-100 border border-stone-700'
                                      }`}
                                      title={k.title}
                                    >
                                      <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0"></span>
                                      <span className="truncate">{k.title.split(' ')[0]}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Header */}
              <div className="flex items-center gap-1 mt-1.5">
                <span className="w-20"></span>
                <div className="grid grid-cols-5 gap-1 flex-1">
                  {impactLabels.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="text-center text-[9px] text-stone-400 truncate font-mono"
                    >
                      {lbl.split(' ')[1]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 font-mono">
                ← Impact Severity →
              </div>
            </div>
          </div>
        </div>

        {/* Selected KRI Detail Card */}
        <div className="lg:col-span-5 bg-stone-950/70 border border-stone-800 rounded-lg p-3 flex flex-col justify-between min-h-[220px]">
          {selectedKri ? (
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-1.5">
                <div>
                  <h4 className="text-xs font-bold text-stone-100">
                    {selectedKri.title}
                  </h4>
                </div>
                <div
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border font-mono ${
                    selectedKri.level === 'SEVERE'
                      ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                      : selectedKri.level === 'HIGH'
                      ? 'bg-orange-950/60 border-orange-700 text-orange-300'
                      : selectedKri.level === 'MODERATE'
                      ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                      : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                  }`}
                >
                  {selectedKri.level} ({selectedKri.score}/25)
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 gap-1.5 bg-stone-900/80 p-1.5 rounded border border-stone-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-[9px] text-stone-500 block">Likelihood</span>
                  <span className="font-bold text-stone-200">
                    {selectedKri.likelihood} / 5
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-stone-500 block">Impact</span>
                  <span className="font-bold text-stone-200">
                    {selectedKri.impact} / 5
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 leading-snug">
                {selectedKri.description}
              </p>

              {/* Mitigation Tip */}
              <div className="bg-emerald-950/20 border border-emerald-800/30 rounded p-2 text-[11px]">
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 mb-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Mitigation:
                </span>
                <p className="text-stone-300 leading-snug">
                  {selectedKri.recommendation}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-stone-500 text-xs">
              Select a plotted KRI node to inspect details
            </div>
          )}

          {/* Quick List of All KRIs */}
          <div className="mt-2 pt-2 border-t border-stone-800">
            <div className="flex flex-wrap gap-1">
              {kris.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setSelectedKri(k)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    selectedKri?.id === k.id
                      ? 'bg-stone-800 text-white font-bold'
                      : 'text-stone-400 hover:bg-stone-900'
                  }`}
                >
                  {k.title.split(' ')[0]} ({k.score})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
