import React from 'react';
import {
  CheckCircle2,
  Coffee,
  Mic,
  Cpu,
  Utensils,
  Zap,
  LifeBuoy,
  Cloud,
  Briefcase,
  Flame,
  Gamepad2,
  Moon,
  Terminal,
  Radio,
  Heart,
  FileText,
  Trophy,
  Sparkles,
  Compass,
  Lock,
} from 'lucide-react';
import { BadgeCategory } from '@/types/dashboard';

interface BadgeIconProps {
  badgeNumber: number;
  category: BadgeCategory;
  unlocked: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeIcon({
  badgeNumber,
  category,
  unlocked,
  className = '',
  size = 'md',
}: BadgeIconProps) {
  const sizeMap = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  if (!unlocked) {
    return (
      <div
        className={`${sizeMap[size]} rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 shrink-0 ${className}`}
      >
        <Lock className={iconSizeMap[size]} />
      </div>
    );
  }

  // Choose clean vector icon per badge number
  const renderIcon = () => {
    const s = iconSizeMap[size];
    switch (badgeNumber) {
      case 1:
        return <CheckCircle2 className={s} />;
      case 2:
        return <Coffee className={s} />;
      case 3:
        return <Mic className={s} />;
      case 4:
        return <Cpu className={s} />;
      case 5:
        return <Utensils className={s} />;
      case 6:
        return <Zap className={s} />;
      case 7:
        return <LifeBuoy className={s} />;
      case 8:
        return <Cloud className={s} />;
      case 9:
        return <Briefcase className={s} />;
      case 10:
        return <Flame className={s} />;
      case 11:
        return <Gamepad2 className={s} />;
      case 12:
        return <Moon className={s} />;
      case 13:
        return <Terminal className={s} />;
      case 14:
        return <Radio className={s} />;
      case 15:
        return <Heart className={s} />;
      case 16:
        return <Coffee className={s} />;
      case 17:
        return <FileText className={s} />;
      case 18:
        return <Trophy className={s} />;
      case 19:
        return <Sparkles className={s} />;
      default:
        return <Compass className={s} />;
    }
  };

  // Clean themed color schemes
  const getCategoryStyles = () => {
    switch (category) {
      case 'workshop':
        return 'bg-sky-500/20 text-sky-300 border-sky-400/40';
      case 'food':
        return 'bg-amber-400/20 text-amber-300 border-amber-400/40';
      case 'social':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'sponsor':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/40';
      case 'milestone':
        return 'bg-amber-500/25 text-amber-300 border-amber-400/50';
      case 'secret':
        return 'bg-indigo-500/25 text-indigo-300 border-indigo-400/50';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div
      className={`${sizeMap[size]} rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${getCategoryStyles()} ${className}`}
    >
      {renderIcon()}
    </div>
  );
}
