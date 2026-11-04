'use client';

import React, { useState } from 'react';
import { mockMentorTickets, mockTeam } from '@/lib/dashboardMockData';
import { MentorTicket } from '@/types/dashboard';
import {
  LifeBuoy,
  Send,
  Sparkles,
} from 'lucide-react';

export default function MentorsPage() {
  const [tickets, setTickets] = useState<MentorTicket[]>(mockMentorTickets);
  const [tableLocation, setTableLocation] = useState(mockTeam.tableNumber);
  const [topic, setTopic] = useState<MentorTicket['topic']>('Frontend');
  const [description, setDescription] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const activeTicket = tickets.find((t) => t.status === 'queued' || t.status === 'claimed');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTicket: MentorTicket = {
      id: `tkt-${Date.now()}`,
      tableLocation,
      topic,
      description,
      status: 'queued',
      createdAt: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setDescription('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3000);
  };

  const handleCancelTicket = (ticketId: string) => {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, status: 'cancelled' } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="rounded-3xl bg-slate-900/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-1">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Roadside Assistance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white">Call a Mentor</h1>
            <p className="text-xs sm:text-sm text-white/60">
              Stuck on a tricky bug or architectural decision? Mentors in AI, Cloud, Frontend, and Hardware are on standby.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-center shrink-0">
            <div className="text-[10px] text-white/50 uppercase">Average Response Time</div>
            <div className="font-heading text-xl text-emerald-400">~3.8 Mins</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column A: Active Ticket Status or New Request Form (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {activeTicket ? (
            /* Active Ticket In-Flight Card */
            <div className="rounded-3xl bg-slate-900/90 border-2 border-emerald-400/50 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Active Roadside Ticket
                  </span>
                </div>
                <span className="font-mono text-xs text-white/50">ID: {activeTicket.id}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">{activeTicket.topic}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                    {activeTicket.status === 'claimed' ? 'Mentor En Route' : 'Queued'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
                  &ldquo;{activeTicket.description}&rdquo;
                </p>

                {activeTicket.claimedBy && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center justify-center">
                      MA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-300">
                        {activeTicket.claimedBy}
                      </div>
                      <div className="text-[11px] text-white/60">
                        Walking to {activeTicket.tableLocation} now • Claimed at {activeTicket.claimedAt}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-white/40">
                  Fixed it yourself? Cancel to free up mentors for other teams.
                </span>
                <button
                  onClick={() => handleCancelTicket(activeTicket.id)}
                  className="py-1.5 px-3 rounded-lg text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
                >
                  Cancel Ticket
                </button>
              </div>
            </div>
          ) : (
            /* Request A Mentor Form */
            <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-5">
              <div>
                <h2 className="text-lg font-heading text-white">Submit a Help Ticket</h2>
                <p className="text-xs text-white/60">
                  Please specify your table and an exact description of the bug or blocker.
                </p>
              </div>

              {submittedMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold">
                  ✓ Ticket queued! A mentor has been notified via Discord & dashboard.
                </div>
              )}

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="mentor-table-loc" className="text-xs font-semibold text-white/80">Table Location</label>
                    <input
                      id="mentor-table-loc"
                      type="text"
                      value={tableLocation}
                      onChange={(e) => setTableLocation(e.target.value)}
                      placeholder="e.g. Table 24 (Section B)"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="mentor-topic-select" className="text-xs font-semibold text-white/80">Help Category</label>
                    <select
                      id="mentor-topic-select"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value as MentorTicket['topic'])}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-400"
                    >
                      <option value="Frontend">Frontend (React, Next.js, CSS)</option>
                      <option value="Backend / API">Backend / API (Node, Python, Supabase)</option>
                      <option value="AI / Machine Learning">AI / Machine Learning (LLMs, PyTorch)</option>
                      <option value="Cloud / DevOps">Cloud / DevOps (Docker, AWS, Vercel)</option>
                      <option value="Hardware">Hardware & Sensors</option>
                      <option value="General Debugging">General Debugging & Ideation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="mentor-desc-input" className="text-xs font-semibold text-white/80">
                    What are you trying to accomplish & what error are you getting?
                  </label>
                  <textarea
                    id="mentor-desc-input"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Docker container is crashing on AWS with exit code 137. We suspect memory limit but aren't sure how to configure ECS task definition."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-white/40">
                    Max 1 active ticket per team to prevent queue flooding.
                  </span>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs hover:bg-emerald-300 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Mentor</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Column B: Resolved Tickets History & Mentor Tips (1 Col) */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-md shadow-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Ticket History
            </h2>

            <div className="space-y-3">
              {tickets
                .filter((t) => t.status === 'resolved')
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400">{ticket.topic}</span>
                      <span className="text-white/40">{ticket.resolvedAt || 'Resolved'}</span>
                    </div>
                    <p className="text-xs text-white/70 line-clamp-2">
                      {ticket.description}
                    </p>
                    {ticket.claimedBy && (
                      <div className="text-[10px] text-white/50 pt-1 border-t border-white/5">
                        Helped by {ticket.claimedBy}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Mentor Station Guidelines */}
          <div className="rounded-3xl bg-slate-900/50 border border-white/10 p-6 text-xs text-white/70 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Mentor Lounge Location</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Prefer in-person debugging? You can also walk up to the <strong>Mentor Lounge in Room 104</strong> anytime during the hacking sprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
