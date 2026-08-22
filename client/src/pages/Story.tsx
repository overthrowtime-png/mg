import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter } from "../components/SiteFooter";
import { BackToTopButton } from "../components/BackToTopButton";
import { LOCALE_OPTIONS, translations, type Locale } from "../i18n";

type StoryLocale = Locale;

function LocaleSwitcher({ locale, onChange, label }: { locale: StoryLocale; onChange: (next: StoryLocale) => void; label: string }) {
  const labels: Record<StoryLocale, string> = { vi: "Tiếng Việt", en: "English", zh: "Tiếng Trung" };
  return <div className="flex items-center gap-2 story-locale text-[#f5f1e7]" aria-label={label}>{LOCALE_OPTIONS.map((option, index) => <span key={option.id} className="flex items-center gap-2">{index > 0 && <span className="text-[#c9af77]/60">·</span>}<button type="button" aria-label={labels[option.id]} aria-pressed={locale === option.id} onClick={() => onChange(option.id)} className={`transition hover:text-[#c9af77] ${locale === option.id ? "text-[#c9af77] underline underline-offset-4" : "opacity-70"}`}>{option.label}</button></span>)}</div>;
}

function renderBeliefTitle(locale: Locale, title: string) {
  if (locale !== "vi") return title;
  const phrase = "không cần bắt đầu";
  const phraseStart = title.indexOf(phrase);
  if (phraseStart < 0) return title;
  return <>{title.slice(0, phraseStart)}<span className="whitespace-nowrap">{phrase}</span>{title.slice(phraseStart + phrase.length)}</>;
}

function renderBeliefBody(locale: Locale, body: string) {
  if (locale !== "vi") return body;
  return <>
    <span className="whitespace-nowrap">chỉ cần bắt đầu bằng</span>{" "}<br className="hidden lg:block" />
    <span className="whitespace-nowrap">một lựa chọn đủ ngon</span>{" "}<br className="hidden lg:block" />
    <span className="whitespace-nowrap">để muốn tiếp tục,</span>{" "}<br className="hidden lg:block" />
    <span className="whitespace-nowrap">đủ dễ để duy trì.</span>
  </>;
}

