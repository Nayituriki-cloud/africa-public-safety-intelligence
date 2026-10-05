import React from 'react';
import { SupportedLanguage, UserSession } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Lock, 
  Wifi, 
  Globe2, 
  Database, 
  UserCheck, 
  FileText 
} from 'lucide-react';

interface SettingsViewProps {
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  lowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  currentUser: UserSession;
  onChangeUserRole: (role: UserSession['role']) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onSelectLanguage,
  lowBandwidth,
  onToggleLowBandwidth,
  currentUser,
  onChangeUserRole,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            Platform Settings &amp; Sovereignty Governance
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configure security clearances, bandwidth adaptation for border terminals, and African Union regulatory compliance.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* Security & Authentication */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold border-b border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Multi-Factor Authentication &amp; Institutional Role</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Active Officer / Clearance Identity:</label>
              <select
                value={currentUser.role}
                onChange={(e) => onChangeUserRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="DETECTIVE">RIB Senior Detective (Rwanda)</option>
                <option value="NCB_LIAISON">Interpol NCB Liaison (Kigali Hub)</option>
                <option value="PROSECUTOR">NPPA State Prosecutor</option>
                <option value="REGIONAL_COMMISSIONER">EACAPO Regional Peace &amp; Security Officer</option>
                <option value="CITIZEN_PUBLIC">Public Citizen (Whistleblower Protection)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Clearance Level:</label>
              <input
                type="text"
                disabled
                value={currentUser.clearanceLevel}
                className="w-full bg-slate-950/80 border border-slate-800 rounded px-3 py-2 text-slate-400 font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              ✓ Multi-Factor Hardware Token Verified
            </span>
            <span className="font-mono text-slate-500">Badge #{currentUser.badgeNumber}</span>
          </div>
        </div>

        {/* Low Bandwidth & Remote Border Post Adaptation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold border-b border-slate-800 pb-3">
            <Wifi className="w-4 h-4 text-amber-400" />
            <span>Bandwidth Optimization for Remote African Border Corridors</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-white block text-sm">Low-Bandwidth Compression Mode</span>
              <p className="text-slate-400 text-xs mt-1">
                Optimized for 2G/3G cellular networks and remote border crossings (e.g. Rusumo, Cyanika, Nemba).
                Suppresses heavy biometric media, enables compact tables, and minimizes socket payloads.
              </p>
            </div>

            <button
              onClick={onToggleLowBandwidth}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors whitespace-nowrap ${
                lowBandwidth
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lowBandwidth ? 'Enabled (Active)' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold border-b border-slate-800 pb-3">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span>Primary Working African Language</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { code: 'en', label: 'English', flag: '🇬🇧' },
              { code: 'fr', label: 'Français', flag: '🇫🇷' },
              { code: 'rw', label: 'Ikinyarwanda', flag: '🇷🇼' },
              { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
              { code: 'ar', label: 'العربية', flag: '🇪🇬' },
              { code: 'pt', label: 'Português', flag: '🇦🇴' },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => onSelectLanguage(l.code as any)}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-colors ${
                  language === l.code
                    ? 'bg-slate-800 border-emerald-500 text-white font-bold shadow'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xl">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data Retention & Due Process Safeguards */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-white font-bold border-b border-slate-800 pb-3">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Data Retention &amp; Human Rights Verification Framework</span>
          </div>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              <span><strong>Malabo Convention Compliance:</strong> Personal data is processed strictly for public safety and judicial enforcement.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              <span><strong>Automatic Expungement Protocol:</strong> Cases resolved by acquittal or vacated court warrants are expunged within 24 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              <span><strong>Non-Refoulement Safeguard:</strong> Extradition inquiries conform to regional human rights charters.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
