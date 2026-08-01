import { MapPin, Waves, Plane, Utensils } from "lucide-react";
import { property } from "@/lib/property";
import { useLanguage } from "@/context/LanguageContext";

const highlights = [
  { icon: Waves, labelKey: "location.beach", valueKey: "location.beachValue" },
  { icon: Utensils, labelKey: "location.restaurants", valueKey: "location.restaurantsValue" },
  { icon: MapPin, labelKey: "location.oldBar", valueKey: "location.oldBarValue" },
  { icon: Plane, labelKey: "location.airport", valueKey: "location.airportValue" },
];

export function LocationMap() {
  const { t } = useLanguage();
  const { lat, lng } = property.coords;
  const bbox = `${lng - 0.01},${lat - 0.008},${lng + 0.01},${lat + 0.008}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <section id="location" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t("location.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">
              {t("location.title")}
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground text-lg">
            {t("location.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative overflow-hidden rounded-3xl border border-border h-[420px] md:h-[520px] bg-muted">
            <iframe
              title={t("location.mapTitle")}
              src={mapSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((h) => (
              <div
                key={h.labelKey}
                className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4"
              >
                <div className="rounded-xl bg-sand/30 p-3">
                  <h.icon className="size-5" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t(h.labelKey)}
                  </div>
                  <div className="font-display text-xl">{t(h.valueKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
