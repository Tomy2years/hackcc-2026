import RoadTripNav from "@/components/roadtrip/RoadTripNav";
import Zone1Hero from "@/components/roadtrip/Zone1Hero";
import Zone2EventInfo from "@/components/roadtrip/Zone2EventInfo";
import Zone3About from "@/components/roadtrip/Zone3About";
import Zone4Sponsors from "@/components/roadtrip/Zone4Sponsors";
import Zone5FAQQuotes from "@/components/roadtrip/Zone5FAQQuotes";
import Zone6FooterCTA from "@/components/roadtrip/Zone6FooterCTA";
import RoadTripFooter from "@/components/roadtrip/RoadTripFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <RoadTripNav />

      {/* Zone 1: Hero Section (Hollywood Hills & Cloudscape) */}
      <Zone1Hero />

      {/* Zone 2: Event Information (Inglewood & LA Metro) */}
      <Zone2EventInfo />

      {/* Zone 3: About HackCC (Santa Monica Pier) */}
      <Zone3About />

      {/* Zone 4: Sponsors (Orange County Core & Irvine Spectrum) */}
      <Zone4Sponsors />

      {/* Zone 5: FAQ & Past Attendee Quotes (Pacific Coast Highway) */}
      <Zone5FAQQuotes />

      {/* Zone 6: Get Involved & Apply CTA (SoCal Sunset Beach) */}
      <Zone6FooterCTA />

      {/* Site Footer */}
      <RoadTripFooter />
    </main>
  );
}

