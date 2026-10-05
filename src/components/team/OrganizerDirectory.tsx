"use client";

import { useState } from "react";
import Image from "next/image";

export interface Organizer {
  id: string;
  name: string;
  role: string;
  college?: string;
  image: string;
  linkedin?: string;
  categories: string[];
  objectPosition: string;
  scale: number;
}

export interface TeamFilter {
  id: string;
  label: string;
  count: number;
}

/** Filter buttons plus the portrait grid. Filters come from the data, so none is ever empty. */
export function OrganizerDirectory({ organizers, filters }: { organizers: Organizer[]; filters: TeamFilter[] }) {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? organizers : organizers.filter(o => o.categories.includes(active));
  const activeFilter = filters.find(f => f.id === active);

  return (
    <div>
      <div role="group" aria-label="Filter by team" className="flex flex-wrap gap-2">
        {filters.map(filter => {
          const isActive = filter.id === active;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter.id)}
              className={`min-h-11 rounded-full border px-4 text-[15px] font-bold transition-colors duration-150 ${
                isActive ? "border-action bg-action text-night" : "border-line-strong bg-night text-cream hover:border-cream"
              }`}
            >
              {filter.label} <span className={isActive ? "text-night/75" : "text-mist"}>{filter.count}</span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {active === "all" ? `Showing all ${shown.length} organizers` : `Showing ${shown.length} on ${activeFilter?.label}`}
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shown.map(person => (
          <li key={person.id}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
              <Image
                src={person.image}
                alt={`Portrait of ${person.name}`}
                fill
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 25vw, 50vw"
                className="object-cover"
                style={{ objectPosition: person.objectPosition, transform: `scale(${person.scale})`, transformOrigin: "center 25%" }}
              />
            </div>
            <h3 className="mt-3 text-base font-bold leading-tight text-cream">{person.name}</h3>
            <p className="mt-0.5 text-sm font-semibold text-action">{person.role}</p>
            {person.college && <p className="text-sm text-mist">{person.college}</p>}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-bold text-cream underline decoration-cream/45 decoration-2 underline-offset-4 hover:text-action hover:decoration-action"
              >
                LinkedIn<span className="sr-only">: {person.name} (opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
