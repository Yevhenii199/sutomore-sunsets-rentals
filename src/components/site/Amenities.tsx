import { motion } from "framer-motion";
import {
  Wifi, Car, Snowflake, Tv, ChefHat, Bath, KeyRound, WashingMachine,
  Microwave, Refrigerator, Coffee, Utensils,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const items = [
  { icon: Wifi, key: "amenities.wifi" },
  { icon: Snowflake, key: "amenities.ac" },
  { icon: Car, key: "amenities.parking" },
  { icon: KeyRound, key: "amenities.key" },
  { icon: Tv, key: "amenities.tv" },
  { icon: ChefHat, key: "amenities.kitchen" },
  { icon: Refrigerator, key: "amenities.fridge" },
  { icon: Microwave, key: "amenities.microwave" },
  { icon: WashingMachine, key: "amenities.washer" },
  { icon: Bath, key: "amenities.water" },
  { icon: Coffee, key: "amenities.kettle" },
  { icon: Utensils, key: "amenities.cookware" },
];

export function Amenities() {
  const { t } = useLanguage();
  return (
    <section id="amenities" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid md:grid-cols-12 gap-12 mb-14">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t("amenities.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">
              {t("amenities.title")}
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-muted-foreground text-lg self-end max-w-lg">
            {t("amenities.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {items.map((it, i) => (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              className="bg-background p-6 md:p-8 flex items-start gap-4 hover:bg-card transition-colors"
            >
              <div className="rounded-xl bg-sand/30 p-3 text-foreground">
                <it.icon className="size-5" strokeWidth={1.6} />
              </div>
              <div>
                <div className="font-medium">{t(it.key)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
