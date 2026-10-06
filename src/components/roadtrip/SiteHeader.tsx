"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT } from "@/lib/event";
import type { ApplicationStatus } from "@/lib/applicationStatus";
import hackccIcon from "../../../public/images/hackcc-icon.png";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "FAQ", href: "/#faq" },
  { label: "Team", href: "/organizers" },
];

const MENU_EXTRAS = [
  { label: "Join the organizing team", href: "/apply/organizer" },
  { label: "Spring 2026 site (archive)", href: "/2026" },
];

interface SiteHeaderProps {
  status: Pick<ApplicationStatus, "canApply" | "actionLabel" | "href">;
  /** Over the homepage hero the header starts transparent; everywhere else it is solid. */
  overArtwork?: boolean;
  /** On /apply the Apply action is redundant. */
  hideAction?: boolean;
}

export function SiteHeader({ status, overArtwork = false, hideAction = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!overArtwork);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!overArtwork) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overArtwork]);

  // Open: focus the first link. Escape closes and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        solid
          ? "border-b border-line bg-night/95 backdrop-blur-sm"
          : "border-b border-transparent bg-gradient-to-b from-night/75 to-transparent"
      } ${overArtwork ? "-mb-16" : ""}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2.5" aria-label={`${EVENT.name} home`}>
          <Image src={hackccIcon} alt="" width={48} height={48} className="size-11 object-contain md:size-12" priority />
          <span className="font-heading text-2xl leading-none text-cream">{EVENT.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map(link => {
              const current = link.href === pathname;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-semibold transition-colors duration-150 hover:text-action ${
                      current ? "text-action underline decoration-2 underline-offset-[10px]" : "text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center md:flex">
          {hideAction ? null : status.canApply && status.href ? (
            <Link
              href={status.href}
              className="inline-flex min-h-11 items-center rounded-full bg-action px-5 text-[15px] font-bold text-night transition-colors duration-150 hover:bg-action-hover"
            >
              {status.actionLabel}
            </Link>
          ) : (
            <span className="text-sm font-semibold text-mist">{status.actionLabel}</span>
          )}
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          aria-controls={menuId}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-full border-2 border-cream/60 bg-night/60 px-4 text-[15px] font-bold text-cream md:hidden"
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-0.5 w-4 bg-cream transition-transform duration-150 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-cream transition-opacity duration-150 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-4 bg-cream transition-transform duration-150 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-line bg-night md:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-page px-5 pb-6 pt-2">
          <ul className="divide-y divide-line">
            {[...LINKS, ...MENU_EXTRAS].map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className={`flex min-h-12 items-center font-semibold ${i < LINKS.length ? "text-lg text-cream" : "text-base text-mist"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {!hideAction && (
            <div className="mt-5">
              {status.canApply && status.href ? (
                <Link
                  href={status.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-action text-base font-bold text-night hover:bg-action-hover"
                >
                  {status.actionLabel}
                </Link>
              ) : (
                <p className="text-[15px] font-semibold text-mist">{status.actionLabel}.</p>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
