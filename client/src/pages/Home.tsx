import { useEffect, useState } from "react";
import {
  ArrowDown,
  ChevronRight,
  X,
  Zap,
} from "lucide-react";
import { LOCALE_OPTIONS, translations, type Locale, type Translations } from "../i18n";
import { Link } from "wouter";
import { ContactCtas } from "../components/ContactCtas";
import { SiteFooter } from "../components/SiteFooter";
import { BackToTopButton } from "../components/BackToTopButton";
import {
  FACEBOOK_LINK,
  HERO_IMAGE,
} from "@shared/morningGreen";
import { ENGLISH_PRODUCT_NAMES, MENU_PRODUCTS, localizedDescriptor } from "../lib/morningGreenCatalog";

const HERO_SLIDES = [
  { image: HERO_IMAGE, background: "/bottle-stage-ingredients.png", alt: "Chai Sắc Vóc Tuyệt Mỹ Morning Green giữa rau xanh, dưa leo và ổi tươi", name: "Sắc Vóc Tuyệt Mỹ", scale: 1 },
  { image: "/S05_NO_LAU_BEN_BI.png", background: "/s05-background.png", alt: "Chai No Lâu Bền Bỉ Morning Green giữa rau bina, cần tây, táo và chuối tươi", name: "No Lâu Bền Bỉ", scale: 1.067 },
  { image: "/S01_GONBUNGNHETENH.png", background: "/bg-s01-gon-bung-nhe-tenh.png", alt: "Chai Gọn Bụng Nhẹ Tênh Morning Green giữa rau xanh và nguyên liệu tươi", name: "Gọn Bụng Nhẹ Tênh", scale: 1.01 },
  { image: "/S02_DA_S_NG_D_NG_G_N.png", background: "/bg-s02-da-sang-dang-gon.png", alt: "Chai Da Sáng Dáng Gọn Morning Green giữa rau xanh và trái cây tươi", name: "Da Sáng Dáng Gọn", scale: 1.012 },
  { image: "/S03_THAI_DOC_THANH_LOC.png", background: "/bg-s03-thai-doc-thanh-loc.png", alt: "Chai Thải Độc Thanh Lọc Morning Green giữa cần tây, chanh và rau xanh", name: "Thải Độc Thanh Lọc", scale: 0.977 },
] as const;

const FEATURED_PRODUCTS = MENU_PRODUCTS.filter((product) => ["S01", "S03", "J01", "J03"].includes(product.code));

