import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EVENT } from "@/lib/event";
import { getApplicationStatus } from "@/lib/applicationStatus";
import { SiteHeader } from "@/components/roadtrip/SiteHeader";
import { SiteFooter } from "@/components/roadtrip/SiteFooter";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";
import { SCENE_QUALITY, SCENE_SIZES } from "@/components/roadtrip/Scene";
import { Button } from "@/components/ui/Button";
import { getRegistrationAccess } from "./access";
import { ApplyForm } from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  // Not indexed until the team links to it from the main site at launch.
  robots: { index: false, follow: false },
};

const SAN_DIEGO = "/assets/roadtrip/zone6-cta-footer/san-diego.jpg";

export default async function ApplyPage() {
  const access = await getRegistrationAccess();
  if (access === "hidden") notFound();
  const status = getApplicationStatus(access);

  return (
    <>
      <SiteHeader status={status} hideAction />
      <main id="main" className="relative isolate flex-1">
        {/* The San Diego sunrise fills the whole page and stays put while you scroll through the form */}
        <div aria-hidden className="fixed inset-0 -z-10">
          <Image src={SAN_DIEGO} alt="" fill priority quality={SCENE_QUALITY} sizes={SCENE_SIZES} className="object-cover object-[60%_40%]" />
          {/* Darker on the left and bottom where the copy and form sit; the skyline and sun stay bright */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_17_20/0.55)_0%,rgb(15_17_20/0.25)_30%,rgb(15_17_20/0.35)_70%,rgb(15_17_20/0.7)_100%)]" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-10 md:px-8 md:pt-14">
          <HighwaySign>Next exit · {EVENT.venue.name}</HighwaySign>
          <h1 className="mt-4 font-heading text-[clamp(2.5rem,6vw,3.75rem)] leading-none text-cream [text-shadow:0_2px_4px_rgb(0_0_0/0.6),0_4px_24px_rgb(0_0_0/0.5)]">Apply to {EVENT.edition}</h1>

          {access === "closed" ? (
            <div className="mt-8 rounded-2xl bg-[rgb(15_17_20/0.86)] p-6 shadow-[0_20px_60px_rgb(0_0_0/0.45)] ring-1 ring-cream/10 sm:p-8">
              <h2 className="text-2xl font-bold text-cream">Applications are closed</h2>
              <p className="mt-3 text-lg leading-relaxed text-mist">
                Applications for {EVENT.edition} are no longer being accepted. Questions? Email{" "}
                <a href={`mailto:${EVENT.contactEmail}`} className="font-bold text-cream underline decoration-2 underline-offset-4 hover:text-action">
                  {EVENT.contactEmail}
                </a>
                .
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href={EVENT.social.discord} arrow>
                  Join the Discord
                </Button>
                <Button href="/" variant="tertiary">
                  Back to the homepage
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-4 max-w-[60ch] text-lg font-medium leading-relaxed text-cream [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_14px_rgb(0_0_0/0.8)]">
                Four short steps, about five minutes. We review every application and email you a decision. Everything
                is required unless it says optional.
              </p>
              <div className="mt-8">
                <ApplyForm />
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter status={status} />
    </>
  );
}
