import React from 'react';
import { CategorySummary, AgriCategory } from '../types/agri';
import {
  CloudRain,
  Bug,
  TrendingUp,
  Sprout,
  DollarSign,
  Truck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

interface CategoryBreakdownProps {
  categories: CategorySummary[];
  onSelectCategory?: (category: AgriCategory) => void;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  onSelectCategory,
}) => {
  const getCategoryIcon = (category: AgriCategory) => {
    switch (category) {
      case 'weather_risk':
        return <CloudRain className="w-3.5 h-3.5 text-amber-400" />;
      case 'pest_disease':
        return <Bug className="w-3.5 h-3.5 text-rose-400" />;
      case 'market_trend':
        return <TrendingUp className="w-3.5 h-3.5 text-sky-400" />;
      case 'crop_condition':
        return <Sprout className="w-3.5 h-3.5 text-emerald-400" />;
      case 'price_change':
        return <DollarSign className="w-3.5 h-3.5 text-orange-400" />;
      case 'production_issue':
        return <Truck className="w-3.5 h-3.5 text-purple-400" />;
      case 'opportunity':
        return <Sparkles className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3.5 mb-4">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200">
            Agronomic & Market Categorical Signals
          </h3>
          <p className="text-[11px] text-stone-400">
            Proportional signal weight and direction per domain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((cat) => {
          return (
            <div
              key={cat.category}
              onClick={() => onSelectCategory && onSelectCategory(cat.category)}
              className="bg-stone-950/60 border border-stone-800 hover:border-stone-700 p-2.5 rounded-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-stone-900 border border-stone-800 group-hover:border-stone-700">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <span className="text-[11px] font-semibold text-stone-200 truncate">
                      {cat.label}
                    </span>
                  </div>

                  <span className="bg-stone-900 px-1.5 py-0.2 rounded text-[10px] font-mono border border-stone-800 text-stone-300">
                    {cat.count}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-900 h-1 rounded-full overflow-hidden my-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(5, cat.riskWeight))}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>

              {/* Triggers list */}
              <div>
                <div className="text-[9px] text-stone-400 font-mono mb-1 flex items-center justify-between">
                  <span>Triggers:</span>
                  <span className="flex items-center gap-0.5">
                    {cat.trend === 'increasing' ? (
                      <span className="text-rose-400 flex items-center text-[9px]">
                        <ArrowUpRight className="w-2.5 h-2.5" /> High
                      </span>
                    ) : cat.trend === 'decreasing' ? (
                      <span className="text-emerald-400 flex items-center text-[9px]">
                        <ArrowDownRight className="w-2.5 h-2.5" /> Low
                      </span>
                    ) : (
                      <span className="text-stone-500 flex items-center text-[9px]">
                        <Minus className="w-2.5 h-2.5" /> Flat
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cat.keyFindings.length > 0 ? (
                    cat.keyFindings.map((finding, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800/80 text-stone-300 font-mono"
                      >
                        {finding}
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] text-stone-500 italic">None</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
