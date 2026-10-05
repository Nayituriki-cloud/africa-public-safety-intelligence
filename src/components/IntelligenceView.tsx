import React from 'react';
import { RegionalAlert, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Cpu, 
  AlertTriangle, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface IntelligenceViewProps {
  alerts: RegionalAlert[];
  language: SupportedLanguage;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ alerts, language }) => {
  const t = TRANSLATIONS[language];

  const syndicates = [
    {
      id: 'SYN-01',
      name: 'Great Lakes Cyber & Financial Wire Ring',
      leadSuspect: 'Jean-Pierre Mugabo Hakizimana (RWA-RIB-2026-W019)',
      threatLevel: 'CRITICAL',
      focus: 'SWIFT switchboard spoofing and fraudulent foreign exchange permits across EAC banks.',
      affectedRegions: 'Rwanda, DR Congo, Uganda, Kenya',
      interdictionStatus: 'Active Multi-Agency Operation',
    },
    {
      id: 'SYN-02',
      name: 'Northern Savanna Ivory & Contraband Network',
      leadSuspect: 'Kiprotich Evans Koech (KEN-DCI-2026-F088)',
      threatLevel: 'HIGH',
      focus: 'Poaching logistics via maritime transit through Mombasa & Dar es Salaam ports.',
      affectedRegions: 'Kenya, Tanzania, Uganda',
      interdictionStatus: 'Maritime Container Manifest Inspection In Force',
    },
    {
      id: 'SYN-03',
      name: 'Southern Cross Substandard Medical Syndicate',
      leadSuspect: 'Nomvula Bongiwe Sithole (ZAF-SAPS-2026-904)',
      threatLevel: 'HIGH',
      focus: 'Distribution of counterfeit antimalarial & antibiotic tablets lacking API.',
      affectedRegions: 'South Africa, Mozambique, Eswatini, Zimbabwe',
      interdictionStatus: 'SARPCCO Medical Safety Quarantine Active',
    },
  ];

  const borderCorridors = [
    {
      name: 'Rubavu / Goma (Grande & Petite Barrière)',
      countries: 'Rwanda 🇷🇼 · DR Congo 🇨🇩',
      traffic: 'High Volume Transit (Commercial & Pedestrian)',
      watchTier: 'CRITICAL PRIORITY',
      biometrics: 'Biometric Passport Gates + Facial Recognition Active',
      leadDesk: 'RIB Border Intelligence Cell / DGM RDC',
    },
    {
      name: 'Gatuna / Katuna Corridor',
      countries: 'Rwanda 🇷🇼 · Uganda 🇺🇬',
      traffic: 'Heavy Cargo Freight & Transit Corridor',
      watchTier: 'ELEVATED VIGILANCE',
      biometrics: 'Single Customs Territory Automated Manifest Checks',
      leadDesk: 'Rwanda Immigration / Uganda Police CID',
    },
    {
      name: 'Namanga One-Stop Border Post',
      countries: 'Kenya 🇰🇪 · Tanzania 🇹🇿',
      traffic: 'Northern Corridor Overland Freight',
      watchTier: 'HIGH PRIORITY',
      biometrics: 'Joint EACAPO Inter-Agency Vehicle Scanning',
      leadDesk: 'DCI Kenya / TPF Tanzania',
    },
    {
      name: 'Beitbridge Border Post',
      countries: 'South Africa 🇿🇦 · Zimbabwe 🇿🇼',
      traffic: 'Highest Volume SADC Commercial Crossing',
      watchTier: 'HIGH PRIORITY',
      biometrics: 'SARPCCO Biometric Syndicate Interception Desk',
      leadDesk: 'SAPS Border Police / ZRP CID',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Continental Public Safety Intelligence Bulletins
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Synthesized intelligence alerts from EACAPO, WAPCCO, SARPCCO, and AFRIPOL central security coordination desks.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
          {alerts.length} Active Threat Bulletins
        </span>
      </div>

      {/* Active Alerts Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>Active Regional Security Alerts</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                    {alert.severity}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{alert.timestamp.slice(0, 10)}</span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">
                  {alert.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {alert.summary}
                </p>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-amber-300 space-y-1">
                  <span className="font-bold block uppercase text-[9px] text-slate-400">Action Required:</span>
                  <span>{alert.actionRequired}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{alert.issuingEntity}</span>
                <span>{alert.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transnational Syndicates & Strategic Corridors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Syndicates */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Transnational Crime Syndicate Profiles</h3>
          </div>

          <div className="space-y-3">
            {syndicates.map((syn) => (
              <div key={syn.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{syn.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {syn.threatLevel}
                  </span>
                </div>
                <div className="text-slate-400">
                  Lead Wanted Key Suspect: <strong className="text-emerald-400">{syn.leadSuspect}</strong>
                </div>
                <p className="text-slate-300 text-[11px]">
                  {syn.focus}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Corridor: {syn.affectedRegions}</span>
                  <span className="text-blue-400">{syn.interdictionStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Corridors */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Strategic Border Checkpoints &amp; Corridors</h3>
          </div>

          <div className="space-y-3">
            {borderCorridors.map((corridor, i) => (
              <div key={i} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{corridor.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                    {corridor.watchTier}
                  </span>
                </div>
                <div className="text-slate-400 font-medium">
                  {corridor.countries} · {corridor.traffic}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  ✓ {corridor.biometrics}
                </div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                  Liaison Authority: {corridor.leadDesk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
