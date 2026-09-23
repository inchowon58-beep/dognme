"use client";

import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

export default function Footer() {
  const kakaoHref = useKakaoHref();
  return (
    <footer className="border-t border-[#ffe8df] bg-[#fff8f4] py-12 text-[#1a1a2e]">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-[0.62rem] font-bold tracking-[0.28em] text-[#ff6b4a] uppercase">{SITE.brandEn}</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight hover:text-[#ff6b4a]">{SITE.brand}</h2>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5a5a72]">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-[#5a5a72]">
          {kakaoHref ? (
            <a
              href={kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-[#ff6b4a]"
            >
              <MessageCircle size={16} className="text-[#ff6b4a]" />
              {CTA_KAKAO}
            </a>
          ) : null}
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#ff6b4a]" />
            {SITE.location} · {SITE.address}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <Link
              href="/#dogs"
              className="inline-flex rounded-full border border-[#ffd4c4] px-3.5 py-1.5 text-xs font-semibold hover:border-[#ff6b4a] hover:text-[#ff6b4a]"
            >
              품종
            </Link>
            <Link
              href="/bunyang"
              className="inline-flex rounded-full border border-[#ffd4c4] px-3.5 py-1.5 text-xs font-semibold hover:border-[#ff6b4a] hover:text-[#ff6b4a]"
            >
              전체분양
            </Link>
            <Link
              href="/admin"
              className="inline-flex rounded-full border border-[#ffd4c4] px-3.5 py-1.5 text-xs font-semibold hover:border-[#ff6b4a] hover:text-[#ff6b4a]"
            >
              관리자
            </Link>
          </div>
          <p className="pt-2 text-xs text-[#9a9ab0]">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
