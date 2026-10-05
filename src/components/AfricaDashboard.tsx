import React from 'react';
import { 
  AfricanCountry, 
  WantedPerson, 
  RegionalAlert, 
  Region, 
  SupportedLanguage, 
  NavigationTab 
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { AfricaMap } from './AfricaMap';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  ArrowRight, 
  FileText, 
  Send, 
  Building2, 
  MapPin, 
  Sparkles, 
  FolderLock 
} from 'lucide-react';

interface AfricaDashboardProps {
  countries: AfricanCountry[];
  wantedPersons: WantedPerson[];
  alerts: RegionalAlert[];
  selectedRegion: Region | 'All';
  onSelectRegion: (region: Region | 'All') => void;
  onSelectCountry: (country: AfricanCountry) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onSelectWantedPerson: (person: WantedPerson) => void;
  language: SupportedLanguage;
  lowBandwidth: boolean;
}

export const AfricaDashboard: React.FC<AfricaDashboardProps> = ({
  countries,
  wantedPersons,
  alerts,
  selectedRegion,
  onSelectRegion,
  onSelectCountry,
  onNavigateTab,
  onSelectWantedPerson,
  language,
  lowBandwidth,
}) => {
  const t = TRANSLATIONS[language];

  // Key metrics calculation
  const totalActive = countries.reduce((acc, c) => acc + c.activeWantedCount, 0);
  const totalResolved = countries.reduce((acc, c) => acc + c.resolvedCount, 0);
  const totalTips = countries.reduce((acc, c) => acc + c.tipsCount, 0);
  const totalCrossBorder = countries.reduce((acc, c) => acc + c.crossBorderCount, 0);

  // Critical Wanted Persons
  const criticalWanted = wantedPersons.filter((p) => p.riskLevel === 'CRITICAL' || p.status === 'ACTIVE').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Continental Metrics Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.activeCases}</div>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">{totalActive}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">High Court Warrants</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.resolvedCases}</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{totalResolved}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Lawfully Apprehended</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.publicTips}</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">{totalTips}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Zero-Log Anonymity</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.crossBorderCases}</div>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">{totalCrossBorder}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Bilateral Requests</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.countriesMonitored}</div>
          <div className="text-2xl font-black text-white font-mono mt-1">54</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Sovereign Nations</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">{t.metrics.regionalAlerts}</div>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">{alerts.length}</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Active Bulletins</div>
        </div>
      </div>

      {/* Rwanda Sovereign Anchor & EAC Regional Context Bar */}
      <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇷🇼</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Rwanda Operational Anchor Hub</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 border border-emerald-700">
                RIB / NPPA · Interpol Kigali
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Serving as the foundational launch node for East African Community (EAC) cross-border coordination,
              expanding across ECOWAS, SADC, ECCAS, and North Africa.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('missions')}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow"
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span>Open Mission Center</span>
          </button>
          <button
            onClick={() => onNavigateTab('ai-assistant')}
            className="px-3 py-1.5 bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-700/60 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Interactive Africa Map Component */}
      <AfricaMap
        countries={countries}
        selectedRegion={selectedRegion}
        onSelectRegion={onSelectRegion}
        onSelectCountry={onSelectCountry}
        lowBandwidth={lowBandwidth}
      />

      {/* Critical Wanted Cases Spotlight & Live Alert Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Spotlight Cases */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">Priority Officially Published Wanted Cases</h3>
            </div>
            <button
              onClick={() => onNavigateTab('most-wanted')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View All Most Wanted</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {criticalWanted.map((person) => (
              <div
                key={person.id}
                onClick={() => onSelectWantedPerson(person)}
                className="p-3 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                    {!lowBandwidth ? (
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500 font-mono">
                        {person.countryCode}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs group-hover:text-emerald-400 transition-colors">
                        {person.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                        {person.riskLevel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">
                      {person.charges[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {person.issuingAuthority} · Warrant: {person.warrantNumber}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                    Inspect Dossier →
                  </span>
                  <span className="text-[10px] text-slate-500">{person.issuingCountry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts & Ticker */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Live Regional Public Safety Alerts</h3>
            </div>
            <button
              onClick={() => onNavigateTab('intelligence')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>All Bulletins</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white line-clamp-1">{alert.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {alert.severity}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-2">
                  {alert.summary}
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span>{alert.issuingEntity}</span>
                  <span>{alert.region}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">Have information on any case?</span>
            <button
              onClick={() => onNavigateTab('tips')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow"
            >
              <Send className="w-3 h-3" />
              <span>Submit Tip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
