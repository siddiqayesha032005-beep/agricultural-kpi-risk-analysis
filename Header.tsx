import React from 'react';
import {
  Wheat,
  Activity,
  Sliders,
  Printer,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'inspector' | 'matrix' | 'watchlist' | 'compare';
  setActiveTab: (tab: 'dashboard' | 'inspector' | 'matrix' | 'watchlist' | 'compare') => void;
  onOpenRules: () => void;
  onOpenExport: () => void;
  compareCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenRules,
  onOpenExport,
  compareCount,
}) => {
  return (
    <header className="border-b border-stone-800 bg-stone-950/95 backdrop-blur-md sticky top-0 z-30 px-3 lg:px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wheat className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-sm tracking-tight text-stone-100 font-sans">
                AgriPulse
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-1 py-0.2 rounded">
                KPI & Risk
              </span>
            </div>
          </div>

          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenExport}
              className="p-1.5 text-stone-300 hover:text-stone-100 bg-stone-900 border border-stone-800 rounded text-xs flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Compact */}
        <div className="flex items-center gap-1 bg-stone-900/90 p-0.5 rounded-lg border border-stone-800/80 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Activity className="w-3 h-3" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            5×5 Matrix
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'watchlist'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Wheat className="w-3 h-3" />
            Crops
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inspector'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Evidence
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'compare'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Layers className="w-3 h-3" />
            Compare
            {compareCount > 1 && (
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 text-stone-950 font-bold text-[9px] flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls - Compact */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={onOpenRules}
            className="px-2 py-1 text-xs text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-md flex items-center gap-1 transition-colors"
            title="Inspect & Adjust Keyword Dictionaries"
          >
            <Sliders className="w-3 h-3 text-stone-400" />
            Rules
          </button>

          <button
            onClick={onOpenExport}
            className="px-2.5 py-1 text-xs font-medium text-stone-100 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-md flex items-center gap-1 transition-colors shadow-sm"
            title="Export Agricultural Briefing Report"
          >
            <Printer className="w-3 h-3 text-emerald-400" />
            Export
          </button>
        </div>
      </div>
    </header>
  );
};
