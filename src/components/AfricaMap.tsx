import React, { useState } from 'react';
import { AfricanCountry, Region } from '../types';
import { Shield, Users, Radio, Globe, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface AfricaMapProps {
  countries: AfricanCountry[];
  selectedRegion: Region | 'All';
  onSelectRegion: (region: Region | 'All') => void;
  onSelectCountry: (country: AfricanCountry) => void;
  selectedCountryCode?: string;
  lowBandwidth: boolean;
}

export const AfricaMap: React.FC<AfricaMapProps> = ({
  countries,
  selectedRegion,
  onSelectRegion,
  onSelectCountry,
  selectedCountryCode,
  lowBandwidth,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<AfricanCountry | null>(null);

  const filteredCountries = selectedRegion === 'All' 
    ? countries 
    : countries.filter((c) => c.region === selectedRegion);

  // Regional aggregated stats
  const totalActive = filteredCountries.reduce((acc, c) => acc + c.activeWantedCount, 0);
  const totalResolved = filteredCountries.reduce((acc, c) => acc + c.resolvedCount, 0);
  const totalTips = filteredCountries.reduce((acc, c) => acc + c.tipsCount, 0);
  const totalCrossBorder = filteredCountries.reduce((acc, c) => acc + c.crossBorderCount, 0);

  // Region colors
  const regionColors: Record<Region, { bg: string; border: string; text: string; dot: string }> = {
    'East Africa': { bg: 'bg-emerald-950/40', border: 'border-emerald-700/50', text: 'text-emerald-400', dot: '#10b981' },
    'West Africa': { bg: 'bg-amber-950/40', border: 'border-amber-700/50', text: 'text-amber-400', dot: '#f59e0b' },
    'Central Africa': { bg: 'bg-blue-950/40', border: 'border-blue-700/50', text: 'text-blue-400', dot: '#3b82f6' },
    'North Africa': { bg: 'bg-purple-950/40', border: 'border-purple-700/50', text: 'text-purple-400', dot: '#a855f7' },
    'Southern Africa': { bg: 'bg-teal-950/40', border: 'border-teal-700/50', text: 'text-teal-400', dot: '#14b8a6' },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header & Region Selectors */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Continental Sovereign Public-Safety Cartography
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 font-mono">
              54 Sovereign States
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verified case distribution across regional economic police communities (EACAPO, WAPCCO, SARPCCO, CAPCCO, AFRIPOL).
          </p>
        </div>

        {/* Region Filter Segmented Buttons */}
        <div className="flex items-center flex-wrap gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          {(['All', 'East Africa', 'West Africa', 'Central Africa', 'North Africa', 'Southern Africa'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => onSelectRegion(reg)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedRegion === reg
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {reg === 'All' ? 'All Africa (54)' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/60 border-b border-slate-800 text-xs">
        <div className="p-3.5 flex items-center gap-3">
          <div className="p-2 rounded bg-rose-950/60 text-rose-400 border border-rose-800/50">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 font-medium">Active Warrants</div>
            <div className="text-base font-bold text-white font-mono">{totalActive} Cases</div>
          </div>
        </div>
        <div className="p-3.5 flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 font-medium">Lawfully Resolved</div>
            <div className="text-base font-bold text-white font-mono">{totalResolved} Cases</div>
          </div>
        </div>
        <div className="p-3.5 flex items-center gap-3">
          <div className="p-2 rounded bg-amber-950/60 text-amber-400 border border-amber-800/50">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 font-medium">Citizen Triage Tips</div>
            <div className="text-base font-bold text-white font-mono">{totalTips} Tips</div>
          </div>
        </div>
        <div className="p-3.5 flex items-center gap-3">
          <div className="p-2 rounded bg-blue-950/60 text-blue-400 border border-blue-800/50">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 font-medium">Cross-Border Inquiries</div>
            <div className="text-base font-bold text-white font-mono">{totalCrossBorder} Bilateral</div>
          </div>
        </div>
      </div>

      {/* Main Map Visual + Regional Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive SVG Continental Map Projection */}
        <div className="lg:col-span-6 p-6 flex flex-col items-center justify-center bg-radial from-slate-900 via-slate-950 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          <div className="absolute top-4 left-4 z-10 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur">
            Anchor: <span className="text-emerald-400 font-semibold">Rwanda (RIB)</span> &amp; EAC Regional Network
          </div>

          <div className="relative w-full max-w-[460px] aspect-[4/4.5] flex items-center justify-center">
            {/* SVG stylized vector representation of Africa with regional clickable nodes */}
            <svg
              viewBox="0 0 500 560"
              className="w-full h-full drop-shadow-2xl transition-all"
              style={{ filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.08))' }}
            >
              <defs>
                <linearGradient id="africaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Africa Continental Outline (accurate simplified vector path) */}
              <path
                d="M 170 45 
                   C 210 30, 310 35, 340 50 
                   C 365 65, 410 85, 430 130 
                   C 445 160, 480 200, 460 250 
                   C 445 285, 400 295, 375 320 
                   C 355 345, 345 390, 330 430 
                   C 310 480, 275 530, 250 540 
                   C 230 535, 210 490, 195 440 
                   C 180 395, 175 350, 150 320 
                   C 130 290, 75 270, 60 230 
                   C 45 190, 70 145, 95 125 
                   C 115 105, 140 60, 170 45 Z"
                fill="url(#africaGrad)"
                stroke="#334155"
                strokeWidth="2.5"
                className="transition-colors hover:stroke-slate-500"
              />

              {/* Madagascar */}
              <path
                d="M 420 370 C 435 360, 445 385, 430 435 C 420 460, 405 450, 412 410 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2"
              />

              {/* Regional Boundaries Indicators */}
              {/* North Africa Zone */}
              <path
                d="M 120 120 Q 250 160 410 135"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <text x="250" y="105" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                NORTH AFRICA
              </text>

              {/* West Africa Zone */}
              <path
                d="M 60 210 Q 140 235 210 240"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <text x="125" y="210" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                WEST AFRICA
              </text>

              {/* Central Africa Zone */}
              <text x="245" y="280" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
                CENTRAL AFRICA
              </text>

              {/* East Africa Zone - Focused */}
              <circle cx="340" cy="275" r="50" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
              <text x="355" y="250" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                EAST AFRICA
              </text>

              {/* Southern Africa Zone */}
              <text x="260" y="440" fill="#2dd4bf" fontSize="11" fontWeight="bold" textAnchor="middle">
                SOUTHERN AFRICA
              </text>

              {/* Country Anchor Pins with Live Hotspots */}
              {/* Rwanda (Primary Anchor) */}
              <g
                className="cursor-pointer group"
                onClick={() => {
                  const rw = countries.find((c) => c.code === 'RW');
                  if (rw) onSelectCountry(rw);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'RW') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="325" cy="290" r="14" fill="#059669" opacity="0.3" className="animate-ping" />
                <circle cx="325" cy="290" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" filter="url(#glow)" />
                <text x="342" y="294" fill="#6ee7b7" fontSize="11" fontWeight="bold">
                  Rwanda (Kigali Hub)
                </text>
              </g>

              {/* Kenya */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const ke = countries.find((c) => c.code === 'KE');
                  if (ke) onSelectCountry(ke);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'KE') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="365" cy="270" r="6" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                <text x="375" y="274" fill="#94a3b8" fontSize="10">Kenya</text>
              </g>

              {/* Uganda */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const ug = countries.find((c) => c.code === 'UG');
                  if (ug) onSelectCountry(ug);
                }}
              >
                <circle cx="330" cy="265" r="5" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                <text x="315" y="258" fill="#94a3b8" fontSize="9" textAnchor="end">Uganda</text>
              </g>

              {/* Tanzania */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const tz = countries.find((c) => c.code === 'TZ');
                  if (tz) onSelectCountry(tz);
                }}
              >
                <circle cx="350" cy="325" r="6" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                <text x="362" y="330" fill="#94a3b8" fontSize="10">Tanzania</text>
              </g>

              {/* DR Congo */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const cd = countries.find((c) => c.code === 'CD');
                  if (cd) onSelectCountry(cd);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'CD') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="270" cy="300" r="7" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <text x="255" y="320" fill="#93c5fd" fontSize="10" textAnchor="middle">DR Congo</text>
              </g>

              {/* Nigeria */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const ng = countries.find((c) => c.code === 'NG');
                  if (ng) onSelectCountry(ng);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'NG') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="160" cy="225" r="7" fill="#f59e0b" stroke="#fcd34d" strokeWidth="1.5" />
                <text x="160" y="245" fill="#fcd34d" fontSize="10" textAnchor="middle">Nigeria</text>
              </g>

              {/* South Africa */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const za = countries.find((c) => c.code === 'ZA');
                  if (za) onSelectCountry(za);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'ZA') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="265" cy="495" r="7" fill="#14b8a6" stroke="#5eead4" strokeWidth="1.5" />
                <text x="265" y="520" fill="#5eead4" fontSize="10" textAnchor="middle">South Africa</text>
              </g>

              {/* Egypt */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const eg = countries.find((c) => c.code === 'EG');
                  if (eg) onSelectCountry(eg);
                }}
                onMouseEnter={() => setHoveredCountry(countries.find((c) => c.code === 'EG') || null)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <circle cx="340" cy="95" r="7" fill="#a855f7" stroke="#d8b4fe" strokeWidth="1.5" />
                <text x="355" y="100" fill="#d8b4fe" fontSize="10">Egypt</text>
              </g>

              {/* Ethiopia */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const et = countries.find((c) => c.code === 'ET');
                  if (et) onSelectCountry(et);
                }}
              >
                <circle cx="390" cy="205" r="6" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                <text x="402" y="210" fill="#94a3b8" fontSize="10">Ethiopia</text>
              </g>

              {/* Algeria */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const dz = countries.find((c) => c.code === 'DZ');
                  if (dz) onSelectCountry(dz);
                }}
              >
                <circle cx="210" cy="85" r="6" fill="#a855f7" stroke="#d8b4fe" strokeWidth="1" />
                <text x="210" y="70" fill="#c084fc" fontSize="9" textAnchor="middle">Algeria</text>
              </g>
            </svg>
          </div>

          {/* Hover or Active Country Quick Badge */}
          {hoveredCountry && (
            <div className="mt-3 p-2.5 bg-slate-950/90 border border-slate-700 rounded-lg text-xs w-full max-w-sm flex items-center justify-between shadow-xl backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="text-xl">{hoveredCountry.flag}</span>
                <div>
                  <div className="font-bold text-white">{hoveredCountry.name}</div>
                  <div className="text-[10px] text-slate-400">{hoveredCountry.primaryAgency} ({hoveredCountry.agencyAbbr})</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-rose-400 font-bold font-mono">{hoveredCountry.activeWantedCount}</span>
                <span className="text-[10px] text-slate-400 block">Active Cases</span>
              </div>
            </div>
          )}
        </div>

        {/* Country By Country Statistics Directory */}
        <div className="lg:col-span-6 p-4 max-h-[520px] overflow-y-auto divide-y divide-slate-800/60 bg-slate-900/40">
          <div className="flex items-center justify-between pb-3 px-1">
            <span className="text-xs font-semibold text-slate-300">
              {selectedRegion === 'All' ? 'All 54 African Nations' : `${selectedRegion} Member States`} ({filteredCountries.length})
            </span>
            <span className="text-[11px] text-slate-400">Click country to inspect judicial jurisdiction</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {filteredCountries.map((country) => {
              const colors = regionColors[country.region];
              const isSelected = selectedCountryCode === country.code;

              return (
                <div
                  key={country.code}
                  onClick={() => onSelectCountry(country)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.flag}</span>
                      <div>
                        <div className="font-semibold text-slate-100 text-xs flex items-center gap-1.5">
                          {country.name}
                          {country.code === 'RW' && (
                            <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/80 px-1 py-0.2 rounded font-mono">
                              HUB
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                          {country.agencyAbbr} · {country.capital}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {country.activeWantedCount} Warrants
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Resolved: <strong className="text-slate-300 font-mono">{country.resolvedCount}</strong></span>
                    <span>Tips: <strong className="text-amber-400 font-mono">{country.tipsCount}</strong></span>
                    <span>Bilateral: <strong className="text-blue-400 font-mono">{country.crossBorderCount}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
