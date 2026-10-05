export type Region = 
  | 'East Africa' 
  | 'West Africa' 
  | 'Central Africa' 
  | 'North Africa' 
  | 'Southern Africa';

export type SupportedLanguage = 'en' | 'fr' | 'ar' | 'pt' | 'sw' | 'rw';

export interface AfricanCountry {
  code: string; // ISO 2-letter
  name: string;
  nativeName?: string;
  region: Region;
  capital: string;
  flag: string;
  activeWantedCount: number;
  resolvedCount: number;
  tipsCount: number;
  crossBorderCount: number;
  verificationStatus: 'Full Treaty Compliant' | 'Active Bilateral' | 'Observer Status';
  primaryAgency: string;
  agencyAbbr: string;
  emergencyHotline: string;
  interpolNcb: string;
  treaties: string[];
}

export type WantedStatus = 'ACTIVE' | 'CAPTURED' | 'UNDER_REVIEW' | 'EXTRADITED' | 'RESOLVED';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'STANDARD';

export interface WantedPerson {
  id: string;
  refNumber: string; // e.g. "RWA-RIB-2026-W092"
  name: string;
  verifiedAliases: string[];
  nationality: string;
  countryCode: string;
  issuingAuthority: string; // e.g. "Rwanda Investigation Bureau (RIB)"
  issuingCountry: string;
  charges: string[];
  warrantDetails: string;
  warrantNumber: string;
  warrantDate: string;
  status: WantedStatus;
  riskLevel: RiskLevel;
  photoUrl: string;
  age?: number;
  gender?: string;
  height?: string;
  physicalDescription: string;
  lastKnownLocation: string;
  borderPointsOfInterest: string[];
  publicSafetyInstruction: string;
  officialSource: string;
  legalSafeguards: string;
  dateVerified: string;
  isCrossBorder: boolean;
  duplicateFlag?: boolean;
}

export type MissionStatus = 
  | 'NEW' 
  | 'VERIFIED' 
  | 'AUTHORIZED' 
  | 'ACTIVE' 
  | 'INFORMATION_RECEIVED' 
  | 'HUMAN_REVIEW' 
  | 'RESOLVED';

export interface AuthorizedTask {
  id: string;
  description: string;
  assignee: string;
  agency: string;
  completed: boolean;
  completedAt?: string;
  legalScope: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  event: string;
  location: string;
  verifiedBy: string;
  evidenceRef?: string;
}

export interface HumanApproval {
  id: string;
  stage: MissionStatus;
  approverName: string;
  approverTitle: string;
  agency: string;
  timestamp: string;
  comment: string;
  signatureHash: string;
}

export interface Mission {
  id: string; // e.g. "MSN-EAC-2026-08"
  title: string;
  objective: string;
  caseRef: string;
  jurisdiction: string;
  responsibleInstitution: string;
  partnerAgencies: string[];
  priority: 'CRITICAL' | 'URGENT' | 'HIGH' | 'ROUTINE';
  riskAssessment: string;
  status: MissionStatus;
  progress: number; // 0-100
  authorizedTasks: AuthorizedTask[];
  timeline: TimelineEntry[];
  evidenceReferences: string[];
  humanApprovals: HumanApproval[];
  finalReport?: string;
  leadInvestigator: string;
  createdAt: string;
  updatedAt: string;
}

export type TipStatus = 'SUBMITTED' | 'TRIAGE' | 'HUMAN_VERIFYING' | 'ESCALATED' | 'RESOLVED' | 'DISMISSED';

export interface CitizenTip {
  id: string;
  tipNumber: string; // e.g. "TIP-AFR-8839"
  caseRef: string;
  wantedPersonName?: string;
  narrative: string;
  location: string;
  borderPost?: string;
  submissionDate: string;
  isAnonymous: boolean;
  anonymityToken: string;
  status: TipStatus;
  urgencyScore: 'IMMEDIATE' | 'HIGH' | 'ROUTINE';
  humanReviewNotes?: string;
  assignedAgency?: string;
  assignedOfficer?: string;
  hasMediaAttached: boolean;
  contactChannel?: string;
}

export type RequestType = 
  | 'MUTUAL_LEGAL_ASSISTANCE' 
  | 'EXTRADITION_INQUIRY' 
  | 'BORDER_ALERT_NOTICE' 
  | 'BIOMETRIC_VERIFICATION' 
  | 'TRANSIT_NOTIFICATION';

export interface CrossBorderRequest {
  id: string;
  refNumber: string;
  requestingCountry: string;
  requestingAgency: string;
  requestedCountry: string;
  requestedAgency: string;
  caseRef: string;
  subjectName: string;
  requestType: RequestType;
  status: 'PENDING_APPROVAL' | 'TRANSMITTED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  legalBasis: string;
  urgency: 'URGENT' | 'HIGH' | 'NORMAL';
  documents: string[];
  contactPointName: string;
  contactPointEmail: string;
  contactPointPhone: string;
  dateCreated: string;
  notes: string;
}

export interface RegionalAlert {
  id: string;
  title: string;
  region: Region;
  severity: 'CRITICAL' | 'HIGH' | 'ADVISORY';
  issuingEntity: string;
  summary: string;
  affectedCountries: string[];
  timestamp: string;
  actionRequired: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  actorAgency: string;
  actorCountry: string;
  actionType: 
    | 'CASE_ACCESS' 
    | 'WARRANT_ISSUANCE' 
    | 'STATUS_MODIFICATION' 
    | 'TIP_CLASSIFICATION' 
    | 'CROSS_BORDER_DISPATCH' 
    | 'HUMAN_APPROVAL' 
    | 'MISSION_APPROVAL'
    | 'DATA_EXPUNGEMENT' 
    | 'SECURITY_OVERRIDE';
  targetResource: string;
  legalJustification: string;
  integrityHash: string;
}

export interface UserSession {
  role: 'DETECTIVE' | 'NCB_LIAISON' | 'PROSECUTOR' | 'REGIONAL_COMMISSIONER' | 'CITIZEN_PUBLIC';
  name: string;
  agency: string;
  country: string;
  badgeNumber: string;
  clearanceLevel: 'LEVEL_4_RESTRICTED' | 'LEVEL_3_CONFIDENTIAL' | 'LEVEL_2_OFFICIAL' | 'PUBLIC_SAFEGUARD';
  twoFactorVerified: boolean;
}

export type NavigationTab = 
  | 'dashboard' 
  | 'countries' 
  | 'most-wanted' 
  | 'missions' 
  | 'cases' 
  | 'tips' 
  | 'intelligence' 
  | 'cross-border' 
  | 'reports' 
  | 'ai-assistant' 
  | 'agencies' 
  | 'audit-logs' 
  | 'settings';
