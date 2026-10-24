import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackCC 2026 Archive · Dual-Campus Edition",
  description: "Archived website for HackCC Spring 2026 Dual-Campus Hackathon (Torrance & San Mateo)",
};

export default function Archive2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="archive-2026-root">{children}</div>;
}