function LocaleSwitcher({ locale, onChange, label }: { locale: Locale; onChange: (next: Locale) => void; label: string }) {
  const localeLabels: Record<Locale, string> = { vi: "Tiếng Việt", en: "English", zh: "Tiếng Trung" };
  return (
    <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.06em] text-[#f5f1e7]" aria-label={label}>
      {LOCALE_OPTIONS.map((option, index) => (
        <span key={option.id} className="group relative flex items-center gap-2">
          {index > 0 && <span className="text-[#c9af77]/50">·</span>}
          <button type="button" aria-label={localeLabels[option.id]} aria-pressed={locale === option.id} onClick={() => onChange(option.id)} className={`transition hover:text-[#ad8e50] ${locale === option.id ? "text-[#ad8e50] underline underline-offset-4" : "opacity-80"}`}>{option.label}</button>
          {option.id === "zh" && <span role="tooltip" className="invisible pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#c9af77]/30 bg-[#f5f1e7] px-2.5 py-1.5 text-[10px] font-medium normal-case tracking-normal text-[#1f3b2c] opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">{localeLabels.zh}</span>}
        </span>
      ))}
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderHeroHeadline(locale: Locale, title: string, accent: string) {
  const accentClass = "mt-3 block max-w-[27rem] whitespace-normal text-[0.9em] leading-[1.08] text-[#c9af77] sm:mt-4";
  if (locale === "vi") {
    return <>
      <span className="block whitespace-nowrap">Hôm nay,</span>
      <em className={accentClass}>
        <span className="block whitespace-nowrap">bạn đã uống</span>
        <span className="block whitespace-nowrap font-semibold not-italic text-[#fffaf0] drop-shadow-[0_0_18px_rgba(255,250,240,0.24)]">MORNING GREEN</span>
        <span className="block whitespace-nowrap">chưa?</span>
      </em>
    </>;
  }
  return <>
    <span className="block whitespace-nowrap">{title}</span>
    <em className={accentClass}>{accent}</em>
  </>;
}


function OrderButtons({ copy }: { copy: Translations }) {
  return <ContactCtas copy={copy.contact} facebookIconLabel facebookLabelOverride={copy.contact.packagesFacebookLabel} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<"home" | "menu" | "story" | "contact">("home");
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = window.localStorage.getItem("morning-green-locale");
    return saved === "en" || saved === "zh" ? saved : "vi";
  });
  const copy = translations[locale];
  useEffect(() => {
    const updateHeaderState = () => {
      setIsHeaderCompact(window.scrollY > 40);
      const scrollPosition = window.scrollY + 180;
      const menuSection = document.getElementById("menu");
      const storySection = document.getElementById("story");
      const orderSection = document.getElementById("order");
      if (orderSection && scrollPosition >= orderSection.offsetTop) setActiveSection("contact");
      else if (storySection && scrollPosition >= storySection.offsetTop) setActiveSection("story");
      else if (menuSection && scrollPosition >= menuSection.offsetTop) setActiveSection("menu");
      else setActiveSection("home");
    };
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);
  const handleHomeNav = (id: "home" | "menu" | "story" | "contact") => {
    setActiveSection(id);
    setMenuOpen(false);
    scrollToId(id === "home" ? "top" : id === "contact" ? "order" : id);
  };
  const navItemClass = (active: boolean) => `group relative py-2 text-[#f5f1e7] transition-colors duration-[250ms] hover:text-[#c9af77] focus:outline-none focus-visible:text-[#c9af77] after:absolute after:bottom-0 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-[#c9af77] after:transition-[width] after:duration-[250ms] after:ease-out after:content-[''] ${active ? "text-[#fffaf0] after:w-full" : "after:w-0 hover:after:w-full focus-visible:after:w-full"}`;
  useEffect(() => {
    window.localStorage.setItem("morning-green-locale", locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
  }, [locale, copy]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const activeHero = HERO_SLIDES[activeHeroIndex];
  const decisionRows: Array<{ number: string; href: string; title: string; detail: string; meta: string; external: boolean; target?: "menu" }> = [
    { number: "01", href: "#menu", target: "menu", title: copy.order.discoveryTitle, detail: copy.order.discoveryDetail, meta: "", external: false },
    { number: "02", href: "/shop#morning-packages", title: copy.order.packagesTitle, detail: copy.order.packagesDetail, meta: copy.order.packagesMeta, external: false },
    { number: "03", href: FACEBOOK_LINK, title: copy.order.adviceTitle, detail: copy.order.adviceDetail, meta: "", external: true },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f1e7] text-[#1f3b2c]">
      <header className={`fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] text-[#f5f1e7] transition-[height,background-color,backdrop-filter] duration-[280ms] ease-out ${isHeaderCompact ? "h-[68px] bg-[#173527]/92 backdrop-blur-md lg:h-[72px]" : "h-[72px] bg-[#173527] lg:h-[90px]"}`}>
        <div className={`mx-auto grid h-full w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 transition-[padding] duration-[280ms] ease-out sm:px-8 lg:px-10 ${isHeaderCompact ? "lg:px-10" : "lg:px-10"}`}>
          <a
            href="/"
            className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus:ring-[#c9af77] focus:ring-offset-2 focus:ring-offset-[#173527]"
            aria-label={copy.ui.backToTop}
          >
            <img
              src="/morning-green-logo-160.png"
              alt="Morning Green"
              className={`w-auto rounded-[7px] border border-white/[0.12] object-contain transition-[height] duration-[280ms] ease-out ${isHeaderCompact ? "h-[48px] lg:h-[52px]" : "h-[52px] sm:h-[54px] lg:h-[66px]"}`}
            />
          </a>

          <nav className="hidden items-center justify-self-center gap-12 text-[14px] font-medium tracking-[0.015em] lg:flex" aria-label={copy.nav.main}>
            <button type="button" className={navItemClass(activeSection === "home")} onClick={() => handleHomeNav("home")}>{copy.nav.home}</button>
            <a href="#menu" className={navItemClass(activeSection === "menu")}>{copy.nav.products}</a>
            <a href="/story" className={`${navItemClass(activeSection === "story")} whitespace-nowrap`}>{copy.nav.story}</a>
            <button type="button" className={navItemClass(activeSection === "contact")} onClick={() => handleHomeNav("contact")}>{copy.nav.contact}</button>
          </nav>

          <div className="hidden items-center justify-self-end lg:flex">
            <LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} />
          </div>

          <div className="flex items-center justify-self-end gap-3 lg:hidden">
            <LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-[#f5f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77]"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-site-menu"
            >
              {menuOpen ? <X size={20} strokeWidth={1.4} /> : <span className="space-y-1.5"><span className="block h-px w-5 bg-[#f5f1e7]" /><span className="block h-px w-5 bg-[#f5f1e7]" /></span>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="mobile-site-menu" className="border-t border-white/[0.08] bg-[#173527] px-5 pb-7 pt-4 shadow-[0_18px_30px_rgba(5,36,25,0.18)] lg:hidden">
            <div className="grid gap-1 text-[1.05rem] font-medium text-[#f5f1e7]">
              {[['home', copy.nav.home], ['menu', copy.nav.products], ['story', copy.nav.story], ['contact', copy.nav.contact]].map(([id, label]) => (
                <button key={id} type="button" className={`flex items-center justify-between border-b border-white/[0.08] px-1 py-4 text-left transition-colors duration-[250ms] hover:text-[#c9af77] focus:outline-none focus-visible:text-[#c9af77] ${activeSection === id ? "text-[#c9af77]" : ""}`} onClick={() => { if (id === "story") { setMenuOpen(false); setActiveSection("story"); window.location.href = "/story"; } else if (id === "menu") { setMenuOpen(false); window.location.hash = "menu"; } else handleHomeNav(id as "home" | "menu" | "contact"); }}>
                  <span>{label}</span>{activeSection === id && <span className="h-px w-8 bg-[#c9af77]" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-5"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a7c19d]">{copy.localeName}</span><LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} /></div>
          </div>
        )}
      </header>

      <section id="top" className="relative min-h-[760px] overflow-hidden bg-[#173527] pt-32 text-[#f5f1e7] lg:min-h-[850px]">
        <div className="absolute -right-28 top-36 h-[390px] w-[390px] rounded-full border border-[#c8b27d]/10" />
        <div className="absolute -right-8 top-48 h-[315px] w-[315px] rounded-full border border-[#c8b27d]/[0.07]" />
        <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#f5f1e7] to-transparent opacity-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="order-2 relative z-10 min-w-0 max-w-[30rem] lg:order-1 lg:max-w-[28rem] lg:pr-10">
            <div className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.27em] text-[#c9af77]">{copy.hero.eyebrow}</div>
            <h1 className="hero-heading max-w-[30rem] text-[clamp(2.75rem,8vw,3.35rem)] font-medium leading-[1.02] tracking-[-0.012em] text-[#f6f0e2] sm:text-[clamp(3.1rem,3.8vw,3.95rem)] sm:leading-[1.02]">{renderHeroHeadline(locale, copy.hero.title, copy.hero.titleAccent)}</h1>
            <p className="mt-6 max-w-[28rem] text-[15px] leading-7 text-[#d9ddcf] sm:text-base">{copy.hero.body}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <button onClick={() => scrollToId("discovery")} className="inline-flex items-center gap-2 rounded-[12px] bg-[#c9af77] px-6 py-3.5 text-[13px] font-semibold text-[#173527] transition hover:-translate-y-0.5 hover:bg-[#dec99a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#173527]">{copy.discovery.cta} <ArrowDown size={14} /></button>
              <a href="/story" className="inline-flex items-center gap-2 rounded-[12px] border border-white/25 px-6 py-3.5 text-[13px] font-semibold text-[#f5f1e7] transition hover:border-[#c9af77] hover:text-[#c9af77]">{copy.hero.why} <ChevronRight size={14} /></a>
            </div>

          </div>
          <div className="order-1 relative min-h-[480px] lg:order-2 lg:min-h-[620px]">
            <div aria-label={`${copy.hero.slideLabel}: ${activeHero.name}`} className="absolute inset-x-6 top-0 h-[430px] overflow-hidden rounded-[45%_45%_18%_18%] bg-[#efe8d7] shadow-[0_22px_60px_rgba(5,36,25,0.22)] lg:inset-x-16 lg:h-[560px]">
              {HERO_SLIDES.map((slide, index) => (
                <div key={`${slide.name}-background`} aria-hidden="true" className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-in-out ${index === activeHeroIndex ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(247,242,224,0.08), rgba(247,242,224,0.08)), url('${slide.background}')` }} />
              ))}
              {HERO_SLIDES.map((slide, index) => (
                <img key={slide.name} src={slide.image} alt={slide.alt} style={{ transform: `scale(${slide.scale})`, transformOrigin: "50% 100%" }} className={`absolute inset-0 z-20 h-full w-full object-contain object-bottom drop-shadow-[0_24px_18px_rgba(5,36,25,0.28)] transition-opacity duration-[1400ms] ease-in-out ${index === activeHeroIndex ? "opacity-100" : "opacity-0"}`} />
              ))}
              <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-[#173527]/30 via-transparent to-transparent" />
            </div>
            <span className="absolute right-2 top-14 hidden rotate-90 text-[9px] uppercase tracking-[0.22em] text-[#c9af77]/50 sm:block">Freshness · Refined · Daily</span>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1f3b2c]/10 bg-[#f5f1e7] py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d6a59] sm:px-8 lg:px-12">
          <span>{copy.hero.qualities[0]}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c9af77] sm:block" />
          <span>{copy.hero.qualities[1]}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#c9af77] sm:block" />
          <span>{copy.hero.qualities[2]}</span>
        </div>
      </section>

      <section id="menu" className="relative scroll-mt-28 overflow-hidden bg-[#f5f1e7] px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-12 lg:pb-10 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 pb-10 lg:flex-row lg:items-end lg:pb-14">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ad8e50]">{copy.menu.featuredEyebrow}</p>
              <h2 className="max-w-2xl font-serif text-[clamp(2.5rem,5vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.035em] text-[#1f3b2c]">{copy.menu.featuredTitle}</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#697363]">{copy.menu.featuredSupporting}</p>
            </div>
            <span className="hidden max-w-[170px] font-serif text-2xl leading-tight text-[#1f3b2c] lg:block">Freshness,<br /><em className="text-[#ad8e50]">Refined.</em></span>
          </div>
          <div className="grid gap-x-8 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <Link key={product.code} href={`/shop/${product.code.toLowerCase()}`} className="shop-card group relative block border-b border-[#1f3b2c]/14 pb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f1e7]">
                <div className="relative h-[360px] overflow-hidden rounded-[12px] bg-[#e8ead9] sm:h-[410px]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#173527]/12 via-transparent to-transparent" />
                  <div className="shop-bottle-image absolute inset-x-0 bottom-0 z-20 flex h-[350px] items-end justify-center sm:h-[400px]" style={{ transform: `scale(${product.scale})`, transformOrigin: "50% 100%" }}><img src={product.image} alt={`Chai ${product.name} Morning Green`} className="h-[340px] w-[250px] object-contain object-bottom drop-shadow-[0_22px_16px_rgba(5,36,25,0.16)] sm:h-[390px] sm:w-[280px]" /></div>
                  <span className="shop-hover-cta pointer-events-none absolute bottom-4 left-4 z-40 inline-flex translate-y-2 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c]">{copy.action.viewDetails} <ChevronRight size={13} /></span>
                </div>
                <div className="pt-4"><h3 className="font-serif text-[20px] font-medium leading-[1.15] tracking-[-0.018em] text-[#1f3b2c]">{product.name}</h3><p className="mt-1 text-[12px] font-medium text-[#526151]">{ENGLISH_PRODUCT_NAMES[product.code]}</p><p className="mt-2 text-[11px] font-medium leading-5 tracking-[0.015em] text-[#ad8e50]">{localizedDescriptor(product.ingredients, locale)}</p></div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><a href="/shop" className="inline-flex items-center gap-2 border-b border-[#ad8e50] pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c] transition hover:text-[#ad8e50]">{copy.menu.viewAll} <ChevronRight size={14} /></a></div>
        </div>
      </section>
      <section id="discovery" className="scroll-mt-28 bg-[#1f3b2c] px-5 py-24 text-[#f5f1e7] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9af77]">{copy.discovery.eyebrow}</p><h2 className="max-w-xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] sm:text-5xl">{copy.discovery.title}<br /><em className="text-[#c9af77]">{copy.discovery.titleAccent}</em></h2><p className="mt-7 max-w-lg text-[15px] leading-7 text-[#d0d8ca] sm:text-base">{copy.discovery.body}</p><div className="mt-8 flex flex-wrap items-center gap-5"><OrderButtons copy={copy} /><span className="text-xs text-[#b8c7b5]">{copy.discovery.note}</span></div></div>
          <Link href="/shop#morning-packages" aria-label={`${copy.discovery.cta} — ${copy.menu.packagesCollection}`} className="group relative mx-auto block w-full max-w-md"><div className="absolute -inset-5 rounded-[35px] border border-[#c9af77]/20 transition group-hover:border-[#c9af77]/45" /><div className="relative rounded-[28px] bg-[#f5f1e7] p-5 text-[#1f3b2c] shadow-2xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_48px_rgba(5,36,25,0.24)]"><div className="flex items-center justify-between border-b border-[#1f3b2c]/10 pb-4"><span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ad8e50]">{copy.menu.packagesCollection}</span><span className="text-xs text-[#65735f]">{copy.order.packagesMeta}</span></div><div className="grid grid-cols-2 gap-2 py-5"><div className="overflow-hidden rounded-[14px] bg-white"><img src="/morning-package-2-bottles.png" alt={locale === "vi" ? "Gói Morning Green 2 chai mỗi ngày" : locale === "en" ? "Morning Green package with two bottles per day" : "每天两瓶的 Morning Green 套餐"} className="aspect-[3/2] h-full w-full object-contain" loading="lazy" /></div><div className="overflow-hidden rounded-[14px] bg-white"><img src="/morning-package-3-bottles.png" alt={locale === "vi" ? "Gói Morning Green 3 chai mỗi ngày" : locale === "en" ? "Morning Green package with three bottles per day" : "每天三瓶的 Morning Green 套餐"} className="aspect-[3/2] h-full w-full object-contain" loading="lazy" /></div><div className="overflow-hidden rounded-[14px] bg-white"><img src="/morning-package-5-bottles.png" alt={locale === "vi" ? "Gói Morning Green 5 chai" : locale === "en" ? "Morning Green package with five bottles" : "五瓶 Morning Green 套餐"} className="aspect-[3/2] h-full w-full object-contain" loading="lazy" /></div><div className="overflow-hidden rounded-[14px] bg-white"><img src="/morning-package-6-bottles.png" alt={locale === "vi" ? "Gói Morning Green 6 chai" : locale === "en" ? "Morning Green package with six bottles" : "六瓶 Morning Green 套餐"} className="aspect-[3/2] h-full w-full object-contain" loading="lazy" /></div></div><div className="border-t border-[#1f3b2c]/10 pt-4"><div className="font-serif text-2xl font-medium">{copy.menu.packagesCollection}</div><div className="mt-1 text-xs text-[#697363]">{copy.discovery.note}</div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#1f3b2c]/10 pt-3"><p className="max-w-[18rem] text-[10px] leading-4 text-[#697363]">{copy.menu.packageDisclaimer}</p><span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c]">{copy.discovery.cta}<ChevronRight size={14} strokeWidth={1.7} /></span></div></div></Link>
        </div>
      </section>

      <section id="story" className="relative scroll-mt-28 overflow-hidden bg-[#1f3b2c] px-5 py-24 text-[#f5f1e7] sm:px-8 lg:px-12 lg:py-32">
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9af77]">{copy.story.eyebrow}</p><h2 className="max-w-xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] sm:text-5xl">{copy.story.title}<br /><em className="whitespace-pre-line text-[#c9af77]">{copy.story.titleAccent}</em></h2></div>
          <div className="max-w-lg"><p className="text-[15px] leading-8 text-[#cbd4c4]">{copy.story.body}</p><a href="/story" className="mt-8 inline-flex items-center gap-2 border-b border-[#c9af77] pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f5f1e7] transition hover:text-[#c9af77]">{copy.ui.readStory} <ChevronRight size={14} /></a></div>
        </div>
      </section>
      <section id="order" className="scroll-mt-28 bg-white px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-[32rem] pt-1 lg:pt-3">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1f3b2c]/65">{copy.order.eyebrow}</p>
            <h2 className="max-w-xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#173527] sm:text-5xl">{copy.order.title}</h2>
            <p className="mt-7 max-w-lg text-[15px] leading-8 text-[#354a38]">{copy.order.body}</p>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1f3b2c]/60">{copy.order.meta}</p>
          </div>
          <div className="rounded-[22px] bg-[#f5f1e7] p-5 shadow-[0_10px_26px_rgba(31,59,44,0.08)] sm:p-6">
            <div className="mb-1 border-b border-[#1f3b2c]/10 pb-4">
              <div className="font-serif text-2xl font-medium text-[#1f3b2c] sm:text-3xl">{copy.order.cardTitle}</div>
              <div className="mt-1 text-[13px] text-[#697363]">{copy.order.cardHelper}</div>
            </div>
            <div className="grid gap-2">
              {decisionRows.map((row) => {
                const rowContent = (
                  <>
                    <span className="w-8 shrink-0 font-serif text-[15px] text-[#ad8e50] transition-colors duration-200 group-hover:text-[#1f3b2c]">{row.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-[#1f3b2c]">{row.title}</span>
                      <span className="mt-1 block text-[12px] leading-5 text-[#697363]">{row.detail}</span>
                      {row.meta && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ad8e50]">{row.meta}</span>}
                    </span>
                    <ChevronRight size={17} strokeWidth={1.7} className="shrink-0 text-[#ad8e50] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                );
                const rowClassName = "group flex w-full min-h-[76px] items-center justify-start gap-3 rounded-[12px] border border-[#1f3b2c]/10 bg-transparent px-3 py-3 text-left transition-colors duration-200 hover:border-[#ad8e50]/40 hover:bg-[#1f3b2c]/[0.035] focus:outline-none focus-visible:border-[#ad8e50] focus-visible:bg-[#1f3b2c]/[0.06] focus-visible:ring-2 focus-visible:ring-[#ad8e50] focus-visible:ring-inset";
                if (row.target) return <button key={row.number} type="button" onClick={() => scrollToId(row.target!)} aria-label={`${row.title} — ${row.detail}`} className={rowClassName}>{rowContent}</button>;
                return row.external ? <a key={row.number} href={row.href} target="_blank" rel="noreferrer" aria-label={`${row.title} — ${row.detail}`} className={rowClassName}>{rowContent}</a> : <Link key={row.number} href={row.href} aria-label={`${row.title} — ${row.detail}`} className={rowClassName}>{rowContent}</Link>;
              })}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter copy={copy} />
      <BackToTopButton label={copy.ui.backToTop} />
    </main>
  );
}
