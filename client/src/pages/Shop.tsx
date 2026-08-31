import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Plus, Send } from "lucide-react";
import { Link } from "wouter";
import { BackToTopButton } from "../components/BackToTopButton";
import { LOCALE_OPTIONS, translations, type Locale } from "../i18n";
import { FACEBOOK_LINK, optimizedAsset } from "@shared/morningGreen";
import { ENGLISH_PRODUCT_NAMES, MENU_PRODUCTS, MORNING_PACKAGES, localizedDescriptor, localizedPackageFormat, localizedPackageName, localizedProductName, priceForProduct } from "../lib/morningGreenCatalog";

type MenuSort = "featured" | "nameAsc" | "nameDesc";
type ProductType = "all" | "smoothie" | "juice";
type CollectionTab = "drinks" | "packages";
type PackageDay = "all" | "1" | "3" | "5" | "7" | "14";

type ShopBottleCalibration = { visibleHeight: number; bottomPad: number };

// The PNG canvases are identical, but each bottle occupies a different visible height inside it.
// S01 (Gọn Bụng Nhẹ Tênh) is the reference; the image is enlarged and clipped in CSS only.
const SHOP_BOTTLE_CALIBRATION: Record<string, ShopBottleCalibration> = {
  S01: { visibleHeight: 1277, bottomPad: 58 },
  S02: { visibleHeight: 1275, bottomPad: 53 },
  S03: { visibleHeight: 1322, bottomPad: 52 },
  S04: { visibleHeight: 1327, bottomPad: 79 },
  S05: { visibleHeight: 1210, bottomPad: 64 },
  S06: { visibleHeight: 1271, bottomPad: 80 },
  S07: { visibleHeight: 1377, bottomPad: 19 },
  S08: { visibleHeight: 1241, bottomPad: 46 },
  S09: { visibleHeight: 1245, bottomPad: 46 },
  S10: { visibleHeight: 1228, bottomPad: 77 },
  S11: { visibleHeight: 1299, bottomPad: 28 },
  S12: { visibleHeight: 1276, bottomPad: 40 },
  J01: { visibleHeight: 1214, bottomPad: 65 },
  J02: { visibleHeight: 1203, bottomPad: 88 },
  J03: { visibleHeight: 1253, bottomPad: 47 },
  J04: { visibleHeight: 1271, bottomPad: 53 },
  J05: { visibleHeight: 1291, bottomPad: 60 },
  J06: { visibleHeight: 1302, bottomPad: 36 },
  J07: { visibleHeight: 1253, bottomPad: 78 },
};

function getShopBottleStyle(code: string): React.CSSProperties {
  const calibration = SHOP_BOTTLE_CALIBRATION[code] ?? { visibleHeight: 1277, bottomPad: 58 };
  const imageHeightRatio = (1448 * 365) / (calibration.visibleHeight * 380);
  return {
    height: `${imageHeightRatio * 100}%`,
    marginBottom: `-${Math.round(calibration.bottomPad * 365 / calibration.visibleHeight)}px`,
    width: "auto",
    maxWidth: "none",
  };
}

function LocaleSwitcher({ locale, onChange }: { locale: Locale; onChange: (next: Locale) => void }) {
  const labels: Record<Locale, string> = { vi: "Tiếng Việt", en: "English", zh: "Tiếng Trung" };
  return <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.06em] text-[#1f3b2c]" aria-label="Language selector">{LOCALE_OPTIONS.map((option, index) => <span key={option.id} className="flex items-center gap-2">{index > 0 && <span className="text-[#ad8e50]/50">·</span>}<button type="button" aria-label={labels[option.id]} aria-pressed={locale === option.id} onClick={() => onChange(option.id)} className={`transition hover:text-[#ad8e50] ${locale === option.id ? "text-[#ad8e50] underline underline-offset-4" : "opacity-65"}`}>{option.label}</button></span>)}</div>;
}

