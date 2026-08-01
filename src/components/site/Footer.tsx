import { Instagram, MessageCircle, Phone, Mail, Send } from "lucide-react";
import { property } from "@/lib/property";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { host } = property;
  const { t } = useLanguage();
  const langs = host.languages.map((l) => t(`lang.${l}`)).join(", ");
  return (
    <footer className="bg-graphite text-background/80 pt-20 pb-10">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid md:grid-cols-3 gap-12 pb-14 border-b border-background/15">
          <div>
            <div className="flex items-center gap-2 text-background">
              <span className="h-2 w-2 rounded-full bg-sand" />
              <span className="font-display text-xl">{t("footer.brand")}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-background/50 mb-4">{t("footer.host")}</div>
            <div className="text-background font-medium">{host.name}</div>
            <div className="text-sm mt-1">{t("footer.speaks", { langs })}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-background/50 mb-4">{t("footer.contact")}</div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${host.phone.replace(/\s/g,"")}`} className="rounded-full bg-background/10 hover:bg-sand hover:text-sand-foreground transition-colors p-3"><Phone className="size-4" /></a>
              <a href={`mailto:${host.email}`} className="rounded-full bg-background/10 hover:bg-sand hover:text-sand-foreground transition-colors p-3"><Mail className="size-4" /></a>
              <a href={host.whatsapp} target="_blank" rel="noopener" className="rounded-full bg-background/10 hover:bg-sand hover:text-sand-foreground transition-colors p-3"><MessageCircle className="size-4" /></a>
              <a href={host.telegram} target="_blank" rel="noopener" className="rounded-full bg-background/10 hover:bg-sand hover:text-sand-foreground transition-colors p-3"><Send className="size-4" /></a>
              <a href={host.instagram} target="_blank" rel="noopener" className="rounded-full bg-background/10 hover:bg-sand hover:text-sand-foreground transition-colors p-3"><Instagram className="size-4" /></a>
            </div>
            <div className="mt-4 text-sm">{host.phone}</div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <div>{t("footer.rights", { year: new Date().getFullYear() })}</div>
          <div>{t("footer.made")}</div>
        </div>
      </div>
    </footer>
  );
}
