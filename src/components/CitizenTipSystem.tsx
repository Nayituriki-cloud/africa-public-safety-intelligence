import React, { useState } from 'react';
import { CitizenTip, WantedPerson, SupportedLanguage, UserSession } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile, downloadCsvFile } from '../utils/download';
import { 
  MessageSquareWarning, 
  ShieldCheck, 
  AlertTriangle, 
  Send, 
  Lock, 
  Upload, 
  CheckCircle2, 
  Copy, 
  Check, 
  PhoneCall, 
  MapPin, 
  Clock,
  UserCheck,
  Download
} from 'lucide-react';

interface CitizenTipSystemProps {
  tips: CitizenTip[];
  wantedPersons: WantedPerson[];
  onSubmitTip: (tip: Omit<CitizenTip, 'id' | 'tipNumber' | 'submissionDate' | 'status'>) => CitizenTip;
  onUpdateTipStatus: (tipId: string, status: CitizenTip['status'], notes?: string) => void;
  language: SupportedLanguage;
  currentUser: UserSession;
  preselectedCaseRef?: string;
}

export const CitizenTipSystem: React.FC<CitizenTipSystemProps> = ({
  tips,
  wantedPersons,
  onSubmitTip,
  onUpdateTipStatus,
  language,
  currentUser,
  preselectedCaseRef,
}) => {
  const [caseRef, setCaseRef] = useState(preselectedCaseRef || '');
  const [narrative, setNarrative] = useState('');
  const [location, setLocation] = useState('');
  const [borderPost, setBorderPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contactChannel, setContactChannel] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [searchToken, setSearchToken] = useState('');
  const [searchedTip, setSearchedTip] = useState<CitizenTip | null>(null);

  // Officer triage note
  const [selectedTriageTipId, setSelectedTriageTipId] = useState<string | null>(null);
  const [triageNote, setTriageNote] = useState('');

  const t = TRANSLATIONS[language];
  const isAuthorizedOfficer = currentUser.role !== 'CITIZEN_PUBLIC';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!narrative.trim()) return;

    const anonymityToken = isAnonymous
      ? `ANON-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      : `CITIZEN-${contactChannel || 'DIRECT'}`;

    const selectedPerson = wantedPersons.find((p) => p.refNumber === caseRef);

    const created = onSubmitTip({
      caseRef: caseRef || 'GENERAL_BORDER_ALERT',
      wantedPersonName: selectedPerson ? selectedPerson.name : undefined,
      narrative: narrative.trim(),
      location: location.trim() || 'Unspecified Corridor',
      borderPost: borderPost.trim() || undefined,
      isAnonymous,
      anonymityToken,
      urgencyScore: narrative.toLowerCase().includes('weapon') || narrative.toLowerCase().includes('border') ? 'IMMEDIATE' : 'HIGH',
      hasMediaAttached: Boolean(attachedFile),
      contactChannel: isAnonymous ? undefined : contactChannel,
    });

    setGeneratedToken(anonymityToken);
    setNarrative('');
    setLocation('');
    setBorderPost('');
    setAttachedFile(null);
  };

  const handleSearchByToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchToken.trim()) return;
    const found = tips.find((t) => t.anonymityToken.toLowerCase() === searchToken.trim().toLowerCase());
    setSearchedTip(found || null);
  };

  return (
    <div className="space-y-6">
      {/* Prominent Safety Warning Banner */}
      <div className="bg-rose-950/80 border-2 border-rose-800 rounded-xl p-5 text-center shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 text-rose-300 font-extrabold text-base tracking-wider uppercase">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>IMPORTANT PUBLIC SAFETY WARNING</span>
        </div>
        <p className="text-sm font-bold text-white max-w-3xl mx-auto">
          “DO NOT APPROACH OR CONFRONT A WANTED PERSON. Contact the appropriate authorities immediately.”
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-rose-200">
          <span className="flex items-center gap-1.5 font-mono">
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" /> Rwanda Emergency: <strong>112 / RIB 166</strong>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5 font-mono">
            Kenya Police Hotline: <strong>999 / 0800 722 203</strong>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5 font-mono">
            South Africa Crime Stop: <strong>08600 10111</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tip Submission Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <MessageSquareWarning className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                {t.tips.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t.tips.subtitle}
            </p>
          </div>

          {/* Anonymity Banner */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">ZERO-LOG CITIZEN PROTECTION: </span>
              {t.tips.anonymousNotice}
            </div>
          </div>

          {generatedToken && (
            <div className="p-4 bg-slate-950 border border-emerald-500 rounded-lg space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tip Successfully Transmitted to Central Triage Queue</span>
              </div>
              <p className="text-slate-300">
                {t.tips.tokenNotice}
              </p>
              <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded border border-slate-800 font-mono text-emerald-300 font-bold">
                <span className="flex-1">{generatedToken}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const receipt = `
SOVEREIGN PUBLIC SAFETY PLATFORM - CITIZEN ANONYMOUS TIP RECEIPT
========================================================================
RECEIPT TOKEN:        ${generatedToken}
SUBMISSION TIMESTAMP: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}
STATUS:               RECEIVED IN CENTRAL TRIAGE QUEUE

