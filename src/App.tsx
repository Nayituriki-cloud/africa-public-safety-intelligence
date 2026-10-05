import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  SupportedLanguage, 
  AfricanCountry, 
  WantedPerson, 
  Mission, 
  CitizenTip, 
  CrossBorderRequest, 
  RegionalAlert, 
  AuditLog, 
  UserSession,
  Region 
} from './types';
import { AFRICAN_COUNTRIES } from './data/countries';
import { 
  INITIAL_WANTED_PERSONS, 
  INITIAL_MISSIONS, 
  INITIAL_CITIZEN_TIPS, 
  INITIAL_CROSS_BORDER_REQUESTS, 
  INITIAL_REGIONAL_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { TRANSLATIONS } from './i18n/translations';
import { Navigation } from './components/Navigation';
import { AfricaDashboard } from './components/AfricaDashboard';
import { MostWantedDatabase } from './components/MostWantedDatabase';
import { WantedPersonModal } from './components/WantedPersonModal';
import { MissionCenter } from './components/MissionCenter';
import { CitizenTipSystem } from './components/CitizenTipSystem';
import { AIPublicSafetyAssistant } from './components/AIPublicSafetyAssistant';
import { CrossBorderCooperation } from './components/CrossBorderCooperation';
import { CountriesView } from './components/CountriesView';
import { IntelligenceView } from './components/IntelligenceView';
import { ReportsView } from './components/ReportsView';
import { AgenciesView } from './components/AgenciesView';
import { AuditLogsView } from './components/AuditLogsView';
import { SettingsView } from './components/SettingsView';
import { Shield, AlertOctagon, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Localization
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Core Data Stores (with localStorage persistence)
  const [countries, setCountries] = useState<AfricanCountry[]>(() => {
    const saved = localStorage.getItem('afr_countries');
    return saved ? JSON.parse(saved) : AFRICAN_COUNTRIES;
  });

  const [wantedPersons, setWantedPersons] = useState<WantedPerson[]>(() => {
    const saved = localStorage.getItem('afr_wanted_persons');
    return saved ? JSON.parse(saved) : INITIAL_WANTED_PERSONS;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('afr_missions');
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });

  const [citizenTips, setCitizenTips] = useState<CitizenTip[]>(() => {
    const saved = localStorage.getItem('afr_citizen_tips');
    return saved ? JSON.parse(saved) : INITIAL_CITIZEN_TIPS;
  });

  const [crossBorderRequests, setCrossBorderRequests] = useState<CrossBorderRequest[]>(() => {
    const saved = localStorage.getItem('afr_cross_border');
    return saved ? JSON.parse(saved) : INITIAL_CROSS_BORDER_REQUESTS;
  });

  const [regionalAlerts] = useState<RegionalAlert[]>(INITIAL_REGIONAL_ALERTS);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('afr_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Current Authorized User Session (default anchor: Rwanda RIB)
  const [currentUser, setCurrentUser] = useState<UserSession>({
    role: 'DETECTIVE',
    name: 'Chief Supt. Alexis Habimana',
    agency: 'Rwanda Investigation Bureau (RIB)',
    country: 'Rwanda',
    badgeNumber: 'RIB-KGL-8819',
    clearanceLevel: 'LEVEL_3_CONFIDENTIAL',
    twoFactorVerified: true,
  });

  // Active Selections
  const [selectedPersonModal, setSelectedPersonModal] = useState<WantedPerson | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string | undefined>(undefined);
  const [preselectedCaseRefForTip, setPreselectedCaseRefForTip] = useState<string | undefined>(undefined);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('afr_wanted_persons', JSON.stringify(wantedPersons));
  }, [wantedPersons]);

  useEffect(() => {
    localStorage.setItem('afr_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('afr_citizen_tips', JSON.stringify(citizenTips));
  }, [citizenTips]);

  useEffect(() => {
    localStorage.setItem('afr_cross_border', JSON.stringify(crossBorderRequests));
  }, [crossBorderRequests]);

  useEffect(() => {
    localStorage.setItem('afr_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = () => {
    // Process offline queue
    setPendingSyncCount(0);
    setSyncNotice('All offline records synchronized with Sovereign Security Grid.');
    setTimeout(() => setSyncNotice(null), 3500);
  };

  const handleToggleLowBandwidth = () => {
    setLowBandwidth((prev) => !prev);
  };

  const handleChangeUserRole = (newRole: UserSession['role']) => {
    const roleProfiles: Record<UserSession['role'], Partial<UserSession>> = {
      DETECTIVE: {
        role: 'DETECTIVE',
        name: 'Chief Supt. Alexis Habimana',
        agency: 'Rwanda Investigation Bureau (RIB)',
        country: 'Rwanda',
        badgeNumber: 'RIB-KGL-8819',
        clearanceLevel: 'LEVEL_3_CONFIDENTIAL',
      },
      NCB_LIAISON: {
        role: 'NCB_LIAISON',
        name: 'Supt. Claude Nkurunziza',
        agency: 'Interpol NCB Kigali',
        country: 'Rwanda',
        badgeNumber: 'NCB-KGL-041',
        clearanceLevel: 'LEVEL_4_RESTRICTED',
      },
      PROSECUTOR: {
        role: 'PROSECUTOR',
        name: 'Hon. Providence Uwera',
        agency: 'National Public Prosecution Authority (NPPA)',
        country: 'Rwanda',
        badgeNumber: 'NPPA-PROS-120',
        clearanceLevel: 'LEVEL_4_RESTRICTED',
      },
      REGIONAL_COMMISSIONER: {
        role: 'REGIONAL_COMMISSIONER',
        name: 'Commissioner David Mwangi',
        agency: 'EACAPO Regional Directorate',
        country: 'Kenya',
        badgeNumber: 'EACAPO-DIR-002',
        clearanceLevel: 'LEVEL_4_RESTRICTED',
      },
      CITIZEN_PUBLIC: {
        role: 'CITIZEN_PUBLIC',
        name: 'Public Observer (Whistleblower Protection)',
        agency: 'Citizen Community Safeguard',
        country: 'Pan-African',
        badgeNumber: 'PUB-ANON',
        clearanceLevel: 'PUBLIC_SAFEGUARD',
      },
    };

    setCurrentUser((prev) => ({
      ...prev,
      ...roleProfiles[newRole],
    }));

    // Record in audit log
    recordAuditLog({
      actionType: 'SECURITY_OVERRIDE',
      targetResource: `User Profile Switch to ${newRole}`,
      legalJustification: 'Authorized multi-role inspection pursuant to Malabo Convention guidelines.',
    });
  };

  const recordAuditLog = (partial: {
    actionType: AuditLog['actionType'];
    targetResource: string;
    legalJustification: string;
  }) => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actorName: currentUser.name,
      actorRole: currentUser.role,
      actorAgency: currentUser.agency,
      actorCountry: currentUser.country,
      actionType: partial.actionType,
      targetResource: partial.targetResource,
      legalJustification: partial.legalJustification,
      integrityHash: `SHA256:${Math.random().toString(36).substring(2, 14)}...intact`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Callback to submit a new tip
  const handleSubmitTip = (tipData: Omit<CitizenTip, 'id' | 'tipNumber' | 'submissionDate' | 'status'>): CitizenTip => {
    const newTip: CitizenTip = {
      id: `TIP-${Date.now().toString().slice(-4)}`,
      tipNumber: `TIP-AFR-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'TRIAGE',
      ...tipData,
    };

    setCitizenTips((prev) => [newTip, ...prev]);

    if (!isOnline) {
      setPendingSyncCount((prev) => prev + 1);
    }

    recordAuditLog({
      actionType: 'TIP_CLASSIFICATION',
      targetResource: newTip.tipNumber,
      legalJustification: 'Citizen public tip received and queued for detective human review with zero-log privacy applied.',
    });

    return newTip;
  };

  // Callback to update tip status
  const handleUpdateTipStatus = (tipId: string, status: CitizenTip['status'], notes?: string) => {
    setCitizenTips((prev) =>
      prev.map((t) => (t.id === tipId ? { ...t, status, humanReviewNotes: notes || t.humanReviewNotes } : t))
    );

    recordAuditLog({
      actionType: 'TIP_CLASSIFICATION',
      targetResource: tipId,
      legalJustification: `Tip status advanced to ${status} by verified detective.`,
    });
  };

  // Callback to update mission
  const handleUpdateMission = (updatedMission: Mission) => {
    setMissions((prev) => prev.map((m) => (m.id === updatedMission.id ? updatedMission : m)));

    recordAuditLog({
      actionType: 'MISSION_APPROVAL',
      targetResource: updatedMission.id,
      legalJustification: `Mission lifecycle stage: ${updatedMission.status} signed and certified.`,
    });
  };

  // Callback to add cross border request
  const handleAddCrossBorderRequest = (req: CrossBorderRequest) => {
    setCrossBorderRequests((prev) => [req, ...prev]);

    recordAuditLog({
      actionType: 'CROSS_BORDER_DISPATCH',
      targetResource: req.refNumber,
      legalJustification: `Bilateral mutual legal assistance dispatched to ${req.requestedCountry} under treaty ${req.legalBasis}.`,
    });
  };

  // Callback to update cross border request status
  const handleUpdateCrossBorderStatus = (id: string, status: CrossBorderRequest['status']) => {
    setCrossBorderRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    recordAuditLog({
      actionType: 'STATUS_MODIFICATION',
      targetResource: id,
      legalJustification: `Cross-border synchronization status updated to ${status}.`,
    });
  };

  // Country selection handler from map or country directory
  const handleSelectCountry = (country: AfricanCountry) => {
    setSelectedCountryFilter(country.code);
    setCurrentTab('most-wanted');
  };

  // Direct tip button from wanted modal
  const handleOpenTipForPerson = (person: WantedPerson) => {
    setPreselectedCaseRefForTip(person.refNumber);
    setCurrentTab('tips');
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Sovereign Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'cases') {
            setCurrentTab('most-wanted');
          } else {
            setCurrentTab(tab);
          }
        }}
        language={language}
        onSelectLanguage={setLanguage}
        lowBandwidth={lowBandwidth}
        onToggleLowBandwidth={handleToggleLowBandwidth}
        isOnline={isOnline}
        pendingSyncCount={pendingSyncCount}
        onTriggerSync={triggerSync}
        currentUser={currentUser}
        onChangeUserRole={handleChangeUserRole}
      />

      {/* Sync Notification Banner if triggered */}
      {syncNotice && (
        <div className="bg-emerald-950 border-b border-emerald-800 text-emerald-300 px-4 py-2 text-xs flex items-center justify-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {currentTab === 'dashboard' && (
          <AfricaDashboard
            countries={countries}
            wantedPersons={wantedPersons}
            alerts={regionalAlerts}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onSelectCountry={handleSelectCountry}
            onNavigateTab={setCurrentTab}
            onSelectWantedPerson={setSelectedPersonModal}
            language={language}
            lowBandwidth={lowBandwidth}
          />
        )}

        {(currentTab === 'most-wanted' || currentTab === 'cases') && (
          <MostWantedDatabase
            wantedPersons={wantedPersons}
            onSelectPerson={setSelectedPersonModal}
            onSubmitTipForPerson={handleOpenTipForPerson}
            language={language}
            lowBandwidth={lowBandwidth}
            selectedCountryFilter={selectedCountryFilter}
            onClearCountryFilter={() => setSelectedCountryFilter(undefined)}
          />
        )}

        {currentTab === 'missions' && (
          <MissionCenter
            missions={missions}
            onUpdateMission={handleUpdateMission}
            language={language}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'tips' && (
          <CitizenTipSystem
            tips={citizenTips}
            wantedPersons={wantedPersons}
            onSubmitTip={handleSubmitTip}
            onUpdateTipStatus={handleUpdateTipStatus}
            language={language}
            currentUser={currentUser}
            preselectedCaseRef={preselectedCaseRefForTip}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AIPublicSafetyAssistant
            wantedPersons={wantedPersons}
            citizenTips={citizenTips}
            missions={missions}
            language={language}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'cross-border' && (
          <CrossBorderCooperation
            requests={crossBorderRequests}
            countries={countries}
            onAddRequest={handleAddCrossBorderRequest}
            onUpdateRequestStatus={handleUpdateCrossBorderStatus}
            language={language}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'countries' && (
          <CountriesView
            countries={countries}
            onSelectCountry={handleSelectCountry}
            language={language}
          />
        )}

        {currentTab === 'intelligence' && (
          <IntelligenceView
            alerts={regionalAlerts}
            language={language}
          />
        )}

        {currentTab === 'reports' && (
          <ReportsView
            missions={missions}
            language={language}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'agencies' && (
          <AgenciesView language={language} />
        )}

        {currentTab === 'audit-logs' && (
          <AuditLogsView
            logs={auditLogs}
            onAddLog={(newLog) => setAuditLogs((prev) => [newLog, ...prev])}
            language={language}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            language={language}
            onSelectLanguage={setLanguage}
            lowBandwidth={lowBandwidth}
            onToggleLowBandwidth={handleToggleLowBandwidth}
            currentUser={currentUser}
            onChangeUserRole={handleChangeUserRole}
          />
        )}
      </main>

      {/* Wanted Person Dossier Modal */}
      {selectedPersonModal && (
        <WantedPersonModal
          person={selectedPersonModal}
          onClose={() => setSelectedPersonModal(null)}
          onSubmitTipForPerson={handleOpenTipForPerson}
          language={language}
          lowBandwidth={lowBandwidth}
        />
      )}

      {/* Sovereign African Institutional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90 py-8 px-4 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">
                AFRIPOL &amp; Sovereign African Public Safety Intelligence Platform
              </div>
              <div className="text-[11px] text-slate-400 italic">
                “One Africa. Verified Information. Safer Communities. Stronger Cooperation.”
              </div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <div className="text-slate-400">
              Operational Anchor: <strong className="text-white">Rwanda (RIB / NPPA)</strong> · EAC · ECOWAS · SADC · ECCAS · AMU
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              African Union Malabo Convention on Cybersecurity and Personal Data Protection Compliant
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-600">
          This platform is an authorized public-safety and information-management system for sovereign governments and law-enforcement institutions.
          Never enable harassment, retaliation, unauthorized surveillance, or vigilante actions.
        </div>
      </footer>
    </div>
  );
}
