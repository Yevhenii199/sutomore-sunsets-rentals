import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "sr" | "ru";

export const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "sr", label: "SR", name: "Srpski" },
  { code: "ru", label: "RU", name: "Русский" },
];

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.gallery": "Gallery",
  "nav.amenities": "Amenities",
  "nav.location": "Location",
  "nav.reviews": "Reviews",
  "nav.faq": "FAQ",
  "nav.book": "Book now",
  "nav.language": "Language",
  "common.brand": "Lucia's",
  "common.nights_one": "night",
  "common.nights_other": "nights",

  // Hero
  "hero.location": "Sutomore, Montenegro",
  "hero.title1": "A quiet escape,",
  "hero.titleAccent": "100 meters",
  "hero.title2": "from the sea.",
  "hero.description":
    "Spend your vacation near the shore but still in a quiet neighbourhood, just 100m away from the beach. Located in the southern area of Sutomore, you will find everything you need for a beautiful vacation.",
  "hero.cta": "Book now",
  "hero.secondary": "See the apartment →",
  "hero.perNight": "per night",
  "hero.loved": "Loved by guests",

  // Gallery
  "gallery.eyebrow": "The space",
  "gallery.title": "Every corner, thought through.",
  "gallery.subtitle":
    "Bright rooms, a private terrace, free parking and a fully equipped kitchen — designed for a relaxed stay.",
  "gallery.close": "Close",
  "gallery.prev": "Previous",
  "gallery.next": "Next",
  "room.Terrace": "Terrace",
  "room.Living room": "Living room",
  "room.Bedroom": "Bedroom",
  "room.Kitchen": "Kitchen",
  "room.Bathroom": "Bathroom",
  "room.Parking": "Parking",

  // Amenities
  "amenities.eyebrow": "Everything included",
  "amenities.title": "Comforts of home, by the sea.",
  "amenities.subtitle":
    "Move in with just a suitcase. Everything you need for a comfortable stay is already here, waiting.",
  "amenities.wifi": "Free Wi-Fi",
  "amenities.ac": "Air conditioning",
  "amenities.parking": "Free private parking",
  "amenities.key": "Secure key entry",
  "amenities.tv": "TV in living room",
  "amenities.kitchen": "Fully equipped kitchen",
  "amenities.fridge": "Fridge",
  "amenities.microwave": "Microwave & stove",
  "amenities.washer": "Washing machine",
  "amenities.water": "Hot & cold water",
  "amenities.kettle": "Kettle",
  "amenities.cookware": "Cookware & utensils",

  // Location
  "location.eyebrow": "The neighborhood",
  "location.title": "Sutomore — quiet, southern, close to everything.",
  "location.subtitle":
    "A peaceful corner of the Montenegrin coast, with the Adriatic just a short walk away.",
  "location.mapTitle": "Map of Lucia's apartment in Sutomore",
  "location.beach": "Beach",
  "location.beachValue": "100 m",
  "location.restaurants": "Restaurants",
  "location.restaurantsValue": "5 min walk",
  "location.oldBar": "Old Bar",
  "location.oldBarValue": "10 min drive",
  "location.airport": "Tivat Airport",
  "location.airportValue": "55 min drive",

  // Booking
  "book.eyebrow": "Reserve your stay",
  "book.title": "Send a request, get a reply in hours.",
  "book.subtitle":
    "Tell us when you'd like to come. We'll confirm availability and walk you through everything you need to know.",
  "book.pricePerNight": "Price per night",
  "book.estimatedTotal": "Estimated total",
  "book.name": "Full name",
  "book.namePlaceholder": "Your name",
  "book.checkIn": "Check-in",
  "book.checkOut": "Check-out",
  "book.pickDate": "Pick a date",
  "book.guests": "Guests",
  "book.phone": "Phone",
  "book.notes": "Notes (optional)",
  "book.notesPlaceholder": "Anything we should know?",
  "book.submit": "Send booking request",
  "book.sending": "Sending…",
  "book.disclaimer": "No payment required to submit. The host will confirm availability.",
  "book.sentTitle": "Request sent",
  "book.sentBody": "Thank you, {name}. The host will contact you on {phone} shortly.",
  "book.toastSuccess": "Request sent! The host will contact you shortly.",
  "book.toastError": "Could not send request. Please try again.",
  "book.errName": "Please enter your name",
  "book.errPhone": "Please enter a phone number",
  "book.errCheckIn": "Pick a check-in date",
  "book.errCheckOut": "Pick a check-out date",
  "book.errOrder": "Check-out must be after check-in",
  "book.errGeneric": "Please check the form",

  // Reviews
  "reviews.eyebrow": "Guest stories",
  "reviews.title": "What our guests say.",
  "reviews.trusted": "Trusted by guests since 2022",
  "reviews.0.text":
    "Beautiful, clean apartment in a quiet neighborhood — and the beach is literally a few minutes away. Luka was an incredible host.",
  "reviews.0.stay": "Stayed in July",
  "reviews.0.country": "Germany",
  "reviews.1.text":
    "Tiho mesto, savršeno za odmor. Sve je novo i čisto, parking u dvorištu — preporuka od srca.",
  "reviews.1.stay": "Stayed in August",
  "reviews.1.country": "Serbia",
  "reviews.2.text":
    "Очень уютная квартира с прекрасной террасой. Хозяин отзывчивый, говорит по-русски. Вернёмся снова!",
  "reviews.2.stay": "Stayed in June",
  "reviews.2.country": "Russia",
  "reviews.3.text":
    "Exactly as pictured. Spotless, well-equipped kitchen, fast Wi-Fi, and the location is hard to beat for the price.",
  "reviews.3.stay": "Stayed in September",
  "reviews.3.country": "United Kingdom",

  // FAQ
  "faq.eyebrow": "Frequently asked",
  "faq.title": "Good to know.",
  "faq.0.q": "How far is the apartment from the beach?",
  "faq.0.a": "Just 100 meters — about a 2-minute walk to the Adriatic shore.",
  "faq.1.q": "Is parking really free?",
  "faq.1.a": "Yes. There is free private parking in the yard, available to all guests.",
  "faq.2.q": "What languages does the host speak?",
  "faq.2.a": "Luka speaks English, Serbian and Russian and is happy to help with any questions.",
  "faq.3.q": "How do I confirm and pay for my booking?",
  "faq.3.a":
    "Send a booking request through the form. The host will reply with availability and payment instructions, usually within a few hours.",
  "faq.4.q": "Are check-in times flexible?",
  "faq.4.a":
    "Standard check-in is from 14:00 and check-out by 11:00, but we try to be flexible — just ask.",
  "faq.5.q": "Is the apartment good for families?",
  "faq.5.a":
    "Yes — quiet street, secure entry, full kitchen and washing machine. Comfortable for up to 4 guests.",

  // Footer
  "footer.brand": "Lucia's Apartment",
  "footer.about":
    "A quiet, modern stay in the southern part of Sutomore — 100 meters from the Adriatic.",
  "footer.host": "Host",
  "footer.speaks": "Speaks {langs}",
  "footer.contact": "Contact",
  "footer.rights": "© {year} Lucia's Apartment, Sutomore.",
  "footer.made": "Made with care on the Adriatic coast.",
  "lang.English": "English",
  "lang.Serbian": "Serbian",
  "lang.Russian": "Russian",
};

