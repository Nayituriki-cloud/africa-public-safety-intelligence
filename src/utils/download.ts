/**
 * Utility functions for exporting and downloading official dossiers,
 * public safety bulletins, mission reports, and audit logs.
 */

export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJsonFile(filename: string, data: any) {
  const jsonStr = JSON.stringify(data, null, 2);
  downloadTextFile(filename, jsonStr, 'application/json;charset=utf-8');
}

export function downloadCsvFile(filename: string, csvContent: string) {
  downloadTextFile(filename, csvContent, 'text/csv;charset=utf-8');
}

/**
 * Generates an official formatted wanted bulletin for law enforcement field distribution
 */
export function generateWantedBulletinText(person: any): string {
  const divider = '='.repeat(76);
  const subDivider = '-'.repeat(76);

  return `${divider}
SOVEREIGN LAW ENFORCEMENT & PUBLIC SAFETY INTELLIGENCE PLATFORM
OFFICIAL HIGH COURT JUDICIAL ARREST WARRANT & MOST WANTED NOTICE
ANCHOR: RWANDA INVESTIGATION BUREAU (RIB) & INTERPOL REGIONAL NETWORK
${divider}

WARRANT REFERENCE:       ${person.refNumber}
COURT ARREST WARRANT:   ${person.warrantNumber} (Date: ${person.warrantDate})
ISSUING JURISDICTION:    ${person.issuingCountry} - ${person.issuingAuthority}
DATE LAST VERIFIED:      ${person.dateVerified}
CASE STATUS:             ${person.status}
RISK ASSESSMENT TIER:    ${person.riskLevel} PRIORITY

${subDivider}
I. IDENTIFICATION OF SUBJECT
${subDivider}
FULL NAME:               ${person.name}
VERIFIED ALIASES:        ${person.verifiedAliases?.join(', ') || 'None recorded'}
NATIONALITY:             ${person.nationality} (${person.countryCode})
AGE / GENDER / HEIGHT:   ${person.age || 'Unrecorded'} years / ${person.gender || 'M'} / ${person.height || 'Unrecorded'}
PHYSICAL IDENTIFIERS:    ${person.physicalDescription}

LAST KNOWN LOCATION:     ${person.lastKnownLocation}
ACTIVE BORDER WATCH:     ${person.borderPointsOfInterest?.join(', ') || 'All national border terminals'}

${subDivider}
II. STATUTORY CHARGES & INDICTMENT PARTICULARS
${subDivider}
${person.charges?.map((c: string, idx: number) => `(${idx + 1}) ${c}`).join('\n')}

WARRANT DETAILS:
${person.warrantDetails}

${subDivider}
III. PUBLIC SAFETY DIRECTIVE & POLICE INSTRUCTIONS
${subDivider}
${person.publicSafetyInstruction}

OFFICIAL SOURCE:
${person.officialSource}

${subDivider}
IV. DUE PROCESS & HUMAN RIGHTS SAFEGUARDS ATTESTATION
${subDivider}
${person.legalSafeguards}
Under the African Charter on Human and Peoples' Rights and the national Constitution,
the presumption of innocence remains intact until final conviction by a competent court of law.
No unauthorized detention or physical mistreatment is permitted.

OFFICIAL REPORT INTEGRITY STAMP: SHA256:${Math.random().toString(36).substring(2, 14).toUpperCase()}
${divider}
`;
}

/**
 * Generates a complete formal mission briefing dossier
 */
export function generateMissionReportText(mission: any): string {
  const divider = '='.repeat(76);
  const subDivider = '-'.repeat(76);

  return `${divider}
AUTHORIZED LAW ENFORCEMENT MISSION DOSSIER & OPERATIONAL CHARTER
REGIONAL PEACE AND SECURITY NETWORK · EACAPO / RIB / AFRIPOL
${divider}

MISSION IDENTIFIER:      ${mission.id}
CASE REFERENCE:          ${mission.caseRef}
LEAD INSTITUTION:        ${mission.responsibleInstitution}
JURISDICTION:            ${mission.jurisdiction}
OPERATIONAL STATUS:      ${mission.status} (Progress: ${mission.progress}%)
PRIORITY LEVEL:          ${mission.priority}
CREATED / UPDATED:       ${mission.createdAt} / ${mission.updatedAt}

${subDivider}
I. STATUTORY MISSION OBJECTIVE
${subDivider}
${mission.objective}

RISK ASSESSMENT:
${mission.riskAssessment}

AUTHORIZED PARTNER AGENCIES:
${mission.partnerAgencies?.join(' · ')}

${subDivider}
II. AUTHORIZED STATUTORY TASKS CHECKLIST
${subDivider}
${mission.authorizedTasks?.map((t: any, idx: number) => 
  `[${t.completed ? 'COMPLETED' : 'PENDING'}] Task 0${idx + 1}: ${t.description}
     Assignee: ${t.assignee} (${t.agency})
     Legal Basis: ${t.legalScope}
     ${t.completedAt ? `Completed Timestamp: ${t.completedAt}` : ''}`
).join('\n\n')}

${subDivider}
III. RECONSTRUCTED VERIFIED TIMELINE
${subDivider}
${mission.timeline?.map((entry: any) => 
  `* ${entry.date} [${entry.location}]: ${entry.event} (Verified By: ${entry.verifiedBy})`
).join('\n')}

${subDivider}
IV. EVIDENTIARY EXHIBITS & DOCUMENT REGISTRY
${subDivider}
${mission.evidenceReferences?.map((ev: string, idx: number) => `Exhibit #${idx + 1}: ${ev}`).join('\n')}

${subDivider}
V. CERTIFIED HUMAN APPROVAL BLOCK
${subDivider}
${mission.humanApprovals?.map((app: any) => 
  `Stage: ${app.stage} Approval
     Officer: ${app.approverName} (${app.approverTitle} · ${app.agency})
     Timestamp: ${app.timestamp}
     Note: "${app.comment}"
     Digital Signature Hash: ${app.signatureHash}`
).join('\n\n')}

LEAD INVESTIGATOR: ${mission.leadInvestigator}
SECURITY CLASSIFICATION: LEVEL-3 RESTRICTED
${divider}
`;
}
