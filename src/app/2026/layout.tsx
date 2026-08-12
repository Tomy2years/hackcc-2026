import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackCC 2026 Archive",
  description: "Archived website for HackCC Spring 2026 Hackathon",
};

export default function Archive2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="archive-2026-root">{children}</div>;
}
