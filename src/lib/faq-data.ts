import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "도그앤미는 어떤 곳인가요?",
    a: "반려견·반려묘 품종을 사진으로 안내하는 분양 사이트입니다. 마음에 드는 품종을 고른 뒤, 각 페이지에서 성격·크기·키우기 팁을 확인합니다.",
  },
  {
    q: "품종 안내는 어디서 보나요?",
    a: "메인 카드 또는 상단의 품종 메뉴에서 해당 견종·묘종을 누르면 전용 페이지로 이동합니다. 자세한 내용은 그 페이지에 있습니다.",
  },
  {
    q: "분양가는 얼마인가요?",
    a: "품종·개체·시기에 따라 폭이 있습니다. 페이지에 단가를 박지 않고, 상담에서 범위와 포함 항목을 먼저 맞춥니다.",
  },
  {
    q: "지역별 안내도 있나요?",
    a: "있습니다. 품종을 고르면 시·군·구·동 단위 페이지로 이어지고, 지역안내 메뉴에서 발행된 글도 볼 수 있습니다.",
  },
  {
    q: "상담은 어떻게 하나요?",
    a: `관리자에서 카카오톡을 등록한 뒤 오픈채팅으로 이어집니다. ${KAKAO_CTA_HINT}`,
  },
];

export const EMERGENCY_HOWTO_STEPS = [
  {
    name: "품종을 고릅니다",
    text: "메인에서 견종·묘종 사진을 보고 원하는 품종을 선택합니다.",
  },
  {
    name: "해당 페이지에서 읽습니다",
    text: "성격, 크기, 키우기 안내를 품종 페이지에서 확인합니다.",
  },
  {
    name: "집과 맞는지 상담합니다",
    text: "등록된 카카오톡으로 지역·희망 조건을 알려 주시면 이어서 안내합니다.",
  },
  {
    name: "만나고 결정합니다",
    text: "직접 보거나 추가 사진을 받은 뒤 입양 여부를 정합니다. 서두르지 않아도 됩니다.",
  },
] as const;

export function faqJsonLd(faqs: FaqItem[] = HOME_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToJsonLd(pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "도그앤미에서 품종을 고르는 순서",
    description: "품종 선택, 상세 안내 확인, 상담까지 도그앤미 분양 안내.",
    inLanguage: "ko-KR",
    totalTime: "PT2H",
    url: pageUrl || SITE.siteUrl,
    step: EMERGENCY_HOWTO_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function orgJsonLd(url?: string, telephone?: string) {
  const sameAs = [SITE.kakaoOpenChatUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: SITE.name,
    alternateName: [SITE.brand, SITE.brandEn],
    description: SITE.description,
    url: url || SITE.siteUrl,
    ...(SITE.ogImage ? { image: SITE.ogImage } : {}),
    ...(telephone ? { telephone } : {}),
    openingHours: "Mo-Su 10:00-20:00",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "분양 상담",
    keywords: SITE.keywords.join(", "),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
