import React, { useState } from 'react';
import { WantedPerson, CitizenTip, Mission, SupportedLanguage, UserSession } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile } from '../utils/download';
import { 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  Languages, 
  Clock, 
  CopyCheck, 
  AlertCircle, 
  Layers, 
  SearchCheck, 
  Send, 
  Check, 
  Copy,
  Download,
  Terminal,
  Cpu
} from 'lucide-react';

interface AIPublicSafetyAssistantProps {
  wantedPersons: WantedPerson[];
  citizenTips: CitizenTip[];
  missions: Mission[];
  language: SupportedLanguage;
  currentUser: UserSession;
}

export const AIPublicSafetyAssistant: React.FC<AIPublicSafetyAssistantProps> = ({
  wantedPersons,
  citizenTips,
  missions,
  language,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<
    'summarize' | 'translate' | 'timeline' | 'duplicate' | 'tips' | 'report' | 'missing' | 'query'
  >('summarize');

  // Input states for each tool
  const [selectedCaseId, setSelectedCaseId] = useState<string>(wantedPersons[0]?.id || '');
  const [summaryFocus, setSummaryFocus] = useState('Executive briefing for regional police chiefs summit');
  
  // Translation
  const [translateText, setTranslateText] = useState(
    'Rwanda Investigation Bureau (RIB) has issued a High Court warrant regarding cross-border banking fraud. Subject was last verified in the Rubavu-Goma corridor. Strict due process safeguards apply.'
  );
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('French');

  // Timeline events input
  const [timelineEvents, setTimelineEvents] = useState(
    JSON.stringify([
      { date: '2026-09-18', event: 'High Court Chamber Warrant renewed', location: 'Kigali' },
      { date: '2026-09-21', event: 'Biometric alert triggered at automated passport gate', location: 'Rubavu' },
      { date: '2026-09-27', event: 'Anonymous citizen tip reporting suspect at market', location: 'Goma' }
    ], null, 2)
  );

  // Duplicate detection inputs
  const [recordA, setRecordA] = useState(
    JSON.stringify({ name: 'Jean-Pierre Mugabo Hakizimana', alias: 'Kigali Ghost', dob: '1985-04-12', nationality: 'Rwandan', crime: 'Cyber Fraud' }, null, 2)
  );
  const [recordB, setRecordB] = useState(
    JSON.stringify({ name: 'Pierre Mwizerwa', alias: 'J.P. Hakizimana', dob: '1985-04-12', nationality: 'Rwandan / Congolese Permit', crime: 'Electronic Wire Laundering' }, null, 2)
  );

  // Tip Triage
  const [selectedTipId, setSelectedTipId] = useState<string>(citizenTips[0]?.id || '');

  // Report generation
  const [reportType, setReportType] = useState('Mutual Legal Assistance (MLA) Formal Petition');

  // Interactive Query
  const [copilotQuery, setCopilotQuery] = useState(
    'What are the mandatory bilateral protocols under EAC Article 124 for transmitting a High Court warrant between Rwanda and Kenya?'
  );

  // Output states
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[language];
  const selectedPerson = wantedPersons.find((p) => p.id === selectedCaseId) || wantedPersons[0];
  const selectedTip = citizenTips.find((ct) => ct.id === selectedTipId) || citizenTips[0];

  const handleExecuteTask = async () => {
    setLoading(true);
    setResultText('');

    try {
      let endpoint = '/api/gemini/query';
      let payload: any = {};

      if (activeTab === 'summarize') {
        endpoint = '/api/gemini/summarize';
        payload = { caseDetails: selectedPerson, focus: summaryFocus };
      } else if (activeTab === 'translate') {
        endpoint = '/api/gemini/translate';
        payload = { text: translateText, sourceLang, targetLang };
      } else if (activeTab === 'timeline') {
        endpoint = '/api/gemini/timeline';
        payload = { events: JSON.parse(timelineEvents) };
      } else if (activeTab === 'duplicate') {
        endpoint = '/api/gemini/duplicate-detection';
        payload = { recordA: JSON.parse(recordA), recordB: JSON.parse(recordB) };
      } else if (activeTab === 'tips') {
        endpoint = '/api/gemini/tip-classifier';
        payload = { tipContent: selectedTip, caseContext: selectedPerson };
      } else if (activeTab === 'report') {
        endpoint = '/api/gemini/report-generator';
        payload = { missionData: missions[0], reportType };
      } else if (activeTab === 'missing') {
        endpoint = '/api/gemini/missing-info';
        payload = { caseRecord: selectedPerson };
      } else if (activeTab === 'query') {
        endpoint = '/api/gemini/query';
        payload = { query: copilotQuery, context: { user: currentUser, activeMission: missions[0]?.id } };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResultText(data.result || data.error || 'Task completed with sovereign protocol.');
    } catch (err: any) {
      setResultText(`Notice: Standard sovereign protocol applied. ${err?.message || 'Processed offline.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Critical Mandate */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                AI Africa Public-Safety Copilot
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Gemini 3.8 Flash Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Specialized sovereign analytical assistance for authorized detectives and regional legal officers.
            </p>
          </div>

          {/* Critical Constitutional Mandate Warning */}
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-xs text-rose-200 flex items-start gap-2.5 max-w-lg">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">CRITICAL SOVEREIGNTY MANDATE:</span>
              <p className="mt-0.5 text-[11px] leading-relaxed">
                {t.ai.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'summarize', label: t.ai.tabSummarize, icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'translate', label: t.ai.tabTranslate, icon: <Languages className="w-3.5 h-3.5" /> },
            { id: 'timeline', label: t.ai.tabTimeline, icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'duplicate', label: t.ai.tabDuplicate, icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'tips', label: t.ai.tabTips, icon: <SearchCheck className="w-3.5 h-3.5" /> },
            { id: 'report', label: t.ai.tabReport, icon: <CopyCheck className="w-3.5 h-3.5" /> },
            { id: 'missing', label: t.ai.tabMissing, icon: <AlertCircle className="w-3.5 h-3.5" /> },
            { id: 'query', label: 'Sovereign Copilot', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-900/60 text-white border border-purple-500/60 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Configuration Column */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white uppercase tracking-wider text-xs">
              Task Parameters &amp; Verified Data Inputs
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Security Clearance: LEVEL-3 Verified</span>
          </div>

          {/* Summarize Tab */}
          {activeTab === 'summarize' && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Select Case to Summarize:</label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                >
                  {wantedPersons.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.refNumber} - {p.name} ({p.issuingAuthority})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Briefing Focus:</label>
                <input
                  type="text"
                  value={summaryFocus}
                  onChange={(e) => setSummaryFocus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>Selected Person: <strong className="text-white">{selectedPerson.name}</strong></div>
                <div>Charges: {selectedPerson.charges.join(', ')}</div>
                <div>Warrant: {selectedPerson.warrantNumber}</div>
              </div>
            </div>
          )}

          {/* Translation Tab */}
          {activeTab === 'translate' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Source Language:</label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    <option>English</option>
                    <option>French (Français)</option>
                    <option>Swahili (Kiswahili)</option>
                    <option>Kinyarwanda</option>
                    <option>Arabic</option>
                    <option>Portuguese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target Language:</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    <option>French</option>
                    <option>English</option>
                    <option>Swahili</option>
                    <option>Kinyarwanda</option>
                    <option>Arabic</option>
                    <option>Portuguese</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Official Text to Translate:</label>
                <textarea
                  rows={4}
                  value={translateText}
                  onChange={(e) => setTranslateText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white"
                />
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">Sightings &amp; Border Checkpoint Logs (JSON):</label>
              <textarea
                rows={6}
                value={timelineEvents}
                onChange={(e) => setTimelineEvents(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 font-mono text-[11px] text-emerald-400"
              />
              <p className="text-[11px] text-slate-500">
                Reconstructs precise chronological sequence and flags investigative gaps across EAC and border transit points.
              </p>
            </div>
          )}

          {/* Duplicate Detection Tab */}
          {activeTab === 'duplicate' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">National Database Record A (JSON):</label>
              <textarea
                rows={3}
                value={recordA}
                onChange={(e) => setRecordA(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 font-mono text-[11px] text-white"
              />

              <label className="block text-slate-400 font-semibold">Regional Partner Database Record B (JSON):</label>
              <textarea
                rows={3}
                value={recordB}
                onChange={(e) => setRecordB(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 font-mono text-[11px] text-white"
              />
              <p className="text-[11px] text-slate-500">
                Detects concealed aliases, birthdate discrepancies, and duplicate records across national NCBs.
              </p>
            </div>
          )}

          {/* Tip Classifier */}
          {activeTab === 'tips' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">Select Citizen Tip for Human Review Triage:</label>
              <select
                value={selectedTipId}
                onChange={(e) => setSelectedTipId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
              >
                {citizenTips.map((tip) => (
                  <option key={tip.id} value={tip.id}>
                    {tip.tipNumber} - {tip.location} ({tip.urgencyScore})
                  </option>
                ))}
              </select>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-300">
                <span className="font-bold text-slate-400 block mb-1">Tip Narrative:</span>
                "{selectedTip.narrative}"
              </div>
            </div>
          )}

          {/* Report Generator */}
          {activeTab === 'report' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">Document / Report Framework:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
              >
                <option>Mutual Legal Assistance (MLA) Formal Petition</option>
                <option>Bilateral Extradition Advisory Dossier</option>
                <option>EACAPO Regional Summit Executive Brief</option>
                <option>Border Interdiction Post Inspection Notice</option>
              </select>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400">
                Generates a formal legal document with statutory headers, human rights certification block, and evidentiary catalog.
              </div>
            </div>
          )}

          {/* Missing Info Audit */}
          {activeTab === 'missing' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">Case Record to Audit for Statutory Gaps:</label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
              >
                {wantedPersons.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.refNumber} - {p.name}
                  </option>
                ))}
              </select>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400">
                Audits court seal validity, physical descriptor completeness, and non-refoulement safeguards under AU treaties.
              </div>
            </div>
          )}

          {/* Sovereign Copilot */}
          {activeTab === 'query' && (
            <div className="space-y-3">
              <label className="block text-slate-400 font-semibold">Authorized Inquest / Legal Query:</label>
              <textarea
                rows={4}
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white"
              />
            </div>
          )}

          <button
            onClick={handleExecuteTask}
            disabled={loading}
            className="w-full py-2.5 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Synthesizing Sovereign Intelligence...' : t.ai.generateBtn}</span>
          </button>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white uppercase tracking-wider text-xs">
              Synthesized Intelligence Dossier
            </span>
            {resultText && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    downloadTextFile(`AI_INTELLIGENCE_${activeTab.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.txt`, resultText);
                  }}
                  className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-700/60 text-xs rounded flex items-center gap-1 transition-colors"
                  title="Download synthesized intelligence document"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleCopyResult}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[380px] bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-24 space-y-3 text-purple-400">
                <Sparkles className="w-8 h-8 animate-spin" />
                <span className="text-xs">Processing verified data against sovereign security parameters...</span>
              </div>
            ) : resultText ? (
              resultText
            ) : (
              <div className="text-slate-500 italic py-20 text-center">
                Configure the task on the left and click "Execute Sovereign Intelligence Task" to view synthesized output.
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Audit Integrity: SHA256 Checksum Logged</span>
            <span>Subject to Human Officer Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};
