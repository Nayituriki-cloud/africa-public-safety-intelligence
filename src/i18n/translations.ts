import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  visionMotto: string;
  publicSafetyWarning: string;
  nav: {
    dashboard: string;
    countries: string;
    mostWanted: string;
    missions: string;
    cases: string;
    tips: string;
    intelligence: string;
    crossBorder: string;
    reports: string;
    aiAssistant: string;
    agencies: string;
    auditLogs: string;
    settings: string;
  };
  regions: {
    all: string;
    east: string;
    west: string;
    central: string;
    north: string;
    south: string;
  };
  metrics: {
    activeCases: string;
    resolvedCases: string;
    publicTips: string;
    crossBorderCases: string;
    countriesMonitored: string;
    regionalAlerts: string;
  };
  wanted: {
    searchPlaceholder: string;
    filterByRisk: string;
    filterByStatus: string;
    warrantNumber: string;
    issuingAuthority: string;
    charges: string;
    nationality: string;
    lastSeen: string;
    publicInstruction: string;
    viewDossier: string;
    submitTip: string;
    verifiedAliases: string;
    dateVerified: string;
    legalSafeguardNote: string;
  };
  tips: {
    title: string;
    subtitle: string;
    anonymousNotice: string;
    selectCase: string;
    generalTip: string;
    narrativeLabel: string;
    narrativePlaceholder: string;
    locationLabel: string;
    borderPostLabel: string;
    uploadLabel: string;
    submitButton: string;
    tokenNotice: string;
    reviewWarning: string;
    emergencyCall: string;
  };
  missions: {
    title: string;
    subtitle: string;
    objective: string;
    leadAgency: string;
    partners: string;
    progress: string;
    tasks: string;
    timeline: string;
    evidence: string;
    approvals: string;
    finalReport: string;
    statusFlow: string;
  };
  ai: {
    title: string;
    subtitle: string;
    disclaimer: string;
    tabSummarize: string;
    tabTranslate: string;
    tabTimeline: string;
    tabDuplicate: string;
    tabTips: string;
    tabReport: string;
    tabMissing: string;
    generateBtn: string;
  };
  crossBorder: {
    title: string;
    subtitle: string;
    requestType: string;
    requestingCountry: string;
    targetCountry: string;
    legalTreaty: string;
    status: string;
    newRequestBtn: string;
  };
  offline: {
    online: string;
    offline: string;
    synced: string;
    pendingSync: string;
    lowBandwidth: string;
    standardBandwidth: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'Africa Public Safety Intelligence Platform',
    appTagline: 'Sovereign Public Safety & Authorized Law Enforcement Network',
    visionMotto: 'One Africa. Verified Information. Safer Communities. Stronger Cooperation.',
    publicSafetyWarning: 'DO NOT APPROACH OR CONFRONT A WANTED PERSON. Contact the appropriate authorities immediately.',
    nav: {
      dashboard: 'Africa Dashboard',
      countries: 'Countries',
      mostWanted: 'Most Wanted',
      missions: 'Missions',
      cases: 'Cases',
      tips: 'Citizen Tips',
      intelligence: 'Intelligence',
      crossBorder: 'Cross-Border',
      reports: 'Reports',
      aiAssistant: 'AI Assistant',
      agencies: 'Agencies',
      auditLogs: 'Audit Logs',
      settings: 'Settings',
    },
    regions: {
      all: 'All Africa',
      east: 'East Africa',
      west: 'West Africa',
      central: 'Central Africa',
      north: 'North Africa',
      south: 'Southern Africa',
    },
    metrics: {
      activeCases: 'Active Official Wanted',
      resolvedCases: 'Resolved Cases',
      publicTips: 'Citizen Public Tips',
      crossBorderCases: 'Cross-Border Missions',
      countriesMonitored: 'African Nations',
      regionalAlerts: 'Active Regional Alerts',
    },
    wanted: {
      searchPlaceholder: 'Search by verified name, alias, warrant number, or issuing agency...',
      filterByRisk: 'Risk Level',
      filterByStatus: 'Case Status',
      warrantNumber: 'Official Warrant Ref',
      issuingAuthority: 'Issuing Authority',
      charges: 'Charges / Warrant Information',
      nationality: 'Nationality (Lawfully Releasable)',
      lastSeen: 'Last Verified Location / Border Corridor',
      publicInstruction: 'Public Safety Directive',
      viewDossier: 'Inspect Legal Dossier',
      submitTip: 'Submit Citizen Tip',
      verifiedAliases: 'Verified Aliases',
      dateVerified: 'Date Last Verified',
      legalSafeguardNote: 'Never add a person to the database solely because of an unverified allegation. Due process is strictly enforced.',
    },
    tips: {
      title: 'Citizen Secure Public Safety Tip System',
      subtitle: 'Submit verified information directly to authorized national investigators with guaranteed due process protection.',
      anonymousNotice: 'Zero-Log Anonymous Mode: Your IP, device telemetry, and location metadata are scrubbed. A cryptographic receipt token is issued.',
      selectCase: 'Related Officially Published Wanted Case',
      generalTip: 'General Border / Public Safety Intelligence',
      narrativeLabel: 'Detailed Observation / Narrative',
      narrativePlaceholder: 'Provide dates, times, vehicle descriptions, border post names, or specific observable information...',
      locationLabel: 'Specific Location / City / Border Post',
      borderPostLabel: 'Nearest Border Crossing (if applicable)',
      uploadLabel: 'Attach Photographic or Documentary Evidence (Mock Upload)',
      submitButton: 'Transmit Secure Encrypted Tip',
      tokenNotice: 'Save this tracking token to check status safely:',
      reviewWarning: 'Tips are triaged by verified human detectives. False statements and harassment are unlawful under national statutes.',
      emergencyCall: 'Immediate Threat? Call Emergency Hotline Directly',
    },
    missions: {
      title: 'Authorized Agency Mission Workspace',
      subtitle: 'Lawful cross-border coordination workspace adhering to African sovereignty and judicial treaties.',
      objective: 'Operational Objective',
      leadAgency: 'Responsible Institution',
      partners: 'Authorized Partner Agencies',
      progress: 'Investigative Progress',
      tasks: 'Authorized Statutory Tasks',
      timeline: 'Reconstructed Verified Timeline',
      evidence: 'Evidence & Document References',
      approvals: 'Human Judicial & Agency Approvals',
      finalReport: 'Final Report Dossier',
      statusFlow: 'Lifecycle Workflow',
    },
    ai: {
      title: 'AI Africa Public-Safety Copilot',
      subtitle: 'Sovereign intelligence assistant for authorized personnel powered by Gemini.',
      disclaimer: 'CRITICAL MANDATE: AI must NOT independently determine guilt, order an arrest, or make operational tactical decisions.',
      tabSummarize: 'Case Briefing',
      tabTranslate: 'Multilingual Translator',
      tabTimeline: 'Timeline Builder',
      tabDuplicate: 'Duplicate Detection',
      tabTips: 'Tip Triage',
      tabReport: 'Report Generator',
      tabMissing: 'Missing Info Audit',
      generateBtn: 'Execute Sovereign Intelligence Task',
    },
    crossBorder: {
      title: 'Cross-Border Cooperation & Mutual Legal Assistance',
      subtitle: 'Facilitating lawful bilateral coordination between African national central bureaus and regional police bodies.',
      requestType: 'Request Category',
      requestingCountry: 'Requesting State',
      targetCountry: 'Recipient State',
      legalTreaty: 'Treaty / Statutory Basis',
      status: 'Transmission Status',
      newRequestBtn: 'Draft Mutual Assistance Request',
    },
    offline: {
      online: 'Connected to Sovereign Secure Grid',
      offline: 'Field Offline Mode (Local Storage Encrypted)',
      synced: 'All records synchronized',
      pendingSync: 'records pending synchronization',
      lowBandwidth: 'Low-Bandwidth Mode (Active)',
      standardBandwidth: 'Standard Bandwidth',
    },
  },

  fr: {
    appName: 'Plateforme Africaine de Renseignement et de Sécurité Publique',
    appTagline: 'Réseau Souverain de Sécurité Publique et des Forces de l’Ordre Autorisées',
    visionMotto: 'Une seule Afrique. Informations vérifiées. Communautés plus sûres. Coopération renforcée.',
    publicSafetyWarning: 'NE VOUS APPROCHEZ PAS D’UNE PERSONNE RECHERCHÉE. Contactez immédiatement les autorités compétentes.',
    nav: {
      dashboard: 'Tableau de Bord Afrique',
      countries: 'Pays',
      mostWanted: 'Personnes Recherchées',
      missions: 'Missions',
      cases: 'Dossiers',
      tips: 'Signalements Citoyens',
      intelligence: 'Renseignement',
      crossBorder: 'Transfrontalier',
      reports: 'Rapports',
      aiAssistant: 'Assistant IA',
      agencies: 'Agences',
      auditLogs: 'Journaux d’Audit',
      settings: 'Paramètres',
    },
    regions: {
      all: 'Toute l’Afrique',
      east: 'Afrique de l’Est',
      west: 'Afrique de l’Ouest',
      central: 'Afrique Centrale',
      north: 'Afrique du Nord',
      south: 'Afrique Australe',
    },
    metrics: {
      activeCases: 'Avis de Recherche Actifs',
      resolvedCases: 'Dossiers Résolus',
      publicTips: 'Signalements Citoyens',
      crossBorderCases: 'Missions Transfrontalières',
      countriesMonitored: 'Nations Africaines',
      regionalAlerts: 'Alertes Régionales Actives',
    },
    wanted: {
      searchPlaceholder: 'Rechercher par nom vérifié, alias, numéro de mandat ou agence...',
      filterByRisk: 'Niveau de Risque',
      filterByStatus: 'Statut du Dossier',
      warrantNumber: 'Réf. Officielle du Mandat',
      issuingAuthority: 'Autorité Émettrice',
      charges: 'Chef d’Inculpation / Mandat',
      nationality: 'Nationalité (Légalement Diffusable)',
      lastSeen: 'Dernière Localisation Vérifiée',
      publicInstruction: 'Consigne de Sécurité Publique',
      viewDossier: 'Consulter le Dossier Juridique',
      submitTip: 'Transmettre un Signalement',
      verifiedAliases: 'Alias Vérifiés',
      dateVerified: 'Dernière Vérification',
      legalSafeguardNote: 'Aucune personne ne peut être fichée sur la base d’une simple allégation. Présomption d’innocence garantie.',
    },
    tips: {
      title: 'Système Sécurisé de Signalement Citoyen',
      subtitle: 'Transmettez des informations vérifiées directement aux enquêteurs nationaux autorisés.',
      anonymousNotice: 'Mode Anonyme Zéro-Donnée : Votre IP et vos métadonnées sont supprimées. Un jeton de suivi sécurisé vous est fourni.',
      selectCase: 'Dossier de Recherche Officiel Associé',
      generalTip: 'Renseignement Général de Sécurité aux Frontières',
      narrativeLabel: 'Description Détaillée / Faits Observés',
      narrativePlaceholder: 'Indiquez les dates, heures, immatriculations, postes frontières observés...',
      locationLabel: 'Localisation / Ville / Poste Frontière',
      borderPostLabel: 'Poste Frontière le plus proche',
      uploadLabel: 'Joindre une Preuve Documentaire ou Photo (Simulateur)',
      submitButton: 'Transmettre le Signalement Chiffré',
      tokenNotice: 'Conservez ce jeton de suivi pour consulter l’avancement en toute sécurité :',
      reviewWarning: 'Chaque signalement fait l’objet d’une vérification humaine rigoureuse.',
      emergencyCall: 'Menace Immédiate ? Appelez Directement le Numéro d’Urgence',
    },
    missions: {
      title: 'Espace de Mission des Agences Autorisées',
      subtitle: 'Coordination transfrontalière légale conforme à la souveraineté africaine.',
      objective: 'Objectif Opérationnel',
      leadAgency: 'Institution Responsable',
      partners: 'Agences Partenaires Autorisées',
      progress: 'Progression de l’Enquête',
      tasks: 'Tâches Légales Autorisées',
      timeline: 'Chronologie Reconstituée Vérifiée',
      evidence: 'Éléments de Preuve et Pièces',
      approvals: 'Approbations Humaines et Judiciaires',
      finalReport: 'Rapport Final de Mission',
      statusFlow: 'Cycle de Vie Opérationnel',
    },
    ai: {
      title: 'Assistant IA Africain de Sécurité Publique',
      subtitle: 'Outil de renseignement souverain pour personnels autorisés, propulsé par Gemini.',
      disclaimer: 'MANDAT CRITIQUE : L’IA ne doit JAMAIS déterminer la culpabilité, ordonner une arrestation ou prendre des décisions tactiques.',
      tabSummarize: 'Synthèse de Dossier',
      tabTranslate: 'Traduction Multilingue',
      tabTimeline: 'Générateur de Chronologie',
      tabDuplicate: 'Détection de Doublons',
      tabTips: 'Triage de Signalements',
      tabReport: 'Générateur de Rapport',
      tabMissing: 'Contrôle des Données Manquantes',
      generateBtn: 'Exécuter la Tâche de Renseignement',
    },
    crossBorder: {
      title: 'Coopération Transfrontalière et Entraide Judiciaire',
      subtitle: 'Faciliter la coordination légale entre les bureaux centraux nationaux et les organismes régionaux.',
      requestType: 'Catégorie de Demande',
      requestingCountry: 'État Requérant',
      targetCountry: 'État Destinataire',
      legalTreaty: 'Base Juridique / Traité',
      status: 'État de la Transmission',
      newRequestBtn: 'Rédiger une Demande d’Entraide',
    },
    offline: {
      online: 'Connecté au Réseau Souverain Sécurisé',
      offline: 'Mode Hors-Ligne Terrain (Stockage Local Chiffré)',
      synced: 'Tous les dossiers sont synchronisés',
      pendingSync: 'dossiers en attente de synchronisation',
      lowBandwidth: 'Mode Bas Débit (Actif)',
      standardBandwidth: 'Bande Passante Standard',
    },
  },

  sw: {
    appName: 'Mfumo wa Usalama wa Umma na Ujasusi wa Afrika',
    appTagline: 'Mtandao Huru wa Usalama wa Umma na Vyombo vya Sheria Vilivyoidhinishwa',
    visionMotto: 'Afrika Moja. Taarifa Zilizothibitishwa. Jamii Salama. Ushirikiano Imara.',
    publicSafetyWarning: 'USIMKARIBIE AU KUMKABILI MTU ANAYETAFUTWA. Wasiliana na vyombo vya usalama mara moja.',
    nav: {
      dashboard: 'Dashibodi ya Afrika',
      countries: 'Nchi za Afrika',
      mostWanted: 'Wanaotafutwa Zaidi',
      missions: 'Operesheni Maalum',
      cases: 'Kesi Rasmi',
      tips: 'Taarifa za Wananchi',
      intelligence: 'Ujasusi na Usalama',
      crossBorder: 'Ushirikiano wa Mpakani',
      reports: 'Ripoti Rasmi',
      aiAssistant: 'Msaidizi wa AI',
      agencies: 'Vyombo vya Usalama',
      auditLogs: 'Kumbukumbu za Ukaguzi',
      settings: 'Mipangilio',
    },
    regions: {
      all: 'Afrika Nzima',
      east: 'Afrika Mashariki',
      west: 'Afrika Magharibi',
      central: 'Afrika ya Kati',
      north: 'Afrika Kaskazini',
      south: 'Kusini mwa Afrika',
    },
    metrics: {
      activeCases: 'Kesi za Wanaotafutwa',
      resolvedCases: 'Kesi Zilizotatuliwa',
      publicTips: 'Taarifa za Wananchi',
      crossBorderCases: 'Operesheni za Mpakani',
      countriesMonitored: 'Nchi Wanachama',
      regionalAlerts: 'Tahadhari za Kikanda',
    },
    wanted: {
      searchPlaceholder: 'Tafuta kwa jina lililothibitishwa, jina la utani, hati ya kukamatwa...',
      filterByRisk: 'Kiwango cha Hatari',
      filterByStatus: 'Hali ya Kesi',
      warrantNumber: 'Nambari ya Hati ya Mahakama',
      issuingAuthority: 'Chombo Kilichotoa Hati',
      charges: 'Mashtaka / Hati ya Kukamatwa',
      nationality: 'Uraia (Kisheria)',
      lastSeen: 'Eneo Alipoonekana Mwisho',
      publicInstruction: 'Maelekezo kwa Umma',
      viewDossier: 'Kagua Jalada Kamili la Kisheria',
      submitTip: 'Tuma Taarifa Salama',
      verifiedAliases: 'Majina ya Utani Yaliyothibitishwa',
      dateVerified: 'Tarehe ya Uthibitisho',
      legalSafeguardNote: 'Mtu hawezi kuwekwa kwenye orodha kwa tuhuma zisizothibitishwa. Haki ya kusikilizwa inalindwa.',
    },
    tips: {
      title: 'Mfumo Salama wa Taarifa za Wananchi',
      subtitle: 'Wasilisha taarifa zilizothibitishwa moja kwa moja kwa wachunguzi wa serikali.',
      anonymousNotice: 'Hali ya Usiri Kamili: Anwani ya mtandao na data ya kifaa hufutwa kabisa. Unapewa nambari salama ya kufuatilia.',
      selectCase: 'Kesi Rasmi ya Mtu Anayetafutwa',
      generalTip: 'Taarifa ya Jumla ya Usalama Mpakani',
      narrativeLabel: 'Maelezo ya Kina ya Ulichoshuhudia',
      narrativePlaceholder: 'Weka tarehe, muda, gari lililotumika, vituo vya mpakani...',
      locationLabel: 'Eneo / Mji / Kituo cha Mpaka',
      borderPostLabel: 'Kituo cha Mpaka kilicho Karibu',
      uploadLabel: 'Ambatisha Ushahidi wa Picha au Nyaraka',
      submitButton: 'Tuma Taarifa Zilizolindwa',
      tokenNotice: 'Hifadhi nambari hii maalum kufuatilia taarifa yako kwa usalama:',
      reviewWarning: 'Taarifa zote zinapitiwa na maafisa wa upelelezi. Kutoa habari za uongo ni kosa la kisheria.',
      emergencyCall: 'Hatari ya Haraka? Piga Nambari ya Dharura Moja kwa Moja',
    },
    missions: {
      title: 'Eneo la Kazi la Operesheni za Vyombo vya Sheria',
      subtitle: 'Kuratibu upelelezi wa mpakani kwa mujibu wa mikataba ya kikanda na uhuru wa mataifa.',
      objective: 'Lengo la Operesheni',
      leadAgency: 'Chombo Kinachoongoza',
      partners: 'Vyombo Shirikishi Vilivyoidhinishwa',
      progress: 'Maendeleo ya Upelelezi',
      tasks: 'Majukumu ya Kisheria',
      timeline: 'Mlolongo wa Matukio Yaliyothibitishwa',
      evidence: 'Vielelezo na Nyaraka',
      approvals: 'Idhini za Mahakama na Viongozi',
      finalReport: 'Ripoti ya Mwisho ya Operesheni',
      statusFlow: 'Hatua za Operesheni',
    },
    ai: {
      title: 'Msaidizi Mahiri wa AI kwa Usalama wa Umma Afrika',
      subtitle: 'Ujasusi unaoendeshwa na Gemini kwa matumizi ya maafisa walioidhinishwa tu.',
      disclaimer: 'TAHADHARI YA MSINGI: AI HAIWEZI kuamua hatia ya mtu, kuagiza kukamatwa, au kutoa maamuzi ya kijeshi.',
      tabSummarize: 'Muhtasari wa Kesi',
      tabTranslate: 'Ufasiri wa Lugha za Kiafrika',
      tabTimeline: 'Ujenzi wa Mlolongo wa Matukio',
      tabDuplicate: 'Utambuzi wa Kumbukumbu Pacha',
      tabTips: 'Uchambuzi wa Taarifa za Wananchi',
      tabReport: 'Tengeneza Ripoti Rasmi',
      tabMissing: 'Ukaguzi wa Taarifa Zinazokosekana',
      generateBtn: 'Tekeleza Kazi ya Kijasusi',
    },
    crossBorder: {
      title: 'Ushirikiano wa Mpakani na Msaada wa Kisheria',
      subtitle: 'Kuwezesha ushirikiano halali kati ya nchi wanachama wa EAC, SADC, ECOWAS, na AFRIPOL.',
      requestType: 'Aina ya Ombi',
      requestingCountry: 'Nchi Inayoomba',
      targetCountry: 'Nchi Inayoombwa',
      legalTreaty: 'Mkataba au Msingi wa Kisheria',
      status: 'Hali ya Mawasiliano',
      newRequestBtn: 'Andaa Ombi la Msaada wa Kisheria',
    },
    offline: {
      online: 'Imeunganishwa kwenye Mtandao Salama wa Serikali',
      offline: 'Hali ya Nje ya Mtandao (Nyaraka Zimehifadhiwa Kwenye Kifaa)',
      synced: 'Kumbukumbu zote zimesawazishwa',
      pendingSync: 'kumbukumbu zinasubiri kusawazishwa',
      lowBandwidth: 'Mtandao wa Kasi Ndogo (Imewashwa)',
      standardBandwidth: 'Kasi ya Kawaida ya Mtandao',
    },
  },

  rw: {
    appName: 'Urubuga rw’Umutekano n’Ubutasi bwa Afurika',
    appTagline: 'Urubuga Rwizewe rw’Umutekano n’Urwego rw’Ubugenzacyaha muri Afurika',
    visionMotto: 'Afurika Imwe. Amakuru Yizewe. Umuryango Utuje. Ubufatanye Bukomeye.',
    publicSafetyWarning: 'NTUKIGERAGEZE KWIGEREZA KU MUNTU USHAKISHWA N’UBUTABERA. Menyesha inzego z’umutekano ako kanya.',
    nav: {
      dashboard: 'Imbonerahamwe ya Afurika',
      countries: 'Ibihugu bya Afurika',
      mostWanted: 'Abashakishwa Cyane',
      missions: 'Ubutumwa bw’Ubugenzacyaha',
      cases: 'Imanza z’Ubugenzacyaha',
      tips: 'Amakuru Y’Abaturage',
      intelligence: 'Ubutasi n’Umutekano',
      crossBorder: 'Ubufatanye bw’Imbibi',
      reports: 'Raporo Z’Ubugenzacyaha',
      aiAssistant: 'Ubufasha bwa AI',
      agencies: 'Inzego Z’Umutekano',
      auditLogs: 'Ibyakozwe mu Bubiko',
      settings: 'Igenamiterere',
    },
    regions: {
      all: 'Afurika Yose',
      east: 'Afurika y’Iburasirazuba',
      west: 'Afurika y’Iburengerazuba',
      central: 'Afurika yo Hagati',
      north: 'Afurika y’Amajyaruguru',
      south: 'Afurika y’Amajyepfo',
    },
    metrics: {
      activeCases: 'Abashakishwa ku Mugaragaro',
      resolvedCases: 'Imanza Zarangiye',
      publicTips: 'Amakuru Y’Abaturage',
      crossBorderCases: 'Ubutumwa bw’Imbibi',
      countriesMonitored: 'Ibihugu Bigize Afurika',
      regionalAlerts: 'Iburira ry’Akarere',
    },
    wanted: {
      searchPlaceholder: 'Shakisha ku mazina yemejwe, izina ry’irihimbano, impapuro zo guta muri yombi...',
      filterByRisk: 'Urugero rw’Ubugome',
      filterByStatus: 'Imiterere y’Urubanza',
      warrantNumber: 'Inomero y’Urupapuro rw’Urukiko',
      issuingAuthority: 'Urwego Rwasohoye Impapuro',
      charges: 'Ibyaha Akekwaho / Icyemezo cy’Urukiko',
      nationality: 'Ubwenegihugu',
      lastSeen: 'Aho Yaherukaga Kubonwa / Ku Mupaka',
      publicInstruction: 'Amabwiriza y’Umutekano Rusange',
      viewDossier: 'Suzuma Dosiye y’Urukiko',
      submitTip: 'Tanga Amakuru ku Buryo Bwihishe',
      verifiedAliases: 'Amazina y’Irihimbano Yemejwe',
      dateVerified: 'Itariki Byasuzumiweho',
      legalSafeguardNote: 'Nta muntu ushyirwa ku rubuga kubera amagambo adafite gihamya. Uburenganzira bw’ikiremwamuntu burubahirizwa.',
    },
    tips: {
      title: 'Uburyo Bwihishe bwo Gutanga Amakuru y’Umutekano',
      subtitle: 'Tanga amakuru yizewe mu ibanga rikomeye ku bugenzacyaha bwa Leta (urugero: RIB, Polisi).',
      anonymousNotice: 'Uburyo bwo Kudatangaza Umwirondoro: Nta makuru y’aho uri cyangwa aderesi ya interineti bibikwa. Uhagabwa kode y’ibanga yo gukurikirana.',
      selectCase: 'Urubanza rw’Umuntu Ushakishwa',
      generalTip: 'Amakuru Rusange y’Umutekano ku Mupaka',
      narrativeLabel: 'Ibisobanuro Birambuye ku Byo Wabonye',
      narrativePlaceholder: 'Andika amatariki, isaha, imodoka, umupaka yaba yambukiraho, cyangwa ibimenyetso wiboneye...',
      locationLabel: 'Aho Wabonye Ibikorwa / Umupaka',
      borderPostLabel: 'Umupaka Uri Hafi',
      uploadLabel: 'Shyiraho Ifoto cyangwa Inyandiko (Urugero)',
      submitButton: 'Ohereza Amakuru mu Ibanga',
      tokenNotice: 'Bika iyi kode y’ibanga yo kureba niba amakuru yawe yageze ku bugenzacyaha:',
      reviewWarning: 'Amakuru yose asuzumwa n’abagenzacyaha babifitiye ububasha. Gutanga amakuru y’ibinyoma birahanirwa n’amategeko.',
      emergencyCall: 'Hari Akaga Kihutirwa? Hamagara Ako Kanya RIB 166 cyangwa Polisi 112',
    },
    missions: {
      title: 'Urubuga rw’Ubutumwa bw’Urwego rw’Ubugenzacyaha (RIB)',
      subtitle: 'Guhuza ibikorwa by’ubutasi no gutata abanyabyaha hagati y’ibihugu hubahirijwe amategeko n’amasezerano ya EAC.',
      objective: 'Intego y’Ubutumwa',
      leadAgency: 'Urwego Ruyoboye',
      partners: 'Inzego Zifatanyije',
      progress: 'Intambwe Igezweho',
      tasks: 'Imirimo Yemerewe n’Amategeko',
      timeline: 'Uko Ibyabaye Byagiye Bikurikirana',
      evidence: 'Ibimenyetso n’Inyandiko z’Urukiko',
      approvals: 'Iyemeza ry’Ubushinjacyaha n’Urukiko',
      finalReport: 'Raporo ya Nyuma y’Ubutumwa',
      statusFlow: 'Uko Ubutumwa Butegurwa',
    },
    ai: {
      title: 'Ubufasha bw’Ubutasi bwa AI ku Mutekano wa Afurika',
      subtitle: 'Ikoranabuhanga rya AI riyobowe na Gemini ryagenewe abagenzacyaha n’abapolisi babifitiye uburenganzira.',
      disclaimer: 'AMATEGEKO ARENGERA UBURENGANZIRA: AI NTIYEMEREWE gufata icyemezo cy’icyaha, gutegeka ifungwa, cyangwa gutanga amategeko yo gutabara.',
      tabSummarize: 'Gupfundika Dosiye',
      tabTranslate: 'Guhindura mu Ndimi za Afurika',
      tabTimeline: 'Gutunganya Imirongo y’Ibihe',
      tabDuplicate: 'Gusuzuma Dosiye Zisobetse',
      tabTips: 'Gutoranya Amakuru y’Abaturage',
      tabReport: 'Kwandika Raporo Z’Ubugenzacyaha',
      tabMissing: 'Gusuzuma Amakuru Yabuze muri Dosiye',
      generateBtn: 'Gukora Isesengura rya AI',
    },
    crossBorder: {
      title: 'Ubufatanye bw’Imbibi n’Ubutabera Mpuzamahanga',
      subtitle: 'Guhuza inzego z’ubugenzacyaha hagati y’u Rwanda, EAC, SADC, ECOWAS na AFRIPOL.',
      requestType: 'Ubwoko bw’Ubusabe',
      requestingCountry: 'Igihugu Gisaba',
      targetCountry: 'Igihugu Gisabwa',
      legalTreaty: 'Amasezerano n’Ingingo y’Itegeko',
      status: 'Imiterere y’Ubusabe',
      newRequestBtn: 'Kwandika Ubusabe bw’Ubufatanye bw’Ubutabera',
    },
    offline: {
      online: 'Bihujwe n’Urubuga rwa Leta Rukomeye',
      offline: 'Gukorera Ahadakora Interineti (Amakuru Abikwa mu Mashini)',
      synced: 'Amakuru yose yagejejwe mu bubiko bukuru',
      pendingSync: 'dosiye zitegereje gushyirwa mu bubiko',
      lowBandwidth: 'Uburyo bwo Kugabanya Interineti (Burakora)',
      standardBandwidth: 'Interineti Isanzwe',
    },
  },

  ar: {
    appName: 'منصة الاستخبارات والسلامة العامة الإفريقية',
    appTagline: 'الشبكة السيادية المعتمدة لإنفاذ القانون والسلامة العامة',
    visionMotto: 'إفريقيا واحدة. معلومات موثقة. مجتمعات أكثر أماناً. تعاون أقوى.',
    publicSafetyWarning: 'لا تقترب أو تواجه أي شخص مطلوب للعدالة. اتصل بالسلطات الأمنية المختصة فوراً.',
    nav: {
      dashboard: 'لوحة تحكم إفريقيا',
      countries: 'الدول',
      mostWanted: 'أبرز المطلوبين',
      missions: 'المهام الأمنية',
      cases: 'الملفات القضائية',
      tips: 'بلاغات المواطنين',
      intelligence: 'الاستخبارات',
      crossBorder: 'التعاون العابر للحدود',
      reports: 'التقارير الرسمية',
      aiAssistant: 'مساعد الذكاء الاصطناعي',
      agencies: 'الأجهزة الأمنية',
      auditLogs: 'سجلات التدقيق',
      settings: 'الإعدادات',
    },
    regions: {
      all: 'كل إفريقيا',
      east: 'شرق إفريقيا',
      west: 'غرب إفريقيا',
      central: 'وسط إفريقيا',
      north: 'شمال إفريقيا',
      south: 'الجنوب الإفريقي',
    },
    metrics: {
      activeCases: 'مذكرات بحث نشطة',
      resolvedCases: 'ملفات مكتملة',
      publicTips: 'بلاغات المواطنين',
      crossBorderCases: 'مهام عابرة للحدود',
      countriesMonitored: 'دول إفريقية',
      regionalAlerts: 'تنبيهات إقليمية نشطة',
    },
    wanted: {
      searchPlaceholder: 'البحث بالاسم الموثق، الاسم المستعار، رقم المذكرة القضائية...',
      filterByRisk: 'مستوى الخطورة',
      filterByStatus: 'حالة الملف',
      warrantNumber: 'رقم المذكرة القضائية',
      issuingAuthority: 'السلطة المصدرة',
      charges: 'التهم / بيانات المذكرة',
      nationality: 'الجنسية (المصرح بنشرها)',
      lastSeen: 'آخر موقع موثق / المنفذ الحدودي',
      publicInstruction: 'تعليمات السلامة العامة',
      viewDossier: 'فحص الملف القانوني',
      submitTip: 'تقديم بلاغ آمن',
      verifiedAliases: 'الأسماء المستعارة الموثقة',
      dateVerified: 'تاريخ آخر تدقيق',
      legalSafeguardNote: 'لا يُدرج أي شخص بناءً على ادعاء غير موثق. الإجراءات القانونية واجبة التطبيق.',
    },
    tips: {
      title: 'نظام البلاغات العامة الآمن للمواطنين',
      subtitle: 'إرسال معلومات موثقة مباشرة إلى جهات التحقيق الوطنية المعتمدة مع ضمان السرية.',
      anonymousNotice: 'وضع السرية التامة: يتم حجب عنوان البروتوكول وبيانات الجهاز تلقائياً، وإصدار رمز تتبع مشفر.',
      selectCase: 'ملف الشخص المطلوب المرتبط',
      generalTip: 'معلومات عامة عن أمن الحدود والسلامة العامة',
      narrativeLabel: 'تفاصيل المشاهدة والمعلومات',
      narrativePlaceholder: 'سجل التواريخ، الأوقات، لوحات المركبات، المنافذ الحدودية...',
      locationLabel: 'الموقع / المدينة / المعبر الحدودي',
      borderPostLabel: 'أقرب منفذ حدودي',
      uploadLabel: 'إرفاق أدلة صور أو وثائق (محاكاة)',
      submitButton: 'إرسال البلاغ المشفر بأمان',
      tokenNotice: 'احتفظ برمز التتبع هذا لمتابعة الإجراءات بأمان:',
      reviewWarning: 'تخضع جميع البلاغات لتدقيق بشري متخصص. الإدلاء ببلاغ كاذب يعاقب عليه القانون.',
      emergencyCall: 'خطر داهم؟ اتصل برقم الطوارئ المباشر فوراً',
    },
    missions: {
      title: 'مساحة العمليات للجهات المعتمدة',
      subtitle: 'تنسيق التحقيقات عبر الحدود في إطار احترام السيادة الوطنية والمعاهدات الإفريقية.',
      objective: 'الهدف العملياتي',
      leadAgency: 'الجهاز المسؤول',
      partners: 'الأجهزة الشريكة المعتمدة',
      progress: 'نسبة تقدم التحقيق',
      tasks: 'المهام القانونية المعتمدة',
      timeline: 'التسلسل الزمني الموثق',
      evidence: 'المستندات والأدلة القانونية',
      approvals: 'الموافقات القضائية والأمنية البشرية',
      finalReport: 'تقرير المهمة النهائي',
      statusFlow: 'مراحل سير العملية',
    },
    ai: {
      title: 'المساعد الإفريقي للسلامة العامة بالذكاء الاصطناعي',
      subtitle: 'أداة استخباراتية سيادية للمصرح لهم، مدعومة بنماذج Gemini المتقدمة.',
      disclaimer: 'تنبيه دستوري وقانوني: لا يملك الذكاء الاصطناعي صلاحية إثبات الإدانة أو إصدار أوامر التوقيف.',
      tabSummarize: 'تلخيص الملفات',
      tabTranslate: 'ترجمة الوثائق الإفريقية',
      tabTimeline: 'بناء التسلسل الزمني',
      tabDuplicate: 'كشف السجلات المزدوجة',
      tabTips: 'تصنيف البلاغات',
      tabReport: 'إعداد التقارير القانونية',
      tabMissing: 'تدقيق البيانات الناقصة',
      generateBtn: 'تنفيذ المهمة الاستخباراتية',
    },
    crossBorder: {
      title: 'التعاون العابر للحدود والمساعدة القضائية المتبادلة',
      subtitle: 'تيسير التنسيق بين المكاتب المركزية الوطنية والهيئات الإقليمية (أفريبول، الإنتربول).',
      requestType: 'نوع الطلب',
      requestingCountry: 'الدولة الطالبة',
      targetCountry: 'الدولة المستلمة',
      legalTreaty: 'السند القانوني والمعاهدة',
      status: 'حالة الإرسال',
      newRequestBtn: 'صياغة طلب مساعدة قضائية',
    },
    offline: {
      online: 'متصل بالشبكة السيادية المؤمنة',
      offline: 'وضع العمل الميداني دون اتصال (تشفير محلي)',
      synced: 'تمت مزامنة كافة السجلات',
      pendingSync: 'سجلات بانتظار المزامنة',
      lowBandwidth: 'وضع النطاق الترددي المنخفض (نشط)',
      standardBandwidth: 'النطاق الترددي القياسي',
    },
  },

  pt: {
    appName: 'Plataforma Africana de Inteligência e Segurança Pública',
    appTagline: 'Rede Soberana de Segurança Pública e Órgãos Oficiais de Aplicação da Lei',
    visionMotto: 'Uma África. Informação Verificada. Comunidades Mais Seguras. Cooperação Reforçada.',
    publicSafetyWarning: 'NÃO SE APROXIME NEM CONFRONTE UMA PESSOA PROCURADA. Contacte imediatamente as autoridades competentes.',
    nav: {
      dashboard: 'Painel África',
      countries: 'Países',
      mostWanted: 'Mais Procurados',
      missions: 'Missões',
      cases: 'Processos',
      tips: 'Denúncias Cidadãs',
      intelligence: 'Inteligência',
      crossBorder: 'Transfronteiriço',
      reports: 'Relatórios',
      aiAssistant: 'Assistente IA',
      agencies: 'Agências',
      auditLogs: 'Registos de Auditoria',
      settings: 'Definições',
    },
    regions: {
      all: 'Toda a África',
      east: 'África Oriental',
      west: 'África Ocidental',
      central: 'África Central',
      north: 'África do Norte',
      south: 'África Austral',
    },
    metrics: {
      activeCases: 'Mandados de Captura Ativos',
      resolvedCases: 'Processos Resolvidos',
      publicTips: 'Denúncias Cidadãs',
      crossBorderCases: 'Missões Transfronteiriças',
      countriesMonitored: 'Nações Africanas',
      regionalAlerts: 'Alertas Regionais Ativos',
    },
    wanted: {
      searchPlaceholder: 'Pesquisar por nome verificado, pseudónimo, número do mandado...',
      filterByRisk: 'Nível de Risco',
      filterByStatus: 'Estado do Processo',
      warrantNumber: 'Ref. Oficial do Mandado',
      issuingAuthority: 'Autoridade Emissora',
      charges: 'Acusações / Dados do Mandado',
      nationality: 'Nacionalidade (Legalmente Divulgável)',
      lastSeen: 'Última Localização Verificada / Posto Fronteiriço',
      publicInstruction: 'Diretiva de Segurança Pública',
      viewDossier: 'Inspecionar Dossiê Jurídico',
      submitTip: 'Enviar Denúncia Cidadã',
      verifiedAliases: 'Pseudónimos Verificados',
      dateVerified: 'Data da Última Verificação',
      legalSafeguardNote: 'Nenhuma pessoa pode ser incluída na base de dados com base em alegações não verificadas.',
    },
    tips: {
      title: 'Sistema Seguro de Denúncia Cidadã',
      subtitle: 'Envie informações verificadas diretamente para investigadores nacionais autorizados.',
      anonymousNotice: 'Modo Anónimo Sem Registo: O seu IP e metadados são eliminados. É gerado um código criptográfico de acompanhamento.',
      selectCase: 'Processo Oficial de Pessoa Procurada',
      generalTip: 'Inteligência Geral de Segurança Fronteiriça',
      narrativeLabel: 'Descrição Pormenorizada / Ocorrência',
      narrativePlaceholder: 'Forneça datas, horários, veículos, postos fronteiriços ou outros dados observados...',
      locationLabel: 'Localização / Cidade / Posto de Fronteira',
      borderPostLabel: 'Posto Fronteiriço Mais Próximo',
      uploadLabel: 'Anexar Prova Fotográfica ou Documental (Simulação)',
      submitButton: 'Transmitir Denúncia Encriptada',
      tokenNotice: 'Guarde este código para acompanhar o estado da denúncia com segurança:',
      reviewWarning: 'Todas as informações são triadas por investigadores humanos credenciados.',
      emergencyCall: 'Ameaça Imediata? Contacte a Linha de Emergência Imediatamente',
    },
    missions: {
      title: 'Área de Missões das Agências Autorizadas',
      subtitle: 'Coordenação transfronteiriça legítima em conformidade com os tratados africanos de cooperação judiciária.',
      objective: 'Objetivo Operacional',
      leadAgency: 'Instituição Responsável',
      partners: 'Agências Parceiras Autorizadas',
      progress: 'Progresso da Investigação',
      tasks: 'Tarefas Estatutárias Autorizadas',
      timeline: 'Cronologia Reconstituída e Verificada',
      evidence: 'Provas e Referências Documentais',
      approvals: 'Aprovações Humanas e Judiciais',
      finalReport: 'Relatório Final da Missão',
      statusFlow: 'Fluxo Operacional',
    },
    ai: {
      title: 'Copiloto de Segurança Pública com IA para África',
      subtitle: 'Assistente soberano de inteligência para pessoal autorizado com tecnologia Gemini.',
      disclaimer: 'SALVAGUARDA FUNDAMENTAL: A IA NÃO PODE determinar culpa, emitir mandados de captura ou ordenar ações táticas.',
      tabSummarize: 'Resumo de Processo',
      tabTranslate: 'Tradutor Multilíngue',
      tabTimeline: 'Construtor de Cronologia',
      tabDuplicate: 'Deteção de Registos Duplicados',
      tabTips: 'Triagem de Denúncias',
      tabReport: 'Gerador de Relatórios',
      tabMissing: 'Auditoria de Dados em Falta',
      generateBtn: 'Executar Tarefa de Inteligência',
    },
    crossBorder: {
      title: 'Cooperação Transfronteiriça e Auxílio Judiciário Mútuo',
      subtitle: 'Facilitar a coordenação bilateral lícita entre gabinetes nacionais centrais e instâncias policiais regionais.',
      requestType: 'Categoria do Pedido',
      requestingCountry: 'Estado Requerente',
      targetCountry: 'Estado Requerido',
      legalTreaty: 'Tratado / Base Jurídica',
      status: 'Estado do Envio',
      newRequestBtn: 'Redigir Pedido de Auxílio Judiciário',
    },
    offline: {
      online: 'Ligado à Rede Soberana Segura',
      offline: 'Modo de Campo Offline (Armazenamento Local Encriptado)',
      synced: 'Todos os registos sincronizados',
      pendingSync: 'registos aguardando sincronização',
      lowBandwidth: 'Modo de Baixa Largura de Banda (Ativo)',
      standardBandwidth: 'Largura de Banda Padrão',
    },
  },
};
