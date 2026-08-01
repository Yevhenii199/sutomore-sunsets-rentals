import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { galleryImages } from "@/lib/property";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();
  const label = (l: string) => t(`room.${l}`);

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const next = () =>
    setOpen((i) => (i === null ? null : (i + 1) % galleryImages.length));

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t("gallery.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance max-w-2xl">
              {t("gallery.title")}
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-muted-foreground">
            {t("gallery.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-muted",
                img.area === "tall" && "row-span-2",
                img.area === "wide" && "col-span-2"
              )}
            >
              <img
                src={img.src}
                alt={label(img.label)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between text-background opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">{label(img.label)}</span>
                <Expand className="size-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-graphite/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-5 right-5 text-background/80 hover:text-background"
            aria-label={t("gallery.close")}
          >
            <X className="size-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-8 text-background/80 hover:text-background"
            aria-label={t("gallery.prev")}
          >
            <ChevronLeft className="size-10" />
          </button>
          <img
            src={galleryImages[open].src}
            alt={label(galleryImages[open].label)}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg"
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-8 text-background/80 hover:text-background"
            aria-label={t("gallery.next")}
          >
            <ChevronRight className="size-10" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-background/80 text-sm">
            {label(galleryImages[open].label)} — {open + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
