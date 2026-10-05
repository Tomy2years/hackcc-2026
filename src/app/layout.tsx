import type { Metadata } from "next";
import { Bagel_Fat_One, Fraunces, Montserrat } from "next/font/google";
import { EVENT } from "@/lib/event";
import "./globals.css";

// Display face: wordmark, giant dates, stop names. Never paragraphs or buttons.
const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  variable: "--font-bagel-fat-one",
  subsets: ["latin"],
  display: "swap",
});

// Body face: everything readable.
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Serif italic: postcards, pull quotes and the one hook line under a title.
const fraunces = Fraunces({
  style: ["normal", "italic"],
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(EVENT.siteUrl),
  title: {
    default: `${EVENT.edition} · ${EVENT.tagline}`,
    template: `%s · ${EVENT.edition}`,
  },
  description: `${EVENT.edition} is a hackathon for California community college students, ${EVENT.dateLabel} at ${EVENT.venue.name}. Free to attend, beginners welcome.`,
  openGraph: {
    type: "website",
    siteName: EVENT.name,
    title: `${EVENT.edition} · ${EVENT.tagline}`,
    description: `A hackathon for California community college students, ${EVENT.dateLabel}. Free, beginner-friendly, and run by students.`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bagelFatOne.variable} ${montserrat.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-action focus:px-4 focus:py-3 focus:font-bold focus:text-night"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
