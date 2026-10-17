import Image from "next/image";
import RoadTripNav from "@/components/roadtrip/RoadTripNav";
import Zone1Hero from "@/components/roadtrip/Zone1Hero";
import Zone2About from "@/components/roadtrip/Zone2About";
import Zone3Sponsors from "@/components/roadtrip/Zone3Sponsors";
import Zone4FAQQuotes from "@/components/roadtrip/Zone4FAQQuotes";
import Zone5FooterCTA from "@/components/roadtrip/Zone5FooterCTA";
import RoadBridge from "@/components/roadtrip/RoadBridge";
import RoadTripStop from "@/components/roadtrip/RoadTripStop";
import RoadTripFooter from "@/components/roadtrip/RoadTripFooter";
import ZoneRouteListener from "@/components/roadtrip/ZoneRouteListener";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Route Listener for clean hashless /zone-* URLs */}
      <ZoneRouteListener />

      {/* Navigation Header */}
      <RoadTripNav />

      {/* Each stop pins full-screen, holds, then its road rises over it. The road is taller
          than the viewport, so two scene artworks are never on screen at the same time. */}

      {/* Zone 1: Hero Section (Hollywood Hills - Daytime) -> road to Inglewood */}
      <RoadTripStop
        id="zone-hero"
        isFirst
        road={
          <RoadBridge
            routeNumber="101"
            nextStop="INGLEWOOD"
            mileage="EXIT 2B"
            direction="right"
            signPosition="right"
          />
        }
      >
        <Zone1Hero />
      </RoadTripStop>

      {/* Zone 2: About HackCC (Inglewood Skyline - Daytime) -> road to Santa Monica Pier */}
      <RoadTripStop
        id="zone-about"
        road={
          <RoadBridge
            routeNumber="1"
            nextStop="SANTA MONICA"
            mileage="PCH · 4 MI"
            direction="left"
            signPosition="left"
          />
        }
      >
        <Zone2About />
      </RoadTripStop>

      {/* Zone 3: Sponsors (Santa Monica Pier - Daytime) -> road to Coastal Cove */}
      <RoadTripStop
        id="zone-sponsors"
        road={
          <RoadBridge
            routeNumber="1"
            nextStop="COASTAL COVE"
            mileage="PCH S"
            direction="right"
            signPosition="right"
          />
        }
      >
        <Zone3Sponsors />
      </RoadTripStop>

      {/* Zone 4: FAQ & Past Attendee Quotes (Pacific Coast Highway - Daytime) -> road to San Diego */}
      <RoadTripStop
        id="zone-faq"
        road={
          <RoadBridge
            routeNumber="5"
            nextStop="SAN DIEGO"
            mileage="FINISH LINE"
            direction="left"
            signPosition="left"
          />
        }
      >
        <Zone4FAQQuotes />
      </RoadTripStop>

      {/* Zone 5 + Site Footer (Seamless San Diego Beach & Coastal Dunes Panorama) */}
      <RoadTripStop id="zone-apply">
        <div className="relative w-full overflow-hidden bg-slate-950">
          {/* Full Continuous Artwork Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg"
              alt="San Diego Beach & Coastal Dunes Panorama"
              fill
              className="object-cover object-top pointer-events-none select-none"
              priority
              draggable={false}
            />
            {/* Ambient Scenic Scrim: keeps scenic California colors vibrant */}
            <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
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
      </RoadTripStop>
    </main>
  );
}
