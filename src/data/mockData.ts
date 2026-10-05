import { WantedPerson, Mission, CitizenTip, CrossBorderRequest, RegionalAlert, AuditLog } from '../types';

export const INITIAL_WANTED_PERSONS: WantedPerson[] = [
  {
    id: 'WP-RWA-2026-001',
    refNumber: 'RWA-RIB-2026-W019',
    name: 'Jean-Pierre Mugabo Hakizimana',
    verifiedAliases: ['J.P. Hakizimana', 'Pierre Mwizerwa', 'Kigali Ghost'],
    nationality: 'Rwandan',
    countryCode: 'RW',
    issuingAuthority: 'Rwanda Investigation Bureau (RIB)',
    issuingCountry: 'Rwanda',
    charges: [
      'Transnational Financial Cybercrime (Article 287 Penal Code)',
      'Aggravated Cross-Border Money Laundering ($4.2M)',
      'Identity Document Forgery across EAC Banking Systems'
    ],
    warrantDetails: 'High Court of Rwanda Commercial & Financial Crimes Chamber Warrant #HC/RW/2026/0411-EC issued by Hon. Judge Uwera.',
    warrantNumber: 'HC-RW-2026-0411',
    warrantDate: '2026-02-14',
    status: 'ACTIVE',
    riskLevel: 'CRITICAL',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    age: 41,
    gender: 'Male',
    height: '178 cm / 5ft 10in',
    physicalDescription: 'Athletic build, surgical scar above left eyebrow, fluent in Kinyarwanda, French, English, and Swahili. Frequently travels using altered ECOWAS and EAC transit permits.',
    lastKnownLocation: 'Reported sighting near Rubavu / Goma border crossing corridor',
    borderPointsOfInterest: ['Gisenyi/Grande Barrière (RW-CD)', 'Gatuna (RW-UG)', 'Rusumo (RW-TZ)'],
    publicSafetyInstruction: 'DO NOT APPROACH OR CONFRONT. Subject may employ armed private escorts. Notify RIB toll-free 166 or nearest National Police post immediately.',
    officialSource: 'Rwanda Investigation Bureau Official Gazette / Interpol Red Notice A-2026/8941',
    legalSafeguards: 'Due process strictly verified. Formally indicted under High Court warrant with human rights review completed by National Public Prosecution Authority (NPPA). Presumption of innocence remains until judicial verdict.',
    dateVerified: '2026-09-28',
    isCrossBorder: true,
  },
  {
    id: 'WP-KEN-2026-002',
    refNumber: 'KEN-DCI-2026-F088',
    name: 'Kiprotich Evans Koech',
    verifiedAliases: ['Captain Evans', 'Kimani Wachira'],
    nationality: 'Kenyan',
    countryCode: 'KE',
    issuingAuthority: 'Directorate of Criminal Investigations (DCI)',
    issuingCountry: 'Kenya',
    charges: [
      'Organized Transnational Wildlife Poaching & Ivory Smuggling',
      'Illegal Arms Trafficking across Great Lakes Transit Lines'
    ],
    warrantDetails: 'Milimani Law Courts Nairobi Criminal Division Arrest Warrant #MLC-CR-2026-190',
    warrantNumber: 'MLC-CR-2026-190',
    warrantDate: '2026-01-20',
    status: 'ACTIVE',
    riskLevel: 'CRITICAL',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    age: 46,
    gender: 'Male',
    height: '185 cm / 6ft 1in',
    physicalDescription: 'Tall, distinctive tribal marking on upper right cheek, deep voice. Speaks Swahili, English, and Kalenjin.',
    lastKnownLocation: 'Mombasa Port transit hub; suspected transit heading towards Dar es Salaam corridor',
    borderPointsOfInterest: ['Namanga (KE-TZ)', 'Malaba (KE-UG)', 'Lunga Lunga (KE-TZ)'],
    publicSafetyInstruction: 'ARMED AND DANGEROUS. Do not attempt confrontation. Call DCI Hotline 0800 722 203 or local police.',
    officialSource: 'Kenya Police Service Official Bulletin & EACAPO Regional Syndicate Tracker',
    legalSafeguards: 'Warrant issued upon prima facie forensic evidence by Senior Principal Magistrate. Verified under EAC Police Chiefs Mutual Enforcement Protocol.',
    dateVerified: '2026-10-01',
    isCrossBorder: true,
  },
  {
    id: 'WP-COD-2026-003',
    refNumber: 'COD-PNC-2026-X412',
    name: 'Serge Kalombo Tshisekedi',
    verifiedAliases: ['Commandant Serge', 'Kalombo Le Grand'],
    nationality: 'Congolese (DRC)',
    countryCode: 'CD',
    issuingAuthority: 'Police Nationale Congolaise (PNC)',
    issuingCountry: 'DR Congo',
    charges: [
      'Illegal Mineral Smuggling (Coltan/Gold)',
      'Armed Extortion at Transit Depots',
      'Cross-Border Fraud Ring'
    ],
    warrantDetails: 'Cour d’Appel de Goma Mandat d’Arrêt International #CAB/GOM/2026/88',
    warrantNumber: 'CAB-GOM-2026-88',
    warrantDate: '2026-03-05',
    status: 'ACTIVE',
    riskLevel: 'HIGH',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    age: 38,
    gender: 'Male',
    height: '172 cm',
    physicalDescription: 'Medium build, short beard, burn mark on left forearm. Speaks Lingala, Swahili, and French.',
    lastKnownLocation: 'Border periphery between South Kivu and Western Rwanda',
    borderPointsOfInterest: ['Ruzizi I & II (CD-RW)', 'Bunagana (CD-UG)'],
    publicSafetyInstruction: 'Subject operates with armed associates. Citizens are advised to maintain distance and inform security agencies.',
    officialSource: 'Ministère de la Justice RDC / EAC Joint Border Verification Committee',
    legalSafeguards: 'Reviewed by Congolese Military Auditorate and Civil High Court. Strict compliance with African Charter on Human and Peoples’ Rights.',
    dateVerified: '2026-09-15',
    isCrossBorder: true,
  },
  {
    id: 'WP-ZAF-2026-004',
    refNumber: 'ZAF-SAPS-2026-904',
    name: 'Nomvula Bongiwe Sithole',
    verifiedAliases: ['Brenda Khumalo', 'Vula S.'],
    nationality: 'South African',
    countryCode: 'ZA',
    issuingAuthority: 'South African Police Service - Directorate for Priority Crime Investigation (Hawks)',
    issuingCountry: 'South Africa',
    charges: [
      'Syndicated Pharmaceutical Counterfeiting (Fake Antimalarials & Antibiotics)',
      'Transnational Distribution across SADC Member States'
    ],
    warrantDetails: 'Pretoria Specialised Commercial Crimes Court Warrant #P-SCCC-2025-1102',
    warrantNumber: 'P-SCCC-2025-1102',
    warrantDate: '2025-11-18',
    status: 'ACTIVE',
    riskLevel: 'HIGH',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    age: 39,
    gender: 'Female',
    height: '165 cm',
    physicalDescription: 'Slender, wears prescription wire-rim glasses, speaks Zulu, English, and Portuguese.',
    lastKnownLocation: 'Suspected transit between Maputo (Mozambique) and Manzini (Eswatini)',
    borderPointsOfInterest: ['Komatipoort/Ressano Garcia (ZA-MZ)', 'Beitbridge (ZA-ZW)'],
    publicSafetyInstruction: 'Do not consume or purchase unregulated medical batches associated with this syndicate. Report leads to SAPS Crime Stop 08600 10111.',
    officialSource: 'SAPS Hawks Public Notice & SARPCCO Regional Drug & Medical Safety Taskforce',
    legalSafeguards: 'Formal indictment backed by laboratory forensics from National Health Laboratory Service. Due process certified.',
    dateVerified: '2026-09-22',
    isCrossBorder: true,
  },
  {
    id: 'WP-NGA-2026-005',
    refNumber: 'NGA-EFCC-2026-C311',
    name: 'Chinedu Arthur Okonkwo',
    verifiedAliases: ['Chief Arthur', 'Baron Silver', 'Chinedu Eze'],
    nationality: 'Nigerian',
    countryCode: 'NG',
    issuingAuthority: 'Economic and Financial Crimes Commission (EFCC)',
    issuingCountry: 'Nigeria',
    charges: [
      'Transnational Business Email Compromise ($12.8M)',
      'Advanced Fee Fraud across West and Central African Ports',
      'Conspiracy and Impersonation of Sovereign Maritime Regulators'
    ],
    warrantDetails: 'Federal High Court of Nigeria Abuja Judicial Division Bench Warrant #FHC/ABJ/CR/2026/89',
    warrantNumber: 'FHC-ABJ-CR-2026-89',
    warrantDate: '2026-01-11',
    status: 'ACTIVE',
    riskLevel: 'ELEVATED',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    age: 44,
    gender: 'Male',
    height: '180 cm',
    physicalDescription: 'Heavy-set build, clean shaven, speaks Igbo, English, French, and Yoruba.',
    lastKnownLocation: 'Lomé (Togo) / Cotonou (Benin) maritime logistics corridor',
    borderPointsOfInterest: ['Seme Border (NG-BJ)', 'Aflao Border (GH-TG)'],
    publicSafetyInstruction: 'Do not engage in business transactions with the named individual. Forward documentation to EFCC or WAPCCO.',
    officialSource: 'EFCC Wanted Notice & WAPCCO Interpol Regional Bureau Abidjan',
    legalSafeguards: 'Audited financial trail confirmed by Central Bank of Nigeria FIU and certified by Federal High Court.',
    dateVerified: '2026-09-19',
    isCrossBorder: true,
  },
  {
    id: 'WP-EGY-2026-006',
    refNumber: 'EGY-MOI-2026-T901',
    name: 'Tarek Mansour El-Sayed',
    verifiedAliases: ['Abu Zaid', 'Tarek El-Iskandarani'],
    nationality: 'Egyptian',
    countryCode: 'EG',
    issuingAuthority: 'Ministry of Interior Public Security Department',
    issuingCountry: 'Egypt',
    charges: [
      'Antiquities Smuggling from Upper Egypt archaeological sites',
      'Forgery of UNESCO Heritage certificates'
    ],
    warrantDetails: 'Cairo Court of Appeal Economic Offences Circuit Warrant #CC-EGY-2025-992',
    warrantNumber: 'CC-EGY-2025-992',
    warrantDate: '2025-10-30',
    status: 'ACTIVE',
    riskLevel: 'HIGH',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    age: 52,
    gender: 'Male',
    height: '175 cm',
    physicalDescription: 'Grey hair at temples, gold watch, speaks Arabic, French, and Italian.',
    lastKnownLocation: 'Alexandria port; potential maritime route towards Mediterranean or Red Sea ports',
    borderPointsOfInterest: ['Sallum (EG-LY)', 'Wadi Halfa (EG-SD)'],
    publicSafetyInstruction: 'Notify national customs authorities or heritage protection units. Do not facilitate relic transit.',
    officialSource: 'Egyptian Police Bulletin & Arab Interior Ministers Council Intelligence Portal',
    legalSafeguards: 'Authenticity of stolen artifacts verified by Ministry of Tourism & Antiquities forensic board.',
    dateVerified: '2026-08-30',
    isCrossBorder: true,
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'MSN-EAC-2026-01',
    title: 'Operation Great Lakes Shield: Cyber Syndicate Containment',
    objective: 'Locate and lawfully detain transnational financial cybercrime fugitive Jean-Pierre Mugabo Hakizimana across EAC border corridors with full bilateral human rights compliance.',
    caseRef: 'RWA-RIB-2026-W019',
    jurisdiction: 'Rwanda (Kigali, Rubavu) & DR Congo (Goma, Bukavu border zones)',
    responsibleInstitution: 'Rwanda Investigation Bureau (RIB)',
    partnerAgencies: ['PNC DR Congo', 'Uganda Police Force CID', 'Interpol NCB Kigali'],
    priority: 'CRITICAL',
    riskAssessment: 'High probability of electronic equipment destruction and border concealment. No collateral civilian risk permitted. Strict due process.',
    status: 'ACTIVE',
    progress: 68,
    authorizedTasks: [
      {
        id: 'TSK-01',
        description: 'Synchronize High Court warrant with Interpol NCB Kigali & NCB Kinshasa',
        assignee: 'Supt. Claude Nkurunziza',
        agency: 'RIB Transnational Crime Division',
        completed: true,
        completedAt: '2026-09-20',
        legalScope: 'Mutual Legal Assistance Treaty (EAC Article 124)'
      },
      {
        id: 'TSK-02',
        description: 'Deploy biometric verification advisory to Grande Barrière & Petite Barrière border checkpoints',
        assignee: 'Insp. Solange Umutoni',
        agency: 'Rwanda Directorate General of Immigration and Emigration',
        completed: true,
        completedAt: '2026-09-22',
        legalScope: 'Sovereign border checkpoint authority'
      },
      {
        id: 'TSK-03',
        description: 'Triage incoming verified citizen tips from Gisenyi municipal quadrant',
        assignee: 'Officer David Kwizera',
        agency: 'RIB Public Tip Verification Cell',
        completed: false,
        legalScope: 'Zero-log citizen privacy protocol'
      },
      {
        id: 'TSK-04',
        description: 'Bilateral coordination review meeting with PNC liaison in Goma',
        assignee: 'Chief Supt. Alexis Habimana',
        agency: 'RIB / PNC Joint Verification Team',
        completed: false,
        legalScope: 'Bilateral Police Cooperation Protocol 2024'
      }
    ],
    timeline: [
      {
        id: 'TL-01',
        date: '2026-09-18',
        event: 'Mission charter approved by RIB Commissioner General and transmitted to NPPA',
        location: 'Kigali HQ',
        verifiedBy: 'Commissioner General Office'
      },
      {
        id: 'TL-02',
        date: '2026-09-21',
        event: 'Biometric alert triggered at Rubavu automated passport gate',
        location: 'Rubavu Border',
        verifiedBy: 'Border Immigration Tech Unit'
      },
      {
        id: 'TL-03',
        date: '2026-09-27',
        event: 'Anonymous tip received confirming suspect sighted at commercial hub in Goma',
        location: 'Goma, DRC',
        verifiedBy: 'Joint Verification Desk'
      }
    ],
    evidenceReferences: [
      'RIB-EVD-2026-091: Bank transaction audit showing $4.2M rerouted to shell company',
      'RIB-EVD-2026-092: Forensic image of altered EAC biometric travel booklet',
      'RIB-EVD-2026-093: High Court Warrant Certificate #HC-RW-2026-0411'
    ],
    humanApprovals: [
      {
        id: 'APP-01',
        stage: 'VERIFIED',
        approverName: 'Hon. Providence Uwera',
        approverTitle: 'State Prosecutor',
        agency: 'National Public Prosecution Authority (NPPA)',
        timestamp: '2026-09-18 10:14:00',
        comment: 'Statutory evidentiary threshold satisfied under Law No 027/2019.',
        signatureHash: 'SHA256:7c9b81f00a...verified'
      },
      {
        id: 'APP-02',
        stage: 'AUTHORIZED',
        approverName: 'Col. Jean-Baptiste Rwigamba',
        approverTitle: 'Director of Criminal Investigations',
        agency: 'Rwanda Investigation Bureau (RIB)',
        timestamp: '2026-09-19 14:30:00',
        comment: 'Operational parameters conform strictly to EAC cross-border protocols.',
        signatureHash: 'SHA256:4e2a10b98f...verified'
      }
    ],
    leadInvestigator: 'Chief Supt. Alexis Habimana (RIB)',
    createdAt: '2026-09-18',
    updatedAt: '2026-10-02',
  },
  {
    id: 'MSN-SADC-2026-04',
    title: 'Operation Savanna Safe: Counter-Poaching Syndicate Interdiction',
    objective: 'Dismantle regional supply network and interdict Kiprotich Evans Koech across Kenya-Tanzania northern corridor.',
    caseRef: 'KEN-DCI-2026-F088',
    jurisdiction: 'Kenya (Tsavo, Mombasa) & Tanzania (Arusha, Tanga)',
    responsibleInstitution: 'Directorate of Criminal Investigations (DCI Kenya)',
    partnerAgencies: ['Tanzania Police Force CID', 'Kenya Wildlife Service', 'EACAPO'],
    priority: 'HIGH',
    riskAssessment: 'Suspect operates with heavily armed hunting elements. Non-lethal priority. Border post vigilance.',
    status: 'INFORMATION_RECEIVED',
    progress: 45,
    authorizedTasks: [
      {
        id: 'TSK-S01',
        description: 'Deploy joint DCI/TPF patrol unit to Namanga dry port sector',
        assignee: 'Snr. Supt. Mary Wambui',
        agency: 'DCI Transnational Crime Unit',
        completed: true,
        completedAt: '2026-09-25',
        legalScope: 'EAC Protocol on Peace and Security'
      },
      {
        id: 'TSK-S02',
        description: 'Verify shipping container manifests at Mombasa Container Terminal',
        assignee: 'Inspector John Otieno',
        agency: 'Kenya Ports Authority Police',
        completed: true,
        completedAt: '2026-09-28',
        legalScope: 'Port Security Act'
      },
      {
        id: 'TSK-S03',
        description: 'Analyze citizen tips regarding logistics warehouse in Voi',
        assignee: 'Analyst Faith Cherono',
        agency: 'DCI Intelligence Bureau',
        completed: false,
        legalScope: 'Public Safety Tip Standard'
      }
    ],
    timeline: [
      {
        id: 'TL-S01',
        date: '2026-09-12',
        event: 'Ivory cache seized at Kilindini Harbour; forensic trail points to Koech syndicate',
        location: 'Mombasa Port',
        verifiedBy: 'DCI Ballistics & Forensics'
      },
      {
        id: 'TL-S02',
        date: '2026-09-29',
        event: 'Vehicle registered to associate spotted refueling at Voi along Nairobi-Mombasa highway',
        location: 'Voi, Kenya',
        verifiedBy: 'Highway Patrol Sector 4'
      }
    ],
    evidenceReferences: [
      'DCI-EVD-881: DNA matching tusks to Tsavo East National Park bull elephant',
      'DCI-EVD-882: Milimani Court Warrant #MLC-CR-2026-190'
    ],
    humanApprovals: [
      {
        id: 'APP-S01',
        stage: 'VERIFIED',
        approverName: 'Dorothy Jepkemoi',
        approverTitle: 'Senior Prosecution Counsel',
        agency: 'Office of Director of Public Prosecutions (ODPP Kenya)',
        timestamp: '2026-09-14 09:20:00',
        comment: 'Environmental and wildlife statutory warrants reviewed and valid.',
        signatureHash: 'SHA256:1a88b...verified'
      }
    ],
    leadInvestigator: 'Senior Supt. Mary Wambui (DCI)',
    createdAt: '2026-09-12',
    updatedAt: '2026-10-01',
  }
];

