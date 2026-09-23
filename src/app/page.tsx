import type { Metadata } from "next";
import Hero from "./components/Hero";
import HomePitch from "./components/HomePitch";
import BreedGallery from "./components/BreedGallery";
import { SITE } from "@/lib/site";
import { publicPageUrl } from "@/lib/public-url";
import "./home.css";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const url = await publicPageUrl("/");
  return {
    title: `${SITE.brand} | 강아지·고양이 분양`,
    description: `${SITE.brand} — 전국 견종·묘종·보호소 분양 안내. 품종별 사진을 고르고, 지역별 상세 안내와 상담으로 이어가세요.`,
    keywords: ["강아지분양", "고양이분양", "견종분양", "묘종분양", SITE.brand],
    alternates: { canonical: url },
    openGraph: {
      title: `${SITE.brand} | 강아지·고양이 분양`,
      description: SITE.description,
      url,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
  };
}

export default function HomePage() {
  return (
    <div className="home-dm">
      <Hero />
      <HomePitch />
      <BreedGallery />
    </div>
  );
}