const sr: Dict = {
  "nav.gallery": "Galerija",
  "nav.amenities": "Sadržaji",
  "nav.location": "Lokacija",
  "nav.reviews": "Recenzije",
  "nav.faq": "Pitanja",
  "nav.book": "Rezerviši",
  "nav.language": "Jezik",
  "common.brand": "Lucia's",
  "common.nights_one": "noć",
  "common.nights_other": "noći",

  "hero.location": "Sutomore, Crna Gora",
  "hero.title1": "Mirno utočište,",
  "hero.titleAccent": "100 metara",
  "hero.title2": "od mora.",
  "hero.description":
    "Provedite odmor blizu obale, a ipak u mirnom kraju — samo 100 m od plaže. Smješten u južnom dijelu Sutomora, apartman ima sve što vam treba za savršen odmor.",
  "hero.cta": "Rezerviši",
  "hero.secondary": "Pogledaj apartman →",
  "hero.perNight": "po noćenju",
  "hero.loved": "Omiljen kod gostiju",

  "gallery.eyebrow": "Prostor",
  "gallery.title": "Svaki detalj je promišljen.",
  "gallery.subtitle":
    "Svijetle sobe, privatna terasa, besplatan parking i potpuno opremljena kuhinja — za opušten boravak.",
  "gallery.close": "Zatvori",
  "gallery.prev": "Prethodna",
  "gallery.next": "Sljedeća",
  "room.Terrace": "Terasa",
  "room.Living room": "Dnevna soba",
  "room.Bedroom": "Spavaća soba",
  "room.Kitchen": "Kuhinja",
  "room.Bathroom": "Kupatilo",
  "room.Parking": "Parking",

  "amenities.eyebrow": "Sve je uključeno",
  "amenities.title": "Udobnost doma, pored mora.",
  "amenities.subtitle":
    "Dođite samo sa koferom. Sve što vam treba za udoban boravak već vas čeka.",
  "amenities.wifi": "Besplatan Wi-Fi",
  "amenities.ac": "Klima uređaj",
  "amenities.parking": "Besplatan privatni parking",
  "amenities.key": "Siguran ulaz sa ključem",
  "amenities.tv": "TV u dnevnoj sobi",
  "amenities.kitchen": "Potpuno opremljena kuhinja",
  "amenities.fridge": "Frižider",
  "amenities.microwave": "Mikrotalasna i šporet",
  "amenities.washer": "Veš mašina",
  "amenities.water": "Topla i hladna voda",
  "amenities.kettle": "Kuvalo za vodu",
  "amenities.cookware": "Posuđe i pribor",

  "location.eyebrow": "Okolina",
  "location.title": "Sutomore — mirno, južno, blizu svega.",
  "location.subtitle":
    "Miran kutak crnogorske obale, sa Jadranom na nekoliko minuta hoda.",
  "location.mapTitle": "Mapa Lucia's apartmana u Sutomoru",
  "location.beach": "Plaža",
  "location.beachValue": "100 m",
  "location.restaurants": "Restorani",
  "location.restaurantsValue": "5 min hoda",
  "location.oldBar": "Stari Bar",
  "location.oldBarValue": "10 min vožnje",
  "location.airport": "Aerodrom Tivat",
  "location.airportValue": "55 min vožnje",

  "book.eyebrow": "Rezervišite boravak",
  "book.title": "Pošaljite upit, odgovor stiže za par sati.",
  "book.subtitle":
    "Recite nam kada želite doći. Potvrdićemo slobodne termine i objasniti sve što treba da znate.",
  "book.pricePerNight": "Cijena po noćenju",
  "book.estimatedTotal": "Procijenjen ukupan iznos",
  "book.name": "Ime i prezime",
  "book.namePlaceholder": "Vaše ime",
  "book.checkIn": "Dolazak",
  "book.checkOut": "Odlazak",
  "book.pickDate": "Izaberite datum",
  "book.guests": "Gosti",
  "book.phone": "Telefon",
  "book.notes": "Napomena (opciono)",
  "book.notesPlaceholder": "Nešto što treba da znamo?",
  "book.submit": "Pošalji upit za rezervaciju",
  "book.sending": "Slanje…",
  "book.disclaimer": "Nije potrebno plaćanje. Domaćin će potvrditi dostupnost.",
  "book.sentTitle": "Upit poslat",
  "book.sentBody": "Hvala, {name}. Domaćin će vas uskoro kontaktirati na {phone}.",
  "book.toastSuccess": "Upit je poslat! Domaćin će vas uskoro kontaktirati.",
  "book.toastError": "Slanje nije uspjelo. Pokušajte ponovo.",
  "book.errName": "Unesite vaše ime",
  "book.errPhone": "Unesite broj telefona",
  "book.errCheckIn": "Izaberite datum dolaska",
  "book.errCheckOut": "Izaberite datum odlaska",
  "book.errOrder": "Odlazak mora biti nakon dolaska",
  "book.errGeneric": "Provjerite formular",

  "reviews.eyebrow": "Priče gostiju",
  "reviews.title": "Šta kažu naši gosti.",
  "reviews.trusted": "Gosti nam vjeruju od 2022.",
  "reviews.0.text":
    "Prelijep, čist apartman u mirnom kraju — a plaža je bukvalno par minuta daleko. Luka je bio sjajan domaćin.",
  "reviews.0.stay": "Boravak u julu",
  "reviews.0.country": "Njemačka",
  "reviews.1.text":
    "Tiho mesto, savršeno za odmor. Sve je novo i čisto, parking u dvorištu — preporuka od srca.",
  "reviews.1.stay": "Boravak u avgustu",
  "reviews.1.country": "Srbija",
  "reviews.2.text":
    "Veoma prijatan apartman sa divnom terasom. Domaćin je ljubazan i govori ruski. Vraćamo se ponovo!",
  "reviews.2.stay": "Boravak u junu",
  "reviews.2.country": "Rusija",
  "reviews.3.text":
    "Tačno kao na slikama. Besprijekorno čisto, opremljena kuhinja, brz Wi-Fi, a lokacija je nenadmašna za ovu cijenu.",
  "reviews.3.stay": "Boravak u septembru",
  "reviews.3.country": "Velika Britanija",

  "faq.eyebrow": "Česta pitanja",
  "faq.title": "Dobro je znati.",
  "faq.0.q": "Koliko je apartman udaljen od plaže?",
  "faq.0.a": "Samo 100 metara — oko 2 minuta hoda do jadranske obale.",
  "faq.1.q": "Da li je parking zaista besplatan?",
  "faq.1.a": "Da. Besplatan privatni parking u dvorištu, dostupan svim gostima.",
  "faq.2.q": "Koje jezike govori domaćin?",
  "faq.2.a": "Luka govori engleski, srpski i ruski i rado će odgovoriti na sva pitanja.",
  "faq.3.q": "Kako da potvrdim i platim rezervaciju?",
  "faq.3.a":
    "Pošaljite upit preko formulara. Domaćin će odgovoriti sa dostupnošću i uputstvima za plaćanje, obično u roku od nekoliko sati.",
  "faq.4.q": "Da li je vrijeme prijave fleksibilno?",
  "faq.4.a":
    "Standardna prijava je od 14:00, a odjava do 11:00, ali trudimo se biti fleksibilni — samo pitajte.",
  "faq.5.q": "Da li je apartman pogodan za porodice?",
  "faq.5.a":
    "Da — mirna ulica, siguran ulaz, kompletna kuhinja i veš mašina. Udobno za do 4 gosta.",

  "footer.brand": "Lucia's Apartment",
  "footer.about":
    "Miran, moderan smještaj u južnom dijelu Sutomora — 100 metara od Jadrana.",
  "footer.host": "Domaćin",
  "footer.speaks": "Govori {langs}",
  "footer.contact": "Kontakt",
  "footer.rights": "© {year} Lucia's Apartment, Sutomore.",
  "footer.made": "Napravljeno s pažnjom na jadranskoj obali.",
  "lang.English": "engleski",
  "lang.Serbian": "srpski",
  "lang.Russian": "ruski",
};

