import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { property } from "@/lib/property";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={property.images.hero}
          alt={t("room.Terrace")}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-graphite/30 to-graphite/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl container-px pt-40 pb-20 md:pt-48 md:pb-28 min-h-[100svh] flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-background"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-background/80 mb-6">
            <MapPin className="size-3.5" />
            {t("hero.location")}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
            {t("hero.title1")}<br />
            <span className="italic text-sand">{t("hero.titleAccent")}</span> {t("hero.title2")}
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-background/85 text-balance">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-sand text-sand-foreground hover:bg-sand/90 px-7 h-12 text-base shadow-xl shadow-graphite/30"
            >
              <a href="#book">
                {t("hero.cta")} <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <a
              href="#gallery"
              className="text-sm text-background/90 hover:text-background underline-offset-4 hover:underline"
            >
              {t("hero.secondary")}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-background/85">
            <div>
              <div className="font-display text-3xl">€{property.pricePerNight}</div>
              <div className="text-xs uppercase tracking-widest text-background/60">{t("hero.perNight")}</div>
            </div>
            <div className="h-10 w-px bg-background/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-sand text-sand" />
                ))}
              </div>
              <span>{t("hero.loved")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
