import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, ru as ruLocale, srLatn } from "date-fns/locale";
import { CalendarIcon, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { property } from "@/lib/property";
import { useLanguage } from "@/context/LanguageContext";

const makeSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(2, t("book.errName")).max(80),
    phone: z.string().trim().min(5, t("book.errPhone")).max(40),
    guests: z.coerce.number().int().min(1).max(8),
    checkIn: z.date({ message: t("book.errCheckIn") }),
    checkOut: z.date({ message: t("book.errCheckOut") }),
    notes: z.string().max(500).optional(),
  }).refine((d) => d.checkOut > d.checkIn, {
    message: t("book.errOrder"),
    path: ["checkOut"],
  });

export function BookingForm() {
  const { t, language } = useLanguage();
  const dateLocale = language === "ru" ? ruLocale : language === "sr" ? srLatn : enUS;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const nights =
    checkIn && checkOut ? Math.max(0, differenceInCalendarDays(checkOut, checkIn)) : 0;
  const total = nights * property.pricePerNight;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = makeSchema(t).safeParse({ name, phone, guests, checkIn, checkOut, notes });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? t("book.errGeneric"));
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setDone(true);
      toast.success(t("book.toastSuccess"));
    } catch {
      toast.error(t("book.toastError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-24 md:py-32 bg-graphite text-background">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-background/60 mb-3">
              {t("book.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">
              {t("book.title")}
            </h2>
            <p className="mt-6 text-background/70 text-lg max-w-md">
              {t("book.subtitle")}
            </p>

            <div className="mt-10 space-y-4 text-background/80">
              <div className="flex items-baseline justify-between border-b border-background/15 pb-3">
                <span>{t("book.pricePerNight")}</span>
                <span className="font-display text-2xl text-background">€{property.pricePerNight}</span>
              </div>
              {nights > 0 && (
                <>
                  <div className="flex items-baseline justify-between text-sm">
                    <span>
                      {nights} {nights === 1 ? t("common.nights_one") : t("common.nights_other")}
                    </span>
                    <span>€{total}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-background/15 pt-3">
                    <span>{t("book.estimatedTotal")}</span>
                    <span className="font-display text-3xl text-sand">€{total}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 rounded-3xl bg-background text-foreground p-6 md:p-10 shadow-2xl shadow-black/30"
          >
            {done ? (
              <div className="py-16 text-center">
                <div className="mx-auto size-14 rounded-full bg-sand/30 grid place-items-center mb-5">
                  <Check className="size-7" />
                </div>
                <h3 className="font-display text-3xl">{t("book.sentTitle")}</h3>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                  {t("book.sentBody", { name: name.split(" ")[0], phone })}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">{t("book.name")}</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("book.namePlaceholder")} className="mt-2 h-11" />
                </div>

                <div>
                  <Label>{t("book.checkIn")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("mt-2 w-full h-11 justify-start font-normal", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 size-4" />
                        {checkIn ? format(checkIn, "PPP", { locale: dateLocale }) : t("book.pickDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn}
                        locale={dateLocale}
                        disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                        className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>{t("book.checkOut")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("mt-2 w-full h-11 justify-start font-normal", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 size-4" />
                        {checkOut ? format(checkOut, "PPP", { locale: dateLocale }) : t("book.pickDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut}
                        locale={dateLocale}
                        disabled={(d) => !checkIn || d <= checkIn}
                        className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="guests">{t("book.guests")}</Label>
                  <Input id="guests" type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(e.target.value)} className="mt-2 h-11" />
                </div>

                <div>
                  <Label htmlFor="phone">{t("book.phone")}</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+382 …" className="mt-2 h-11" />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="notes">{t("book.notes")}</Label>
                  <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("book.notesPlaceholder")} className="mt-2 h-11" />
                </div>

                <Button type="submit" disabled={loading}
                  className="sm:col-span-2 mt-2 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base">
                  {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> {t("book.sending")}</> : t("book.submit")}
                </Button>
                <p className="sm:col-span-2 text-xs text-muted-foreground text-center">
                  {t("book.disclaimer")}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
