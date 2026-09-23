import type { Breed } from "./breeds";
import { kindKo, relatedBreeds, sizeClass } from "./breeds";
import { getEncyclopedia } from "./breed-encyclopedia";
import type { GuideFact } from "./breed-encyclopedia";
import { eulReul, eunNeun, euroRo, iGa, iraRa } from "./korean";
import { areaLabel, displaySido } from "./korea-regions";
import { buildLocalRegionFacts, type LocalRegionFacts } from "./local-region-facts";
import { SITE } from "./site";

export type BreedFaq = { q: string; a: string };

export type StepBlock = {
  n: string;
  kicker: string;
  h2: string;
  paragraphs: string[];
  items?: string[];
  itemLabel?: string;
};

export type ObserveCard = { title: string; lead: string; items: string[] };
export type CareItem = { n: string; title: string; body: string };

export type BreedProfileFact = { label: string; value: string };

export type BreedLandingContent = {
  kicker: string;
  h1: string;
  localH2: string;
  title: string;
  description: string;
  keywords: string[];
  lead: string;
  intro: string[];
  profile: {
    h2: string;
    cards: BreedProfileFact[];
    origin: string;
    paragraphs: string[];
    genetics: GuideFact[];
    care: GuideFact[];
    beginner: string;
  };
  localFacts: LocalRegionFacts;
  steps: StepBlock[];
  observe: { h2: string; lead: string; cards: ObserveCard[] };
  care: { kicker: string; h2: string; lead: string; items: CareItem[]; closer: string };
  local: { h2: string; paragraphs: string[] };
  faqs: BreedFaq[];
  closer: { h2: string; lead: string };
  cta: string;
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed || 1);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function placeLabel(sido?: string, sigungu?: string, dong?: string): string {
  if (dong) return dong;
  if (sigungu) return sigungu;
  if (sido) return displaySido(sido);
  return "전국";
}

export function adminLabel(sido?: string, sigungu?: string, dong?: string): string {
  return areaLabel(sido || "", sigungu, dong) || "전국";
}