export const INITIAL_CITIZEN_TIPS: CitizenTip[] = [
  {
    id: 'TIP-2026-001',
    tipNumber: 'TIP-RWA-9921',
    caseRef: 'RWA-RIB-2026-W019',
    wantedPersonName: 'Jean-Pierre Mugabo Hakizimana',
    narrative: 'A person strongly resembling the wanted individual was seen driving a dark grey Toyota Prado with foreign registration plates near the Gisenyi public market, inquiring about currency exchange services.',
    location: 'Rubavu District, Western Province, Rwanda',
    borderPost: 'Gisenyi / Grande Barrière',
    submissionDate: '2026-10-02 16:45:12',
    isAnonymous: true,
    anonymityToken: 'ANON-RWA-7728-KIG',
    status: 'TRIAGE',
    urgencyScore: 'IMMEDIATE',
    hasMediaAttached: true,
    assignedAgency: 'Rwanda Investigation Bureau (RIB)',
    humanReviewNotes: 'Vehicle details relayed to Western Region Traffic & Border Command. Officer Kwizera assigned to cross-reference CCTV footage.',
  },
  {
    id: 'TIP-2026-002',
    tipNumber: 'TIP-KEN-4402',
    caseRef: 'KEN-DCI-2026-F088',
    wantedPersonName: 'Kiprotich Evans Koech',
    narrative: 'Observed man with scar matching notice photograph meeting two individuals at an auto repair workshop outside Voi along the highway to Taveta border.',
    location: 'Voi, Taita Taveta County, Kenya',
    borderPost: 'Taveta Border Post (KE-TZ)',
    submissionDate: '2026-10-01 11:15:30',
    isAnonymous: false,
    anonymityToken: 'REG-USER-KE-1982',
    status: 'HUMAN_VERIFYING',
    urgencyScore: 'HIGH',
    hasMediaAttached: false,
    assignedAgency: 'Directorate of Criminal Investigations (DCI)',
    humanReviewNotes: 'Local DCI sub-county detective dispatched for discreet visual verification. No armed contact without backup.',
  },
  {
    id: 'TIP-2026-003',
    tipNumber: 'TIP-ZAF-3109',
    caseRef: 'ZAF-SAPS-2026-904',
    wantedPersonName: 'Nomvula Bongiwe Sithole',
    narrative: 'Suspicious delivery of unbranded medical cartons bearing fake batch codes unloaded at an informal clinic in Mbabane transit zone.',
    location: 'Matsapha / Mbabane corridor, Eswatini border',
    borderPost: 'Oshoek / Ngwenya Border',
    submissionDate: '2026-09-29 08:30:00',
    isAnonymous: true,
    anonymityToken: 'ANON-SADC-8831-SAPS',
    status: 'ESCALATED',
    urgencyScore: 'HIGH',
    hasMediaAttached: true,
    assignedAgency: 'SAPS Hawks / SARPCCO Taskforce',
    humanReviewNotes: 'Transmitted to Eswatini Royal Police Service health inspection unit under SARPCCO bilateral agreement.',
  }
];

