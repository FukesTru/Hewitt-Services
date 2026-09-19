import { site } from "@/lib/site";

export function MapEmbed({ height = 380 }: { height?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10">
      <iframe
        src={site.maps.embed}
        title={`Map showing the ${site.name} office at ${site.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
        style={{ height, border: 0 }}
      />
    </div>
  );
}
