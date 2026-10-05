import React, { useState } from 'react';
import { AfricanCountry, Region, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadCsvFile } from '../utils/download';
import { 
  Building2, 
  Search, 
  Shield, 
  PhoneCall, 
  Globe2, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Download
} from 'lucide-react';

interface CountriesViewProps {
  countries: AfricanCountry[];
  onSelectCountry: (country: AfricanCountry) => void;
  language: SupportedLanguage;
}

export const CountriesView: React.FC<CountriesViewProps> = ({
  countries,
  onSelectCountry,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const t = TRANSLATIONS[language];

  const filteredCountries = countries.filter((c) => {
    if (selectedRegion !== 'All' && c.region !== selectedRegion) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.primaryAgency.toLowerCase().includes(q) ||
        c.agencyAbbr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                54 Sovereign African Member States Directory
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              National law-enforcement institutions, Interpol National Central Bureaus (NCBs), emergency channels, and regional security treaty alignments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const headers = ['CountryCode', 'CountryName', 'Region', 'Capital', 'PrimaryAgency', 'AgencyAbbr', 'ActiveWanted', 'ResolvedCases', 'TipsCount', 'CrossBorderCount', 'Hotline', 'InterpolNCB'];
                const rows = filteredCountries.map(c => [
                  `"${c.code}"`,
                  `"${c.name}"`,
                  `"${c.region}"`,
                  `"${c.capital}"`,
                  `"${c.primaryAgency}"`,
                  `"${c.agencyAbbr}"`,
                  c.activeWantedCount,
                  c.resolvedCount,
                  c.tipsCount,
                  c.crossBorderCount,
                  `"${c.emergencyHotline}"`,
                  `"${c.interpolNcb}"`
                ].join(','));
                downloadCsvFile(`AFRICA_COUNTRIES_SECURITY_MATRIX_${new Date().toISOString().slice(0, 10)}.csv`, [headers.join(','), ...rows].join('\n'));
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              title="Download entire 54-country security matrix as CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Matrix CSV</span>
            </button>
            <span className="text-xs font-mono px-3 py-1.5 rounded bg-slate-950 text-emerald-300 border border-slate-800">
              {filteredCountries.length} Countries
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, capital, or law enforcement agency (e.g. Rwanda, RIB, DCI)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-6 flex items-center gap-1 overflow-x-auto p-1 bg-slate-950 border border-slate-800 rounded-lg">
            {(['All', 'East Africa', 'West Africa', 'Central Africa', 'North Africa', 'Southern Africa'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedRegion === reg
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <div
            key={country.code}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm group"
          >
            <div>
              {/* Flag & Name Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      {country.name}
                      {country.code === 'RW' && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1 py-0.2 rounded font-mono">
                          PRIMARY HUB
                        </span>
                      )}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Capital: <strong className="text-slate-200">{country.capital}</strong> · {country.region}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  {country.code}
                </span>
              </div>

              {/* Agency Particulars */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Primary Law Enforcement Body:</span>
                  <span className="text-white font-semibold">{country.primaryAgency} ({country.agencyAbbr})</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Interpol: <strong className="text-slate-300 font-mono">{country.interpolNcb}</strong></span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <PhoneCall className="w-3 h-3" />
                    <strong>{country.emergencyHotline}</strong>
                  </span>
                </div>
              </div>

              {/* Statistics Breakdown */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                  <div className="text-rose-400 font-mono font-bold text-sm">{country.activeWantedCount}</div>
                  <div className="text-[10px] text-slate-500">Active Wanted</div>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                  <div className="text-emerald-400 font-mono font-bold text-sm">{country.resolvedCount}</div>
                  <div className="text-[10px] text-slate-500">Resolved</div>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                  <div className="text-amber-400 font-mono font-bold text-sm">{country.tipsCount}</div>
                  <div className="text-[10px] text-slate-500">Tips Triage</div>
                </div>
              </div>

              {/* Treaties & Communities */}
              <div className="mt-3 flex flex-wrap gap-1">
                {country.treaties.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-medium">
                ✓ {country.verificationStatus}
              </span>
              <button
                onClick={() => onSelectCountry(country)}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Filter Cases</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
