import React, { useState } from 'react';
import { WantedPerson, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile, generateWantedBulletinText } from '../utils/download';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Calendar, 
  Send, 
  ExternalLink, 
  Scale, 
  Lock,
  Copy,
  Check,
  Download
} from 'lucide-react';

interface WantedPersonModalProps {
  person: WantedPerson | null;
  onClose: () => void;
  onSubmitTipForPerson: (person: WantedPerson) => void;
  language: SupportedLanguage;
  lowBandwidth: boolean;
}

export const WantedPersonModal: React.FC<WantedPersonModalProps> = ({
  person,
  onClose,
  onSubmitTipForPerson,
  language,
  lowBandwidth,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  if (!person) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(person.refNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Official Judicial Warrant Dossier
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {person.status}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Issuing Sovereign Jurisdiction: <strong className="text-slate-200">{person.issuingCountry} ({person.issuingAuthority})</strong>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Due Process & Legal Safeguard Banner */}
        <div className="bg-emerald-950/40 border-b border-emerald-900/60 px-6 py-2.5 flex items-start gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">CONSTITUTIONAL DUE PROCESS GUARANTEE:</span>{' '}
            {person.legalSafeguards}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Info Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Photograph or Placeholder */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-[3/4] rounded-lg border-2 border-slate-700 bg-slate-950 overflow-hidden relative shadow-lg">
                {!lowBandwidth ? (
                  <img
                    src={person.photoUrl}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400">
                    <Lock className="w-8 h-8 mb-2 text-slate-600" />
                    <span className="text-xs font-mono">Biometric Image Suppressed (Low-Bandwidth Mode)</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-slate-950/90 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                  {person.countryCode}
                </div>
              </div>
              <div className="mt-2 text-center text-[11px] text-slate-400 font-mono">
                Verified Facial Recognition Checksum · OK
              </div>
            </div>

            {/* Core Identification Data */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-black text-white">{person.name}</h1>
                  <button
                    onClick={handleCopyRef}
                    className="flex items-center gap-1 text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{person.refNumber}</span>
                  </button>
                </div>

                {person.verifiedAliases.length > 0 && (
                  <div className="mt-1 text-xs text-slate-300">
                    <span className="text-slate-500 font-medium">Verified Aliases: </span>
                    {person.verifiedAliases.map((alias, i) => (
                      <span key={i} className="font-mono text-emerald-400 mr-2">
                        "{alias}"{i < person.verifiedAliases.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Physical Descriptors Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Nationality</span>
                  <span className="font-semibold text-slate-200">{person.nationality}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Age / Gender</span>
                  <span className="font-semibold text-slate-200">{person.age || 'N/A'} yrs · {person.gender || 'M'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Height</span>
                  <span className="font-semibold text-slate-200">{person.height || 'Unrecorded'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Risk Tier</span>
                  <span className="font-bold text-rose-400 font-mono">{person.riskLevel}</span>
                </div>
              </div>

              {/* Detailed Physical Marks & Languages */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-500 font-semibold block mb-1 uppercase text-[10px]">
                  Physical Identifiers &amp; Language Profiling:
                </span>
                {person.physicalDescription}
              </div>

              {/* Last Verified Location & Border Post */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Last Verified Sighting Corridor:</div>
                  <div className="text-slate-300">{person.lastKnownLocation}</div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    Active Watch Border Checkpoints:{' '}
                    <span className="text-emerald-400 font-mono">
                      {person.borderPointsOfInterest.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charges and Statutory Indictment Details */}
          <div className="border border-slate-800 rounded-lg p-4 bg-slate-950/70 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wide">
              <FileText className="w-4 h-4 text-emerald-400" />
              Formal Indictment &amp; Statutory Warrant Particulars
            </div>

            <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-300">
              {person.charges.map((charge, idx) => (
                <li key={idx} className="font-medium">
                  {charge}
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Warrant Judicial Number:</span>
                <span className="font-mono text-slate-200 font-semibold">{person.warrantNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Date of Judicial Issue:</span>
                <span className="font-mono text-slate-200">{person.warrantDate}</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              Legal Text: {person.warrantDetails}
            </div>
          </div>

          {/* Public Safety Warning Callout */}
          <div className="p-4 bg-rose-950/40 border border-rose-800/70 rounded-lg flex items-start gap-3 text-xs text-rose-200">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold uppercase tracking-wider text-rose-300">
                PUBLIC SAFETY INSTRUCTION (LAW ENFORCEMENT DIRECTIVE):
              </div>
              <div className="mt-1 font-medium">{person.publicSafetyInstruction}</div>
              <div className="mt-1 text-[11px] text-rose-400">
                Official Law Enforcement Source: {person.officialSource}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Dossier Verified on <span className="font-mono text-slate-400">{person.dateVerified}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const text = generateWantedBulletinText(person);
                downloadTextFile(`${person.refNumber}_WANTED_BULLETIN.txt`, text);
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              title="Download official wanted bulletin for border checkpoint distribution"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Dossier Notice</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSubmitTipForPerson(person);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md flex items-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Secure Tip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
