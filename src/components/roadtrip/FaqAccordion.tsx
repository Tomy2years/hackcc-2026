"use client";

import { useState } from "react";
import type { FaqGroup } from "@/lib/content";

/** Grouped FAQ, set straight on the scene. Each question is a real <button> with aria-expanded/aria-controls. */
export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {groups.map(group => (
        <div key={group.title}>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-action">{group.title}</h3>
          <ul className="mt-3 border-t border-cream/20">
            {group.items.map(item => {
              const isOpen = openId === item.id;
              return (
                <li key={item.id} className="border-b border-cream/20">
                  <h4>
                    <button
                      id={`faq-${item.id}-button`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${item.id}`}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-xl font-semibold text-cream transition-colors duration-150 hover:text-action"
                    >
                      <span>{item.q}</span>
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        className={`size-5 shrink-0 text-action transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M4 7.5 10 13.5 16 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </h4>
                  <div id={`faq-${item.id}`} role="region" aria-labelledby={`faq-${item.id}-button`} hidden={!isOpen}>
                    <p className="max-w-[62ch] pb-6 text-[17px] leading-relaxed text-cream/90">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
