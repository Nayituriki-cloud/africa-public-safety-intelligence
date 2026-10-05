import React, { useState } from 'react';
import { CrossBorderRequest, SupportedLanguage, UserSession, AfricanCountry } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile, downloadCsvFile } from '../utils/download';
import { 
  ArrowLeftRight, 
  ShieldCheck, 
  Send, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Mail, 
  Phone,
  Scale,
  AlertCircle,
  Download
} from 'lucide-react';

interface CrossBorderCooperationProps {
  requests: CrossBorderRequest[];
  countries: AfricanCountry[];
  onAddRequest: (req: CrossBorderRequest) => void;
  onUpdateRequestStatus: (id: string, status: CrossBorderRequest['status']) => void;
  language: SupportedLanguage;
  currentUser: UserSession;
}

export const CrossBorderCooperation: React.FC<CrossBorderCooperationProps> = ({
  requests,
  countries,
  onAddRequest,
  onUpdateRequestStatus,
  language,
  currentUser,
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>(requests[0]?.id || '');
  
  // New Request Form state
  const [requestingCountry, setRequestingCountry] = useState(currentUser.country || 'Rwanda');
  const [requestedCountry, setRequestedCountry] = useState('DR Congo');
  const [subjectName, setSubjectName] = useState('');
  const [caseRef, setCaseRef] = useState('');
  const [requestType, setRequestType] = useState<CrossBorderRequest['requestType']>('MUTUAL_LEGAL_ASSISTANCE');
  const [legalBasis, setLegalBasis] = useState('EAC Treaty Article 124 & Great Lakes Judicial Cooperation Protocol');
  const [urgency, setUrgency] = useState<CrossBorderRequest['urgency']>('URGENT');
  const [notes, setNotes] = useState('');

  const t = TRANSLATIONS[language];
  const activeRequest = requests.find((r) => r.id === selectedRequestId) || requests[0];

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim() || !caseRef.trim()) return;

    const newReq: CrossBorderRequest = {
      id: `CBR-2026-${Date.now().toString().slice(-4)}`,
      refNumber: `EAC-MLA-2026-${Math.floor(100 + Math.random() * 900)}`,
      requestingCountry,
      requestingAgency: currentUser.agency,
      requestedCountry,
      requestedAgency: countries.find((c) => c.name === requestedCountry)?.primaryAgency || 'National Police Central Bureau',
      caseRef: caseRef.trim(),
      subjectName: subjectName.trim(),
      requestType,
      status: 'TRANSMITTED',
      legalBasis,
      urgency,
      documents: [
        'Formal Letter of Request (Signed by Prosecutor General / Director of CID)',
        'Certified Court Warrant Copy',
        'Biometric & Identity Exhibit'
      ],
      contactPointName: currentUser.name,
      contactPointEmail: `${currentUser.name.toLowerCase().replace(' ', '.')}@${currentUser.country.toLowerCase()}.police.gov`,
      contactPointPhone: '+250 788 123 456',
      dateCreated: new Date().toISOString().slice(0, 10),
      notes: notes.trim(),
    };

    onAddRequest(newReq);
    setSelectedRequestId(newReq.id);
    setShowNewModal(false);
    setSubjectName('');
    setCaseRef('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Sovereign Cross-Border Judicial &amp; Police Cooperation
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Coordinating Mutual Legal Assistance (MLA), Extradition inquiries, and border notices between African National Central Bureaus (NCBs).
            <span className="text-amber-400 font-semibold block mt-0.5">
              Safeguard: Unauthorized operational information or live tactical tracking is strictly prohibited.
            </span>
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{t.crossBorder.newRequestBtn}</span>
        </button>
      </div>

      {/* Main Grid: Request List + Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Request List Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs uppercase tracking-wider">
              Bilateral Requests ({requests.length})
            </span>
            <button
              onClick={() => {
                const headers = ['RefNumber', 'Subject', 'RequestType', 'FromState', 'ToState', 'Status', 'Urgency', 'LegalBasis', 'Date'];
                const rows = requests.map(r => [
                  `"${r.refNumber}"`,
                  `"${r.subjectName}"`,
                  `"${r.requestType}"`,
                  `"${r.requestingCountry}"`,
                  `"${r.requestedCountry}"`,
                  `"${r.status}"`,
                  `"${r.urgency}"`,
                  `"${r.legalBasis}"`,
                  `"${r.dateCreated}"`
                ].join(','));
                downloadCsvFile(`CROSS_BORDER_INQUIRIES_${new Date().toISOString().slice(0, 10)}.csv`, [headers.join(','), ...rows].join('\n'));
              }}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold rounded flex items-center gap-1 transition-colors"
              title="Download all cross-border requests as CSV"
            >
              <Download className="w-3 h-3 text-blue-400" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto">
            {requests.map((req) => {
              const isSelected = req.id === activeRequest?.id;

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all text-xs space-y-2 ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 shadow-md ring-1 ring-blue-500/40 text-white'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-400">{req.refNumber}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                      {req.status}
                    </span>
                  </div>

                  <div className="font-semibold text-white">
                    {req.subjectName}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{req.requestingCountry}</span>
                    <ArrowLeftRight className="w-3 h-3 text-slate-600" />
                    <span>{req.requestedCountry}</span>
                  </div>

                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                    <span>Type: {req.requestType.replace('_', ' ')}</span>
                    <span>{req.dateCreated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Request Dossier Detail Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-5">
          {activeRequest ? (
            <>
              <div className="border-b border-slate-800 pb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
                    <span>{activeRequest.refNumber}</span>
                    <span>·</span>
                    <span>{activeRequest.requestType.replace('_', ' ')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Subject: {activeRequest.subjectName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Case Reference: <span className="font-mono text-slate-200">{activeRequest.caseRef}</span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block font-mono">
                    Urgency: {activeRequest.urgency}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    Transmitted: {activeRequest.dateCreated}
                  </span>
                  <button
                    onClick={() => {
                      const text = `
BILATERAL MUTUAL LEGAL ASSISTANCE (MLA) DOSSIER
REGIONAL PROTOCOL REFERENCE: ${activeRequest.refNumber}
CASE REFERENCE: ${activeRequest.caseRef}

REQUESTING SOVEREIGN STATE: ${activeRequest.requestingCountry} (${activeRequest.requestingAgency})
RECIPIENT SOVEREIGN STATE:  ${activeRequest.requestedCountry} (${activeRequest.requestedAgency})
SUBJECT OF INQUIRY:         ${activeRequest.subjectName}
CATEGORY OF ASSISTANCE:     ${activeRequest.requestType}
TRANSMISSION STATUS:        ${activeRequest.status}
PRIORITY / URGENCY TIER:    ${activeRequest.urgency}
DATE TRANSMITTED:           ${activeRequest.dateCreated}

TREATY & STATUTORY LEGAL BASIS:
${activeRequest.legalBasis}

LIAISON INVESTIGATIVE NOTES:
${activeRequest.notes || 'None recorded'}

SECURE ATTACHED JUDICIAL DOCUMENTS:
${activeRequest.documents.map((d, i) => `[${i + 1}] ${d}`).join('\n')}

AUTHORIZED LIAISON CONTACT POINT:
Officer: ${activeRequest.contactPointName}
Email:   ${activeRequest.contactPointEmail}
Phone:   ${activeRequest.contactPointPhone}

HUMAN RIGHTS & NON-REFOULEMENT GUARANTEE:
In accordance with the African Charter on Human and Peoples' Rights and sovereign laws,
all mutual assistance actions must uphold due process and the presumption of innocence.
`;
                      downloadTextFile(`${activeRequest.refNumber}_MLA_DOSSIER.txt`, text);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
                    title="Download complete bilateral mutual assistance dossier"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download MLA Package</span>
                  </button>
                </div>
              </div>

              {/* Bilateral States Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Requesting Sovereign State</span>
                  <span className="font-bold text-white text-sm">{activeRequest.requestingCountry}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{activeRequest.requestingAgency}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Recipient Sovereign State</span>
                  <span className="font-bold text-white text-sm">{activeRequest.requestedCountry}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{activeRequest.requestedAgency}</span>
                </div>
              </div>

              {/* Legal Treaty & Statutory Basis */}
              <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                  Treaty &amp; Legal Framework:
                </span>
                <p className="text-slate-200 font-medium">
                  {activeRequest.legalBasis}
                </p>
                {activeRequest.notes && (
                  <p className="text-slate-400 text-[11px] pt-1 italic">
                    Liaison Notes: "{activeRequest.notes}"
                  </p>
                )}
              </div>

              {/* Secure Document Transfer Manifest */}
              <div className="space-y-2">
                <span className="font-bold text-white text-xs block uppercase tracking-wider">
                  Secure Attached Judicial Documents ({activeRequest.documents.length})
                </span>
                <div className="space-y-1.5">
                  {activeRequest.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 font-mono flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span>{doc}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">SEALED TRUE COPY</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authorized Liaison Contact Points */}
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-white text-[11px] block uppercase">
                  Authorized National Central Bureau Liaison:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-mono text-[10px]">Officer:</span>
                    <span className="font-medium">{activeRequest.contactPointName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{activeRequest.contactPointEmail}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>{activeRequest.contactPointPhone}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Trigger */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Update Status Synchronization:</span>
                <select
                  value={activeRequest.status}
                  onChange={(e) => onUpdateRequestStatus(activeRequest.id, e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-white rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="PENDING_APPROVAL">PENDING APPROVAL</option>
                  <option value="TRANSMITTED">TRANSMITTED</option>
                  <option value="ACKNOWLEDGED">ACKNOWLEDGED BY RECIPIENT</option>
                  <option value="IN_PROGRESS">IN PROGRESS / BILATERAL REVIEW</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REJECTED">REJECTED / INSUFFICIENT EV</option>
                </select>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-slate-500 text-xs">
              Select a cross-border request to view full judicial details.
            </div>
          )}
        </div>
      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-blue-400" />
                <span>Initiate Bilateral Mutual Assistance Request</span>
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Requesting State:</label>
                  <select
                    value={requestingCountry}
                    onChange={(e) => setRequestingCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Requested Recipient State:</label>
                  <select
                    value={requestedCountry}
                    onChange={(e) => setRequestedCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Subject Full Name / Target Entity:</label>
                <input
                  type="text"
                  required
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Jean-Pierre Mugabo Hakizimana"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Case Reference Number:</label>
                  <input
                    type="text"
                    required
                    value={caseRef}
                    onChange={(e) => setCaseRef(e.target.value)}
                    placeholder="e.g. RWA-RIB-2026-W019"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Request Category:</label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                  >
                    <option value="MUTUAL_LEGAL_ASSISTANCE">Mutual Legal Assistance (MLA)</option>
                    <option value="EXTRADITION_INQUIRY">Extradition Inquiry</option>
                    <option value="BORDER_ALERT_NOTICE">Border Alert Notice</option>
                    <option value="BIOMETRIC_VERIFICATION">Biometric Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Statutory / Treaty Grounding:</label>
                <input
                  type="text"
                  value={legalBasis}
                  onChange={(e) => setLegalBasis(e.target.value)}
                  placeholder="e.g. EAC Treaty Article 124 or SADC Extradition Protocol"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Investigative Notes &amp; Specific Request:</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail the exact border checkpoint inspection, bank transaction freeze, or witness statement required..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-lg shadow"
                >
                  Transmit Official Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
