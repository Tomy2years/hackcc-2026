import type { Metadata } from "next";
import { Geist, Geist_Mono, Bagel_Fat_One, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bagelFont = Bagel_Fat_One({
  weight: "400",
  variable: "--font-bagel",
  subsets: ["latin"],
});

const montserratFont = Montserrat_Alternates({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackCC",
  description: "HackCC Official Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bagelFont.variable} ${montserratFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
