import React from 'react';
import { 
  NavigationTab, 
  SupportedLanguage, 
  UserSession 
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Shield, 
  Globe2, 
  Search, 
  Target, 
  FolderLock, 
  MessageSquareWarning, 
  Cpu, 
  ArrowLeftRight, 
  FileText, 
  Sparkles, 
  Building2, 
  History, 
  Settings as SettingsIcon,
  Wifi,
  WifiOff,
  RefreshCw,
  UserCheck,
  AlertOctagon,
  ChevronDown
} from 'lucide-react';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  lowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  isOnline: boolean;
  pendingSyncCount: number;
  onTriggerSync: () => void;
  currentUser: UserSession;
  onChangeUserRole: (role: UserSession['role']) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  lowBandwidth,
  onToggleLowBandwidth,
  isOnline,
  pendingSyncCount,
  onTriggerSync,
  currentUser,
  onChangeUserRole,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { tab: 'dashboard', label: t.nav.dashboard, icon: <Globe2 className="w-4 h-4" /> },
    { tab: 'countries', label: t.nav.countries, icon: <Building2 className="w-4 h-4" /> },
    { tab: 'most-wanted', label: t.nav.mostWanted, icon: <Target className="w-4 h-4 text-rose-400" />, badge: 6 },
    { tab: 'missions', label: t.nav.missions, icon: <FolderLock className="w-4 h-4 text-emerald-400" />, badge: 2 },
    { tab: 'cases', label: t.nav.cases, icon: <Search className="w-4 h-4" /> },
    { tab: 'tips', label: t.nav.tips, icon: <MessageSquareWarning className="w-4 h-4 text-amber-400" />, badge: 3 },
    { tab: 'intelligence', label: t.nav.intelligence, icon: <Cpu className="w-4 h-4" /> },
    { tab: 'cross-border', label: t.nav.crossBorder, icon: <ArrowLeftRight className="w-4 h-4 text-blue-400" />, badge: 2 },
    { tab: 'reports', label: t.nav.reports, icon: <FileText className="w-4 h-4" /> },
    { tab: 'ai-assistant', label: t.nav.aiAssistant, icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { tab: 'agencies', label: t.nav.agencies, icon: <Shield className="w-4 h-4" /> },
    { tab: 'audit-logs', label: t.nav.auditLogs, icon: <History className="w-4 h-4" /> },
    { tab: 'settings', label: t.nav.settings, icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'rw', label: 'Ikinyarwanda', flag: '🇷🇼' },
    { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
    { code: 'ar', label: 'العربية', flag: '🇪🇬' },
    { code: 'pt', label: 'Português', flag: '🇦🇴' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-xl">
      {/* Top Sovereignty & Public Safety Warning Banner */}
      <div className="bg-rose-950/80 border-b border-rose-800/60 px-4 py-1.5 flex items-center justify-between text-xs text-rose-200">
        <div className="flex items-center gap-2 font-medium">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="font-bold tracking-wide">PUBLIC SAFETY DIRECTIVE:</span>
          <span>{t.publicSafetyWarning}</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-rose-300/80 font-mono">
          <span>Rwanda Emergency: 112 / RIB 166</span>
          <span>·</span>
          <span>EAC Central Security Grid</span>
        </div>
      </div>

      {/* Main Brand & Controls Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand & Vision */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-tight">
                AFRIPOL &amp; SOVEREIGN PUBLIC SAFETY
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Rwanda Anchor · EAC
              </span>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              {t.visionMotto}
            </div>
          </div>
        </div>

        {/* Global Controls: Language, Low-Bandwidth, Sync, User Role */}
        <div className="flex items-center gap-2">
          {/* Low Bandwidth Toggle */}
          <button
            onClick={onToggleLowBandwidth}
            title={lowBandwidth ? 'Low-Bandwidth Mode Active' : 'Switch to Low-Bandwidth Mode (for remote border posts)'}
            className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
              lowBandwidth
                ? 'bg-amber-950/80 text-amber-300 border border-amber-700'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {lowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{lowBandwidth ? '2G/3G Low BW' : 'Standard'}</span>
          </button>

          {/* Offline Sync Status Indicator */}
          <div
            onClick={onTriggerSync}
            title={`${isOnline ? 'Online Grid' : 'Offline Storage'} - ${pendingSyncCount} pending updates`}
            className="cursor-pointer px-2.5 py-1.5 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-slate-300 hover:border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${pendingSyncCount > 0 ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">
              {pendingSyncCount > 0 ? `${pendingSyncCount} Pending Sync` : 'Synced'}
            </span>
          </div>

          {/* Multilingual Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-slate-900 text-slate-200 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none pr-7"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Role Switcher & Clearance Level */}
          <div className="relative">
            <select
              value={currentUser.role}
              onChange={(e) => onChangeUserRole(e.target.value as UserSession['role'])}
              className="bg-slate-900 text-slate-200 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none pr-7"
            >
              <option value="DETECTIVE" className="bg-slate-900">
                RIB Detective (Rwanda)
              </option>
              <option value="NCB_LIAISON" className="bg-slate-900">
                Interpol NCB Liaison (Kigali Hub)
              </option>
              <option value="PROSECUTOR" className="bg-slate-900">
                NPPA State Prosecutor
              </option>
              <option value="REGIONAL_COMMISSIONER" className="bg-slate-900">
                EACAPO Regional Officer
              </option>
              <option value="CITIZEN_PUBLIC" className="bg-slate-900">
                Citizen / Public Observer
              </option>
            </select>
            <UserCheck className="w-3 h-3 text-emerald-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 13 Command Tabs Navigation Bar */}
      <nav className="border-t border-slate-800/80 bg-slate-950 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