export default function Shop() {
  const [locale, setLocale] = useState<Locale>(() => { const saved = window.localStorage.getItem("morning-green-locale"); return saved === "en" || saved === "zh" ? saved : "vi"; });
  const copy = translations[locale];
  const [productType, setProductType] = useState<ProductType>("all");
  const [sort, setSort] = useState<MenuSort>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [collectionTab, setCollectionTab] = useState<CollectionTab>("drinks");
  const [packageDay, setPackageDay] = useState<PackageDay>("all");

  useEffect(() => { window.localStorage.setItem("morning-green-locale", locale); document.documentElement.lang = locale === "zh" ? "zh-CN" : locale; document.title = copy.meta.title; document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description); }, [locale, copy]);
  useEffect(() => {
    if (window.location.hash !== "#morning-packages") return;
    const timer = window.setTimeout(() => document.getElementById("morning-packages")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!sortOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSortOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sortOpen]);

  const filteredProducts = useMemo(() => MENU_PRODUCTS.filter((product) => productType === "all" || product.category === productType).sort((a, b) => {
    if (sort === "nameAsc") return a.name.localeCompare(b.name, "vi");
    if (sort === "nameDesc") return b.name.localeCompare(a.name, "vi");
    return 0;
  }), [productType, sort]);
  const sortLabels: Record<MenuSort, string> = { featured: copy.menu.featured, nameAsc: copy.menu.nameAsc, nameDesc: copy.menu.nameDesc };
  const sortPrefix = copy.menu.sortBy;
  const scrollToSection = (id: "chai-rieng" | "morning-packages", tab: CollectionTab) => {
    setCollectionTab(tab);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const packageDayOptions: Array<{ value: PackageDay; label: string }> = ["all", "1", "3", "5", "7", "14"].map((value, index) => ({ value: value as PackageDay, label: copy.menu.packageDays[index] }));
  const visiblePackages = useMemo(() => [...(packageDay === "all" ? MORNING_PACKAGES : MORNING_PACKAGES.filter((packageItem) => packageItem.name.startsWith(`Gói ${packageDay} Ngày`)))].sort((a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, ""))), [packageDay]);
  const packageVisuals: Record<string, { src: string }> = {
    MP01: { src: "/morning-package-5-bottles.png" },
    MP02: { src: "/morning-package-6-bottles.png" },
    MP03: { src: "/morning-package-5-bottles.png" },
    MP04: { src: "/morning-package-5-bottles.png" },
    MP05: { src: "/morning-package-5-bottles.png" },
    MP06: { src: "/morning-package-5-bottles.png" },
    MP07: { src: "/morning-package-2-bottles.png" },
    MP08: { src: "/morning-package-2-bottles.png" },
    MP09: { src: "/morning-package-3-bottles.png" },
    MP10: { src: "/morning-package-3-bottles.png" },
  };

  return <main className="min-h-screen bg-[#f5f1e7] text-[#1f3b2c]">
    <header className="border-b border-[#1f3b2c]/10 bg-[#f5f1e7] px-5 py-4 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5"><a href="/" className="flex items-center gap-3"><img src={optimizedAsset("/morning-green-logo-160.png")} alt="Morning Green" decoding="async" className="h-12 w-12 rounded-[3px] object-contain" /><span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-[#697363] sm:block">{copy.ui.shopLabel}</span></a><div className="flex items-center gap-5"><LocaleSwitcher locale={locale} onChange={setLocale} /><Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c] transition hover:text-[#ad8e50]">{copy.ui.shopBackHome}</Link></div></div></header>
    <section id="chai-rieng" className="scroll-mt-8 px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ad8e50]">{copy.menu.eyebrow}</p><h1 className="font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-normal leading-[0.96] tracking-[-0.04em]">{copy.menu.shopTitle}</h1><p className="mt-5 max-w-xl text-[15px] leading-7 text-[#697363]">{copy.menu.shopSupporting}</p><p className="mt-2 max-w-xl text-[13px] italic leading-6 text-[#697363]">{copy.menu.shopTagline}</p></div>
      <nav className="mt-12 flex flex-wrap items-center gap-2 border-y border-[#1f3b2c]/14 py-3" aria-label={`${copy.menu.selectionCollection} / ${copy.menu.packagesCollection}`}>
        <button type="button" aria-current={collectionTab === "drinks" ? "page" : undefined} onClick={() => scrollToSection("chai-rieng", "drinks")} className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] ${collectionTab === "drinks" ? "bg-[#1f3b2c] text-[#f5f1e7]" : "text-[#697363] hover:text-[#1f3b2c]"}`}>{copy.menu.selectionCollection}<span className="ml-2 opacity-70">{MENU_PRODUCTS.length}</span></button>
        <button type="button" aria-current={collectionTab === "packages" ? "page" : undefined} onClick={() => scrollToSection("morning-packages", "packages")} className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] ${collectionTab === "packages" ? "bg-[#1f3b2c] text-[#f5f1e7]" : "text-[#ad8e50] hover:bg-[#eee6d4]"}`}>{copy.menu.packagesCollection}<span className="ml-2 opacity-70">{MORNING_PACKAGES.length}</span></button>
      </nav>
      <div className="mt-8 flex flex-col gap-5 border-b border-[#1f3b2c]/14 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ad8e50]">{copy.menu.selectionCollection}</p>
          <div role="radiogroup" aria-label={copy.menu.productType} className="mt-3 flex flex-wrap gap-2">
            {([['all', copy.menu.all], ['smoothie', copy.menu.smoothie], ['juice', copy.menu.juice]] as const).map(([value, label]) => {
              const selected = productType === value;
              return <button key={value} type="button" role="radio" aria-checked={selected} onClick={() => { setProductType(value); setCollectionTab("drinks"); }} className={`min-h-10 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] focus-visible:ring-offset-2 ${selected ? "border-[#1f3b2c] bg-[#1f3b2c] text-[#f5f1e7]" : "border-[#1f3b2c]/15 bg-transparent text-[#48634c] hover:border-[#1f3b2c]/50 hover:bg-[#fbf8f0]"}`}>{label}</button>;
            })}
          </div>
        </div>
        <div className="relative shrink-0 self-start lg:self-end">
          <button type="button" aria-haspopup="listbox" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)} className="inline-flex min-h-10 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c] transition hover:text-[#ad8e50] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50]">{sortPrefix}: <span className="text-[#697363]">{sortLabels[sort]}</span><ChevronDown size={14} strokeWidth={1.7} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} /></button>
          {sortOpen && <div role="listbox" aria-label={sortPrefix} className="absolute right-0 top-full z-30 mt-2 min-w-[180px] rounded-[14px] border border-[#1f3b2c]/12 bg-[#f5f1e7] p-1.5 shadow-[0_14px_30px_rgba(23,53,39,0.14)]">{(Object.entries(sortLabels) as [MenuSort, string][]).map(([value, label]) => <button key={value} type="button" role="option" aria-selected={sort === value} onClick={() => { setSort(value); setSortOpen(false); }} className={`flex w-full items-center justify-between rounded-[9px] px-3 py-2.5 text-left text-[12px] transition ${sort === value ? "bg-[#eee6d4] font-semibold text-[#1f3b2c]" : "text-[#697363] hover:bg-[#fbf8f0]"}`}>{label}{sort === value && <span className="h-1.5 w-1.5 rounded-full bg-[#1f3b2c]" aria-hidden="true" />}</button>)}</div>}
        </div>
      </div>
      <div className="grid gap-x-8 gap-y-14 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredProducts.map((product) => <Link key={product.code} href={`/shop/${product.code.toLowerCase()}`} className="shop-card group relative block border-b border-[#1f3b2c]/14 pb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f1e7]"><div className="relative h-[350px] overflow-hidden rounded-[12px] bg-[#e8ead9] sm:h-[390px]"><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#173527]/12 via-transparent to-transparent" /><div className="shop-bottle-image absolute inset-x-0 bottom-0 z-20 flex h-[340px] items-end justify-center sm:h-[380px]"><img src={optimizedAsset(product.image)} alt={`${localizedProductName(product, locale)} — Morning Green`} className="h-auto w-auto max-w-none object-contain object-bottom drop-shadow-[0_22px_16px_rgba(5,36,25,0.16)]" style={getShopBottleStyle(product.code)} loading="lazy" decoding="async" fetchPriority="low" /></div><span className="shop-hover-cta pointer-events-none absolute bottom-4 left-4 z-40 inline-flex translate-y-2 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c]">{copy.action.viewDetails} <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#1f3b2c]/35"><Plus size={11} strokeWidth={1.5} /></span></span></div><div className="pt-4"><h2 className="font-serif text-[19px] font-medium leading-[1.15] tracking-[-0.018em] text-[#1f3b2c]">{localizedProductName(product, locale)}</h2><p className="mt-1 text-[12px] font-medium text-[#526151]">{locale === "vi" ? ENGLISH_PRODUCT_NAMES[product.code] : product.name}</p><p className="mt-2 text-[13px] font-semibold text-[#1f3b2c]">{copy.menu.price}: {priceForProduct(product)}</p><p className="mt-1 text-[11px] font-medium leading-5 tracking-[0.015em] text-[#ad8e50]">{localizedDescriptor(product.ingredients, locale)}</p></div></Link>)}</div>{filteredProducts.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-[#1f3b2c]/20 px-6 py-12 text-center text-sm text-[#697363]">{copy.menu.noResults}</div>}</div></section>
    <section id="morning-packages" className="scroll-mt-8 border-t border-[#1f3b2c]/14 bg-[#e8e4d7] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="morning-packages-title" data-collection="MORNING GREEN PACKAGES"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 border-b border-[#1f3b2c]/14 pb-8 lg:flex-row lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ad8e50]">{copy.menu.packagesCollection}</p><h2 id="morning-packages-title" className="mt-4 max-w-2xl font-serif text-[clamp(2.2rem,4.5vw,4.1rem)] font-normal leading-[1] tracking-[-0.035em] text-[#1f3b2c]">{copy.menu.packagesTitle}</h2></div><div className="max-w-sm"><p className="text-[14px] leading-7 text-[#697363]">{copy.menu.packagesBody}</p><button type="button" onClick={() => scrollToSection("chai-rieng", "drinks")} className="mt-5 inline-flex items-center rounded-full border border-[#1f3b2c]/20 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f3b2c] transition hover:border-[#ad8e50] hover:text-[#ad8e50] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50]">{copy.menu.packageBackSelection}</button></div></div><div className="mt-8 border-y border-[#1f3b2c]/10 py-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={copy.menu.packageFilterAria}>{packageDayOptions.map((option) => <button key={option.value} type="button" role="radio" aria-checked={packageDay === option.value} onClick={() => { setPackageDay(option.value); setCollectionTab("packages"); }} className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] ${packageDay === option.value ? "border-[#1f3b2c] bg-[#1f3b2c] text-[#f5f1e7]" : "border-[#1f3b2c]/15 text-[#697363] hover:border-[#ad8e50] hover:text-[#1f3b2c]"}`}>{option.label}</button>)}</div></div></div><div className="mt-12 grid gap-x-14 lg:grid-cols-2">{visiblePackages.map((packageItem) => { const visual = packageVisuals[packageItem.code]; return <article key={packageItem.code} className="overflow-hidden rounded-[18px] border border-[#1f3b2c]/12 bg-[#f5f1e7] shadow-[0_10px_24px_rgba(23,53,39,0.05)]"><div className="aspect-[3/2] overflow-hidden bg-white"><img src={optimizedAsset(visual.src)} alt={`${localizedPackageName(packageItem, locale)} — ${localizedPackageFormat(packageItem, locale)}`} className="h-full w-full object-contain object-center" loading="lazy" decoding="async" fetchPriority="low" /></div><div className="min-h-[156px] p-6"><div className="flex items-start justify-between gap-4"><span className="font-serif text-2xl text-[#ad8e50]/80">{packageItem.code.slice(2)}</span><span className="shrink-0 whitespace-nowrap pt-1 font-serif text-[18px] text-[#1f3b2c]">{packageItem.price}</span></div><h3 className="mt-5 font-serif text-[clamp(1.2rem,2.2vw,1.65rem)] leading-[1.12] tracking-[-0.015em] text-[#1f3b2c]">{localizedPackageName(packageItem, locale)}</h3><div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-[#1f3b2c]/10 pt-4"><span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#ad8e50]">{copy.menu.packageFormat}</span><p className="text-[13px] font-medium leading-6 text-[#697363]">{localizedPackageFormat(packageItem, locale)}</p></div><a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f3b2c] transition hover:text-[#ad8e50] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8e50] focus-visible:ring-offset-2"><Send size={14} strokeWidth={1.6} />{copy.menu.packageAdvice}</a></div></article>; })}</div></div></section>
    <BackToTopButton label={copy.ui.backToTop} />
  </main>;
}
