import React from 'react';
import { AnalysisResult } from '../types/agri';
import { X, Printer, Download, CheckCircle2, Wheat, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agripulse-report-${result.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-stone-100">
              Executive Agricultural Risk Briefing Export
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download JSON
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-950/40 print:p-0 print:bg-white print:text-black">
          <div className="bg-stone-900 print:bg-white p-6 rounded-xl border border-stone-800 print:border-none space-y-6 text-stone-200 print:text-stone-900">
            {/* Header info */}
            <div className="border-b border-stone-800 pb-4">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
                <span>AGRIPULSE INTELLIGENCE SYSTEM</span>
                <span>GENERATED: {result.timestamp}</span>
              </div>
              <h1 className="text-lg font-bold text-stone-100 print:text-black">
                {result.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-stone-400 mt-1 font-mono">
                <span>Source: {result.sourceType} ({result.sourceName || 'Direct Field Report'})</span>
                <span>·</span>
                <span>Analyzed Words: {result.wordCount}</span>
              </div>
            </div>

            {/* Executive Synthesis */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold mb-1.5">
                Executive Synthesis
              </h2>
              <p className="text-xs leading-relaxed text-stone-300 print:text-stone-800">
                {result.executiveSummary}
              </p>
            </div>

            {/* Primary KPI Grid */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold mb-2">
                Primary Agronomic Indicators
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 print:bg-stone-100">
                  <span className="text-stone-400 text-[10px] block">Overall Risk</span>
                  <span className="text-base font-bold text-stone-100 print:text-black">
                    {result.kpis.overallRiskScore}/100 ({result.kpis.overallRiskLevel})
                  </span>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 print:bg-stone-100">
                  <span className="text-stone-400 text-[10px] block">Market Sentiment</span>
                  <span className="text-base font-bold text-stone-100 print:text-black">
                    {result.kpis.marketSentimentScore > 0 ? `+${result.kpis.marketSentimentScore}` : result.kpis.marketSentimentScore} ({result.kpis.marketSentimentLabel})
                  </span>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 print:bg-stone-100">
                  <span className="text-stone-400 text-[10px] block">Crop Health Index</span>
                  <span className="text-base font-bold text-emerald-400 print:text-emerald-700">
                    {result.kpis.cropConditionIndex}% ({result.kpis.cropConditionLabel.split('/')[0]})
                  </span>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 print:bg-stone-100">
                  <span className="text-stone-400 text-[10px] block">Supply Chain Friction</span>
                  <span className="text-base font-bold text-stone-100 print:text-black">
                    {result.kpis.supplyChainFriction}/100
                  </span>
                </div>
              </div>
            </div>

            {/* KRIs list */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold mb-2">
                Evaluated Key Risk Indicators (KRIs)
              </h2>
              <div className="space-y-2">
                {result.kris.map((k) => (
                  <div
                    key={k.id}
                    className="bg-stone-950 p-3 rounded-lg border border-stone-800 flex items-start justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-200 print:text-black flex items-center gap-2">
                        <span>{k.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-800 text-stone-300">
                          {k.level} RISK (Score: {k.score}/25)
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{k.description}</p>
                      <p className="text-[11px] text-emerald-400 mt-1 font-medium">
                        Action: {k.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Mitigations */}
            <div>
              <h2 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold mb-2">
                Operational Recommendations
              </h2>
              <div className="space-y-2">
                {result.mitigations.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-stone-200">{m.targetRole}</span>
                      <span className="text-[10px] font-mono px-1.5 rounded bg-stone-800 text-stone-300">
                        {m.priority}
                      </span>
                    </div>
                    <div className="text-stone-300 font-medium">{m.action}</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">{m.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
