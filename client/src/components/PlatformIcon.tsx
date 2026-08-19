import type { SVGProps } from "react";

type Platform = "zalo" | "facebook" | "instagram" | "whatsapp";

type PlatformIconProps = SVGProps<SVGSVGElement> & {
  platform: Platform;
  size?: number;
};

export function PlatformIcon({ platform, size = 16, className, ...props }: PlatformIconProps) {
  const sharedProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true,
    focusable: false,
    ...props,
  } satisfies SVGProps<SVGSVGElement>;

  if (platform === "zalo") {
    return (
      <svg {...sharedProps}>
        <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5.25" fill="currentColor" />
        <path d="M6.8 7.35h8.35c.72 0 1.08.86.59 1.37l-5.54 5.73h5.23v2.2H7.03c-.72 0-1.08-.86-.59-1.37l5.54-5.73H6.8v-2.2Z" fill="#173527" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="9.75" fill="currentColor" />
        <path d="M13.5 20v-6.72h2.25l.34-2.62H13.5V8.99c0-.76.21-1.28 1.31-1.28h1.4V5.37c-.24-.03-1.07-.1-2.04-.1-2.02 0-3.4 1.23-3.4 3.49v1.9H8.5v2.62h2.27V20h2.73Z" fill="#173527" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg {...sharedProps}>
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="4.05" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.35" cy="6.75" r="1.15" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M12 3.25a8.75 8.75 0 0 0-7.5 13.27L3.4 20.6l4.24-1.08A8.75 8.75 0 1 0 12 3.25Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.55 8.2c.18-.4.37-.41.7-.42h.52c.17 0 .36.07.46.34l.64 1.55c.1.25.07.42-.08.61l-.48.59c-.1.13-.2.25-.08.47.13.23.58.95 1.25 1.54.86.76 1.58 1 1.82 1.1.23.1.37.08.51-.08l.66-.77c.17-.2.32-.17.54-.09l1.5.71c.22.1.37.15.42.24.05.1.05.56-.12 1.08-.17.52-.99.96-1.38 1.02-.35.05-.79.08-1.28-.08-.3-.1-.69-.23-1.19-.44-2.08-.88-3.44-2.94-3.55-3.08-.1-.14-.84-1.12-.84-2.14 0-1.01.53-1.5.72-1.7Z" fill="currentColor" />
    </svg>
  );
}
