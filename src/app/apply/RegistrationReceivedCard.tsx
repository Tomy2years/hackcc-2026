"use client";

import { useEffect, useRef } from "react";
import { EVENT } from "@/lib/event";
import { Button } from "@/components/ui/Button";
import { HighwaySign } from "@/components/roadtrip/HighwaySign";

/** Shown after a successful submission. Focus moves here so screen readers announce it. */
export function ApplicationReceived({ email }: { email: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div role="status" className="rounded-2xl border-2 border-success bg-[rgb(15_17_20/0.88)] p-6 shadow-[0_20px_60px_rgb(0_0_0/0.45)] sm:p-8">
      <HighwaySign>Application received</HighwaySign>
      <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-heading text-[clamp(2rem,5vw,3rem)] leading-none text-cream focus:outline-none">
        You&apos;re on the list
      </h2>
      <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-mist">
        Thanks for applying to {EVENT.edition}. We&apos;ll email <strong className="break-all text-cream">{email}</strong> with
        a decision.
      </p>

      <h3 className="mt-8 font-bold text-cream">What happens next</h3>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-mist">
        <li>We review applications and email every applicant. Check your spam folder if you don&apos;t see it.</li>
        <li>The exact date, times and parking details will be announced on Discord and on this site.</li>
        <li>Need to change an answer? Email {EVENT.contactEmail} from the address you applied with.</li>
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href={EVENT.social.discord} arrow>
          Join the Discord
        </Button>
        <Button href="/" variant="tertiary">
          Back to the homepage
        </Button>
      </div>
    </div>
  );
}
