import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type BackToTopButtonProps = {
  label: string;
};

export function BackToTopButton({ label }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 480);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-[70] grid h-11 w-11 place-items-center rounded-full border border-[#f5f1e7]/35 bg-[#173527]/90 text-[#f5f1e7] shadow-[0_10px_24px_rgba(23,53,39,0.2)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#c9af77] hover:bg-[#1f3b2c] hover:text-[#c9af77] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9af77] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1e7] sm:bottom-7 sm:right-7"
    >
      <ArrowUp size={18} strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}
