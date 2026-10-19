import React from 'react';
import { AnalysisResult, RiskLevel } from '../types/agri';
import { Layers, ArrowRight, ShieldCheck, AlertTriangle, TrendingUp, TrendingDown, Wheat } from 'lucide-react';

interface MultiSourceCompareProps {
  history: AnalysisResult[];
  onLoadReport: (report: AnalysisResult) => void;
}

export const MultiSourceCompare: React.FC<MultiSourceCompareProps> = ({
  history,
  onLoadReport,
}) => {
  if (history.length < 2) {
    return (
      <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-8 text-center">
        <Layers className="w-10 h-10 text-stone-600 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-stone-200 mb-1">
          Cross-Source Intelligence Comparison
        </h3>
        <p className="text-xs text-stone-400 max-w-md mx-auto mb-4">
          To compare how different platforms (News wires, Reddit field threads, USDA bulletins) view agricultural risks, analyze at least two different sources from the intake panel.
        </p>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded">
          {history.length} of 2 required reports analyzed
        </span>
      </div>
    );
  }

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'SEVERE':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'HIGH':
        return 'text-orange-400 bg-orange-950/60 border-orange-800/60';
      case 'MODERATE':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'LOW':
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-800">
        <div>
          <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Cross-Source Intelligence Divergence Matrix
          </h3>
          <p className="text-xs text-stone-400">
            Compare risk perception, sentiment delta, and commodity focus across multiple feeds
          </p>
        </div>
        <span className="text-xs font-mono text-stone-400">
          Comparing {history.length} intelligence documents
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-800 bg-stone-950/80 text-[11px] font-mono text-stone-400 uppercase">
              <th className="p-3">Source & Title</th>
              <th className="p-3 text-center">Risk Index</th>
              <th className="p-3 text-center">Market Tone</th>
              <th className="p-3 text-center">Crop Health</th>
              <th className="p-3 text-center">Supply Friction</th>
              <th className="p-3">Key Commodities</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/60">
            {history.map((rep) => {
              return (
                <tr key={rep.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="p-3 max-w-[240px]">
                    <div className="font-semibold text-stone-200 truncate">{rep.title}</div>
                    <div className="text-[10px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                      <span className="text-emerald-400 font-mono">{rep.sourceType}</span>
                      <span>·</span>
                      <span>{rep.sourceName || 'Unknown'}</span>
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border font-mono ${getRiskBadge(
                        rep.kpis.overallRiskLevel
                      )}`}
                    >
                      {rep.kpis.overallRiskScore}/100 ({rep.kpis.overallRiskLevel})
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`font-mono font-bold flex items-center justify-center gap-1 ${
                        rep.kpis.marketSentimentScore > 0
                          ? 'text-emerald-400'
                          : rep.kpis.marketSentimentScore < 0
                          ? 'text-rose-400'
                          : 'text-stone-400'
                      }`}
                    >
                      {rep.kpis.marketSentimentScore > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : rep.kpis.marketSentimentScore < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : null}
                      {rep.kpis.marketSentimentScore > 0
                        ? `+${rep.kpis.marketSentimentScore}`
                        : rep.kpis.marketSentimentScore}{' '}
                      ({rep.kpis.marketSentimentLabel})
                    </span>
                  </td>

                  <td className="p-3 text-center font-mono">
                    <span
                      className={
                        rep.kpis.cropConditionIndex >= 70
                          ? 'text-emerald-400'
                          : rep.kpis.cropConditionIndex >= 45
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {rep.kpis.cropConditionIndex}%
                    </span>
                  </td>

                  <td className="p-3 text-center font-mono text-stone-300">
                    {rep.kpis.supplyChainFriction}/100
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {rep.crops.slice(0, 3).map((c) => (
                        <span
                          key={c.crop}
                          className="text-[10px] bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded text-stone-300 font-mono"
                        >
                          {c.crop.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => onLoadReport(rep)}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-emerald-600 hover:text-white text-stone-300 rounded text-xs transition-colors font-medium"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