INSTRUCTIONS:
Keep this cryptographic tracking token safe. You can check the verification
status on the Citizen Tips portal without revealing your identity or location.
Personal IP addresses and device telemetry have been stripped in compliance
with the African Union Malabo Convention.
========================================================================
`;
                      downloadTextFile(`${generatedToken}_RECEIPT.txt`, receipt);
                    }}
                    className="px-2 py-1 bg-slate-800 text-xs rounded hover:bg-slate-700 text-slate-200 flex items-center gap-1 border border-slate-700"
                    title="Download offline receipt token"
                  >
                    <Download className="w-3 h-3 text-emerald-400" />
                    <span>Download Receipt</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedToken);
                      setCopiedToken(true);
                      setTimeout(() => setCopiedToken(false), 2000);
                    }}
                    className="px-2 py-1 bg-slate-800 text-xs rounded hover:bg-slate-700 text-white flex items-center gap-1"
                  >
                    {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Case Selector */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {t.tips.selectCase}
              </label>
              <select
                value={caseRef}
                onChange={(e) => setCaseRef(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="">-- General Border / Public Safety Intelligence --</option>
                {wantedPersons.map((p) => (
                  <option key={p.id} value={p.refNumber}>
                    {p.refNumber} - {p.name} ({p.issuingCountry})
                  </option>
                ))}
              </select>
            </div>

            {/* Narrative Box */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {t.tips.narrativeLabel} <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder={t.tips.narrativePlaceholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Location & Border Post */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {t.tips.locationLabel}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Rubavu, Gisenyi market area"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {t.tips.borderPostLabel}
                </label>
                <input
                  type="text"
                  value={borderPost}
                  onChange={(e) => setBorderPost(e.target.value)}
                  placeholder="e.g. Grande Barrière / Gatuna"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Mock Media Upload */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {t.tips.uploadLabel}
              </label>
              <div className="border border-dashed border-slate-700 bg-slate-950/60 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors">
                <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                <span className="text-[11px] text-slate-400 block">
                  Click to simulate attaching documentary evidence or image
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Metadata (GPS, EXIF, Device ID) is automatically stripped on server
                </span>
                {attachedFile && (
                  <span className="mt-2 inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                    Attached: {attachedFile}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setAttachedFile(`evidence_doc_${Date.now().toString().slice(-4)}.jpg`)}
                className="mt-1 text-[11px] text-emerald-400 hover:underline"
              >
                + Attach Simulated File
              </button>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 text-slate-300 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span>Submit 100% Anonymously (No personal contact requested)</span>
              </label>
            </div>

            {!isAnonymous && (
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Optional Contact Channel (Phone / Email) for Detective Follow-up
                </label>
                <input
                  type="text"
                  value={contactChannel}
                  onChange={(e) => setContactChannel(e.target.value)}
                  placeholder="e.g. +250 788 000 000 / secure@mail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{t.tips.submitButton}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Tracking Check & Authorized Officer Triage */}
        <div className="lg:col-span-5 space-y-6">
          {/* Citizen Anonymous Status Lookup */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Track Tip Status Safely</h3>
            </div>
            <p className="text-xs text-slate-400">
              Enter your anonymous tracking receipt token to check investigative verification progress:
            </p>

            <form onSubmit={handleSearchByToken} className="flex gap-2 text-xs">
              <input
                type="text"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                placeholder="e.g. ANON-RWA-7728-KIG"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg"
              >
                Lookup
              </button>
            </form>

            {searchedTip && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-400 font-bold">{searchedTip.tipNumber}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">
                    Status: {searchedTip.status}
                  </span>
                </div>
                <div className="text-slate-300">
                  Case: <strong>{searchedTip.caseRef}</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  Submitted: {searchedTip.submissionDate}
                </div>
                {searchedTip.humanReviewNotes && (
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300 italic text-[11px]">
                    Detective Review Note: "{searchedTip.humanReviewNotes}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Authorized Officer Triage Board */}
          {isAuthorizedOfficer && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Officer Tip Triage Queue</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const headers = ['TipNumber', 'CaseRef', 'Urgency', 'Location', 'BorderPost', 'SubmissionDate', 'Anonymous', 'Status', 'ReviewNotes'];
                      const rows = tips.map(t => [
                        `"${t.tipNumber}"`,
                        `"${t.caseRef}"`,
                        `"${t.urgencyScore}"`,
                        `"${t.location}"`,
                        `"${t.borderPost || 'N/A'}"`,
                        `"${t.submissionDate}"`,
                        `"${t.isAnonymous}"`,
                        `"${t.status}"`,
                        `"${t.humanReviewNotes || ''}"`
                      ].join(','));
                      downloadCsvFile(`CITIZEN_TIPS_TRIAGE_${new Date().toISOString().slice(0, 10)}.csv`, [headers.join(','), ...rows].join('\n'));
                    }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-semibold rounded flex items-center gap-1 transition-colors"
                    title="Export tips list as CSV"
                  >
                    <Download className="w-3 h-3 text-amber-400" />
                    <span>Export CSV</span>
                  </button>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {tips.length} Pending
                  </span>
                </div>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto">
                {tips.map((tip) => (
                  <div
                    key={tip.id}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white">{tip.tipNumber}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                        {tip.urgencyScore}
                      </span>
                    </div>

                    <div className="text-slate-300 font-medium line-clamp-2">
                      "{tip.narrative}"
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{tip.location}</span>
                      <span>{tip.submissionDate.slice(0, 10)}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <select
                        value={tip.status}
                        onChange={(e) => onUpdateTipStatus(tip.id, e.target.value as CitizenTip['status'])}
                        className="bg-slate-900 border border-slate-800 text-slate-200 text-[11px] rounded px-2 py-1"
                      >
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="TRIAGE">IN TRIAGE</option>
                        <option value="HUMAN_VERIFYING">HUMAN VERIFYING</option>
                        <option value="ESCALATED">ESCALATED TO AGENCY</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="DISMISSED">DISMISSED</option>
                      </select>

                      <span className="text-[10px] text-slate-400 font-mono">
                        {tip.isAnonymous ? 'ANON' : 'VERIFIED ID'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
