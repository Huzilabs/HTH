import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { HubGlyph } from "@/components/ui/primitives";
import type { Hub, Service } from "@/lib/types";

export function HubGrid({ hubs, services }: { hubs: Hub[]; services: Service[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
      {hubs.map((hub, i) => {
        const list = services.filter((s) => s.hub === hub.slug);
        return (
          <li key={hub.slug} className="flex flex-col bg-ground p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="label text-subtle">Hub {hub.number}</span>
              <HubGlyph index={i} />
            </div>
            <h3 className="display mt-8 text-h3">
              <Link
                href={`/services#${hub.slug}`}
                className="hover:text-accent"
              >
                {hub.name}
              </Link>
            </h3>
            <p className="mt-3 text-muted">{hub.summary}</p>
            <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5">
              {list.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex min-h-8 items-center gap-2 text-sm text-ink hover:text-accent"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-line-strong group-hover:bg-accent" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/services#${hub.slug}`}
              className="label mt-6 inline-flex min-h-11 items-center gap-2 text-accent hover:text-ink"
            >
              Explore the hub <Arrow />
              <span className="sr-only">: {hub.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
