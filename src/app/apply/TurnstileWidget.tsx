"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileWidgetProps {
  /** Called with a one-time token when the check passes, or null when it expires or fails. */
  onToken: (token: string | null) => void;
}

/** Cloudflare Turnstile bot check. Remount it (change its key) after each submit, since tokens are single-use. */
export function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!scriptReady || !SITE_KEY || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      action: "register",
      theme: "dark",
      callback: (token: string) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(null),
      "error-callback": () => onTokenRef.current(null),
    });

    return () => {
      window.turnstile?.remove(widgetId);
      onTokenRef.current(null);
    };
  }, [scriptReady]);

  if (!SITE_KEY) {
    return (
      <p role="alert" className="text-sm text-rose-300 font-semibold">
        The security check isn&apos;t available right now. Please try again later or email team@hackcc.net.
      </p>
    );
  }

  if (scriptFailed) {
    return (
      <p role="alert" className="text-sm text-rose-300 font-semibold">
        The security check couldn&apos;t load. Please disable ad or script blockers for this page, then reload.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setScriptFailed(true)}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}
