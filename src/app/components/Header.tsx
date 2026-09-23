"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

const NAV = [
  { href: "/#dogs", label: "품종" },
  { href: "/guide", label: "지역안내" },
  { href: "/bunyang", label: "전체분양" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6b4a] text-sm font-extrabold text-white"
      >
        D
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.58rem] font-bold tracking-[0.28em] text-[#ff6b4a] uppercase">
          {SITE.brandEn}
        </span>
        <span className="mt-0.5 text-[1.15rem] font-extrabold tracking-tight text-[#1a1a2e]">
          {SITE.brand}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const href = useKakaoHref();

  return (
    <header className="sticky top-0 z-50 border-b border-[#ffe8df] bg-white/95 text-[#1a1a2e] backdrop-blur-md">
      <div className="container flex h-[3.5rem] items-center justify-between md:h-[4rem]">
        <BrandMark />

        <nav className="hidden items-center gap-7 text-[0.85rem] font-semibold text-[#5a5a72] lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ff6b4a]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-[#ff6b4a] px-4 py-2 text-[0.78rem] font-bold text-white sm:inline-flex hover:bg-[#e85535]"
            >
              <MessageCircle size={14} />
              {CTA_KAKAO}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex p-2 text-[#1a1a2e] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#ffe8df] bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#1a1a2e] hover:bg-[#fff5f0]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#ff6b4a] px-4 py-2.5 text-sm font-bold text-white"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={16} />
                {CTA_KAKAO}
              </a>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}
