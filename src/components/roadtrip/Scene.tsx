import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface SceneProps {
  id: string;
  image: string | StaticImageData;
  alt: string;
  /** Where the artwork's focal point is; content sits over the opposite half. */
  focus?: "top" | "center";
  /** Daytime art needs the ground gradient to start higher so white type stays readable. */
  tone?: "night" | "day";
  children: ReactNode;
  className?: string;
}

/**
 * One stop on the road trip: a full-bleed scene with type set directly on it.
 * Legibility comes from a ground gradient under the content, never from dimming
 * the whole picture, so the sky stays bright.
 */
export function Scene({ id, image, alt, focus = "top", tone = "night", children, className = "" }: SceneProps) {
  // The screen-print plates are bright and detailed right down to the bottom edge, so the
  // ground gradient reaches solid night by the time the copy starts.
  const ground =
    tone === "day"
      ? "top-[10%] bottom-0 bg-gradient-to-b from-transparent via-night/90 via-32% to-night"
      : "bottom-0 h-[86%] sm:h-[82%] bg-gradient-to-t from-night via-night/90 via-50% sm:via-50% to-transparent";

  return (
    <section id={id} className={`relative w-full overflow-hidden scroll-mt-16 ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          // Landscape plates on portrait phones: keep the subject (right two-thirds) in frame.
          className={`object-cover object-[70%_center] sm:object-center ${focus === "top" ? "sm:object-top" : ""}`}
        />
        {/* Seam fade into the night background above */}
        <div className="absolute inset-x-0 top-0 h-32 sm:h-48 bg-gradient-to-b from-night to-transparent" />
        {/* Ground gradient: the picture stays bright up top, the copy sits on solid footing below */}
        <div className={`absolute inset-x-0 ${ground}`} />
      </div>

      <div
        className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 ${
          tone === "day" ? "pt-[30vh] sm:pt-[34vh]" : "pt-[38vh] sm:pt-[42vh]"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

interface StopMarkerProps {
  number: number;
  place: string;
}

/** A small roadside marker that labels each stop. Wayfinding, so it's the one place sign-green appears. */
export function StopMarker({ number, place }: StopMarkerProps) {
  return (
    <p className="inline-flex items-stretch text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white mb-5 shadow-md shadow-black/30">
      <span className="bg-sign px-2.5 py-1.5 border-2 border-white/90 border-r-0 rounded-l-sm">Stop {number}</span>
      <span className="bg-sign-deep px-3 py-1.5 border-2 border-white/90 rounded-r-sm">{place}</span>
    </p>
  );
}

/** Serif hook + display title, the pairing every stop opens with. */
export function StopTitle({ hook, title }: { hook: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-serif italic text-action text-xl sm:text-2xl mb-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)]">{hook}</p>
      <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
        {title}
      </h2>
    </div>
  );
}
