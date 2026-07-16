import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#gallery", label: "Gallery" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <span className="font-display text-lg tracking-tight">Lucia&apos;s</span>
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
        <Button
          asChild
          size="sm"
          className={cn(
            "rounded-full px-5 shrink-0",
            !scrolled && "bg-white text-slate-900 hover:bg-white/90"
          )}
        >
          <a href="#book">Book now</a>
        </Button>
      </div>
    </header>
  );
}
