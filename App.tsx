/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sprout, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Header } from './components/Header';
import { TextInputSection } from './components/TextInputSection';
import { KpiOverview } from './components/KpiOverview';
import { KriRiskSection } from './components/KriRiskSection';
import { RiskMatrix } from './components/RiskMatrix';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { EvidenceInspector } from './components/EvidenceInspector';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import { RuleCustomizerModal } from './components/RuleCustomizerModal';
import { SavedReportsModal } from './components/SavedReportsModal';
import { ExportReportModal } from './components/ExportReportModal';

import { AnalysisResult, KeywordRule } from './types/agriculture';
import { DEFAULT_RULES } from './data/agriRules';
import { SAMPLE_ARTICLES } from './data/sampleArticles';
import { analyzeAgriculturalText } from './services/agriRuleEngine';

export default function App() {
  // Input state
  const [inputText, setInputText] = useState<string>(SAMPLE_ARTICLES[0].text);
  const [inputTitle, setInputTitle] = useState<string>(SAMPLE_ARTICLES[0].title);
  const [sourceType, setSourceType] = useState<string>('News Wire & Media');
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_ARTICLES[0].id);

  // Rule dictionary state
  const [rules, setRules] = useState<KeywordRule[]>(() => {
    try {
      const saved = localStorage.getItem('agri_rules');
      return saved ? JSON.parse(saved) : DEFAULT_RULES;
    } catch {
      return DEFAULT_RULES;
    }
  });

  // Saved reports history state
  const [savedReports, setSavedReports] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem('agri_saved_reports');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(() => {
    return analyzeAgriculturalText(
      SAMPLE_ARTICLES[0].text,
      SAMPLE_ARTICLES[0].title,
      'News Wire & Media',
      DEFAULT_RULES
    );
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Modals state
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync rules to localStorage
  const handleUpdateRules = (newRules: KeywordRule[]) => {
    setRules(newRules);
    localStorage.setItem('agri_rules', JSON.stringify(newRules));
    // Re-run current analysis with updated rules
    const fresh = analyzeAgriculturalText(inputText, inputTitle, sourceType, newRules);
    setAnalysisResult(fresh);
  };

  const handleResetRules = () => {
    setRules(DEFAULT_RULES);
    localStorage.removeItem('agri_rules');
    const fresh = analyzeAgriculturalText(inputText, inputTitle, sourceType, DEFAULT_RULES);
    setAnalysisResult(fresh);
  };

  // Run analysis handler
  const handleRunAnalysis = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeAgriculturalText(inputText, inputTitle, sourceType, rules);
      setAnalysisResult(result);

      // Save to history (limit to last 20)
      const updatedHistory = [result, ...savedReports.filter(r => r.sourceTitle !== result.sourceTitle)].slice(0, 20);
      setSavedReports(updatedHistory);
      try {
        localStorage.setItem('agri_saved_reports', JSON.stringify(updatedHistory));
      } catch {
        // quota safety
      }

      setIsAnalyzing(false);
    }, 280);
  };

  // Preset sample selection
  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    if (sampleId === 'custom') return;

    const sample = SAMPLE_ARTICLES.find(s => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
      setInputTitle(sample.title);
      setSourceType('News Wire & Media');
      setIsAnalyzing(true);
      setTimeout(() => {
        const fresh = analyzeAgriculturalText(sample.text, sample.title, 'News Wire & Media', rules);
        setAnalysisResult(fresh);
        setIsAnalyzing(false);
      }, 200);
    }
  };

  const handleLoadSavedReport = (report: AnalysisResult) => {
    setInputText(report.rawText);
    setInputTitle(report.sourceTitle);
    setSourceType(report.sourceType);
    setSelectedSampleId('custom');
    setAnalysisResult(report);
  };

  const handleClearHistory = () => {
    setSavedReports([]);
    localStorage.removeItem('agri_saved_reports');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Bar */}
      <Header
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        hasResult={Boolean(analysisResult)}
      />

      {/* Hero Overview Strip with Field Photography */}
      <div className="relative bg-emerald-950 text-white overflow-hidden border-b border-emerald-900">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <img 
            src="/src/assets/images/agri_field_aerial_1792397697031.jpg" 
            alt="Agricultural field landscape" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                <span>Agri-Data Intelligence Console</span>
                <span aria-hidden="true">·</span>
                <span>Version 2026.1</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Agricultural News to KPI & Risk Indicator System
              </h2>
              <p className="text-xs text-emerald-200/90 max-w-2xl mt-0.5">
                Deterministic rule engine scanning crop health, climatic hazards, pest vectors, and supply chain bottlenecks across online agricultural news, government reports, and market feeds.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0 bg-emerald-900/60 backdrop-blur-xs p-3 rounded-xl border border-emerald-800">
              <div className="text-center">
                <div className="text-emerald-300 text-[10px] uppercase font-sans">Active Rules</div>
                <div className="text-base font-bold text-white tabular-nums">{rules.length}</div>
              </div>
              <span className="w-px h-8 bg-emerald-700/60" aria-hidden="true" />
              <div className="text-center">
                <div className="text-emerald-300 text-[10px] uppercase font-sans">Indicators</div>
                <div className="text-base font-bold text-white tabular-nums">{analysisResult.matchedKeywords.length}</div>
              </div>
              <span className="w-px h-8 bg-emerald-700/60" aria-hidden="true" />
              <div className="text-center">
                <div className="text-emerald-300 text-[10px] uppercase font-sans">Risk Tier</div>
                <div className={`text-base font-bold uppercase ${
                  analysisResult.kris.compositeRiskLevel === 'critical' ? 'text-rose-400' :
                  analysisResult.kris.compositeRiskLevel === 'high' ? 'text-amber-300' :
                  analysisResult.kris.compositeRiskLevel === 'moderate' ? 'text-amber-200' : 'text-emerald-300'
                }`}>
                  {analysisResult.kris.compositeRiskLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1">
        
        {/* 1. News Ingestion Section */}
        <TextInputSection
          text={inputText}
          onChangeText={setInputText}
          title={inputTitle}
          onChangeTitle={setInputTitle}
          sourceType={sourceType}
          onChangeSourceType={setSourceType}
          selectedSampleId={selectedSampleId}
          onSelectSample={handleSelectSample}
          onAnalyze={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />

        {/* 2. Key Performance Indicators (KPIs) */}
        <KpiOverview kpis={analysisResult.kpis} />

        {/* 3. Key Risk Indicators (KRIs) & Threat Exposure */}
        <KriRiskSection kris={analysisResult.kris} />

        {/* 4. Agricultural Risk Matrix (Likelihood vs Impact) */}
        <RiskMatrix items={analysisResult.riskMatrix} />

        {/* 5. Thematic Breakdown & Entity Extraction */}
        <CategoryBreakdown
          categories={analysisResult.categoryBreakdown}
          commodities={analysisResult.commodities}
          regions={analysisResult.regions}
          executiveSummary={analysisResult.executiveSummary}
        />

        {/* 6. Extracted Keywords & Text Evidence Inspector */}
        <EvidenceInspector
          rawText={analysisResult.rawText}
          matchedKeywords={analysisResult.matchedKeywords}
        />

        {/* 7. Actionable Recommendations */}
        <RecommendationsPanel recommendations={analysisResult.recommendations} />

      </main>

      {/* Modals */}
      <RuleCustomizerModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        rules={rules}
        onUpdateRules={handleUpdateRules}
        onResetRules={handleResetRules}
      />

      <SavedReportsModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedReports={savedReports}
        onSelectReport={handleLoadSavedReport}
        onClearHistory={handleClearHistory}
      />

      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        result={analysisResult}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-200">AgriPulse Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Agricultural Decision Support & Risk Analysis</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Deterministic NLP Rule Engine</span>
            <span aria-hidden="true">·</span>
            <span>Client-Side Ingestion</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsRulesOpen(true)}
              className="text-emerald-400 hover:underline"
            >
              Inspect Rules
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
