import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { HighwaySign } from "./HighwaySign";

/** Quality for full-bleed plates; must be listed in images.qualities in next.config.ts. */
export const SCENE_QUALITY = 90;

/**
 * A 3:2 plate set to object-cover renders at max(100vw, 150vh) wide. On portrait screens the
 * height wins, so tell the browser that instead of "100vw" or it downloads a file far too small.
 */
export const SCENE_SIZES = "(orientation: portrait) 150vh, max(100vw, 150vh)";

interface SceneProps {
  /** Section id (the nav anchor). */
  id: string;
  /** Older anchor names that should still land here, e.g. "zone-faq". */
  aliases?: string[];
  labelledBy: string;
  image: string | StaticImageData;
  alt: string;
  /** Tailwind object-position classes chosen for this artwork, e.g. "object-[72%_50%] md:object-[60%_45%]". */
  position: string;
  /**
   * Local backing behind the overlay text only, chosen per scene (e.g. a gradient from the
   * corner the copy sits in). Keeps the rest of the artwork untouched.
   */
  backing?: string;
  /** Classes that place the overlay inside the scene (alignment and padding). */
  overlayClassName?: string;
  /** Copy set directly on the artwork: the stop marker, heading and a few lines at most. */
  overlay: ReactNode;
  /** Everything else, on this scene's tone below the artwork. */
  children?: ReactNode;
  /** Colour the top edge fades from: the seam colour or the tone of the section above (see tones.ts). */
  edgeAbove: string;
  /** Background for the content below the artwork; the art's bottom edge fades into it. */
  tone?: string;
  /** For a scene with no content below: the seam colour shared with the next scene. */
  edgeBelow?: string;
  /** Height of the top blend. Longer only where a dark scene above meets a bright sky. */
  edgeTopHeight?: string;
  /** Extra classes for the content area below the art, e.g. "lg:hidden" when desktop shows it all on the art. */
  contentClassName?: string;
  /** Crossfade straight into the painting above (no content between them) instead of meeting on a dark edge. */
  blendAbove?: boolean;
  /** The next scene crossfades into this one, so skip the bottom edge fade. */
  blendBelow?: boolean;
  /**
   * One tall painting behind the whole stop, plate and content together, so long content
   * (the FAQ) sits on the same artwork instead of a second image joined at a seam.
   */
  tall?: boolean;
  /** Text backing over the content area of a tall stop. */
  contentBacking?: string;
}

/**
 * One stop on the road trip. The artwork fills one screen; the copy that sits on it is
 * placed over the quiet part of that particular image, with a backing only where needed.
 * Longer content follows on the scene's own deep coastal tone, joined to the art by a short fade.
 * Edge fades are separate from the text backing, so either can change without the other.
 */
export function Scene({
  id,
  aliases = [],
  labelledBy,
  image,
  alt,
  position,
  backing = "",
  overlayClassName = "",
  overlay,
  children,
  edgeAbove,
  tone,
  edgeBelow,
  edgeTopHeight = "h-12 md:h-24",
  contentClassName = "",
  blendAbove = false,
  blendBelow = false,
  tall = false,
  contentBacking = "",
}: SceneProps) {
  const below = tone ?? edgeBelow ?? edgeAbove;
  return (
    // No section background: where the art overlaps the scene above, that scene has to show through.
    <section id={id} aria-labelledby={labelledBy} className={`relative ${blendAbove ? "blend-above" : ""} ${tall ? "overflow-hidden" : ""}`}>
      {tall && (
        // The painting starts at the top of the stop and runs down behind everything in it
        <div className="blend-mask absolute inset-0 overflow-hidden" style={{ backgroundColor: below }}>
          {/* Wide screens: a soft, dark, blurred copy fills the sides... */}
          <Image src={image} alt="" fill quality={50} sizes="50vw" className="scale-110 object-cover object-top opacity-60 blur-2xl" />
          {/* ...and the sharp painting is never shown wider than its pixels allow, its edges melting into that copy */}
          <div className="tall-column absolute inset-y-0 left-1/2 w-full max-w-[1400px] -translate-x-1/2">
            <Image src={image} alt={alt} fill quality={SCENE_QUALITY} sizes="(min-width: 1400px) 1400px, 100vw" className="object-cover object-top" />
          </div>
        </div>
      )}
      {aliases.map(alias => (
        <span key={alias} id={alias} aria-hidden className="absolute top-0" />
      ))}

      <div className="relative flex min-h-[92svh] w-full overflow-hidden md:min-h-[100svh]">
        {!tall && (
          <div className="blend-mask absolute inset-0">
            <Image src={image} alt={alt} fill quality={SCENE_QUALITY} sizes={SCENE_SIZES} className={`object-cover ${position}`} />
          </div>
        )}
        {/* Edges: a narrow blend into the section above and into what follows (none where paintings crossfade) */}
        {!blendAbove && (
          <div aria-hidden className={`edge-fade-top pointer-events-none absolute inset-x-0 top-0 ${edgeTopHeight}`} style={{ "--edge": edgeAbove } as CSSProperties} />
        )}
        {!blendBelow && !tall && (
          <div aria-hidden className="edge-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-14 md:h-24" style={{ "--edge": below } as CSSProperties} />
        )}
        {/* The text backing eases in below the top edge (and out at the bottom where the next painting crossfades in) */}
        {backing && <div aria-hidden className={`backing-from-edge ${blendBelow ? "backing-open-bottom" : ""} pointer-events-none absolute inset-0 ${backing}`} />}

        <div className={`blend-offset relative z-10 mx-auto flex w-full max-w-page px-5 py-24 md:px-8 ${overlayClassName}`}>{overlay}</div>
      </div>

      {/* flow-root on the wrapper stops a child's top margin leaking out past the coloured background as a dark strip */}
      {children && (
        <div className={`relative z-20 flow-root ${contentClassName}`} style={tall ? undefined : { backgroundColor: below }}>
          {tall && contentBacking && <div aria-hidden className={`pointer-events-none absolute inset-0 ${contentBacking}`} />}
          {/* Bottom padding clears the next scene's crossfade overlap (4rem / 8rem) */}
          <div className="relative mx-auto w-full max-w-page px-5 pb-24 md:px-8 md:pb-40">{children}</div>
        </div>
      )}
    </section>
  );
}

/** Stop label: where on the drive this artwork is. Not an event location. */
export function StopMarker({ number, place, tone = "light" }: { number: number; place: string; tone?: "light" | "dark" }) {
  return (
    <HighwaySign className="mb-5" tone={tone}>
      <span>Mile {number}</span>
      <span aria-hidden className={tone === "dark" ? "" : "text-action"}>·</span>
      <span>{place}</span>
    </HighwaySign>
  );
}

/** Display heading for a stop. */
export function StopHeading({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`font-heading text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] text-cream text-balance ${className}`}>
      {children}
    </h2>
  );
}
