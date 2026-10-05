import React, { useState } from 'react';
import { Mission, SupportedLanguage, UserSession } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile } from '../utils/download';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Scale, 
  Copy, 
  Check, 
  Building2, 
  Calendar 
} from 'lucide-react';

interface ReportsViewProps {
  missions: Mission[];
  language: SupportedLanguage;
  currentUser: UserSession;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ missions, language, currentUser }) => {
  const [selectedReportType, setSelectedReportType] = useState('MLA');
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  const activeMission = missions[0];

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleReportText = `
SOVEREIGN DEMOCRATIC REPUBLIC OF RWANDA
NATIONAL PUBLIC PROSECUTION AUTHORITY (NPPA) & RWANDA INVESTIGATION BUREAU (RIB)
CENTRAL TRANSNATIONAL CRIME & MUTUAL LEGAL ASSISTANCE DIRECTORATE
KIGALI, REPUBLIC OF RWANDA

DOCUMENT CLASSIFICATION: OFFICIAL // LEVEL-3 CONFIDENTIAL
TREATY LEGAL BASIS: EAST AFRICAN COMMUNITY TREATY (ARTICLE 124) & GREAT LAKES BILATERAL PROTOCOL
DATE OF ISSUANCE: 2026-10-04
DOSSIER REFERENCE: NPPA/MLA/RW-CD/2026/089
INTERPOL NCB KIGALI REF: A-2026/8941

TO:
LE PROCUREUR GÉNÉRAL PRÈS LA COUR D'APPEL DE GOMA
ET LE COMMISSARIAT PROVINCIAL DE LA POLICE NATIONALE CONGOLAISE (PNC)
NORD-KIVU, RÉPUBLIQUE DÉMOCRATIQUE DU CONGO

SUBJECT: FORMAL REQUEST FOR MUTUAL LEGAL ASSISTANCE AND ARREST UNDER HIGH COURT WARRANT
IN RE: JEAN-PIERRE MUGABO HAKIZIMANA (WARRANT #HC-RW-2026-0411)

1. STATUTORY JURISDICTION & STATEMENT OF FACT:
The High Court of Rwanda (Chamber of Commercial and Financial Crimes) issued an arrest warrant on 14 February 2026 for the above-named fugitive on charges of Aggravated Transnational Cybercrime and Wire Laundering in excess of USD 4,200,000, contrary to Articles 287 and 312 of Law No 68/2018.

2. FORENSIC EVIDENCE SUMMARY:
- Bank electronic transaction logs linking shell corporations across Kigali, Rubavu, and Goma.
- Cryptographic hash verification of altered EAC biometric travel booklet #RW-T-99214.
- Verified physical sighting in the Gisenyi/Goma commercial corridor on 27 September 2026.

3. SOUGHT JUDICIAL ASSISTANCE:
a) Execution of provisional arrest pending formal extradition under the EAC Protocol.
b) Lawful search and preservation of electronic computing hardware without violation of personal privacy laws.
c) Notification of the Rwandan Liaison Magistrate attached to the Goma Coordination Desk.

4. HUMAN RIGHTS AND DUE PROCESS ATTESTATION:
Under Article 15 of the Rwandan Constitution and the African Charter on Human and Peoples' Rights:
The accused is guaranteed the absolute right to legal counsel, presumption of innocence until proven guilty by a competent court of law, humane detention conditions, and freedom from torture or degrading treatment.

CERTIFIED AND APPROVED:
Hon. Providence Uwera, State Prosecution Counsel (NPPA)
Chief Supt. Alexis Habimana, Directorate of Criminal Investigations (RIB)
DIGITAL INTEGRITY CHECKSUM: SHA256:7c9b81f00a43b22e1199a...VERIFIED
`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Judicial Intelligence &amp; Mission Reports Dossier
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sovereign administrative briefs, Mutual Legal Assistance (MLA) petitions, and regional police council dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              downloadTextFile(`OFFICIAL_REPORT_${selectedReportType}_${new Date().toISOString().slice(0, 10)}.txt`, sampleReportText);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            title="Download official report dossier as text"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download Dossier</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Brief</span>
          </button>
        </div>
      </div>

      {/* Report Types Filter */}
      <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto">
        {[
          { id: 'MLA', label: 'Mutual Legal Assistance (MLA) Petition' },
          { id: 'EXTRADITION', label: 'Bilateral Extradition Advisory' },
          { id: 'SUMMIT', label: 'EACAPO Regional Summit Brief' },
          { id: 'AUDIT', label: 'AU Malabo Data Privacy Audit' },
        ].map((rt) => (
          <button
            key={rt.id}
            onClick={() => setSelectedReportType(rt.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              selectedReportType === rt.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Official Legal Document Paper View */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl space-y-6 max-w-4xl mx-auto">
        <div className="border-b-2 border-slate-700 pb-4 text-center space-y-1">
          <div className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
            SOVEREIGN DEMOCRATIC REPUBLIC OF RWANDA
          </div>
          <h1 className="text-base font-extrabold text-white tracking-wide">
            NATIONAL PUBLIC PROSECUTION AUTHORITY &amp; RWANDA INVESTIGATION BUREAU
          </h1>
          <div className="text-xs text-slate-400">
            Transnational Crimes &amp; Mutual Legal Assistance Directorate · Kigali Hub
          </div>
        </div>

        <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-950 p-6 rounded-lg border border-slate-800 overflow-x-auto">
          {sampleReportText}
        </pre>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>African Union Malabo Convention Certified</span>
          <span>Verified Officer: {currentUser.name} ({currentUser.agency})</span>
        </div>
      </div>
    </div>
  );
};
