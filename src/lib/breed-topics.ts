import type { Breed } from "./breeds";
import { kindKo, sizeClass } from "./breeds";
import { getEncyclopedia } from "./breed-encyclopedia";
import type { BreedLandingContent } from "./breed-content";
import { buildBreedContent } from "./breed-content";
import { SITE } from "./site";

export const BREED_TOPIC_SLUGS = [
  "분양가",
  "분양가격",
  "분양비용",
  "키우기",
  "특징",
  "성격",
] as const;

export type BreedTopicSlug = (typeof BREED_TOPIC_SLUGS)[number];

const TOPIC_SET = new Set<string>(BREED_TOPIC_SLUGS);

export function isBreedTopicSlug(raw: string): raw is BreedTopicSlug {
  return TOPIC_SET.has(decodeURIComponent(raw || "").trim());
}

/** 화이트테리어분양가 처럼 붙는 키워드 */
export function breedTopicKeyword(breed: Breed, topic: BreedTopicSlug): string {
  return `${breed.name}${topic}`;
}

export function breedTopicLabels(breed: Breed) {
  const kw = breed.keyword;
  return [
    { slug: null as null, label: kw, href: `/${encodeURIComponent(breed.slug)}` },
    ...BREED_TOPIC_SLUGS.map((t) => ({
      slug: t,
      label: breedTopicKeyword(breed, t),
      href: `/${encodeURIComponent(breed.slug)}/${encodeURIComponent(t)}`,
    })),
  ];
}

function priceParagraphs(breed: Breed): string[] {
  const kw = breed.keyword;
  return [
    `${kw} 비용은 혈통·월령·컨디션·포함 항목(접종·구충·마이크로칩 등)에 따라 달라집니다. ${SITE.brand}는 페이지에 고정 단가를 박지 않고, 만날 수 있는 아이 기준으로 상담 시 범위를 안내합니다.`,
    `지역·시기·개체에 따라 ${breed.name}분양가·분양가격·분양비용이 다르게 느껴질 수 있습니다. 여러 곳을 비교하실 때는 숫자만 보지 말고 건강 기록·인계 이후 상담 가능 여부를 함께 보세요.`,
    `상담 시 희망 견종(${breed.name}), 가족 구성, 키우기 경험을 알려 주시면 ${SITE.brand}에서 맞춤 안내를 이어 갑니다.`,
  ];
}

