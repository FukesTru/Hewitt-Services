"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Calendly is only loaded once the block scrolls into view, so the scheduler's
 * iframe never blocks first paint.
 */
export function CalendlyEmbed({ minHeight = 700 }: { minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || load) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [load]);

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-forest/10 bg-white">
      {load ? (
        <iframe
          src={site.links.booking}
          title="Book a free discovery call with Hewitt Services"
          loading="lazy"
          className="w-full"
          style={{ height: minHeight, border: 0 }}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-4 bg-mist p-10 text-center"
          style={{ minHeight }}
        >
          <p className="text-sm text-ink">Loading the booking calendar…</p>
          <a
            href={site.links.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-light"
          >
            Open the calendar in a new tab
          </a>
        </div>
      )}
    </div>
  );
}
