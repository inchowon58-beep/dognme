/** 도그앤미 — 견종·묘종 분양 사이트 공통 설정 */

export const SITE = {
  name: "도그앤미",
  brand: "도그앤미",
  brandEn: "DOG & ME",
  farm: "도그앤미",
  title: "도그앤미 | 반려견·반려묘 분양 안내",
  tagline: "나와 맞는 아이를 찾는 첫걸음, 도그앤미와 함께",
  taglineEn: "Dog & Me",
  description:
    "도그앤미는 견종·묘종을 품종별로 안내하는 분양 사이트입니다. 사진으로 마음에 드는 품종을 고른 뒤, 성격·크기·키우기 팁을 각 페이지에서 확인하세요.",
  keywords: [
    "도그앤미",
    "견종분양",
    "묘종분양",
    "강아지분양",
    "고양이분양",
    "품종분양",
    "말티즈분양",
    "포메라니안분양",
    "래브라도분양",
    "랙돌분양",
  ],
  kakaoOpenChatUrl: "",
  logo: "https://image.cattery.co.kr/pome/01.webp",
  ogImage: "https://image.cattery.co.kr/pome/02.webp",
  imageBase: "https://image.cattery.co.kr",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 관리자에서 등록한 카카오톡",
  areaServed: "대한민국 전국",
  domain: "dognme.vercel.app",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://dognme.vercel.app",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "",
  themeColor: "#fff8f4",
} as const;

export const KEYWORD_INQUIRY =
  "성격 · 크기 · 키우기는 각 품종 페이지에서 확인하신 뒤 상담으로 이어 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "품종 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "품종 둘러보기";
export const CTA_YOUTUBE = "유튜브에서 시청하기";
export const CTA_YOUTUBE_HEADING = "관련 유튜브 시청하기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT =
  "카카오톡 상담은 관리자에서 오픈채팅을 등록한 뒤에만 연결됩니다.";