export const INITIAL_CROSS_BORDER_REQUESTS: CrossBorderRequest[] = [
  {
    id: 'CBR-2026-001',
    refNumber: 'EAC-MLA-2026-042',
    requestingCountry: 'Rwanda',
    requestingAgency: 'National Public Prosecution Authority (NPPA) & RIB',
    requestedCountry: 'DR Congo',
    requestedAgency: 'Ministère de la Justice & PNC',
    caseRef: 'RWA-RIB-2026-W019',
    subjectName: 'Jean-Pierre Mugabo Hakizimana',
    requestType: 'MUTUAL_LEGAL_ASSISTANCE',
    status: 'IN_PROGRESS',
    legalBasis: 'EAC Treaty Article 124 (Regional Peace & Security) & Great Lakes Judicial Cooperation Protocol',
    urgency: 'URGENT',
    documents: [
      'Formal Letter of Request by Prosecutor General of Rwanda',
      'High Court Warrant #HC-RW-2026-0411 (Certified True Copy)',
      'Forensic Bank Audit Exhibit A & B'
    ],
    contactPointName: 'Chief Supt. Alexis Habimana',
    contactPointEmail: 'liaison.greatlakes@rib.gov.rw',
    contactPointPhone: '+250 788 123 456',
    dateCreated: '2026-09-20',
    notes: 'Joint investigative team meeting scheduled at Goma border coordination bureau.',
  },
  {
    id: 'CBR-2026-002',
    refNumber: 'SADC-EXT-2026-019',
    requestingCountry: 'South Africa',
    requestingAgency: 'National Prosecuting Authority (NPA) & SAPS',
    requestedCountry: 'Mozambique',
    requestedAgency: 'Procuradoria-Geral da República & SERNIC',
    caseRef: 'ZAF-SAPS-2026-904',
    subjectName: 'Nomvula Bongiwe Sithole',
    requestType: 'EXTRADITION_INQUIRY',
    status: 'ACKNOWLEDGED',
    legalBasis: 'SADC Protocol on Extradition (2002)',
    urgency: 'HIGH',
    documents: [
      'Pretoria Commercial Court Indictment',
      'Laboratory Toxicity Report on Counterfeit Antibiotic Batches'
    ],
    contactPointName: 'Brigadier Sipho Mthethwa',
    contactPointEmail: 'extradition.desk@saps.gov.za',
    contactPointPhone: '+27 12 393 1000',
    dateCreated: '2026-09-24',
    notes: 'Mozambique authorities confirmed receipt and assigned prosecutor in Maputo.',
  }
];

