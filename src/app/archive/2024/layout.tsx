import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackCC 2024 Archive · The Inception (Inaugural Edition)",
  description:
    "Archived website for HackCC 2024 — California's first statewide community college hackathon (Nov 8 - 10, 2024).",
};

export default function Archive2024Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="archive-2024-root">{children}</div>;
}
