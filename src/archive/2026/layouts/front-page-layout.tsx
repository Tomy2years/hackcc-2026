import React from 'react';
import { Homebg } from '@2026/features/home-page/components/homebg';

export const FrontPagePrimaryLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative w-screen min-h-screen ${className}`}>
      <Homebg />
      {children}
    </div>
  );
};

export const FrontPageSecondaryLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative w-screen min-h-screen bg-bgpurple ${className}`}>
      {children}
    </div>
  );
};
