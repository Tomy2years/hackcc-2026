export type BadgeCategory = 'workshop' | 'food' | 'social' | 'sponsor' | 'milestone' | 'secret';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface PokedexBadge {
  id: string;
  badgeNumber: number;
  name: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpPoints: number;
  description: string;
  hint: string;
  hint_locked?: string;
  iconUrl: string;
  unlocked: boolean;
  unlockedAt?: string;
  unlockedVia?: 'camera_scan' | 'secret_code' | 'organizer_scan' | 'system_event';
}

export interface AttendeeProfile {
  id: string;
  fullName: string;
  college: string;
  tshirtSize: string;
  dietaryRestrictions?: string;
  qrToken: string;
  totalXp: number;
  totalBadges: number;
  rank: number;
  checkedInAt: string;
  lastBadgeUnlockedAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  fullName: string;
  college: string;
  totalBadges: number;
  totalXp: number;
  lastBadgeUnlockedAt?: string;
  isCurrentUser?: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  timestamp: string;
  day: 'Saturday' | 'Sunday';
  location: string;
  category: 'keynote' | 'workshop' | 'food' | 'activity' | 'deadline';
  isCurrent?: boolean;
  isNext?: boolean;
  description?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'urgent' | 'food' | 'workshop' | 'general' | 'deadline';
  isPinned: boolean;
  createdAt: string;
}

export interface MentorTicket {
  id: string;
  tableLocation: string;
  topic: 'Frontend' | 'Backend / API' | 'AI / Machine Learning' | 'Cloud / DevOps' | 'Hardware' | 'General Debugging';
  description: string;
  status: 'queued' | 'claimed' | 'in_progress' | 'resolved' | 'cancelled';
  claimedBy?: string;
  createdAt: string;
  claimedAt?: string;
  resolvedAt?: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  college: string;
  role: 'leader' | 'member';
}

export interface TeamInfo {
  id: string;
  name: string;
  inviteCode: string;
  tableNumber: string;
  projectName?: string;
  projectDescription?: string;
  githubUrl?: string;
  devpostUrl?: string;
  members: TeamMember[];
  isLeader: boolean;
}

export interface SoloSeeker {
  userId: string;
  fullName: string;
  college: string;
  skills: string[];
  projectIdea: string;
  preferredRoles: string[];
}
