import React, { useState } from 'react';
import { X, Search, Sliders, Shield, BookOpen, Check } from 'lucide-react';
import { AGRI_RULES, CATEGORY_METADATA } from '../services/dictionary';
import { AgriCategory } from '../types/agri';

interface RuleEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleEngineModal: React.FC<RuleEngineModalProps> = ({ isOpen, onClose }) => {
  const [filterCat, setFilterCat] = useState<AgriCategory | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [testSentence, setTestSentence] = useState('Prolonged drought and severe fall armyworm infestation damaged late-season corn.');

  if (!isOpen) return null;

  const filteredRules = AGRI_RULES.filter((r) => {
    const matchesCat = filterCat === 'ALL' || r.category === filterCat;
    const matchesSearch = search
      ? r.term.toLowerCase().includes(search.toLowerCase()) ||
        r.mitigationTip?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCat && matchesSearch;
  });

  // Test sentence rule match
  const testMatches = AGRI_RULES.filter((r) =>
    testSentence.toLowerCase().includes(r.term.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100">
                Agricultural Rule & Keyword Engine Configuration
              </h2>
              <p className="text-xs text-stone-400">
                Predefined deterministic JavaScript lexicon for agronomic signal extraction
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulator Test Box */}
        <div className="p-4 bg-stone-950/80 border-b border-stone-800">
          <label className="block text-xs font-semibold text-emerald-400 mb-1.5">
            Rule Simulator / Scratchpad (Test any sentence instantly):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={testSentence}
              onChange={(e) => setTestSentence(e.target.value)}
              className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-sans"
              placeholder="Type or paste a test agricultural statement..."
            />
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-stone-400">Fired Rules ({testMatches.length}):</span>
            {testMatches.length > 0 ? (
              testMatches.map((m) => (
                <span
                  key={m.term}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium border"
                  style={{
                    backgroundColor: `${CATEGORY_METADATA[m.category].color}20`,
                    color: CATEGORY_METADATA[m.category].color,
                    borderColor: `${CATEGORY_METADATA[m.category].color}50`,
                  }}
                >
                  {m.term} (wt: {m.weight})
                </span>
              ))
            ) : (
              <span className="text-[11px] text-stone-500 italic">No keyword rules matched</span>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-stone-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms, pests, diseases..."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterCat('ALL')}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                filterCat === 'ALL'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              All ({AGRI_RULES.length})
            </button>
            {(Object.keys(CATEGORY_METADATA) as AgriCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors whitespace-nowrap ${
                  filterCat === cat
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {CATEGORY_METADATA[cat].label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Rules Table */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredRules.map((rule) => {
            const meta = CATEGORY_METADATA[rule.category];
            return (
              <div
                key={rule.term}
                className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 sm:max-w-[55%]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-100 font-mono text-sm">
                      "{rule.term}"
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                      style={{
                        backgroundColor: `${meta.color}20`,
                        color: meta.color,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-1 rounded ${
                        rule.polarity === 'positive'
                          ? 'text-emerald-400 bg-emerald-950/60'
                          : 'text-rose-400 bg-rose-950/60'
                      }`}
                    >
                      {rule.polarity}
                    </span>
                  </div>
                  {rule.mitigationTip && (
                    <p className="text-[11px] text-stone-400 leading-snug">
                      <span className="text-stone-300 font-medium">Standard Mitigation: </span>
                      {rule.mitigationTip}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-stone-400 shrink-0">
                  <div className="text-right">
                    <span className="text-stone-500 block text-[10px]">Weight Factor</span>
                    <span className="text-stone-200 font-bold">{rule.weight} / 5</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block text-[10px]">Impact</span>
                    <span className="text-stone-200 font-bold">{rule.impactFactor} / 5</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block text-[10px]">Likelihood</span>
                    <span className="text-stone-200 font-bold">{rule.likelihoodFactor} / 5</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            {filteredRules.length} predefined agricultural keyword rules loaded
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-medium transition-colors"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
