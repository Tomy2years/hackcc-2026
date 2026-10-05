import { getPublicApplicationStatus } from "@/lib/publicStatus";
import { SiteHeader } from "@/components/roadtrip/SiteHeader";
import { SiteFooter } from "@/components/roadtrip/SiteFooter";
import Zone1Hero from "@/components/roadtrip/Zone1Hero";
import Zone2EventInfo from "@/components/roadtrip/Zone2EventInfo";
import Zone3About from "@/components/roadtrip/Zone3About";
import Zone4Sponsors from "@/components/roadtrip/Zone4Sponsors";
import Zone5FAQQuotes from "@/components/roadtrip/Zone5FAQQuotes";
import Zone6FooterCTA from "@/components/roadtrip/Zone6FooterCTA";

export default async function Home() {
  // Read per request, so flipping REGISTRATION_ENABLED changes every Apply surface without a rebuild.
  const status = await getPublicApplicationStatus();

  return (
    <>
      <SiteHeader status={status} overArtwork />
      <main id="main" className="flex-1 bg-night text-cream selection:bg-action selection:text-night">
        {/* The drive south: Hollywood Hills → Inglewood → Santa Monica → Orange County → San Onofre → San Diego */}
        <Zone1Hero status={status} />
        <Zone2EventInfo />
        <Zone3About />
        <Zone4Sponsors />
        <Zone5FAQQuotes applyAnswer={status.faqAnswer} />
        <Zone6FooterCTA status={status} />
      </main>
      <SiteFooter status={status} />
    </>
  );
}
