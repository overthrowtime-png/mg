import { Link } from "wouter";
import { FACEBOOK_LINK, WHATSAPP_LINK } from "@shared/morningGreen";
import { type Translations } from "../i18n";
import { ContactCtas } from "./ContactCtas";
import { PlatformIcon } from "./PlatformIcon";

type SiteFooterProps = {
  copy: Translations;
  showHomeLink?: boolean;
};

export function SiteFooter({ copy, showHomeLink = false }: SiteFooterProps) {
  return (
    <footer className="bg-[#173527] text-[#f5f1e7]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-14 lg:px-12 lg:pb-8 lg:pt-16">
        <div className="grid gap-10 border-b border-white/12 pb-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.8fr)_minmax(190px,0.7fr)_minmax(160px,0.6fr)] lg:gap-x-16 lg:gap-y-0 lg:pb-12">
          <div className="max-w-xl md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <img src="/morning-green-logo-160.png" alt="Morning Green" className="h-11 w-11 rounded-[3px] object-contain" />
              <div>
                <p className="font-serif text-[clamp(1.35rem,2vw,2rem)] tracking-[0.13em]">MORNING GREEN</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a7c19d]">Freshness, Refined.</p>
              </div>
            </div>
            <p className="mt-8 max-w-md font-serif text-[clamp(1.7rem,3vw,3rem)] leading-[1.04] tracking-[0.005em] text-[#f5f1e7]">
              Freshness,<br /><em className="text-[#c9af77]">Refined.</em>
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#bfccbd]">{copy.brandLine}</p>
          </div>

          <div className="min-w-0 md:col-span-1 lg:col-span-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#c9af77]">{copy.footer.order}</p>
            <ContactCtas copy={{ ...copy.contact, facebookLabel: copy.footer.facebookCtaLabel }} className="mt-4" layout="stacked" compact />
          </div>

          <div className="min-w-0 md:col-span-1 lg:col-span-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#c9af77]">{copy.footer.follow}</p>
            <div className="mt-4 grid gap-2.5 text-[13px] text-[#bfccbd]">
              <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 transition-colors duration-200 hover:text-[#f5f1e7]">
                <PlatformIcon platform="facebook" size={16} />{copy.footer.facebook}
              </a>
              <a href="https://www.instagram.com/morninggreen.vn/" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 transition-colors duration-200 hover:text-[#f5f1e7]">
                <PlatformIcon platform="instagram" size={16} />{copy.footer.instagram}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 transition-colors duration-200 hover:text-[#f5f1e7]">
                <PlatformIcon platform="whatsapp" size={16} />{copy.footer.whatsapp}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-5 text-[10px] text-[#8d9b89] sm:flex-row sm:items-center">
          <span>{copy.footer.copyright}</span>
          {showHomeLink && <Link href="/" className="w-fit uppercase tracking-[0.16em] transition-colors duration-200 hover:text-[#f5f1e7]">{copy.footer.homeLink}</Link>}
        </div>
      </div>
    </footer>
  );
}