export const INITIAL_REGIONAL_ALERTS: RegionalAlert[] = [
  {
    id: 'ALT-2026-01',
    title: 'EAC High Alert: Cross-Border Banking Malware Variant Detected',
    region: 'East Africa',
    severity: 'CRITICAL',
    issuingEntity: 'EACAPO Regional Cybersecurity Directorate',
    summary: 'A coordinated phishing vector impersonating commercial tax authorities is targeting financial switchboards in Rwanda, Kenya, Uganda, and Tanzania. Linked to Hakizimana syndicate.',
    affectedCountries: ['Rwanda', 'Kenya', 'Uganda', 'Tanzania'],
    timestamp: '2026-10-03 14:00:00',
    actionRequired: 'All commercial banking switches must verify API endpoint certificates. Flag suspicious transfers exceeding $50k.'
  },
  {
    id: 'ALT-2026-02',
    title: 'WAPCCO Maritime Watch: Counterfeit Fuel Oil Documentation',
    region: 'West Africa',
    severity: 'HIGH',
    issuingEntity: 'Interpol Regional Bureau Abidjan',
    summary: 'Altered bills of lading for refined fuel oil moving between Gulf of Guinea ports. Port authorities should inspect digital signatures.',
    affectedCountries: ['Nigeria', 'Benin', 'Togo', 'Ghana', "Côte d'Ivoire"],
    timestamp: '2026-10-01 09:30:00',
    actionRequired: 'Port security to cross-reference customs clearance hashes against central ECOWAS trade registry.'
  },
  {
    id: 'ALT-2026-03',
    title: 'SADC Health Security: Lethal Fake Antimalarial Batches',
    region: 'Southern Africa',
    severity: 'CRITICAL',
    issuingEntity: 'SARPCCO Medical Safety Desk & SADC Health Desk',
    summary: 'Counterfeit artemisinin combination therapy (ACT) lacking active pharmaceutical ingredients found in informal pharmacies.',
    affectedCountries: ['South Africa', 'Mozambique', 'Eswatini', 'Zimbabwe'],
    timestamp: '2026-09-28 17:00:00',
    actionRequired: 'Quarantine suspected lot numbers: LOT-MED-AFR-2026-B9. Inform public health inspectors immediately.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-88201',
    timestamp: '2026-10-04 15:10:22',
    actorName: 'Supt. Claude Nkurunziza',
    actorRole: 'Senior Investigator',
    actorAgency: 'Rwanda Investigation Bureau (RIB)',
    actorCountry: 'Rwanda',
    actionType: 'WARRANT_ISSUANCE',
    targetResource: 'WP-RWA-2026-001 (Jean-Pierre Mugabo Hakizimana)',
    legalJustification: 'High Court Chamber Warrant renewal verification under Law No 027/2019.',
    integrityHash: 'SHA256:b8c19920aa8e104...intact'
  },
  {
    id: 'AUD-88202',
    timestamp: '2026-10-04 14:45:10',
    actorName: 'Officer David Kwizera',
    actorRole: 'Triage Analyst',
    actorAgency: 'RIB Public Tip Verification Cell',
    actorCountry: 'Rwanda',
    actionType: 'TIP_CLASSIFICATION',
    targetResource: 'TIP-RWA-9921',
    legalJustification: 'Standard triage processing; citizen anonymity token preserved in strict compliance with Malabo Convention.',
    integrityHash: 'SHA256:e0129fa4bc77123...intact'
  },
  {
    id: 'AUD-88203',
    timestamp: '2026-10-04 13:20:05',
    actorName: 'Chief Supt. Alexis Habimana',
    actorRole: 'Transnational Liaison',
    actorAgency: 'RIB / EACAPO Desk',
    actorCountry: 'Rwanda',
    actionType: 'CROSS_BORDER_DISPATCH',
    targetResource: 'EAC-MLA-2026-042',
    legalJustification: 'Transmission of judicial dossier to Cour d’Appel de Goma pursuant to EAC Article 124.',
    integrityHash: 'SHA256:f41a87b55c91200...intact'
  },
  {
    id: 'AUD-88204',
    timestamp: '2026-10-03 16:55:00',
    actorName: 'Senior Supt. Mary Wambui',
    actorRole: 'Lead Investigator',
    actorAgency: 'DCI Kenya',
    actorCountry: 'Kenya',
    actionType: 'CASE_ACCESS',
    targetResource: 'WP-KEN-2026-002 (Kiprotich Evans Koech)',
    legalJustification: 'Forensic review of seized ivory ballistics data.',
    integrityHash: 'SHA256:39a11ef0021cbb8...intact'
  }
];
