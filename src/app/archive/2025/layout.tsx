import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackCC 2025 Archive · Oceanside Coastal Edition",
  description:
    "Archived website for HackCC Fall 2025 Hackathon hosted at MiraCosta College in Oceanside, California.",
};

export default function Archive2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="archive-2025-root">{children}</div>;
}
