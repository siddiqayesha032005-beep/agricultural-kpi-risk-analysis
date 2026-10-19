import React from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sprout,
  Truck,
  Sparkles,
  ShieldCheck,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { KPIMetrics, RiskLevel } from '../types/agri';

interface KpiMetricsRowProps {
  kpis: KPIMetrics;
}

export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ kpis }) => {
  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case 'SEVERE':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/60';
      case 'HIGH':
        return 'text-orange-400 bg-orange-950/40 border-orange-800/60';
      case 'MODERATE':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      case 'LOW':
      default:
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
    }
  };

  const getSentimentColor = (score: number) => {
    if (score > 15) return 'text-emerald-400';
    if (score < -15) return 'text-rose-400';
    return 'text-amber-400';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
      {/* 1. Overall Agricultural Risk Level */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between hover:border-stone-700 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
          <span className="font-semibold uppercase tracking-wider font-mono">
            Risk Index
          </span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${getRiskBadgeColor(kpis.overallRiskLevel)}`}>
            {kpis.overallRiskLevel}
          </span>
        </div>

        <div className="my-0.5 flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight text-stone-100">
            {kpis.overallRiskScore}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">/ 100</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-1 mb-1.5">
          <div
            className={`h-full transition-all duration-500 ${
              kpis.overallRiskScore >= 70
                ? 'bg-rose-500'
                : kpis.overallRiskScore >= 45
                ? 'bg-orange-500'
                : kpis.overallRiskScore >= 25
                ? 'bg-amber-400'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, kpis.overallRiskScore))}%` }}
          />
        </div>

        <p className="text-[10px] text-stone-400 flex items-center gap-1 truncate">
          {kpis.overallRiskLevel === 'SEVERE' ? (
            <Flame className="w-3 h-3 text-rose-400 shrink-0" />
          ) : kpis.overallRiskLevel === 'HIGH' ? (
            <AlertTriangle className="w-3 h-3 text-orange-400 shrink-0" />
          ) : (
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
          )}
          <span className="truncate">Composite Hazard</span>
        </p>
      </div>

      {/* 2. Market Sentiment Index */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between hover:border-stone-700 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
          <span className="font-semibold uppercase tracking-wider font-mono">
            Sentiment
          </span>
          <span className="text-[10px] font-mono text-stone-300">
            {kpis.marketSentimentLabel}
          </span>
        </div>

        <div className="my-0.5 flex items-baseline gap-1">
          <span className={`text-xl sm:text-2xl font-extrabold font-mono tracking-tight ${getSentimentColor(kpis.marketSentimentScore)}`}>
            {kpis.marketSentimentScore > 0 ? `+${kpis.marketSentimentScore}` : kpis.marketSentimentScore}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">pts</span>
        </div>

        {/* Bi-directional Meter */}
        <div className="relative w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-1 mb-1.5">
          <div
            className={`absolute top-0 bottom-0 ${kpis.marketSentimentScore >= 0 ? 'bg-emerald-500 left-1/2' : 'bg-rose-500 right-1/2'}`}
            style={{
              width: `${Math.min(50, Math.abs(kpis.marketSentimentScore) / 2)}%`,
            }}
          />
        </div>

        <p className="text-[10px] text-stone-400 flex items-center gap-1 truncate">
          {kpis.marketSentimentScore >= 0 ? (
            <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
          ) : (
            <TrendingDown className="w-3 h-3 text-rose-400 shrink-0" />
          )}
          <span className="truncate">Pricing Momentum</span>
        </p>
      </div>

      {/* 3. Crop Condition Health */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between hover:border-stone-700 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
          <span className="font-semibold uppercase tracking-wider font-mono">
            Crop Health
          </span>
          <span className="text-[10px] text-emerald-400 font-medium truncate max-w-[80px]">
            {kpis.cropConditionLabel.split('/')[0]}
          </span>
        </div>

        <div className="my-0.5 flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight text-emerald-400">
            {kpis.cropConditionIndex}%
          </span>
        </div>

        <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-1 mb-1.5">
          <div
            className={`h-full ${
              kpis.cropConditionIndex >= 70
                ? 'bg-emerald-500'
                : kpis.cropConditionIndex >= 45
                ? 'bg-amber-400'
                : 'bg-rose-500'
            }`}
            style={{ width: `${kpis.cropConditionIndex}%` }}
          />
        </div>

        <p className="text-[10px] text-stone-400 flex items-center gap-1 truncate">
          <Sprout className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{kpis.cropConditionLabel}</span>
        </p>
      </div>

      {/* 4. Supply Chain & Logistics Friction */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between hover:border-stone-700 transition-colors">
        <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
          <span className="font-semibold uppercase tracking-wider font-mono">
            Supply Friction
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            {kpis.supplyChainLabel.split(' ')[0]}
          </span>
        </div>

        <div className="my-0.5 flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight text-stone-100">
            {kpis.supplyChainFriction}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">/ 100</span>
        </div>

        <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-1 mb-1.5">
          <div
            className={`h-full ${
              kpis.supplyChainFriction >= 60
                ? 'bg-rose-500'
                : kpis.supplyChainFriction >= 30
                ? 'bg-amber-400'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, kpis.supplyChainFriction))}%` }}
          />
        </div>

        <p className="text-[10px] text-stone-400 flex items-center gap-1 truncate">
          <Truck className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="truncate">Inputs & Freight</span>
        </p>
      </div>

      {/* 5. Opportunities & Innovations */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2.5 sm:p-3 flex flex-col justify-between hover:border-stone-700 transition-colors col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
          <span className="font-semibold uppercase tracking-wider font-mono">
            Catalysts
          </span>
          <span className="text-[10px] text-teal-400 font-mono">
            {kpis.opportunityDensity > 0 ? 'Active' : 'Low'}
          </span>
        </div>

        <div className="my-0.5 flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight text-teal-400">
            {kpis.opportunityDensity}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">detected</span>
        </div>

        <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-1 mb-1.5">
          <div
            className="h-full bg-teal-500"
            style={{ width: `${Math.min(100, kpis.opportunityDensity * 25)}%` }}
          />
        </div>

        <p className="text-[10px] text-stone-400 flex items-center gap-1 truncate">
          <Sparkles className="w-3 h-3 text-teal-400 shrink-0" />
          <span className="truncate">Grants & Upsides</span>
        </p>
      </div>
    </div>
  );
};
