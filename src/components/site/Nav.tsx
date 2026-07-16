import { useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LANGUAGES, useLanguage } from "@/context/LanguageContext";

export function Nav() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#amenities", label: t("nav.amenities") },
    { href: "#location", label: t("nav.location") },
    { href: "#reviews", label: t("nav.reviews") },
    { href: "#faq", label: t("nav.faq") },
  ];

  const activeLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 text-foreground"
          : "bg-transparent text-white"
      )}
    >
      <div className="mx-auto max-w-7xl container-px flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-lg tracking-tight">{t("common.brand")}</span>
        </a>

        <nav
          className={cn(
            "hidden md:flex items-center gap-8 text-sm transition-colors",
            scrolled ? "text-muted-foreground" : "text-white/85"
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "transition-colors",
                scrolled ? "hover:text-foreground" : "hover:text-white"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("nav.language")}
                className={cn(
                  "rounded-full px-3 gap-1.5 h-9",
                  scrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Globe className="size-4" />
                <span className="text-xs font-medium tracking-wide">{activeLang.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="z-50 min-w-36">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onSelect={() => setLanguage(l.code)}
                  className="flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>
                    <span className="text-xs font-semibold tracking-wide mr-2 text-muted-foreground">
                      {l.label}
                    </span>
                    {l.name}
                  </span>
                  {language === l.code && <Check className="size-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="sm" className={cn(
            "rounded-full px-5 shrink-0",
            !scrolled && "bg-white text-slate-900 hover:bg-white/90"
          )}>
            <a href="#book">{t("nav.book")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