export default function Story() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => { const saved = window.localStorage.getItem("morning-green-locale"); return saved === "en" || saved === "zh" ? saved : "vi"; });
  const copy = translations[locale];
  const story = copy.storyPage;
  useEffect(() => {
    const updateHeaderState = () => setIsHeaderCompact(window.scrollY > 40);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);
  const navItemClass = (active: boolean) => `group relative py-2 text-[#f5f1e7] transition-colors duration-[250ms] hover:text-[#c9af77] focus:outline-none focus-visible:text-[#c9af77] after:absolute after:bottom-0 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-[#c9af77] after:transition-[width] after:duration-[250ms] after:ease-out after:content-[''] ${active ? "text-[#fffaf0] after:w-full" : "after:w-0 hover:after:w-full focus-visible:after:w-full"}`;
  useEffect(() => { window.localStorage.setItem("morning-green-locale", locale); document.documentElement.lang = locale === "zh" ? "zh-CN" : locale; document.title = copy.meta.title; document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description); }, [locale, copy]);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { nodes.forEach((node) => node.classList.add("story-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("story-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [locale]);

  return <main className="story-page min-h-screen overflow-x-hidden bg-[#f5f1e7] text-[#1f3b2c]">
    <header className={`story-site-header fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] text-[#f5f1e7] transition-[height,background-color,backdrop-filter] duration-[280ms] ease-out ${isHeaderCompact ? "h-[68px] bg-[#173527]/92 backdrop-blur-md lg:h-[72px]" : "h-[72px] bg-[#173527] lg:h-[90px]"}`}>
      <div className="mx-auto grid h-full w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 sm:px-8 lg:px-10">
        <a href="/" className="group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus:ring-[#c9af77] focus:ring-offset-2 focus:ring-offset-[#173527]">
          <img src="/morning-green-logo-160.png" alt="Morning Green" className={`w-auto rounded-[7px] border border-white/[0.12] object-contain transition-[height] duration-[280ms] ease-out ${isHeaderCompact ? "h-[48px] lg:h-[56px]" : "h-[52px] sm:h-[54px] lg:h-[72px]"}`} />
        </a>
        <nav className="hidden items-center justify-self-center gap-12 story-nav lg:flex" aria-label={copy.ui.storyNavigation}>
          <Link href="/" className={`${navItemClass(false)} whitespace-nowrap`}>{copy.nav.home}</Link>
          <a href="/#menu" className={`${navItemClass(false)} whitespace-nowrap`}>{copy.nav.products}</a>
          <span className={`${navItemClass(true)} whitespace-nowrap`} aria-current="page">{copy.nav.story}</span>
          <Link href="/#order" className={`${navItemClass(false)} whitespace-nowrap`}>{copy.nav.contact}</Link>
        </nav>
        <div className="hidden items-center justify-self-end lg:flex"><LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} /></div>
        <div className="flex items-center justify-self-end gap-3 lg:hidden">
          <LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} />
          <button type="button" className="grid h-10 w-10 place-items-center text-[#f5f1e7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77]" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu} aria-expanded={menuOpen} aria-controls="story-mobile-site-menu">
            {menuOpen ? <span className="text-xl leading-none">×</span> : <span className="space-y-1.5"><span className="block h-px w-5 bg-[#f5f1e7]" /><span className="block h-px w-5 bg-[#f5f1e7]" /></span>}
          </button>
        </div>
      </div>
      {menuOpen && <div id="story-mobile-site-menu" className="border-t border-white/[0.08] bg-[#173527] px-5 pb-7 pt-4 shadow-[0_18px_30px_rgba(5,36,25,0.18)] lg:hidden"><div className="grid gap-1 story-mobile-nav text-[#f5f1e7]"><Link href="/" className="border-b border-white/[0.08] px-1 py-4 transition-colors duration-[250ms] hover:text-[#c9af77]" onClick={() => setMenuOpen(false)}>{copy.nav.home}</Link><a href="/#menu" className="border-b border-white/[0.08] px-1 py-4 transition-colors duration-[250ms] hover:text-[#c9af77]" onClick={() => setMenuOpen(false)}>{copy.nav.products}</a><span className="flex items-center justify-between border-b border-white/[0.08] px-1 py-4 text-[#c9af77]">{copy.nav.story}<span className="h-px w-8 bg-[#c9af77]" aria-hidden="true" /></span><Link href="/#order" className="border-b border-white/[0.08] px-1 py-4 transition-colors duration-[250ms] hover:text-[#c9af77]" onClick={() => setMenuOpen(false)}>{copy.nav.contact}</Link></div><div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-5"><span className="story-label text-[#a7c19d]">{copy.localeName}</span><LocaleSwitcher locale={locale} onChange={setLocale} label={copy.ui.languageSelector} /></div></div>}
    </header>

    <section className="story-hero relative flex min-h-[85svh] items-end overflow-hidden bg-[#173527] text-[#f5f1e7] lg:min-h-[82vh]">
      <div className="absolute inset-0 bg-[#173527]" aria-hidden="true" />
      <div className="story-hero-art absolute inset-0 bg-cover opacity-80 lg:opacity-100" style={{ backgroundImage: "url('/story-hero-user-composite.png')" }} aria-hidden="true" />
      <div className="story-hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#173527]/50 via-transparent to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex" aria-hidden="true">
        <span className="font-serif text-[clamp(2.8rem,5.6vw,5.6rem)] font-normal leading-none text-[#a7c19d]/10">01</span>
        <span className="h-48 w-px bg-[#c9af77]/35" />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:grid-cols-[minmax(0,620px)_1fr] lg:items-end lg:px-12 lg:pb-20 lg:pt-32">
        <div className="max-w-[620px]">
          <p className="story-hero-reveal story-label text-[#c9af77]">{story.heroChapter}</p>
          <h1 className="story-hero-reveal mt-8 story-h1"><span className="lg:whitespace-nowrap">{story.heroTitle}</span><br /><em className="whitespace-pre-line text-[#d9c79b]">{story.heroTitleAccent}</em></h1>
          <p className="story-hero-reveal mt-8 story-lead text-[#f5f1e7]/90">{story.heroLead}</p>
          <a href="#story-chapter-02" className="story-hero-reveal story-scroll-cue mt-10 inline-flex items-center gap-3 text-[#d9c79b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c79b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#173527] lg:mt-11"><span>{copy.ui.scrollToExplore}</span><ArrowDown className="story-scroll-arrow" size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section id="story-chapter-02" className="bg-[#f5f1e7] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div data-story-reveal className="story-reveal"><p className="story-label text-[#ad8e50]">{story.whyEyebrow}</p><h2 className="mt-5 story-h2">{story.whyTitle}</h2></div><div data-story-reveal className="story-reveal max-w-2xl lg:pt-12"><p className="story-lead text-[#1f3b2c]">{story.heroBody}</p><p className="mt-8 story-body text-[#697363]">{story.whyBody}</p></div></div></section>

    <section className="story-dark-chapter relative isolate overflow-hidden bg-[#1f3b2c] px-5 py-24 text-[#f5f1e7] sm:px-8 lg:px-12 lg:py-36"><div className="absolute inset-0 bg-cover bg-center opacity-80 lg:opacity-100" style={{ backgroundImage: "url(\"/bg-s01-gon-bung-nhe-tenh.png\")", backgroundPosition: "center" }} aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-r from-[#1f3b2c]/96 via-[#1f3b2c]/78 to-[#1f3b2c]/34" aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-t from-[#1f3b2c]/58 via-transparent to-[#1f3b2c]/18" aria-hidden="true" /><div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div data-story-reveal className="story-reveal"><p className="story-label text-[#c9af77]">{story.greenTitle}</p><h2 className="mt-6 max-w-3xl story-h2">Morning<br /><em className="text-[#c9af77]">Green.</em></h2></div><p data-story-reveal className="story-reveal story-body text-[#cbd4c4]">{story.greenBody}</p></div></section>

    <section className="relative overflow-hidden bg-[#e8e4d7]"><div className="story-image-break min-h-[58vh] bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(245,241,231,.04), rgba(23,53,39,.2)), url('/bottle-stage-ingredients.png')" }} role="img" aria-label={story.freshnessBody} /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#173527]/80 via-[#173527]/20 to-transparent" aria-hidden="true" /></section>

    <section className="bg-[#f5f1e7] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div data-story-reveal className="story-reveal flex flex-col justify-between gap-8 border-b border-[#1f3b2c]/14 pb-10 lg:flex-row lg:items-end"><div><p className="story-label text-[#ad8e50]">{story.processEyebrow}</p><h2 className="mt-5 max-w-3xl story-h2">{story.processTitle}</h2></div><p className="story-body text-[#697363]">{story.freshnessBody}</p></div><div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{story.process.map((item) => <div key={item.number} data-story-reveal className="story-reveal border-t border-[#1f3b2c]/14 pt-5"><span className="font-ui text-[21px] font-medium leading-none text-[#ad8e50]/80">{item.number}</span><h3 className="mt-8 story-h3 text-[#1f3b2c]">{item.title}</h3><p className="mt-4 story-body-sm text-[#697363]">{item.body}</p></div>)}</div></div></section>

    <section className="bg-[#e8e4d7] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div data-story-reveal className="story-reveal border-t border-[#1f3b2c]/14 pt-6"><div className="space-y-4">{story.principles.map((principle, index) => <div key={principle} className="flex items-baseline gap-4 border-b border-[#1f3b2c]/14 pb-4"><span className="shrink-0 font-ui text-[16px] font-medium leading-none text-[#ad8e50]/80">0{index + 1}</span><span className="min-w-0 flex-1 story-h3 text-[#1f3b2c]">{principle}</span></div>)}</div></div><div data-story-reveal className="story-reveal lg:pl-8"><p className="story-label text-[#ad8e50]">{story.nothingEyebrow}</p><h2 className="mt-5 max-w-xl story-h2">{story.nothingTitle}</h2><p className="mt-8 story-body text-[#697363]">{story.nothingBody}</p></div></div></section>

    <section className="bg-[#f5f1e7] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"><div className="mx-auto max-w-7xl"><div className="max-w-3xl" data-story-reveal><p className="story-reveal story-label text-[#ad8e50]">{story.realEyebrow}</p><h2 className="story-reveal mt-5 story-h2">{story.realTitle}</h2><p className="story-reveal mt-8 story-body text-[#697363]">{story.realBody}</p></div><div className="mt-14 grid gap-8 border-t border-[#1f3b2c]/14 pt-8 md:grid-cols-3">{story.moments.map((moment, index) => <article key={moment.time} data-story-reveal className="story-reveal"><div className={`relative aspect-[1.15] overflow-hidden ${index === 0 ? "bg-[#e8ead9]" : index === 1 ? "bg-[#e8e4d7]" : "bg-[#e2e8df]"}`}><img src={moment.image} alt={moment.title} loading="lazy" className="h-full w-full object-contain object-center p-2 transition duration-700 hover:scale-[1.02] sm:p-3" /></div><p className="mt-5 font-ui text-[21px] font-medium leading-none text-[#ad8e50]">{moment.time}</p><h3 className="mt-4 story-h3 text-[#1f3b2c]">{moment.title}</h3><p className="mt-3 max-w-xs story-caption text-[#697363]">{moment.body}</p></article>)}</div></div></section>

    <section className="bg-[#f5f1e7] px-5 py-20 sm:px-8 lg:px-12 lg:py-32"><div data-story-reveal className="story-reveal mx-auto max-w-7xl"><p className="story-label text-[#ad8e50]">{story.beliefEyebrow}</p><div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16"><h2 className="max-w-2xl story-statement text-[#1f3b2c]">{renderBeliefTitle(locale, story.beliefTitle)}</h2><p className="max-w-2xl story-statement text-[#1f3b2c] lg:justify-self-end">{renderBeliefBody(locale, story.beliefBody)}</p></div></div></section>


    <SiteFooter copy={copy} showHomeLink />
    <BackToTopButton label={copy.ui.backToTop} />
  </main>;
}
