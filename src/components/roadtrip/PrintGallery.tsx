"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

export interface Print {
  src: StaticImageData;
  alt: string;
  caption: string;
  tilt: string;
}

/**
 * Photo prints that open larger when clicked. Uses the native <dialog>, so focus is trapped,
 * Escape closes it and focus returns to the print that opened it. Arrow keys step through.
 */
export function PrintGallery({ prints, columns, sizes }: { prints: Print[]; columns: string; sizes: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = prints[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (by: number) => setIndex(i => (i + by + prints.length) % prints.length);

  return (
    <>
      <ul className={`grid gap-8 sm:gap-6 ${columns}`}>
        {prints.map((print, i) => (
          <li key={print.caption} className={print.tilt}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full cursor-zoom-in text-left transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none"
              aria-label={`View larger: ${print.caption}`}
            >
              <figure className="rounded-[3px] bg-paper p-2.5 pb-3 shadow-[0_4px_14px_rgb(0_0_0/0.28)] transition-shadow group-hover:shadow-[0_10px_24px_rgb(0_0_0/0.4)]">
                <Image src={print.src} alt={print.alt} sizes={sizes} placeholder="blur" className="print-grade h-auto w-full rounded-[2px]" />
                <figcaption className="mt-2.5 text-center text-sm font-semibold text-ink">{print.caption}</figcaption>
              </figure>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current.caption}
        onClick={e => {
          // A click on the backdrop (the dialog element itself, outside the frame) closes it.
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        onKeyDown={e => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92vh] w-fit max-w-[92vw] overflow-visible bg-transparent p-0 backdrop:bg-[rgb(10_14_18/0.85)] backdrop:backdrop-blur-sm"
      >
        <figure className="rounded-[4px] bg-paper p-3 pb-4 shadow-[0_20px_60px_rgb(0_0_0/0.6)]">
          <Image
            src={current.src}
            alt={current.alt}
            sizes="(min-width: 1200px) 1100px, 92vw"
            placeholder="blur"
            className="print-grade mx-auto h-auto max-h-[78vh] w-auto max-w-full rounded-[2px] object-contain"
          />
          <figcaption className="mt-3 flex flex-col gap-3 text-ink sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="font-semibold">
              {current.caption}
              <span className="ml-2 text-sm font-normal text-ink/60">
                {index + 1} of {prints.length}
              </span>
            </span>
            <span className="flex gap-2 max-sm:justify-between">
              <button type="button" onClick={() => step(-1)} className="min-h-11 rounded-full border border-ink/25 px-4 text-sm font-bold hover:bg-ink/5">
                <span aria-hidden>←</span> Previous
              </button>
              <button type="button" onClick={() => step(1)} className="min-h-11 rounded-full border border-ink/25 px-4 text-sm font-bold hover:bg-ink/5">
                Next <span aria-hidden>→</span>
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="min-h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper hover:bg-ink/85"
                autoFocus
              >
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
