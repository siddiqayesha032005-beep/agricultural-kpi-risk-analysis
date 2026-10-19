import React, { useState } from 'react';
import { KeywordMatch, AgriCategory } from '../types/agri';
import { CATEGORY_METADATA } from '../services/dictionary';
import { Search, Filter, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

interface TextInspectorProps {
  rawText: string;
  matchedKeywords: KeywordMatch[];
}

export const TextInspector: React.FC<TextInspectorProps> = ({ rawText, matchedKeywords }) => {
  const [selectedCategory, setSelectedCategory] = useState<AgriCategory | 'ALL'>('ALL');
  const [activeKeywordMatch, setActiveKeywordMatch] = useState<KeywordMatch | null>(
    matchedKeywords[0] || null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = matchedKeywords.filter((m) => {
    const matchCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchSearch = searchTerm ? m.keyword.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchCat && matchSearch;
  });

  const uniqueTerms = Array.from(new Set(matchedKeywords.map((m) => m.keyword.toLowerCase())));

  const renderHighlightedText = () => {
    if (!rawText) return null;

    if (uniqueTerms.length === 0) {
      return <p className="text-stone-300 leading-relaxed whitespace-pre-wrap text-xs">{rawText}</p>;
    }

    const sortedTerms = [...uniqueTerms].sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${sortedTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
    const parts = rawText.split(regex);

    return (
      <div className="leading-relaxed whitespace-pre-wrap font-sans text-xs text-stone-300 select-text">
        {parts.map((part, index) => {
          const matchItem = matchedKeywords.find(
            (m) => m.keyword.toLowerCase() === part.toLowerCase()
          );

          if (matchItem) {
            const meta = CATEGORY_METADATA[matchItem.category];
            const isCategoryActive = selectedCategory === 'ALL' || selectedCategory === matchItem.category;
            const isCurrentlySelected = activeKeywordMatch?.keyword.toLowerCase() === part.toLowerCase();

            return (
              <mark
                key={index}
                onClick={() => setActiveKeywordMatch(matchItem)}
                className={`cursor-pointer px-1 py-0.2 rounded transition-all inline-block font-medium ${
                  isCategoryActive
                    ? isCurrentlySelected
                      ? 'ring-1 ring-white font-bold'
                      : 'opacity-100 hover:opacity-80'
                    : 'opacity-40'
                }`}
                style={{
                  backgroundColor: `${meta.color}35`,
                  color: meta.color,
                  borderBottom: `1.5px solid ${meta.color}`,
                }}
                title={`${matchItem.keyword} (${meta.label})`}
              >
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-3.5 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-stone-200 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Text Evidence & Rule Match Inspector
          </h3>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-0.5">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors whitespace-nowrap ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200'
            }`}
          >
            All ({matchedKeywords.length})
          </button>

          {(Object.keys(CATEGORY_METADATA) as AgriCategory[]).map((catKey) => {
            const count = matchedKeywords.filter((m) => m.category === catKey).length;
            if (count === 0) return null;
            const meta = CATEGORY_METADATA[catKey];
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors flex items-center gap-1 whitespace-nowrap font-mono ${
                  isSelected
                    ? 'ring-1 ring-white/50 font-bold'
                    : 'bg-stone-950/80 text-stone-400 hover:text-stone-200'
                }`}
                style={{
                  backgroundColor: isSelected ? `${meta.color}35` : undefined,
                  color: isSelected ? meta.color : undefined,
                  border: isSelected ? `1px solid ${meta.color}` : '1px solid #292524',
                }}
              >
                <span>{meta.label.split(' ')[0]}</span>
                <span className="opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Highlighted Text Viewer */}
        <div className="lg:col-span-8 bg-stone-950/70 border border-stone-800 rounded-lg p-3 max-h-[360px] overflow-y-auto">
          {renderHighlightedText()}
        </div>

        {/* Rule Details Sidebar */}
        <div className="lg:col-span-4 bg-stone-950/80 border border-stone-800 rounded-lg p-3 flex flex-col justify-between min-h-[300px]">
          {activeKeywordMatch ? (
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between gap-1.5">
                  <h4 className="text-sm font-bold text-stone-100 font-mono">
                    "{activeKeywordMatch.keyword}"
                  </h4>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase font-mono ${
                      activeKeywordMatch.polarity === 'positive'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                        : activeKeywordMatch.polarity === 'negative'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-700'
                        : 'bg-stone-800 text-stone-300 border border-stone-700'
                    }`}
                  >
                    {activeKeywordMatch.polarity}
                  </span>
                </div>
              </div>

              {/* Category & Weight */}
              <div className="grid grid-cols-2 gap-1.5 bg-stone-900/90 p-1.5 rounded border border-stone-800 text-[11px]">
                <div>
                  <span className="text-[9px] text-stone-500 block font-mono">Category</span>
                  <span className="font-semibold text-stone-300 truncate block">
                    {CATEGORY_METADATA[activeKeywordMatch.category].label.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-stone-500 block font-mono">Weight</span>
                  <span className="font-semibold text-stone-200 font-mono">
                    {activeKeywordMatch.weight} / 5
                  </span>
                </div>
              </div>

              {/* Context Sentence */}
              <div>
                <span className="text-[9px] uppercase font-mono text-stone-500 block mb-0.5">
                  Context Sentence:
                </span>
                <blockquote className="bg-stone-900/70 border-l border-emerald-500 p-2 rounded-r text-[11px] text-stone-300 italic leading-snug">
                  "{activeKeywordMatch.sentence}"
                </blockquote>
              </div>

              {/* Quick Navigation of other matches */}
              <div>
                <span className="text-[9px] uppercase font-mono text-stone-500 block mb-1">
                  Active Hits ({filteredMatches.length}):
                </span>
                <div className="max-h-28 overflow-y-auto space-y-0.5">
                  {filteredMatches.slice(0, 10).map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveKeywordMatch(m)}
                      className={`w-full text-left px-1.5 py-0.5 rounded text-[11px] flex items-center justify-between transition-colors ${
                        activeKeywordMatch === m
                          ? 'bg-stone-800 text-white font-medium'
                          : 'text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <span className="truncate">{m.keyword}</span>
                      <span className="text-[9px] font-mono text-stone-500 shrink-0">
                        {CATEGORY_METADATA[m.category].label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-stone-500 text-xs">
              Click any highlighted token to view rule attributes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
