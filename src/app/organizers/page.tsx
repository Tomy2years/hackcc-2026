import Link from "next/link";
import { ArrowLeft, Globe, Mail, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  college: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Lead Director",
    role: "Overall Event Lead",
    bio: "Coordinating logistics, sponsorship outreach, and venue operations for HackCC.",
    college: "Orange Coast College"
  },
  {
    name: "Tech & Web Lead",
    role: "Frontend & Infrastructure",
    bio: "Building the website, application portal, and hardware lab infrastructure.",
    college: "Orange Coast College"
  },
  {
    name: "Design & UX Lead",
    role: "Branding & Vector Art",
    bio: "Crafting the SoCal road trip theme, vector assets, and hacker experience.",
    college: "Orange Coast College"
  },
  {
    name: "Sponsorship Lead",
    role: "Partner Relations",
    bio: "Connecting with tech companies, local businesses, and community organizations.",
    college: "Orange Coast College"
  },
  {
    name: "Logistics Lead",
    role: "Food & Catering",
    bio: "Managing hacker meals, boba runs, swag bags, and venue check-in.",
    college: "Orange Coast College"
  },
  {
    name: "Marketing Lead",
    role: "Outreach & Socials",
    bio: "Spreading the word to community colleges across California.",
    college: "Orange Coast College"
  }
];

export default function OrganizersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Button variant="secondary" href="/" size="sm" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-[#FBFA74]" />
            <span>Back to Road Trip</span>
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4">
            <Badge variant="glass" className="inline-flex items-center gap-2 py-2 px-4 text-sm font-semibold bg-purple-900/50 border-purple-500/30 text-purple-300">
              <Users className="w-4 h-4 text-[#FBFA74]" />
              <span>Meet The Team</span>
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-6xl cartoony-title mb-4">
            HackCC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBFA74] via-rose-300 to-[#A649E2]">Organizers</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-body">
            The passionate team of student organizers, mentors, and developers building Southern California's community college hackathon experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member, i) => (
            <Card
              key={i}
              variant="roadtrip"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FBFA74] via-rose-400 to-[#A649E2] flex items-center justify-center font-heading font-black text-xl text-slate-950 mb-4 shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <h2 className="text-xl font-heading text-white mb-1">{member.name}</h2>
                <div className="text-xs font-semibold text-[#FBFA74] mb-3">{member.role}</div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{member.bio}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{member.college}</span>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                  <Globe className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Callout */}
        <Card variant="sunset" className="p-8 text-center max-w-2xl mx-auto" hoverEffect={false}>
          <Sparkles className="w-8 h-8 text-[#FBFA74] mx-auto mb-3 animate-spin" />
          <h3 className="text-xl font-heading text-white mb-2">Want to Join the Organizing Team?</h3>
          <p className="text-slate-300 text-sm mb-6">
            We are always looking for passionate OCC and community college students to help build HackCC!
          </p>
          <Button variant="primary" href="mailto:team@hackcc.net?subject=Organizing%20Team%20Interest">
            Get In Touch
          </Button>
        </Card>
      </div>
    </main>
  );
}

