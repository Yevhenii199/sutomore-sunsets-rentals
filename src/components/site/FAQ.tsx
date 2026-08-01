import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

const FAQ_COUNT = 6;

export function FAQ() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl container-px">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            {t("faq.eyebrow")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">
            {t("faq.title")}
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {Array.from({ length: FAQ_COUNT }).map((_, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-lg md:text-xl font-display py-6 hover:no-underline">
                {t(`faq.${i}.q`)}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">
                {t(`faq.${i}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
