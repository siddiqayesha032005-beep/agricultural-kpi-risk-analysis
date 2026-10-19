import React from 'react';
import { Percent, DollarSign, Scale, FileText } from 'lucide-react';

interface QuantifiedDataCardProps {
  quantifiedMetrics: {
    percentages: string[];
    monetaryValues: string[];
    quantities: string[];
  };
}

export const QuantifiedDataCard: React.FC<QuantifiedDataCardProps> = ({ quantifiedMetrics }) => {
  const hasData =
    quantifiedMetrics.percentages.length > 0 ||
    quantifiedMetrics.monetaryValues.length > 0 ||
    quantifiedMetrics.quantities.length > 0;

  if (!hasData) return null;

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3 mb-4">
      <div className="mb-2 pb-1.5 border-b border-stone-800 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200 flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-emerald-400" />
          Parsed Numerical Parameters
        </h3>
      </div>

      <div className="space-y-2">
        {/* Percentages */}
        {quantifiedMetrics.percentages.length > 0 && (
          <div className="bg-stone-950/60 border border-stone-800 p-2 rounded">
            <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mb-1">
              <Percent className="w-3 h-3 text-sky-400" />
              Percentage Shifts & Yields
            </span>
            <div className="flex flex-wrap gap-1">
              {quantifiedMetrics.percentages.map((p, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800 font-mono text-[10px] font-bold text-sky-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Commodity Pricing */}
        {quantifiedMetrics.monetaryValues.length > 0 && (
          <div className="bg-stone-950/60 border border-stone-800 p-2 rounded">
            <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mb-1">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              Futures & Input Spot Costs
            </span>
            <div className="flex flex-wrap gap-1">
              {quantifiedMetrics.monetaryValues.map((m, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800 font-mono text-[10px] font-bold text-emerald-300"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quantities */}
        {quantifiedMetrics.quantities.length > 0 && (
          <div className="bg-stone-950/60 border border-stone-800 p-2 rounded">
            <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mb-1">
              <Scale className="w-3 h-3 text-amber-400" />
              Volumes & Acreage
            </span>
            <div className="flex flex-wrap gap-1">
              {quantifiedMetrics.quantities.map((q, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800 font-mono text-[10px] font-bold text-amber-300"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
