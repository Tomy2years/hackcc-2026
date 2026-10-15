import Image from "next/image";
import RoadTripNav from "@/components/roadtrip/RoadTripNav";
import Zone1Hero from "@/components/roadtrip/Zone1Hero";
import Zone2About from "@/components/roadtrip/Zone2About";
import Zone3Sponsors from "@/components/roadtrip/Zone3Sponsors";
import Zone4FAQQuotes from "@/components/roadtrip/Zone4FAQQuotes";
import Zone5FooterCTA from "@/components/roadtrip/Zone5FooterCTA";
import RoadBridge from "@/components/roadtrip/RoadBridge";
import RoadTripFooter from "@/components/roadtrip/RoadTripFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <RoadTripNav />

      {/* Zone 1: Hero Section (Hollywood Hills - Daytime) */}
      <div className="w-full">
        <Zone1Hero />
      </div>

      {/* Road Bridge: Hollywood Hills -> Inglewood */}
      <RoadBridge
        routeNumber="101"
        nextStop="INGLEWOOD"
        mileage="EXIT 2B"
        direction="right"
        signPosition="right"
      />

      {/* Zone 2: About HackCC (Inglewood Skyline - Daytime) */}
      <div className="w-full">
        <Zone2About />
      </div>

      {/* Road Bridge: Inglewood -> Santa Monica Pier */}
      <RoadBridge
        routeNumber="1"
        nextStop="SANTA MONICA"
        mileage="PCH · 4 MI"
        direction="left"
        signPosition="left"
      />

      {/* Zone 3: Sponsors (Santa Monica Pier - Daytime) */}
      <div className="w-full">
        <Zone3Sponsors />
      </div>

      {/* Road Bridge: Santa Monica Pier -> Coastal Cove */}
      <RoadBridge
        routeNumber="1"
        nextStop="COASTAL COVE"
        mileage="PCH S"
        direction="right"
        signPosition="right"
      />

      {/* Zone 4: FAQ & Past Attendee Quotes (Pacific Coast Highway - Daytime) */}
      <div className="w-full">
        <Zone4FAQQuotes />
      </div>

      {/* Road Bridge: Coastal Cove -> San Diego Beach */}
      <RoadBridge
        routeNumber="5"
        nextStop="SAN DIEGO"
        mileage="FINISH LINE"
        direction="left"
        signPosition="left"
      />

      {/* Zone 5 + Site Footer (Seamless San Diego Beach & Coastal Dunes Panorama) */}
      <div className="relative w-full overflow-hidden bg-slate-950">
        {/* Full Continuous Artwork Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg"
            alt="San Diego Beach & Coastal Dunes Panorama"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Ambient Scenic Scrim: keeps scenic California colors vibrant */}
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        {/* Zone 5: Get Involved & Apply CTA (SoCal Beach - Daytime) */}
        <div className="w-full relative z-10">
          <Zone5FooterCTA />
        </div>

        {/* Site Footer */}
        <div className="w-full relative z-10">
          <RoadTripFooter />
        </div>
      </div>
    </main>
  );
}
