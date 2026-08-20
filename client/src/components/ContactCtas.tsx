import { Phone } from "lucide-react";
import { FACEBOOK_LINK, PHONE_LINK, PHONE_NUMBER, ZALO_LINK } from "@shared/morningGreen";
import { PlatformIcon } from "./PlatformIcon";

type ContactCopy = {
  facebookLabel: string;
  facebookAria: string;
  zaloLabel: string;
  zaloAria: string;
  phoneAria: string;
};

type ContactCtasProps = {
  copy: ContactCopy;
  className?: string;
  layout?: "inline" | "stacked";
  compact?: boolean;
};

export function ContactCtas({ copy, className = "", layout = "inline", compact = false }: ContactCtasProps) {
  const isStacked = layout === "stacked";
  const sizeClass = compact ? "min-h-11 text-[11px]" : "min-h-12 text-[12px]";
  const facebookPadding = compact ? "px-4" : "px-5";
  const capsulePadding = compact ? "px-3" : "px-4";
  return (
    <div className={`flex w-full flex-col ${compact ? "gap-2.5" : "gap-3"} ${isStacked ? "items-start" : "sm:flex-row sm:items-center"} ${className}`}>
      <a
        href={FACEBOOK_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.facebookAria}
        className={`group inline-flex ${sizeClass} ${facebookPadding} ${compact ? "w-fit" : "w-full sm:w-fit"} items-center justify-center gap-2 rounded-full bg-[#f5f1e7] font-semibold tracking-[0.02em] text-[#1f3b2c] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173527]`}
      >
        <PlatformIcon platform="facebook" size={compact ? 15 : 16} />
        <span>{copy.facebookLabel}</span>
        <span aria-hidden="true" className="text-[14px] transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
      </a>
      <div className={`${sizeClass} flex ${compact ? "w-fit" : "w-full sm:w-auto"} items-stretch rounded-full border border-[#f5f1e7]/35 bg-transparent font-semibold text-[#f5f1e7]`}>
        <a
          href={ZALO_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.zaloAria}
          className={`inline-flex min-w-0 flex-none items-center justify-center gap-1.5 rounded-l-full ${capsulePadding} transition-colors duration-200 hover:bg-[#f5f1e7]/10 hover:text-[#c9af77] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77] focus-visible:ring-inset`}
        >
          <PlatformIcon platform="zalo" size={compact ? 15 : 16} />
          <span>{copy.zaloLabel}</span>
        </a>
        <span className="my-2.5 w-px bg-[#f5f1e7]/25" aria-hidden="true" />
        <a
          href={PHONE_LINK}
          aria-label={copy.phoneAria}
          className={`inline-flex min-w-0 flex-none items-center justify-center gap-1.5 rounded-r-full ${capsulePadding} transition-colors duration-200 hover:bg-[#f5f1e7]/10 hover:text-[#c9af77] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77] focus-visible:ring-inset`}
        >
          <Phone size={compact ? 14 : 15} strokeWidth={1.7} aria-hidden="true" />
          <span className="whitespace-nowrap">{PHONE_NUMBER}</span>
        </a>
      </div>
    </div>
  );
}
