import React, { useState } from 'react';
import { Mission, MissionStatus, AuthorizedTask, HumanApproval, SupportedLanguage, UserSession } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadTextFile, downloadJsonFile, generateMissionReportText } from '../utils/download';
import { 
  FolderLock, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  FileText, 
  Plus, 
  Check, 
  Send, 
  AlertCircle, 
  ArrowRight,
  UserCheck,
  Download
} from 'lucide-react';

interface MissionCenterProps {
  missions: Mission[];
  onUpdateMission: (updated: Mission) => void;
  language: SupportedLanguage;
  currentUser: UserSession;
}

export const MissionCenter: React.FC<MissionCenterProps> = ({
  missions,
  onUpdateMission,
  language,
  currentUser,
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(missions[0]?.id || '');
  const [approvalNote, setApprovalNote] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const t = TRANSLATIONS[language];
  const activeMission = missions.find((m) => m.id === selectedMissionId) || missions[0];

  const lifecycleStages: MissionStatus[] = [
    'NEW',
    'VERIFIED',
    'AUTHORIZED',
    'ACTIVE',
    'INFORMATION_RECEIVED',
    'HUMAN_REVIEW',
    'RESOLVED',
  ];

  const handleToggleTask = (taskId: string) => {
    if (!activeMission) return;
    const updatedTasks = activeMission.authorizedTasks.map((tsk) => {
      if (tsk.id === taskId) {
        return {
          ...tsk,
          completed: !tsk.completed,
          completedAt: !tsk.completed ? new Date().toISOString().replace('T', ' ').slice(0, 19) : undefined,
        };
      }
      return tsk;
    });

    const completedCount = updatedTasks.filter((t) => t.completed).length;
    const calculatedProgress = Math.round((completedCount / updatedTasks.length) * 100);

    onUpdateMission({
      ...activeMission,
      authorizedTasks: updatedTasks,
      progress: calculatedProgress,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const handleAdvanceStatus = () => {
    if (!activeMission) return;
    const currentIndex = lifecycleStages.indexOf(activeMission.status);
    if (currentIndex < lifecycleStages.length - 1) {
      const nextStatus = lifecycleStages[currentIndex + 1];

      // Add a human approval stamp
      const newApproval: HumanApproval = {
        id: `APP-${Date.now()}`,
        stage: nextStatus,
        approverName: currentUser.name,
        approverTitle: currentUser.role.replace('_', ' '),
        agency: currentUser.agency,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        comment: approvalNote.trim() || `Authorized progression to ${nextStatus} stage pursuant to statutory authority.`,
        signatureHash: `SHA256:${Math.random().toString(36).substring(2, 12)}...verified`,
      };

      onUpdateMission({
        ...activeMission,
        status: nextStatus,
        humanApprovals: [...activeMission.humanApprovals, newApproval],
        updatedAt: new Date().toISOString().slice(0, 10),
      });

      setApprovalNote('');
    }
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDesc.trim() || !activeMission) return;

    const newTask: AuthorizedTask = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      description: newTaskDesc.trim(),
      assignee: currentUser.name,
      agency: currentUser.agency,
      completed: false,
      legalScope: 'Authorized Case Directives & Mutual Assistance Protocol',
    };

    onUpdateMission({
      ...activeMission,
      authorizedTasks: [...activeMission.authorizedTasks, newTask],
    });

    setNewTaskDesc('');
    setShowNewTaskForm(false);
  };

  if (!activeMission) {
    return <div className="p-8 text-center text-slate-400">No active missions found.</div>;
  }

  const currentStageIndex = lifecycleStages.indexOf(activeMission.status);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Authorized Law Enforcement Mission Center
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sovereign investigative workspace with statutory authorization workflows, mandatory human approvals,
            and bilateral Great Lakes / EAC / SADC task execution.
          </p>
        </div>

        {/* Mission Selector Tabs & Download Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const text = generateMissionReportText(activeMission);
              downloadTextFile(`${activeMission.id}_DOSSIER.txt`, text);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            title="Download complete mission charter & task audit as formal report"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download Mission Dossier</span>
          </button>

          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
            {missions.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMissionId(m.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                  m.id === activeMission.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Step Lifecycle Visual Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Mandatory Sovereign Lifecycle Progression
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            Current Stage: {activeMission.status} ({activeMission.progress}% complete)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {lifecycleStages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stage}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-950 border-emerald-500 shadow-md ring-1 ring-emerald-500/40 text-emerald-300'
                    : isCompleted
                    ? 'bg-slate-950 border-slate-700 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500 mb-0.5">0{idx + 1}</div>
                <div className="text-xs font-bold truncate">
                  {stage.replace('_', ' ')}
                </div>
                <div className="mt-1 flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Advance Stage Control */}
        {currentStageIndex < lifecycleStages.length - 1 && (
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <input
              type="text"
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              placeholder="Enter judicial / lead detective approval note for next stage..."
              className="w-full sm:flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleAdvanceStatus}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign &amp; Advance to {lifecycleStages[currentStageIndex + 1]}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Mission Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Objectives, Tasks, Approvals */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mission Charter Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <span>{activeMission.id}</span>
                <span>·</span>
                <span>Case Ref: {activeMission.caseRef}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{activeMission.title}</h3>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-slate-400 block mb-1 uppercase text-[10px]">
                Operational Statutory Objective:
              </span>
              {activeMission.objective}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Responsible Institution</span>
                <span className="font-bold text-white">{activeMission.responsibleInstitution}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Jurisdiction</span>
                <span className="text-slate-300 font-medium">{activeMission.jurisdiction}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Risk Assessment</span>
                <span className="text-rose-400 font-bold">{activeMission.priority} Priority</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="text-slate-500 font-semibold block mb-0.5 text-[10px] uppercase">
                Authorized Partner Agencies:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {activeMission.partnerAgencies.map((agency, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]">
                    {agency}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Statutory Tasks Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Authorized Statutory Tasks Checklist</h4>
              </div>
              <button
                onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {showNewTaskForm && (
              <form onSubmit={handleAddNewTask} className="p-3 bg-slate-950 rounded-lg border border-slate-700 space-y-2">
                <input
                  type="text"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Task description (e.g. Inspect border CCTV logs, transmit Interpol notice)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskForm(false)}
                    className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded"
                  >
                    Assign Task
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {activeMission.authorizedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    task.completed
                      ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                    task.completed
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-slate-600 bg-slate-900'
                  }`}>
                    {task.completed && <Check className="w-3 h-3" />}
                  </div>

                  <div className="flex-1 text-xs">
                    <div className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.description}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                      <span>Assignee: {task.assignee} ({task.agency})</span>
                      <span>·</span>
                      <span>Scope: {task.legalScope}</span>
                      {task.completedAt && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-400">Completed {task.completedAt}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reconstructed Verified Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Reconstructed Verified Timeline</h4>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {activeMission.timeline.map((entry) => (
                <div key={entry.id} className="relative text-xs">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
                  <div className="font-mono text-emerald-400 font-semibold text-[11px]">{entry.date} · {entry.location}</div>
                  <div className="text-slate-200 font-medium mt-0.5">{entry.event}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Verified by: {entry.verifiedBy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Evidence & Human Approvals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Human Judicial & Lead Detective Approvals */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Certified Human Approvals</h4>
            </div>

            <div className="space-y-3">
              {activeMission.humanApprovals.map((app) => (
                <div key={app.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">{app.stage} Approval</span>
                    <span className="font-mono text-[10px] text-slate-500">{app.timestamp}</span>
                  </div>
                  <div className="font-semibold text-white">{app.approverName}</div>
                  <div className="text-[11px] text-slate-400">{app.approverTitle} · {app.agency}</div>
                  <p className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-800/80">
                    "{app.comment}"
                  </p>
                  <div className="text-[9px] font-mono text-slate-600 truncate">{app.signatureHash}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence References */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Evidence &amp; Document Index</h4>
            </div>

            <ul className="space-y-2">
              {activeMission.evidenceReferences.map((ev, i) => (
                <li key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 font-mono flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">#{i + 1}</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
