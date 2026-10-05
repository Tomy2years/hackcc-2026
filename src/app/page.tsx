import RoadTripNav from "@/components/roadtrip/RoadTripNav";
import Zone1Hero from "@/components/roadtrip/Zone1Hero";
import Zone2EventInfo from "@/components/roadtrip/Zone2EventInfo";
import Zone3About from "@/components/roadtrip/Zone3About";
import Zone4Sponsors from "@/components/roadtrip/Zone4Sponsors";
import Zone5FAQQuotes from "@/components/roadtrip/Zone5FAQQuotes";
import Zone6FooterCTA from "@/components/roadtrip/Zone6FooterCTA";
import RoadTripFooter from "@/components/roadtrip/RoadTripFooter";
import { getRegistrationAccess } from "@/app/apply/access";

export default async function Home() {
  // Read per request, so flipping REGISTRATION_ENABLED shows the Apply button without a rebuild.
  const applyOpen = (await getRegistrationAccess()) === "open";

  return (
    <main id="top" className="min-h-screen bg-night text-mist selection:bg-action selection:text-night">
      <RoadTripNav applyOpen={applyOpen} />

      {/* Stop 1: Hollywood Hills (hero) */}
      <Zone1Hero />

      {/* Stop 2: Inglewood (event details) */}
      <Zone2EventInfo />

      {/* Stop 3: Santa Monica Pier (about) */}
      <Zone3About />

      {/* Stop 4: Orange County (sponsors) */}
      <Zone4Sponsors />

      {/* Stop 5: PCH (FAQ) */}
      <Zone5FAQQuotes />

      {/* Stop 6: San Diego (get involved) */}
      <Zone6FooterCTA />

      <RoadTripFooter applyOpen={applyOpen} />
    </main>
  );
}
