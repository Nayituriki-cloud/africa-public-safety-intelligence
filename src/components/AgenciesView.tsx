import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Shield, 
  Building2, 
  PhoneCall, 
  Globe2, 
  ExternalLink, 
  CheckCircle2, 
  Scale, 
  Lock 
} from 'lucide-react';

interface AgenciesViewProps {
  language: SupportedLanguage;
}

export const AgenciesView: React.FC<AgenciesViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const regionalBodies = [
    {
      name: 'AFRIPOL (African Police Cooperation Organization)',
      abbr: 'AFRIPOL',
      hq: 'Algiers, Algeria',
      scope: 'All 55 African Union Member States',
      focus: 'Transnational organized crime, terrorism, cybercrime, and illicit trafficking coordination.',
      status: 'Continental Treaty Body (AU Mandate)',
    },
    {
      name: 'East African Police Chiefs Cooperation Organization',
      abbr: 'EACAPO',
      hq: 'Nairobi / Kigali Liaison Desk',
      scope: 'EAC Member States (Rwanda, Kenya, Uganda, Tanzania, Burundi, South Sudan, DRC, Somalia)',
      focus: 'Great Lakes border control, cyber fraud taskforces, and environmental crime interdiction.',
      status: 'Active Regional Treaty Protocol',
    },
    {
      name: 'Southern African Regional Police Chiefs Cooperation Organization',
      abbr: 'SARPCCO',
      hq: 'Gaborone / Harare Bureau',
      scope: 'SADC Member States (16 Southern African Nations)',
      focus: 'Extradition protocols, pharmaceutical counterfeit interdiction, cross-border motor vehicle recovery.',
      status: 'SADC Peace & Security Directorate',
    },
    {
      name: 'West African Police Chiefs Cooperation Organization',
      abbr: 'WAPCCO',
      hq: 'Abidjan, Côte d’Ivoire',
      scope: 'ECOWAS Member States (15 West African Nations)',
      focus: 'Maritime piracy, drug trafficking routes, and border security.',
      status: 'ECOWAS Commission Mandate',
    },
  ];

  const nationalAgencies = [
    {
      name: 'Rwanda Investigation Bureau',
      abbr: 'RIB',
      country: 'Rwanda 🇷🇼 (Primary Anchor)',
      hq: 'Kigali, Rwanda',
      hotline: '166 / 112',
      ncb: 'Interpol NCB Kigali',
      mandate: 'Investigating general, economic, cyber, and transnational crimes; forensics; mutual legal assistance.',
    },
    {
      name: 'National Public Prosecution Authority',
      abbr: 'NPPA',
      country: 'Rwanda 🇷🇼',
      hq: 'Kigali, Rwanda',
      hotline: '3029 / 112',
      ncb: 'Judicial Coordination',
      mandate: 'Indictment verification, judicial warrants, international mutual legal assistance petitions.',
    },
    {
      name: 'Directorate of Criminal Investigations',
      abbr: 'DCI',
      country: 'Kenya 🇰🇪',
      hq: 'Mazingira Complex, Nairobi',
      hotline: '0800 722 203 / 999',
      ncb: 'Interpol NCB Nairobi',
      mandate: 'Serious organized crime, cyber surveillance, environmental poaching, Anti-Terrorism Police Unit.',
    },
    {
      name: 'South African Police Service - Hawks (DPCI)',
      abbr: 'SAPS / Hawks',
      country: 'South Africa 🇿🇦',
      hq: 'Pretoria, South Africa',
      hotline: '10111 / 08600 10111',
      ncb: 'Interpol NCB Pretoria',
      mandate: 'Commercial crimes, transnational syndicates, high-level corruption and counterfeit pharmaceutical networks.',
    },
    {
      name: 'Economic and Financial Crimes Commission',
      abbr: 'EFCC',
      country: 'Nigeria 🇳🇬',
      hq: 'Abuja, Nigeria',
      hotline: '112 / +234 9 904 4752',
      ncb: 'Interpol NCB Abuja',
      mandate: 'Transnational advance fee fraud, cyber scams, money laundering, and economic asset forfeiture.',
    },
    {
      name: 'Police Nationale Congolaise',
      abbr: 'PNC',
      country: 'DR Congo 🇨🇩',
      hq: 'Kinshasa / Goma Desk',
      hotline: '112',
      ncb: 'Interpol NCB Kinshasa',
      mandate: 'Public order, border verification committees, mineral smuggling prevention.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Authorized African Law Enforcement Network &amp; Agencies
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sovereign institutional registry connecting authorized police services, specialized investigative bureaus, and regional cooperation bodies.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded bg-slate-950 text-emerald-300 border border-slate-800">
          Anchor: Rwanda (RIB) &amp; EACAPO
        </span>
      </div>

      {/* Regional Bodies Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Regional Police Cooperation Organizations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionalBodies.map((body, i) => (
            <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{body.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {body.abbr}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Headquarters: <strong className="text-slate-200">{body.hq}</strong> · Scope: {body.scope}
              </div>
              <p className="text-xs text-slate-300">
                {body.focus}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                ✓ {body.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* National Law Enforcement Agencies */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          National Investigative &amp; Prosecution Authorities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nationalAgencies.map((agency, i) => (
            <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{agency.abbr}</span>
                  <span className="text-[11px] font-medium text-slate-300">{agency.country}</span>
                </div>

                <h4 className="text-sm font-bold text-white">
                  {agency.name}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {agency.mandate}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center justify-between">
                  <span>Interpol: {agency.ncb}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Emergency Hotline:</span>
                  <span>{agency.hotline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