const ru: Dict = {
  "nav.gallery": "Галерея",
  "nav.amenities": "Удобства",
  "nav.location": "Локация",
  "nav.reviews": "Отзывы",
  "nav.faq": "Вопросы",
  "nav.book": "Забронировать",
  "nav.language": "Язык",
  "common.brand": "Lucia's",
  "common.nights_one": "ночь",
  "common.nights_other": "ночей",

  "hero.location": "Сутоморе, Черногория",
  "hero.title1": "Тихий отдых в",
  "hero.titleAccent": "100 метрах",
  "hero.title2": "от моря.",
  "hero.description":
    "Проведите отпуск рядом с морем, но в тихом районе — всего в 100 м от пляжа. Апартаменты в южной части Сутоморе: здесь есть всё для прекрасного отдыха.",
  "hero.cta": "Забронировать",
  "hero.secondary": "Посмотреть апартаменты →",
  "hero.perNight": "за ночь",
  "hero.loved": "Гости в восторге",

  "gallery.eyebrow": "Пространство",
  "gallery.title": "Продуман каждый уголок.",
  "gallery.subtitle":
    "Светлые комнаты, отдельная терраса, бесплатная парковка и полностью оборудованная кухня — для спокойного отдыха.",
  "gallery.close": "Закрыть",
  "gallery.prev": "Назад",
  "gallery.next": "Вперёд",
  "room.Terrace": "Терраса",
  "room.Living room": "Гостиная",
  "room.Bedroom": "Спальня",
  "room.Kitchen": "Кухня",
  "room.Bathroom": "Ванная",
  "room.Parking": "Парковка",

  "amenities.eyebrow": "Всё включено",
  "amenities.title": "Домашний уют у моря.",
  "amenities.subtitle":
    "Приезжайте налегке. Всё необходимое для комфортного проживания уже здесь.",
  "amenities.wifi": "Бесплатный Wi-Fi",
  "amenities.ac": "Кондиционер",
  "amenities.parking": "Бесплатная частная парковка",
  "amenities.key": "Безопасный вход по ключу",
  "amenities.tv": "Телевизор в гостиной",
  "amenities.kitchen": "Полностью оборудованная кухня",
  "amenities.fridge": "Холодильник",
  "amenities.microwave": "Микроволновка и плита",
  "amenities.washer": "Стиральная машина",
  "amenities.water": "Горячая и холодная вода",
  "amenities.kettle": "Электрочайник",
  "amenities.cookware": "Посуда и приборы",

  "location.eyebrow": "Район",
  "location.title": "Сутоморе — тихо, южно, всё рядом.",
  "location.subtitle":
    "Спокойный уголок черногорского побережья, до Адриатики пара минут пешком.",
  "location.mapTitle": "Карта апартаментов Lucia's в Сутоморе",
  "location.beach": "Пляж",
  "location.beachValue": "100 м",
  "location.restaurants": "Рестораны",
  "location.restaurantsValue": "5 мин пешком",
  "location.oldBar": "Старый Бар",
  "location.oldBarValue": "10 мин на авто",
  "location.airport": "Аэропорт Тиват",
  "location.airportValue": "55 мин на авто",

  "book.eyebrow": "Забронируйте проживание",
  "book.title": "Отправьте заявку — ответим в течение часов.",
  "book.subtitle":
    "Расскажите, когда хотите приехать. Мы подтвердим свободные даты и всё подробно объясним.",
  "book.pricePerNight": "Цена за ночь",
  "book.estimatedTotal": "Примерная сумма",
  "book.name": "Имя и фамилия",
  "book.namePlaceholder": "Ваше имя",
  "book.checkIn": "Заезд",
  "book.checkOut": "Выезд",
  "book.pickDate": "Выберите дату",
  "book.guests": "Гостей",
  "book.phone": "Телефон",
  "book.notes": "Комментарий (необязательно)",
  "book.notesPlaceholder": "Что нам стоит знать?",
  "book.submit": "Отправить заявку",
  "book.sending": "Отправка…",
  "book.disclaimer": "Оплата не требуется. Хозяин подтвердит доступность дат.",
  "book.sentTitle": "Заявка отправлена",
  "book.sentBody": "Спасибо, {name}. Хозяин свяжется с вами по номеру {phone}.",
  "book.toastSuccess": "Заявка отправлена! Хозяин скоро свяжется с вами.",
  "book.toastError": "Не удалось отправить заявку. Попробуйте ещё раз.",
  "book.errName": "Введите ваше имя",
  "book.errPhone": "Введите номер телефона",
  "book.errCheckIn": "Выберите дату заезда",
  "book.errCheckOut": "Выберите дату выезда",
  "book.errOrder": "Выезд должен быть позже заезда",
  "book.errGeneric": "Проверьте форму",

  "reviews.eyebrow": "Истории гостей",
  "reviews.title": "Что говорят наши гости.",
  "reviews.trusted": "Нам доверяют с 2022 года",
  "reviews.0.text":
    "Красивые, чистые апартаменты в тихом районе — до пляжа буквально пара минут. Лука — прекрасный хозяин.",
  "reviews.0.stay": "Отдых в июле",
  "reviews.0.country": "Германия",
  "reviews.1.text":
    "Тихое место, идеально для отдыха. Всё новое и чистое, парковка во дворе — рекомендую от души.",
  "reviews.1.stay": "Отдых в августе",
  "reviews.1.country": "Сербия",
  "reviews.2.text":
    "Очень уютная квартира с прекрасной террасой. Хозяин отзывчивый, говорит по-русски. Вернёмся снова!",
  "reviews.2.stay": "Отдых в июне",
  "reviews.2.country": "Россия",
  "reviews.3.text":
    "Всё точно как на фото. Идеальная чистота, оборудованная кухня, быстрый Wi-Fi, а локация за эти деньги — лучшая.",
  "reviews.3.stay": "Отдых в сентябре",
  "reviews.3.country": "Великобритания",

  "faq.eyebrow": "Частые вопросы",
  "faq.title": "Полезно знать.",
  "faq.0.q": "Как далеко апартаменты от пляжа?",
  "faq.0.a": "Всего 100 метров — около 2 минут пешком до Адриатики.",
  "faq.1.q": "Парковка действительно бесплатная?",
  "faq.1.a": "Да. Бесплатная частная парковка во дворе, доступна всем гостям.",
  "faq.2.q": "На каких языках говорит хозяин?",
  "faq.2.a": "Лука говорит по-английски, по-сербски и по-русски и рад помочь с любыми вопросами.",
  "faq.3.q": "Как подтвердить и оплатить бронирование?",
  "faq.3.a":
    "Отправьте заявку через форму. Хозяин ответит с информацией о доступности и оплате, обычно в течение нескольких часов.",
  "faq.4.q": "Гибкое ли время заезда?",
  "faq.4.a":
    "Стандартный заезд с 14:00, выезд до 11:00, но мы стараемся идти навстречу — просто спросите.",
  "faq.5.q": "Подходят ли апартаменты для семей?",
  "faq.5.a":
    "Да — тихая улица, безопасный вход, полная кухня и стиральная машина. Комфортно для 4 гостей.",

  "footer.brand": "Lucia's Apartment",
  "footer.about":
    "Тихое современное жильё в южной части Сутоморе — в 100 метрах от Адриатики.",
  "footer.host": "Хозяин",
  "footer.speaks": "Говорит на: {langs}",
  "footer.contact": "Контакты",
  "footer.rights": "© {year} Lucia's Apartment, Сутоморе.",
  "footer.made": "Сделано с заботой на Адриатическом побережье.",
  "lang.English": "английском",
  "lang.Serbian": "сербском",
  "lang.Russian": "русском",
};

const translations: Record<Language, Dict> = { en, sr, ru };

type TranslateVars = Record<string, string | number>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: TranslateVars) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "app.language";

function readStored(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "sr" || stored === "ru" ? stored : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch {
      /* ignore */
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key: string, vars?: TranslateVars) => {
        const raw = translations[language][key] ?? translations.en[key] ?? key;
        if (!vars) return raw;
        return raw.replace(/\{(\w+)\}/g, (_, k: string) =>
          vars[k] !== undefined ? String(vars[k]) : `{${k}}`,
        );
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
