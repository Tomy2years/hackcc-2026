import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";

// The archived site used Montserrat Alternates. Loaded here so only /2026 pays for it.
const montserratAlternates = Montserrat_Alternates({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackCC Spring 2026 Archive",
  description: "Archived website for the HackCC Spring 2026 hackathon.",
  robots: { index: false, follow: true },
};

export default function Archive2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`archive-2026-root ${montserratAlternates.variable}`}>{children}</div>;
}
