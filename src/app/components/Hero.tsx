"use client";

import Link from "next/link";
import { MessageCircle, ShieldCheck, Heart, MapPin } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

const TRUST = [
  { icon: ShieldCheck, text: "건강 기록부터 확인" },
  { icon: Heart, text: "서두르지 않는 분양" },
  { icon: MapPin, text: "전국 지역별 안내" },
];

export default function Hero() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="top" className="dm-hero">
      <div className="container dm-hero-inner">
        <div className="dm-hero-copy">
          <p className="dm-hero-badge">{SITE.brandEn}</p>
          <h1 className="dm-hero-title">
            {SITE.brand}에서
            <br />
            <em>강아지·고양이 분양</em>을
            <br />
            시작해 보세요
          </h1>
          <p className="dm-hero-desc">
            예쁜 사진만으로 결정하지 않습니다. 품종·지역·가족 구성에 맞춰 차근차근 안내해 드리니,
            <strong> 여기서 분양 상담</strong> 받아 보셔도 괜찮습니다.
          </p>
          <ul className="dm-hero-trust">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={16} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
          <div className="dm-hero-actions">
            <a href="#dogs" className="dm-btn dm-btn-primary">
              견종 갤러리
            </a>
            <a href="#cats" className="dm-btn dm-btn-soft">
              묘종 갤러리
            </a>
            {kakaoHref ? (
              <a
                href={kakaoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="dm-btn dm-btn-outline"
              >
                <MessageCircle size={16} />
                {CTA_KAKAO}
              </a>
            ) : null}
          </div>
        </div>
        <div className="dm-hero-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://image.cattery.co.kr/pome/01.webp" alt="도그앤미 강아지 분양" />
          <div className="dm-hero-visual-card">
            <strong>도그앤미</strong>
            <span>전국 견종·묘종 · 보호소 안내</span>
            <Link href="/bunyang">지역별 보기 →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
