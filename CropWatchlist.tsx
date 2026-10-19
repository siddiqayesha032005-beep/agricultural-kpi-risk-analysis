import React from 'react';
import { CropDetection } from '../types/agri';
import { Wheat, AlertCircle, CheckCircle2, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

interface CropWatchlistProps {
  crops: CropDetection[];
}

export const CropWatchlist: React.FC<CropWatchlistProps> = ({ crops }) => {
  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3.5 mb-4">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200 flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-emerald-400" />
            Identified Commodity Profiles
          </h3>
          <p className="text-[11px] text-stone-400">
            Detected crops, contextual sentiment, and flagged threats
          </p>
        </div>
      </div>

      {crops.length === 0 ? (
        <div className="text-center py-6 text-stone-500 text-xs bg-stone-950/40 rounded border border-stone-800/60">
          No specific commodity named directly in the text.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {crops.map((crop) => {
            return (
              <div
                key={crop.crop}
                className="bg-stone-950/60 border border-stone-800 hover:border-stone-700 p-2.5 rounded-lg flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-stone-100">
                        {crop.crop}
                      </h4>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {crop.mentionCount} {crop.mentionCount === 1 ? 'mention' : 'mentions'}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border font-mono ${
                        crop.riskLevel === 'SEVERE'
                          ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                          : crop.riskLevel === 'HIGH'
                          ? 'bg-orange-950/60 border-orange-700 text-orange-300'
                          : crop.riskLevel === 'MODERATE'
                          ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                          : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      }`}
                    >
                      {crop.riskLevel}
                    </span>
                  </div>

                  {/* Sentiment Bar */}
                  <div className="bg-stone-900 p-1.5 rounded border border-stone-800/80 my-1.5">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-stone-400">Sentiment:</span>
                      <span
                        className={`font-mono font-bold flex items-center gap-0.5 ${
                          crop.sentimentScore > 0
                            ? 'text-emerald-400'
                            : crop.sentimentScore < 0
                            ? 'text-rose-400'
                            : 'text-stone-400'
                        }`}
                      >
                        {crop.sentimentScore > 0 ? `+${crop.sentimentScore}` : crop.sentimentScore}
                      </span>
                    </div>

                    <div className="relative w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 bottom-0 ${
                          crop.sentimentScore >= 0 ? 'bg-emerald-500 left-1/2' : 'bg-rose-500 right-1/2'
                        }`}
                        style={{
                          width: `${Math.min(50, Math.abs(crop.sentimentScore) * 50)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Associated Issues */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {crop.associatedIssues.length > 0 ? (
                      crop.associatedIssues.map((issue, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-stone-900 border border-stone-800 px-1 py-0.2 rounded text-stone-300 font-mono"
                        >
                          {issue}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] text-stone-500 italic">
                        Stable metrics reported
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
