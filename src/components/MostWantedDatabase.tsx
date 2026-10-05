import React, { useState, useMemo } from 'react';
import { WantedPerson, SupportedLanguage, RiskLevel, WantedStatus } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile, downloadJsonFile, downloadCsvFile, generateWantedBulletinText } from '../utils/download';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  FileText, 
  Send, 
  ExternalLink,
  Lock,
  ChevronRight,
  Download
} from 'lucide-react';

interface MostWantedDatabaseProps {
  wantedPersons: WantedPerson[];
  onSelectPerson: (person: WantedPerson) => void;
  onSubmitTipForPerson: (person: WantedPerson) => void;
  language: SupportedLanguage;
  lowBandwidth: boolean;
  selectedCountryFilter?: string;
  onClearCountryFilter?: () => void;
}

export const MostWantedDatabase: React.FC<MostWantedDatabaseProps> = ({
  wantedPersons,
  onSelectPerson,
  onSubmitTipForPerson,
  language,
  lowBandwidth,
  selectedCountryFilter,
  onClearCountryFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const t = TRANSLATIONS[language];

  const filteredList = useMemo(() => {
    return wantedPersons.filter((p) => {
      // Country filter if passed from map
      if (selectedCountryFilter && p.countryCode !== selectedCountryFilter) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesRef = p.refNumber.toLowerCase().includes(query);
        const matchesWarrant = p.warrantNumber.toLowerCase().includes(query);
        const matchesAgency = p.issuingAuthority.toLowerCase().includes(query);
        const matchesAlias = p.verifiedAliases.some((a) => a.toLowerCase().includes(query));
        const matchesCharges = p.charges.some((c) => c.toLowerCase().includes(query));

        if (!matchesName && !matchesRef && !matchesWarrant && !matchesAgency && !matchesAlias && !matchesCharges) {
          return false;
        }
      }

      // Risk filter
      if (riskFilter !== 'ALL' && p.riskLevel !== riskFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && p.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [wantedPersons, searchQuery, riskFilter, statusFilter, selectedCountryFilter]);

  const riskBadgeClasses: Record<RiskLevel, string> = {
    CRITICAL: 'bg-rose-950 text-rose-300 border-rose-800',
    HIGH: 'bg-amber-950 text-amber-300 border-amber-800',
    ELEVATED: 'bg-yellow-950 text-yellow-300 border-yellow-800',
    STANDARD: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <div className="space-y-6">
      {/* Due Process & Institutional Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Officially Published Most Wanted Database
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Published strictly in accordance with judicial arrest warrants issued by sovereign African High Courts,
              Interpol National Central Bureaus, and regional public safety treaties.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const headers = ['RefNumber', 'Name', 'Nationality', 'Country', 'Agency', 'WarrantNumber', 'Status', 'RiskLevel', 'Charges', 'LastLocation'];
                const rows = filteredList.map(p => [
                  `"${p.refNumber}"`,
                  `"${p.name}"`,
                  `"${p.nationality}"`,
                  `"${p.issuingCountry}"`,
                  `"${p.issuingAuthority}"`,
                  `"${p.warrantNumber}"`,
                  `"${p.status}"`,
                  `"${p.riskLevel}"`,
                  `"${p.charges.join('; ')}"`,
                  `"${p.lastKnownLocation}"`
                ].join(','));
                const csv = [headers.join(','), ...rows].join('\n');
                downloadCsvFile(`AFRICA_MOST_WANTED_${new Date().toISOString().slice(0, 10)}.csv`, csv);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download entire wanted register as CSV for analytical tools"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                downloadJsonFile(`AFRICA_MOST_WANTED_${new Date().toISOString().slice(0, 10)}.json`, filteredList);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download case database in JSON format"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export JSON</span>
            </button>

            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-start gap-2 max-w-md">
              <span className="font-bold">DUE PROCESS:</span>
              <span className="truncate">{t.wanted.legalSafeguardNote}</span>
            </div>
          </div>
        </div>

        {/* Search & Filters Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.wanted.searchPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="sm:col-span-3">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="ELEVATED">Elevated</option>
              <option value="STANDARD">Standard</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="ALL">All Case Statuses</option>
              <option value="ACTIVE">Active Warrants</option>
              <option value="CAPTURED">Apprehended / In Custody</option>
              <option value="UNDER_REVIEW">Under Judicial Review</option>
              <option value="RESOLVED">Extradited / Closed</option>
            </select>
          </div>
        </div>

        {/* Selected Country Filter Chip if present */}
        {selectedCountryFilter && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Filtering by Country:</span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-medium flex items-center gap-1.5">
              <span>{selectedCountryFilter}</span>
              {onClearCountryFilter && (
                <button
                  onClick={onClearCountryFilter}
                  className="text-emerald-400 hover:text-white font-bold ml-1"
                >
                  ×
                </button>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((person) => {
          return (
            <div
              key={person.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-md group"
            >
              <div>
                {/* Photo & Risk Tag Header */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-slate-800">
                  {!lowBandwidth ? (
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-500">
                      <Lock className="w-6 h-6 mb-1 text-slate-600" />
                      <span className="text-[11px] font-mono">Biometric Image (Low-Bandwidth Mode)</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/90 text-white border border-slate-700 backdrop-blur">
                      {person.countryCode} · {person.issuingCountry}
                    </span>
                    {person.isCrossBorder && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-blue-950/90 text-blue-300 border border-blue-800">
                        Cross-Border
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${riskBadgeClasses[person.riskLevel]}`}>
                      {person.riskLevel}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 bg-slate-950/85 px-2 py-1 rounded border border-slate-800 backdrop-blur">
                    <span className="font-mono">{person.refNumber}</span>
                    <span>Warrant: {person.warrantDate}</span>
                  </div>
                </div>

                {/* Case Particulars */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {person.name}
                    </h3>
                    {person.verifiedAliases.length > 0 && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        Aliases: <span className="text-emerald-400/90 font-mono">{person.verifiedAliases.join(', ')}</span>
                      </p>
                    )}
                  </div>

                  {/* Issuing Authority */}
                  <div className="text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Issuing Authority:</span>
                    <span className="text-slate-300 font-medium">{person.issuingAuthority}</span>
                  </div>

                  {/* Key Charges */}
                  <div className="text-xs space-y-1">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Statutory Charges:</span>
                    <p className="text-slate-300 line-clamp-2 text-xs leading-relaxed">
                      {person.charges.join(' · ')}
                    </p>
                  </div>

                  {/* Last Known Corridor */}
                  <div className="flex items-start gap-1.5 text-xs text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{person.lastKnownLocation}</span>
                  </div>

                  {/* Public Safety Warning Directive */}
                  <div className="p-2 bg-rose-950/30 border border-rose-900/50 rounded text-[11px] text-rose-300 font-medium">
                    ⚠️ {person.publicSafetyInstruction}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectPerson(person)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dossier</span>
                  </button>
                  <button
                    onClick={() => {
                      const text = generateWantedBulletinText(person);
                      downloadTextFile(`${person.refNumber}_NOTICE.txt`, text);
                    }}
                    title="Download official police notice"
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>

                <button
                  onClick={() => onSubmitTipForPerson(person)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Tip</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredList.length === 0 && (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
          <p className="text-base font-semibold text-slate-300">No verified wanted records matched your filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the risk tier, search terms, or country filter.</p>
        </div>
      )}
    </div>
  );
};
