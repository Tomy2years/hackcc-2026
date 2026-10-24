import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackCC Archive · Past Hackathons & History",
  description:
    "Explore the history, websites, themes, and community milestones from every chapter of California's premier statewide community college hackathon.",
};

export default function ArchiveHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="archive-hub-root">{children}</div>;
}