export function buildBreedContent(
  breed: Breed,
  sido?: string,
  sigungu?: string,
  dong?: string
): BreedLandingContent {
  const place = placeLabel(sido, sigungu, dong);
  const admin = adminLabel(sido, sigungu, dong);
  const kw = breed.keyword;
  const name = breed.name;
  const seed = hash(`${breed.slug}|${admin}|${place}`);
  const enc = getEncyclopedia(breed);
  const localFacts = buildLocalRegionFacts(breed, sido, sigungu, dong);
  const related = relatedBreeds(breed, 4)
    .map((b) => b.name)
    .join("·");
  const isCat = breed.kind === "cat";
  const isShelter = breed.kind === "shelter";
  const pet = isCat ? "고양이" : isShelter ? breed.noun : "강아지";
  const baby = isCat ? "아기 고양이" : isShelter ? "아이" : "아기 강아지";
  const size = sizeClass(breed);
  const salesStat = localFacts.stats.find((s) => s.label === "분양 등록업체")?.value || "";
  const hospitalStat = localFacts.stats.find((s) => s.label === "병원 수")?.value || "";

  const kicker = `${place} · ${name} 함께 살기 전 체크리스트`;

  const h1 = pick(
    [
      `${place} ${name} 분양 — 우리 집과 맞는 아이 찾기`,
      `${place}에서 ${name} 키우기, 알아두면 좋은 것들`,
      `${admin} ${name} 분양, 사진보다 먼저 볼 것`,
      `${place} ${kw}, 생활 리듬에 맞춰 고르는 방법`,
      `${name}과 함께할 ${place} 집, 준비부터 차근차근`,
    ],
    seed
  );

  const title = `${place} ${name} 분양 | ${admin} 안내`;
  const localH2 = `${place} ${name} 분양, 이 지역에서 알아두면 좋은 점`;
  const description = (
    dong
      ? `${dong}(${sido} ${sigungu}) ${name} 분양. 병원 ${hospitalStat}, 판매업 ${salesStat}. ${SITE.brand} 안내.`
      : sigungu
        ? `${sido} ${sigungu} ${name} 분양. 병원 ${hospitalStat}, 판매업 ${salesStat}. ${SITE.brand} 가이드.`
        : sido
          ? `${sido} ${name} 분양. 병원 ${hospitalStat}, 판매업 ${salesStat}. ${SITE.brand}이 정리했습니다.`
          : `전국 ${name} 분양. 병원 ${hospitalStat}, 판매업 ${salesStat}. ${SITE.brand} 안내.`
  ).slice(0, 158);

  const lead = pick(
    [
      `${place}에서 ${name}${eulReul(name)} 만나기 전, 집 환경·건강·성격을 차근차근 짚어 드립니다.`,
      `도그앤미는 ${place} ${kw}를 사진 한 장으로 결정하지 않습니다. 컨디션과 기록부터 확인하세요.`,
      `${admin} ${name} 분양 — 처음 키우시는 분도 따라올 수 있게 단계별로 안내합니다.`,
    ],
    seed + 1
  );

  const intro = [
    pick(
      [
        `${pet}을 가족으로 맞이하는 일은 예쁜 ${baby}를 데려오는 과정이 아닙니다. ${place} ${kw}를 알아보실 때도 앞으로 오랜 시간 함께할 생활부터 그려 보는 것이 안전합니다.`,
        `${place}${euroRo(place)} ${name} 분양을 알아보실 때 마음이 먼저 움직이는 것은 자연스럽습니다. 다만 실제 반려생활에서는 외모보다 건강·기질·집 구조가 더 오래 남습니다.`,
        `${admin}에서 ${name} 분양을 고민 중이라면, 분양가와 얼굴만 비교하기보다 인계 이후에도 질문을 받을 수 있는지를 먼저 확인하세요.`,
      ],
      seed + 2
    ),
    pick(
      [
        `특히 어린 ${pet}${eunNeun(pet)} 환경 변화에 민감합니다. ${place} 새 집에서 식사량이 줄거나 숨어 지내는 모습은 흔하고, 처음 적응 공간이 이후 습관에 영향을 줍니다.`,
        `${name}${eunNeun(name)} ${breed.temperament} ${place} 생활 패턴—집을 비우는 시간, 가족 구성, 다른 반려동물—과 맞는지가 외모보다 중요합니다.`,
        `${size} 체구와 ${breed.coat} 특성상 ${place} 집의 동선·환기·관리 시간이 빠지면 예쁜 사진과 실제 하루가 어긋나기 쉽습니다.`,
      ],
      seed + 4
    ),
    pick(
      [
        `그래서 ${place} ${kw}를 볼 때는 아기의 컨디션을 직접 확인할 수 있는지, 건강 기록이 있는지, 인계 이후에도 도움을 받을 수 있는지를 함께 살펴보세요.`,
        `${SITE.brand}은 ${admin} ${name}분양뿐 아니라 예방·검진 일정, 초기 적응, 사료·화장실 습관까지 이어서 안내합니다. 처음 ${pet}${eulReul(pet)} 키우시는 분도 순서를 밟으면 안정적입니다.`,
        enc.paragraphs[0] || `${name}의 기질과 관리 포인트를 ${place} 기준으로 정리했습니다.`,
      ],
      seed + 5
    ),
  ];

  const catHome = [
    "하루 중 집을 비우는 시간이 얼마나 되는지",
    "캣타워나 숨숨 공간을 마련할 수 있는지",
    "털 관리를 꾸준히 할 수 있는지",
    "기존 반려동물이 있는지",
    "창문·베란다 안전망을 확인할 수 있는지",
    "화장실을 사람 동선과 떨어뜨릴 수 있는지",
    `${breed.homeNeed}`,
  ];
  const dogHome = [
    "하루 산책 시간과 동선을 확보할 수 있는지",
    "집을 비우는 시간과 분리 불안을 감당할 수 있는지",
    "빗질·미용 주기를 지킬 수 있는지",
    "기존 반려동물이 있는지",
    "엘리베이터·계단 등 ${place} 주거 구조를 점검했는지".replace("${place}", place),
    "미끄러운 바닥과 높은 소파를 보완할 수 있는지",
    `${breed.homeNeed}`,
  ];
  const shelterHome = [
    "조용한 방 하나를 처음 삼 일 동안 비워 둘 수 있는지",
    "기존 반려동물과 격리할 공간이 있는지",
    "건강 기록이 불완전할 때 병원 일정을 잡을 수 있는지",
    "숨는 아이를 억지로 꺼내지 않을 수 있는지",
    `${place}에서 산책·화장실 루틴을 고정할 수 있는지`,
    `${breed.homeNeed}`,
  ];
  const homeItems = shuffle(isCat ? catHome : isShelter ? shelterHome : dogHome, seed).slice(0, 5);

  const step1Paras = isShelter
    ? [
        `${place}에서 ${name}${eulReul(name)} 볼 때 품종 자랑보다 ‘지금 이 아이’의 안정이 먼저입니다. 구조 사연과 월령이 제각각이라 외모만으로 성격을 단정하기 어렵습니다.`,
        `확인할 사항은 보호 중 메모, 검진 기록, ${place} 집의 조용한 방입니다. 급하게 데려가면 숨거나 밥을 거부하는 기간이 길어질 수 있습니다.`,
      ]
    : [
        pick(
          [
            `${place} ${kw}를 볼 때 가장 먼저 눈에 들어오는 것은 외모입니다. 귀여운 모습에 마음이 움직이는 것은 자연스럽지만, 실제 반려생활에서는 외모보다 중요한 부분이 많습니다.`,
            `${name}${eunNeun(name)} ${breed.tag}입니다. ${place}에서 고를 때 얼굴 다음으로 ${breed.coat} 관리량과 ${size} 성체 크기를 집 동선에 대입해 보세요.`,
          ],
          seed + 6
        ),
        pick(
          [
            `${pet}${eunNeun(pet)} 보호자님의 생활 패턴, 집 구조, 가족 구성에 따라 적응 속도가 달라집니다. ${place} ${kw} 상담에서는 이 항목부터 맞춰 드립니다.`,
            `장모인지 단모인지, 활동량이 많은지에 따라 ${place} 하루가 달라집니다. ${breed.temperament}`,
          ],
          seed + 7
        ),
      ];

  const step2Paras = isCat
    ? [
        `${place} ${kw} 전에는 ${pet}${iGa(pet)} 안정을 찾을 공간을 먼저 마련하는 것이 좋습니다. 낯선 환경에서는 바로 탐험하기보다 숨어서 관찰하는 경우가 많습니다.`,
        `처음에는 방 하나를 적응 공간으로 정하고 화장실, 물그릇, 식기, 숨숨집을 두세요. 높은 곳을 좋아하므로 캣타워나 선반도 도움이 됩니다. ${place} 창문·베란다는 안전망을 반드시 확인하세요.`,
      ]
    : isShelter
      ? [
          `${place}로 오기 전, 캐리어와 박스를 열어 둔 조용한 방이 가장 비싼 준비물입니다. 첫날 목욕이나 강제 안기는 피하세요.`,
          `화장실과 잠자리 위치를 처음 삼 일 동안 옮기지 않는 것이 ${name} 적응에 유리합니다. 보호소에서 먹던 사료를 받아 천천히 바꾸는 편이 안전합니다.`,
        ]
      : [
          `${place} ${kw} 전에는 산책 동선, 잠자리, 식기, 배변 패드를 미리 정해 두는 것이 좋습니다. ${name}${eunNeun(name)} ${size}${iraRa(size)} 미끄러운 바닥과 높은 점프를 줄여 주세요.`,
          `${breed.homeNeed} ${place} 엘리베이터·복도 소음에도 처음에는 긴장을 잘합니다. 첫 산책은 짧게, 같은 길로 반복하는 편이 안정적입니다.`,
        ];

  const step3Paras = [
    pick(
      [
        `${place} ${kw}를 사진·영상만 보고 결정하는 것은 신중해야 합니다. 사진에서는 활발해 보여도 실제로 만나면 성향과 컨디션이 다르게 느껴질 수 있습니다.`,
        `${admin}에서 ${name}${eulReul(name)} 고를 때는 대면 또는 실시간 확인으로 움직임·호흡·사람 반응을 보는 것이 안전합니다.`,
      ],
      seed + 8
    ),
    `대면 시에는 사람을 얼마나 경계하는지, 움직임은 자연스러운지, 호흡은 괜찮은지를 봅니다. 예방접종·구충·먹던 사료·화장실 습관·최근 건강 설명을 충분히 들을 수 있어야 합니다.`,
  ];

  const processItems = shuffle(
    [
      "대면 또는 실시간 확인",
      "컨디션 확인",
      "예방·구충·사료 기록 확인",
      "인계 조건 정리",
      `${place} 집 세팅 완료`,
      "인계 진행",
    ],
    seed + 9
  );

  const observeLead = isCat
    ? `${pet}${eunNeun(pet)} 낯선 사람 앞에서 긴장하는 경우가 많아, 조용하다고 해서 얌전한 성격이라고 단정하기 어렵습니다. ${place}에서 ${baby}를 볼 때 아래를 함께 보세요.`
    : `${baby}${eunNeun(baby)} 처음 보는 자리에서 웅크리거나 과도하게 흥분할 수 있습니다. ${place} ${kw} 대면에서는 한 장면이 아니라 눈·코·귀·털·배변을 순서대로 봅니다.`;

  const observeCards: ObserveCard[] = isCat
    ? [
        {
          title: "눈",
          lead: `${pet}의 눈은 건강 상태를 읽는 중요한 부분입니다. 아래가 보이면 조금 더 확인이 필요합니다.`,
          items: shuffle(
            ["눈곱이 과도하게 많은 경우", "눈 주변이 젖어 있는 경우", "충혈이 심한 경우", "눈을 자주 감고 있는 경우"],
            seed + 11
          ),
        },
        {
          title: "코",
          lead: `코는 보통 깨끗하고 촉촉합니다. ${place}에서 호흡기 상태를 살펴볼 때는 아래를 봅니다.`,
          items: shuffle(
            ["콧물이 계속 흐르는 경우", "재채기를 반복하는 경우", "코 주변이 지저분한 경우"],
            seed + 12
          ),
        },
        {
          title: "귀",
          lead: "귀 안쪽은 깨끗해야 하며 심한 냄새가 나지 않아야 합니다.",
          items: shuffle(
            ["귀지가 많은 경우", "냄새가 심한 경우", "귀를 자주 긁는 행동", "머리를 자주 흔드는 행동"],
            seed + 13
          ),
        },
        {
          title: "피부와 털",
          lead: `${name}${eunNeun(name)} ${breed.coat}입니다. 윤기가 없고 특정 부위 탈모가 보이면 피부 상태를 체크하세요.`,
          items: shuffle(
            ["털이 푸석한 경우", "가려워 과도하게 핥는 경우", "특정 부위 탈모", `${enc.care[0]?.name || "빗질"} 주기를 미리 확인`],
            seed + 14
          ).slice(0, 3),
        },
        {
          title: "배변",
          lead: "배변은 건강을 확인하는 중요한 기준입니다. 선호 모래도 함께 물으면 적응에 도움이 됩니다.",
          items: shuffle(
            ["설사 흔적", "항문 주변이 지저분한 경우", "화장실을 잘 쓰는지", "쓰던 모래·사료 종류"],
            seed + 15
          ),
        },
      ]
    : [
        {
          title: "눈·코",
          lead: `${place}에서 ${name} 얼굴을 볼 때 분비물과 호흡부터 확인하세요.`,
          items: shuffle(
            ["눈곱·충혈", "콧물·재채기", "거친 호흡", "입을 벌리고 쉬는 모습"],
            seed + 11
          ),
        },
        {
          title: "귀·피부",
          lead: `${breed.coat}라 귀 냄새와 피부 윤기가 컨디션을 잘 보여 줍니다.`,
          items: shuffle(
            ["귀지·냄새", "가려움으로 바닥을 비비는 행동", "털이 극도로 푸석한 경우", "핫스팟·습진 흔적"],
            seed + 12
          ),
        },
        {
          title: "보행",
          lead: `${size} 체구는 슬개골·허리 부담이 바로 보일 수 있습니다.`,
          items: shuffle(
            ["절뚝임", "앉을 때 한쪽 다리를 빼는 모습", "계단을 거부하는 모습", "과도한 점프 유도는 피할 것"],
            seed + 13
          ),
        },
        {
          title: "배변·식욕",
          lead: `${place} 인계 전에 먹던 사료와 배변 리듬을 받아 두면 첫 주가 수월합니다.`,
          items: shuffle(
            ["설사·혈변 흔적", "식욕 저하와 무기력", "쓰던 사료 이름", "산책 중 배변 여부"],
            seed + 14
          ),
        },
      ];

  const step5Paras = [
    pick(
      [
        `${place} ${kw}에서 가장 조심할 것은 충분한 확인 없이 결정을 서두르는 상황입니다.`,
        `실물을 보기 전 예약금만 요구하거나, 건강 설명 없이 급하게 인계를 유도하면 ${admin}이어도 속도를 늦추는 편이 맞습니다.`,
      ],
      seed + 16
    ),
    pick(
      [
        `인계 조건이나 예방·구충 기록이 불명확하면 바로 결정하지 마세요. ${name}은 새 환경에서 질문이 생기기 쉬워, 이후 상담이 가능한지 확인하는 것이 좋습니다.`,
        `${SITE.brand}은 ${place} ${kw} 이후에도 초기 적응·사료 전환 질문을 받을 수 있도록 안내합니다. 한 번 만나고 끝나는 진행은 권하지 않습니다.`,
      ],
      seed + 17
    ),
  ];

  const careItems: CareItem[] = [
    {
      n: "01",
      title: "분양 상담",
      body: `${place} 생활과 ${name} 기질을 맞춰 가족 찾기를 진행합니다. ${breed.temperament}`,
    },
    {
      n: "02",
      title: "건강 기록",
      body: `예방·구충·최근 컨디션을 확인한 뒤 인계합니다. ${enc.genetics[0]?.name || "검진"} 항목은 상담에서 풀어 드립니다.`,
    },
    {
      n: "03",
      title: "초기 적응",
      body: `${place} 집의 화장실·잠자리·급식을 처음 며칠 고정하는 법을 안내합니다.`,
    },
    {
      n: "04",
      title: "일상 관리",
      body: `${breed.coat} 관리와 ${enc.care[0]?.detail || breed.homeNeed}`,
    },
    {
      n: "05",
      title: "이후 문의",
      body: `사료 전환, 배변, 병원 일정처럼 ${place} ${kw} 이후 생기는 질문을 이어서 받습니다.`,
    },
  ];

  const faqsPool: BreedFaq[] = [
    {
      q: `${place} ${kw} 후 집에 오자마자 밥을 안 먹으면 문제가 있나요?`,
      a: `환경이 바뀌면 일시적으로 식욕이 줄어들 수 있습니다. ${pet}${eunNeun(pet)} 첫날 숨어 지내거나 식사를 거르기도 합니다. 장시간 먹지 않거나 무기력이 함께 보이면 상태 확인이 필요합니다.`,
    },
    {
      q: `${place}에 오자마자 숨어 버리는데 괜찮을까요?`,
      a: `매우 흔한 적응 행동입니다. 억지로 꺼내려고 하기보다 조용한 공간을 두고 스스로 나올 때까지 기다려 주세요.`,
    },
    {
      q: `화장실을 사용하지 않으면 어떻게 하나요?`,
      a: isCat
        ? `화장실 위치를 자주 바꾸지 말고, 쓰던 모래와 비슷한 제품을 ${place} 집에 미리 준비하는 것이 도움이 됩니다.`
        : `배변 패드·산책 루틴을 ${place}에서 쓰던 방식에 가깝게 맞추고, 처음 삼 일은 같은 지점을 반복해 주세요.`,
    },
    {
      q: `${place} ${kw} 후 바로 병원에 가야 하나요?`,
      a: `컨디션 확인이나 예방 일정이 남아 있다면 병원 상담을 받아 보는 것이 좋습니다. 기록과 함께 가시면 ${admin} 병원에서도 설명이 수월합니다.`,
    },
    {
      q: `${name}${eunNeun(name)} 초보 보호자와 맞나요?`,
      a: enc.beginner,
    },
    {
      q: `${place} ${kw} 상담은 어떻게 하나요?`,
      a: `아래 문의에 ${place} 거주와 희망 시기만 남겨 주셔도 됩니다. 가족 구성·다른 반려동물 여부까지 적으시면 더 정확한 안내가 됩니다.`,
    },
    {
      q: `${kw} 비용은 어떻게 알아보면 되나요?`,
      a: `혈통·외모·월령에 따라 달라 ${place}에서 지금 만날 수 있는 아이 기준으로 상담하는 것이 정확합니다. 이 페이지에 단가를 박아 두지 않습니다.`,
    },
    {
      q: `${name}의 ${breed.coat} 관리는 얼마나 걸리나요?`,
      a: enc.care.find((c) => /털|빗|미용/.test(c.name))?.detail || `${breed.coat}. ${place} 생활 시간과 맞춰 주기를 상담에서 잡아 드립니다.`,
    },
  ];
  const localFaqs: BreedFaq[] = localFacts.paragraphs.slice(1, 3).map((p, i) =>
    i === 0
      ? {
          q: `${place}${eunNeun(place)} 어디에 속하고, ${name} 안내는 어디까지인가요?`,
          a: p,
        }
      : {
          q: `${place}에서 ${name}${eulReul(name)} 고를 때 무엇을 먼저 보면 되나요?`,
          a: `${p} 비슷한 ${kindKo(breed)}은 ${related} 페이지도 함께 보시면 됩니다.`,
        }
  );
  const faqs = [...localFaqs, ...shuffle(faqsPool, seed + 20).slice(0, 4)];

  const localParas = [
    ...localFacts.paragraphs,
    `이웃 동네와 비슷한 ${kindKo(breed)}(${related}) 페이지를 함께 보시면 ${admin} 이동 범위가 분명해집니다.`,
  ];

  const closerH2 = pick(
    [
      `${place} ${name} 분양, 서두르지 않아도 괜찮아요`,
      `${place}에서 ${name}과 함께할 준비, 차근차근`,
      `${admin} ${name} 분양 — 첫 주가 편해지도록 도와 드릴게요`,
    ],
    seed + 21
  );

  return {
    kicker,
    h1,
    localH2,
    title,
    description: description.slice(0, 158),
    keywords: [
      `${place} ${name} 분양`,
      `${place}${name}분양`,
      `${place} ${kw}`,
      `${admin} ${name}`,
      `${name} 분양`,
      kw,
      kindKo(breed),
      "건강분양",
    ],
    lead,
    intro,
    profile: {
      h2: `${name} 이런 아이예요`,
      cards: [
        { label: "체구", value: size },
        { label: "털", value: breed.coat },
        { label: "원산·계통", value: enc.origin },
        { label: "집 환경", value: breed.homeNeed },
      ],
      origin: enc.origin,
      paragraphs: enc.paragraphs,
      genetics: enc.genetics,
      care: enc.care,
      beginner: enc.beginner,
    },
    localFacts,
    steps: [
      {
        n: "1",
        kicker: "1단계 · 준비",
        h2: `${place} ${name} 분양, 먼저 질문해 볼 것`,
        paragraphs: step1Paras,
        items: homeItems,
        itemLabel: "집에서 확인할 것",
      },
      {
        n: "2",
        kicker: "2단계 · 환경",
        h2: `${place} 집, ${name}이 편해질 공간 만들기`,
        paragraphs: step2Paras,
      },
      {
        n: "3",
        kicker: "3단계 · 만남",
        h2: `${place} ${name} 분양, 이렇게 진행해요`,
        paragraphs: step3Paras,
        items: processItems,
        itemLabel: "만남 순서",
      },
      {
        n: "4",
        kicker: "4단계 · 관찰",
        h2: `직접 만날 때, ${baby} 건강은 이렇게 봐요`,
        paragraphs: [observeLead],
      },
      {
        n: "5",
        kicker: "5단계 · 주의",
        h2: `${place} ${name} 분양, 이런 경우는 잠깐 멈추세요`,
        paragraphs: step5Paras,
      },
    ],
    observe: {
      h2: `대면 관찰 포인트, ${baby} 컨디션은 이렇게`,
      lead: observeLead,
      cards: observeCards,
    },
    care: {
      kicker: `${SITE.brand} 케어`,
      h2: `${place} ${name} 분양 이후에도 함께해요`,
      lead: `${pet}과 함께하면 병원·미용·용품 질문이 자연스럽게 생깁니다. ${SITE.brand}는 ${place} ${kw} 상담부터 첫 주 적응까지 이어서 도와 드립니다.`,
      items: careItems,
      closer: `상담 → 건강 확인 → 만남 → 적응 팁, ${place}에서 ${name}과 시작하는 첫 주`,
    },
    local: { h2: localH2, paragraphs: localParas },
    faqs,
    closer: {
      h2: closerH2,
      lead: `분양 전 기준부터 인계 이후 질문까지 — ${place} ${name}분양을 ${SITE.brand}이 함께 안내합니다.`,
    },
    cta: `${place} ${name} 분양 문의`,
  };
}
