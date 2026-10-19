import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  Newspaper,
  MessageSquare,
  Building2,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AnalysisResult, SourcePreset } from '../types/agri';
import { SOURCE_PRESETS } from '../services/presets';

interface InputPanelProps {
  onAnalyze: (text: string, title: string, sourceType: AnalysisResult['sourceType'], sourceName: string) => void;
  isProcessing: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onAnalyze, isProcessing }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('news-wheat-blacksea');
  const [text, setText] = useState<string>(SOURCE_PRESETS[0].fullText);
  const [title, setTitle] = useState<string>(SOURCE_PRESETS[0].title);
  const [sourceType, setSourceType] = useState<AnalysisResult['sourceType']>(SOURCE_PRESETS[0].sourceType);
  const [sourceName, setSourceName] = useState<string>(SOURCE_PRESETS[0].sourceName);
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // Collapsed by default to keep dashboard visible!
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleSelectPreset = (preset: SourcePreset) => {
    setSelectedPresetId(preset.id);
    setText(preset.fullText);
    setTitle(preset.title);
    setSourceType(preset.sourceType);
    setSourceName(preset.sourceName);
    onAnalyze(preset.fullText, preset.title, preset.sourceType, preset.sourceName);
  };

  const handleClear = () => {
    setSelectedPresetId('custom');
    setText('');
    setTitle('Custom Agricultural Field Observation');
    setSourceName('Local Source');
    setIsExpanded(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setText(content);
          setTitle(file.name.replace(/\.[^/.]+$/, ''));
          setSelectedPresetId('custom');
          setSourceName(file.name);
          onAnalyze(content, file.name.replace(/\.[^/.]+$/, ''), 'Custom Report', file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (!text.trim()) return;
    onAnalyze(text, title || 'Agricultural Intelligence Report', sourceType, sourceName);
  };

  const getSourceIcon = (type: AnalysisResult['sourceType']) => {
    switch (type) {
      case 'News Platform':
        return <Newspaper className="w-3 h-3 text-sky-400" />;
      case 'Reddit / Forum':
        return <MessageSquare className="w-3 h-3 text-orange-400" />;
      case 'Government / USDA':
        return <Building2 className="w-3 h-3 text-emerald-400" />;
      case 'Wikipedia / Research':
        return <Globe className="w-3 h-3 text-purple-400" />;
      default:
        return <FileText className="w-3 h-3 text-stone-400" />;
    }
  };

  return (
    <section className="bg-stone-900/90 border border-stone-800 rounded-xl overflow-hidden shadow-sm mb-4">
      {/* Sleek Intake Header & Preset Pills */}
      <div className="px-3 py-2 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-2 bg-stone-950/70">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 shrink-0 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Presets:
          </span>

          <div className="flex items-center gap-1.5">
            {SOURCE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-950 border border-emerald-500/80 text-emerald-300'
                      : 'bg-stone-900 border border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                  title={preset.title}
                >
                  {getSourceIcon(preset.sourceType)}
                  <span className="truncate max-w-[130px] sm:max-w-none">
                    {preset.sourceName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1 px-2 py-1 rounded bg-stone-900 border border-stone-800"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Hide Input
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Edit / Paste Text ({wordCount}w)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Compact Input Area */}
      {isExpanded && (
        <div className="p-3 sm:p-4 space-y-3 bg-stone-950/40">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
            <div className="sm:col-span-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Headline / Document Title"
                className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-3">
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as AnalysisResult['sourceType'])}
                className="w-full bg-stone-900 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="News Platform">News Platform</option>
                <option value="Reddit / Forum">Reddit / Forum</option>
                <option value="Government / USDA">Government / USDA</option>
                <option value="Wikipedia / Research">Wikipedia / Research</option>
                <option value="Custom Report">Custom Report</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="Publisher / Source"
                className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setSelectedPresetId('custom');
              }}
              placeholder="Paste agricultural news, market reports, or farm observations here..."
              className="w-full bg-stone-900 border border-stone-800 rounded p-2 text-xs leading-relaxed text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 font-sans resize-y"
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.md,.csv,.json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 text-xs text-stone-300 hover:text-stone-100 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded flex items-center gap-1 transition-colors"
              >
                <Upload className="w-3 h-3 text-stone-400" />
                Upload file
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-2 py-1 text-xs text-stone-400 hover:text-stone-200 underline decoration-dotted"
              >
                Clear
              </button>
            </div>

            <button
              type="button"
              onClick={handleAnalyzeClick}
              disabled={isProcessing || !text.trim()}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isProcessing || !text.trim()
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
