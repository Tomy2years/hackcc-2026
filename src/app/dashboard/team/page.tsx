'use client';

import React, { useState } from 'react';
import { mockTeam, mockSoloSeekers } from '@/lib/dashboardMockData';
import {
  Users,
  Copy,
  CheckCircle2,
  GitBranch,
  Code,
  UserPlus,
} from 'lucide-react';

export default function TeamHubPage() {
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [githubUrl, setGithubUrl] = useState(mockTeam.githubUrl || '');
  const [devpostUrl, setDevpostUrl] = useState(mockTeam.devpostUrl || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(mockTeam.inviteCode);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const handleSaveSubmissions = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Team Card */}
      <div className="rounded-3xl bg-slate-900/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Team Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white">{mockTeam.name}</h1>
            <p className="text-xs sm:text-sm text-white/60">
              Stationed at <strong className="text-amber-300">{mockTeam.tableNumber}</strong> • {mockTeam.members.length}/4 Hackers
            </p>
          </div>

          {/* Invite Code Widget */}
          <div className="flex items-center gap-3 p-3 bg-black/50 border border-white/15 rounded-2xl shrink-0">
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">Team Invite Code</div>
              <div className="font-mono text-base font-bold text-amber-300">{mockTeam.inviteCode}</div>
            </div>
            <button
              onClick={handleCopyInvite}
              aria-label="Copy team invite code"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {copiedInvite ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column A: Members Roster & Join (1 Col) */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Team Roster ({mockTeam.members.length}/4)
              </h2>
              <span className="text-[11px] text-emerald-400 font-semibold">1 Spot Open</span>
            </div>

            <div className="space-y-2.5">
              {mockTeam.members.map((member) => (
                <div
                  key={member.userId}
                  className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between"
                >
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{member.name}</div>
                    <div className="text-[10px] text-white/50 truncate">{member.college}</div>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      member.role === 'leader'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        : 'bg-white/5 text-white/60 border-white/10'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>

            {/* Team Join / Leave note */}
            <p className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/10">
              Only the team leader can edit official Devpost & GitHub submission links. Maximum 4 members per team.
            </p>
          </div>
        </div>

        {/* Column B: Project Submission Checklist & Links (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-heading text-white">Project Submissions & Devpost</h2>
              <p className="text-xs text-white/60 mt-0.5">
                Required for Sunday judging. Ensure all 3 team members are added to the Devpost project page.
              </p>
            </div>

            {isSaved && (
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold">
                ✓ Project links saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveSubmissions} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80">Project Title</label>
                <input
                  type="text"
                  defaultValue={mockTeam.projectName}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80">GitHub Repository URL</label>
                <div className="relative">
                  <GitBranch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/your-team/repo"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80">
                  Devpost Submission URL{' '}
                  <span className="text-amber-400 font-bold">(Soft Deadline Sun 9:30 AM)</span>
                </label>
                <div className="relative">
                  <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="url"
                    value={devpostUrl}
                    onChange={(e) => setDevpostUrl(e.target.value)}
                    placeholder="https://devpost.com/software/..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-white/50">Leader permissions enabled</span>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
                >
                  Save Submission Links
                </button>
              </div>
            </form>
          </div>

          {/* Solo Hacker Matchmaking Directory (Inclusivity Enhancement) */}
          <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Looking for a 4th Member?
                </h3>
                <p className="text-xs text-white/50">
                  Community college hackers looking to join a team
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                Matchmaker
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockSoloSeekers.map((seeker) => (
                <div
                  key={seeker.userId}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{seeker.fullName}</div>
                    <div className="text-[10px] text-white/50 truncate">{seeker.college}</div>
                    <p className="text-[11px] text-white/70 line-clamp-2 mt-1.5 leading-snug">
                      &ldquo;{seeker.projectIdea}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {seeker.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.2 rounded bg-white/5 text-[9px] text-amber-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Sent invite code ${mockTeam.inviteCode} to ${seeker.fullName}!`)}
                      className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <UserPlus className="w-3 h-3 text-amber-300" />
                      <span>Send Invite</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