export function buildBreedTopicContent(breed: Breed, topic: BreedTopicSlug): BreedLandingContent {
  const base = buildBreedContent(breed);
  const enc = getEncyclopedia(breed);
  const kw = breed.keyword;
  const tk = breedTopicKeyword(breed, topic);
  const size = sizeClass(breed);
  const pet = breed.kind === "cat" ? "고양이" : breed.kind === "shelter" ? breed.noun : "강아지";

  const meta: Record<
    BreedTopicSlug,
    { h1: string; title: string; description: string; h2: string; paragraphs: string[] }
  > = {
    분양가: {
      h1: `${tk} — ${breed.name} 분양, 얼마쯤 생각하면 될까요`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 안내. ${breed.name} 분양 비용은 개체·시기마다 다릅니다. ${SITE.brand}에서 범위와 포함 항목을 상담으로 확인하세요.`,
      h2: `${breed.name}분양가, 이렇게 알아보세요`,
      paragraphs: priceParagraphs(breed),
    },
    분양가격: {
      h1: `${tk}, ${breed.name} 분양 전에 꼭 짚을 것`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 참고 안내. ${breed.name} 분양가격은 혈통·월령·컨디션에 따라 달라 ${SITE.brand} 상담으로 확인하세요.`,
      h2: `${breed.name}분양가격 비교할 때`,
      paragraphs: priceParagraphs(breed),
    },
    분양비용: {
      h1: `${tk} — ${breed.name}과 함께할 첫 비용 이야기`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 안내. 분양비용 외 미용·사료·병원 비용까지 ${breed.name} 키우기 전 ${SITE.brand}에서 짚어 드립니다.`,
      h2: `${breed.name}분양비용, 숨은 항목까지`,
      paragraphs: [
        ...priceParagraphs(breed),
        `분양 직후에는 사료·하네스·쿠션·병원 검진 등 초기 생활비도 함께 생각해 두시면 좋습니다. ${breed.coat} 특성상 미용·빗질 비용도 ${breed.name} 키우기에 포함됩니다.`,
      ],
    },
    키우기: {
      h1: `${tk} — ${breed.name}과 지내는 하루`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 가이드. ${breed.name} ${breed.homeNeed}. ${SITE.brand}에서 ${kw} 전후 관리 팁을 확인하세요.`,
      h2: `${breed.name}키우기, 집에서 준비할 것`,
      paragraphs: [
        `${breed.name}키우기는 ${size} 체구와 ${breed.coat} 관리가 핵심입니다. ${breed.homeNeed}`,
        enc.paragraphs[1] || `${breed.temperament} 집 안 동선·산책·놀이 시간을 미리 그려 보시면 ${kw} 선택이 수월해집니다.`,
        enc.care.map((c) => `${c.name}: ${c.detail}`).join(" ") ||
          `${SITE.brand}는 ${kw} 이후에도 사료·배변·병원 질문을 이어서 받습니다.`,
      ],
    },
    특징: {
      h1: `${tk} — ${breed.name}만의 매력`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 정리. ${breed.tag}. ${enc.origin}. ${SITE.brand} ${kw} 안내.`,
      h2: `${breed.name}특징 한눈에`,
      paragraphs: [
        `${enc.origin}. ${breed.tag}`,
        ...enc.paragraphs.slice(0, 2),
        `${size}, ${breed.coat}. ${breed.homeNeed}`,
      ],
    },
    성격: {
      h1: `${tk} — ${breed.name}은 어떤 성향일까요`,
      title: `${tk} | ${SITE.brand}`,
      description: `${tk} 안내. ${breed.temperament}. ${kw} 전 ${SITE.brand}에서 성격과 집 환경 맞춤을 확인하세요.`,
      h2: `${breed.name}성격, 이렇게 이해하면 좋아요`,
      paragraphs: [
        `${breed.name}성격은 대표적으로 ${breed.temperament} ${pet}에게 흔히 말하는 이미지이지만, 개체마다 차이가 있습니다.`,
        enc.paragraphs[0] || `${breed.name}과 함께하려면 가족 구성·다른 반려동물·집을 비우는 시간을 ${breed.temperament}와 맞춰 보세요.`,
        enc.beginner,
      ],
    },
  };

  const m = meta[topic];

  return {
    ...base,
    kicker: `${tk} · ${SITE.brand}`,
    h1: m.h1,
    title: m.title,
    description: m.description.slice(0, 158),
    keywords: [
      tk,
      kw,
      `${breed.name}분양`,
      `${breed.name}${topic}`,
      kindKo(breed),
      SITE.brand,
    ],
    lead: m.paragraphs[0],
    intro: m.paragraphs,
    profile: {
      ...base.profile,
      h2: m.h2,
    },
    local: {
      h2: `${breed.name} ${topic}, 지역별 안내도 함께`,
      paragraphs: [
        `${breed.name} ${topic} 안내는 전국 품종 페이지와 동일합니다. 거주 지역을 고르시면 ${breed.name}분양 지역 페이지로 이어집니다.`,
      ],
    },
    closer: {
      h2: `${tk}, ${SITE.brand}에서 상담해 보세요`,
      lead: `${breed.name} ${topic}가 궁금하시면 아래에서 문의해 주세요. ${kw}와 연결해 안내해 드립니다.`,
    },
    cta: `${tk} 상담 문의`,
  };
}

/** 전국 품종 허브용 키워드 섹션 (본문 앵커 + 토픽 페이지 링크) */
export function buildBreedKeywordSections(breed: Breed) {
  const enc = getEncyclopedia(breed);
  const kw = breed.keyword;
  return [
    {
      id: "bunyang",
      h2: kw,
      keyword: kw,
      paragraphs: [
        `${kw}를 검색하셨다면, ${breed.name}의 성격·특징·키우기·분양가격을 한곳에서 확인하실 수 있습니다. ${SITE.brand}는 사진만으로 결정하지 않고 건강 기록과 만남 순서를 먼저 안내합니다.`,
        enc.paragraphs[0] || `${breed.temperament} ${breed.name}과 함께할 집 환경을 먼저 짚어 보세요.`,
      ],
      href: `/${encodeURIComponent(breed.slug)}`,
    },
    {
      id: "seonggyeok",
      h2: `${breed.name}성격`,
      keyword: `${breed.name}성격`,
      paragraphs: [`${breed.temperament}`, enc.beginner],
      href: `/${encodeURIComponent(breed.slug)}/성격`,
    },
    {
      id: "teukjing",
      h2: `${breed.name}특징`,
      keyword: `${breed.name}특징`,
      paragraphs: [`${enc.origin}. ${breed.tag}`, enc.paragraphs[1] || breed.coat],
      href: `/${encodeURIComponent(breed.slug)}/특징`,
    },
    {
      id: "kiugi",
      h2: `${breed.name}키우기`,
      keyword: `${breed.name}키우기`,
      paragraphs: [breed.homeNeed, enc.care[0]?.detail || breed.coat],
      href: `/${encodeURIComponent(breed.slug)}/키우기`,
    },
    {
      id: "price",
      h2: `${breed.name}분양가 · 분양가격 · 분양비용`,
      keyword: `${breed.name}분양가`,
      paragraphs: priceParagraphs(breed).slice(0, 2),
      href: `/${encodeURIComponent(breed.slug)}/분양가`,
    },
  ];
}

export function applyNationalHubContent(
  content: BreedLandingContent,
  breed: Breed
): BreedLandingContent {
  const kw = breed.keyword;
  const enc = getEncyclopedia(breed);
  return {
    ...content,
    kicker: `${kw} · ${SITE.brand}`,
    h1: `${kw} — ${breed.name}과 함께할 준비`,
    title: `${kw} | ${SITE.brand}`,
    description: `${kw} 안내. ${breed.name} 성격·특징·키우기·분양가격까지 ${SITE.brand}에서 확인하세요.`.slice(
      0,
      158
    ),
    lead: `${kw}를 알아보시는 분께 — ${breed.temperament} ${breed.name}이 우리 집과 맞는지, ${SITE.brand}가 차근차근 안내해 드립니다.`,
    keywords: [
      kw,
      `${breed.name}분양`,
      `${breed.name}분양가`,
      `${breed.name}분양가격`,
      `${breed.name}분양비용`,
      `${breed.name}키우기`,
      `${breed.name}특징`,
      `${breed.name}성격`,
      kindKo(breed),
      SITE.brand,
    ],
    profile: {
      ...content.profile,
      h2: `${breed.name}성격 · ${breed.name}특징`,
    },
    local: {
      h2: `${breed.name}분양, 지역별 안내`,
      paragraphs: [
        `${kw} 전국 안내입니다. 서울·부산·대전·경기 등 거주 지역을 고르시면 ${breed.name}분양 지역 페이지로 이동합니다.`,
        enc.paragraphs[2] || `${SITE.brand}에서 ${kw} 상담을 이어 가실 수 있습니다.`,
      ],
    },
    closer: {
      h2: `${kw}, ${SITE.brand}에서 시작해 보세요`,
      lead: `${breed.name}분양·분양가·키우기·성격이 궁금하시면 아래에서 문의해 주세요. 서두르지 않아도 괜찮습니다.`,
    },
    cta: `${kw} 상담 문의`,
  };
}
