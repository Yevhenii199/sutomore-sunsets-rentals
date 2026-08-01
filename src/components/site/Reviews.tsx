import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const reviews = [
  { name: "Anna K.", i: 0 },
  { name: "Marko P.", i: 1 },
  { name: "Elena R.", i: 2 },
  { name: "James W.", i: 3 },
];

export function Reviews() {
  const { t } = useLanguage();
  return (
    <section id="reviews" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t("reviews.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance max-w-2xl">
              {t("reviews.title")}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-sand text-sand" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{t("reviews.trusted")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl bg-background border border-border p-8 md:p-10 relative"
            >
              <Quote className="absolute top-6 right-6 size-8 text-sand" />
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="size-4 fill-sand text-sand" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground/90">
                “{t(`reviews.${r.i}.text`)}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-sand/40 grid place-items-center font-display text-lg">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t(`reviews.${r.i}.country`)} · {t(`reviews.${r.i}.stay`)}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
