import type { Metadata } from "next";
import Link from "next/link";
import { BREEDS, kindKo } from "@/lib/breeds";
import { breedCover } from "@/lib/breed-images";
import { breedPath } from "@/lib/breed-paths";
import { SITE } from "@/lib/site";
import { publicPageUrl } from "@/lib/public-url";
import CollapsibleLinkSection from "@/app/components/CollapsibleLinkSection";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const url = await publicPageUrl("/bunyang");
  return {
    title: "전국 견종·묘종 분양 안내",
    description: `전국 시·군·구·동 ${SITE.brand} 견종·묘종 분양 안내. 건강 확인부터 인계 이후까지 지역 맞춤으로 확인하세요.`,
    keywords: ["견종분양", "묘종분양", "지역별분양", "클린분양", SITE.brand],
    alternates: { canonical: url },
    openGraph: {
      title: `전국 견종·묘종 분양 안내 | ${SITE.name}`,
      description: "시·군·구·동 × 견종·묘종 롱테일 분양 안내",
      url,
      images: [{ url: SITE.ogImage, width: 800, height: 600, alt: SITE.name }],
    },
  };
}

export default function BunyangIndexPage() {
  const dogs = BREEDS.filter((b) => b.kind === "dog");
  const cats = BREEDS.filter((b) => b.kind === "cat");
  const shelters = BREEDS.filter((b) => b.kind === "shelter");

  return (
    <div className="container py-16 md:py-24">
      <p className="section-kicker">Nationwide</p>
      <h1 className="mt-3 text-3xl font-extrabold text-[var(--navy)] md:text-4xl">
        전국 견종·묘종 분양 안내
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        서울·부산·대전·경기 등 시·도, 시·군·구, 동 단위로 {SITE.brand} 분양 안내를 이어 드립니다.
        품종을 펼쳐 보고 해당 페이지로 이동하세요.
      </p>

      <div className="mt-10 space-y-3">
        <CollapsibleLinkSection
          title={`견종 ${dogs.length}종`}
          defaultOpen
          items={dogs.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
        />
        <CollapsibleLinkSection
          title={`묘종 ${cats.length}종`}
          items={cats.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
        />
        <CollapsibleLinkSection
          title="보호소"
          items={shelters.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
        />
      </div>

      <details className="dm-fold mt-12">
        <summary className="dm-fold-summary">
          <span>품종 카드 미리보기</span>
          <em>{BREEDS.length}종</em>
        </summary>
        <div className="dm-fold-body">
          <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {BREEDS.map((b) => (
              <Link
                key={b.slug}
                href={breedPath(b.slug)}
                className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderColor: `${b.palette.accent}44` }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={breedCover(b.folder)}
                    alt={`${b.name} 분양`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold text-white"
                    style={{ background: b.palette.accent }}
                  >
                    {kindKo(b)}
                  </span>
                </div>
                <div className="p-4" style={{ background: b.palette.accentSoft }}>
                  <p className="text-lg font-extrabold" style={{ color: b.palette.ink }}>
                    {b.name} 분양
                  </p>
                  <p className="mt-1 text-sm" style={{ color: b.palette.muted }}>
                    {b.tag} · {b.size}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
