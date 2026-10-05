"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { EVENT } from "@/lib/event";
import { FAQ, LAST_SCHEDULE } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const linkClass =
  "font-bold text-white hover:text-action underline underline-offset-4 decoration-white/40 hover:decoration-action transition-colors";

/**
 * Stop 5's body: the itinerary pins on the left while the FAQ scrolls on the right.
 * As you read down the questions, the day advances along the itinerary.
 */
export default function ScheduleAndFaq() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [reached, setReached] = useState(reduceMotion ? LAST_SCHEDULE.length : 1);

  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start 60%", "end 70%"] });
  useMotionValueEvent(scrollYProgress, "change", latest => {
    if (reduceMotion) return;
    setReached(Math.max(1, Math.min(LAST_SCHEDULE.length, Math.ceil(latest * LAST_SCHEDULE.length))));
  });

  return (
    <div ref={gridRef} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Itinerary, pinned on large screens */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <h3 className="text-sm font-bold uppercase tracking-wider text-mist/70">
          Last year&apos;s itinerary <span className="normal-case tracking-normal font-medium">(2026 schedule coming)</span>
        </h3>
        <ol className="mt-5 relative ml-2 border-l-2 border-dashed border-white/20">
          {/* the part of the day you've "driven" so far */}
          <motion.span
            aria-hidden
            className="absolute -left-0.5 top-0 w-0.5 bg-action origin-top"
            initial={false}
            animate={{ height: `${(reached / LAST_SCHEDULE.length) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          {LAST_SCHEDULE.map((slot, i) => {
            const on = i < reached;
            return (
              <li key={slot.time} className="relative pl-6 pb-5 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    on ? "bg-action border-action" : "bg-night border-white/40"
                  }`}
                />
                <p className={`font-heading text-lg leading-none transition-colors duration-300 ${on ? "text-white" : "text-mist/50"}`}>
                  {slot.time}
                </p>
                <p className={`text-sm mt-1 transition-colors duration-300 ${on ? "text-mist/85" : "text-mist/45"}`}>{slot.what}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* FAQ */}
      <div className="lg:col-span-7">
        <div className="space-y-10">
          {FAQ.map(group => (
            <FaqGroup key={group.title} title={group.title} items={group.items} />
          ))}
        </div>
        <p className="mt-10 text-mist/85">
          Something we didn&apos;t answer?{" "}
          <a href={`mailto:${EVENT.contactEmail}`} className={linkClass}>
            {EVENT.contactEmail}
          </a>{" "}
          or ask in the{" "}
          <a href={EVENT.social.discord} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Discord
          </a>
          . A human replies.
        </p>
      </div>
    </div>
  );
}

function FaqGroup({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <h3 className="font-heading text-2xl sm:text-3xl text-white mb-2">{title}</h3>
      <div className="divide-y divide-white/15 border-y border-white/15">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${title}-${i}`.replace(/\s+/g, "-").toLowerCase();
          return (
            <div key={item.q} className="py-1">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full py-3 flex items-start justify-between gap-4 text-left text-base sm:text-lg font-bold text-white hover:text-action transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <motion.span
                  aria-hidden
                  className="mt-1 shrink-0 text-action"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-mist/85 leading-relaxed max-w-prose">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
