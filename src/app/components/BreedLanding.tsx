import type { CSSProperties } from "react";
import Link from "next/link";
import type { Breed } from "@/lib/breeds";
import { CAT_BREEDS, DOG_BREEDS, sizeClass } from "@/lib/breeds";
import type { BreedLandingContent } from "@/lib/breed-content";
import { placeLabel } from "@/lib/breed-content";
import { breedPhotos, breedScatteredPhotos, type ScatteredPhoto } from "@/lib/breed-images";
import { breedPath, bunyangPath } from "@/lib/breed-paths";
import {
  breedTopicLabels,
  buildBreedKeywordSections,
  type BreedTopicSlug,
} from "@/lib/breed-topics";
import type { KoreaSigungu } from "@/lib/korea-regions";
import {
  displaySido,
  getDongs,
  getSigungus,
  neighborDongs,
  neighborSigungus,
  sidoChipNames,
} from "@/lib/korea-regions";
import { SITE } from "@/lib/site";
import BreedPhoto from "./BreedPhoto";
import BreedInquiryForm from "./BreedInquiryForm";
import CollapsibleLinkSection from "./CollapsibleLinkSection";

function InlinePhoto({ photo }: { photo: ScatteredPhoto }) {
  return (
    <figure className={`bl-inline-photo bl-inline-photo-${photo.variant}`}>
      <div className="bl-inline-photo-frame">
        <BreedPhoto src={photo.src} alt={photo.alt} sizes="(max-width:768px) 100vw, 50vw" />
      </div>
    </figure>
  );
}

function TopicNav({ breed, active }: { breed: Breed; active?: string | null }) {
  const links = breedTopicLabels(breed);
  return (
    <nav className="bl-v2-kw-nav" aria-label={`${breed.name} 키워드 안내`}>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={active === link.slug ? "is-active" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default function BreedLanding({
  breed,
  content,
  sido,
  sigungu,
  dong,
  pagePath,
  nationalHub,
  topicSlug,
}: {
  breed: Breed;
  content: BreedLandingContent;
  sido?: string;
  sigungu?: string;
  dong?: string;
  pagePath: string;
  nationalHub?: boolean;
  topicSlug?: BreedTopicSlug;
}) {
  const salt = [topicSlug, sido, sigungu, dong].filter(Boolean).join("_");
  const keywordSections = nationalHub ? buildBreedKeywordSections(breed) : [];
  const showTopicNav = nationalHub || Boolean(topicSlug);
  const photos = breedPhotos(breed, salt);
  const scattered = breedScatteredPhotos(breed, salt, placeLabel(sido, sigungu, dong));
  const place = placeLabel(sido, sigungu, dong);
  const sidoShort = sido ? displaySido(sido) : "";
  const nearbyGu = sido && sigungu ? neighborSigungus(sido, sigungu, 8) : [];
  const nearbyDong = sido && sigungu && dong ? neighborDongs(sido, sigungu, dong, 8) : [];
  const dongList = sido && sigungu && !dong ? getDongs(sido, sigungu) : [];
  const sidoList = !sido ? sidoChipNames() : [];
  const sigunguList: KoreaSigungu[] = sido && !sigungu ? getSigungus(sido) : [];
  const otherSidos = sido && !sigungu ? sidoChipNames(sido) : [];
  const samePlace = (slug: string) => {
    if (sido && sigungu && dong) return breedPath(slug, sido, sigungu, dong);
    if (sido && sigungu) return breedPath(slug, sido, sigungu);
    if (sido) return breedPath(slug, sido);
    return breedPath(slug);
  };

  let photoIdx = 0;
  const nextPhoto = () => scattered[photoIdx++] ?? null;

  const style = {
    "--bl-accent": breed.palette.accent,
    "--bl-soft": breed.palette.accentSoft,
    "--bl-ink": breed.palette.ink,
    "--bl-muted": breed.palette.muted,
    "--bl-paper": breed.palette.paper,
    "--bl-card": breed.palette.card,
    "--bl-deep": breed.palette.deep,
  } as CSSProperties;

  const tags = [
    sizeClass(breed),
    breed.coat,
    breed.temperament.slice(0, 24) + (breed.temperament.length > 24 ? "…" : ""),
  ];

  const storySteps = [
    content.steps[0],
    content.steps[2],
    content.steps[4],
  ].filter(Boolean);

  return (
    <div
      className="bl-root bl-dm bl-v2"
      data-layout={breed.layout}
      data-shape={breed.shape}
      style={style}
    >
      <div className="bl-wrap">
        <nav className="bl-crumb" aria-label="경로">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href={bunyangPath()}>분양</Link>
          <span>/</span>
          <Link href={breedPath(breed.slug)}>{breed.name}</Link>
          {topicSlug ? (
            <>
              <span>/</span>
              <span>{breed.name}{topicSlug}</span>
            </>
          ) : null}
          {sido ? (
            <>
              <span>/</span>
              <Link href={breedPath(breed.slug, sido)}>{sidoShort}</Link>
            </>
          ) : null}
          {sido && sigungu ? (
            <>
              <span>/</span>
              <Link href={breedPath(breed.slug, sido, sigungu)}>{sigungu}</Link>
            </>
          ) : null}
          {dong ? (
            <>
              <span>/</span>
              <span>{dong}</span>
            </>
          ) : null}
        </nav>
      </div>

      {/* 상단: 좌 텍스트 · 우 사진 (디어펫 4칸 카드와 다른 구조) */}
      <header className="bl-wrap bl-v2-hero">
        <div className="bl-v2-hero-copy">
          <p className="bl-kicker">{content.kicker}</p>
          <h1 className="bl-h1">{content.h1}</h1>
          <p className="bl-lead">{content.lead}</p>
          <div className="bl-v2-tags" aria-label={`${breed.name} 특징`}>
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {showTopicNav ? <TopicNav breed={breed} active={topicSlug ?? null} /> : null}
        </div>
        <div className="bl-v2-hero-photo">
          <BreedPhoto src={photos.hero} alt={`${breed.name} 분양`} priority sizes="50vw" />
        </div>
      </header>

      {/* 도그앤미 분양 CTA 밴드 */}
      <section className="bl-v2-trust">
        <div className="bl-wrap bl-v2-trust-inner">
          <div>
            <p className="bl-v2-trust-label">{SITE.brand} 분양 안내</p>
            <h2 className="bl-v2-trust-title">
              {place} {breed.name} — <em>여기서 상담</em> 받아 보세요
            </h2>
            <p className="bl-v2-trust-desc">
              {content.intro[0]}
            </p>
          </div>
          <ul className="bl-v2-trust-list">
            <li>건강·예방 기록 확인</li>
            <li>대면·영상으로 컨디션 확인</li>
            <li>인계 후 적응 질문 상담</li>
          </ul>
        </div>
      </section>

      <div className="bl-wrap bl-v2-intro">
        {content.intro.slice(1).map((p) => (
          <p key={p.slice(0, 28)}>{p}</p>
        ))}
      </div>

      {(() => {
        const p = nextPhoto();
        return p ? (
          <div className="bl-wrap">
            <InlinePhoto photo={p} />
          </div>
        ) : null;
      })()}

      {nationalHub && keywordSections.length ? (
        <section className="bl-v2-keywords">
          <div className="bl-wrap">
            <h2 className="bl-h2">{breed.keyword} 키워드 안내</h2>
            <p className="bl-lead">
              {breed.name}분양·분양가·키우기·성격·특징을 주제별로 정리했습니다.
            </p>
            <div className="bl-v2-kw-sections">
              {keywordSections.map((sec) => (
                <article key={sec.id} id={sec.id} className="bl-v2-kw-block">
                  <h3>{sec.h2}</h3>
                  {sec.paragraphs.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                  <Link href={sec.href} className="bl-v2-kw-more">
                    {sec.keyword} 자세히 →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3개 핵심 블록 (기존 5단계 대신) */}
      <section className="bl-v2-story">
        <div className="bl-wrap">
          <h2 className="bl-h2">{breed.name} 분양, 이렇게 진행해요</h2>
          <div className="bl-v2-story-grid">
            {storySteps.map((step) => (
              <article key={step.n} className="bl-v2-story-card">
                <span className="bl-v2-story-n">{step.kicker}</span>
                <h3>{step.h2}</h3>
                {step.paragraphs.slice(0, 2).map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
                {step.items?.length ? (
                  <ul>
                    {step.items.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 관찰 포인트 — 카드형 */}
      <section className="bl-v2-check">
        <div className="bl-wrap">
          <h2 className="bl-h2">{content.observe.h2}</h2>
          <p className="bl-lead">{content.observe.lead}</p>
          {nextPhoto() ? (
            <InlinePhoto photo={scattered[photoIdx - 1]} />
          ) : null}
          <div className="bl-v2-check-grid">
            {content.observe.cards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.lead}</p>
                <ul>
                  {card.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {(() => {
        const p = nextPhoto();
        return p ? (
          <div className="bl-wrap">
            <InlinePhoto photo={p} />
          </div>
        ) : null;
      })()}

      {/* 품종 이야기 — 접기 */}
      <section className="bl-wrap bl-block">
        <h2 className="bl-h2">{content.profile.h2}</h2>
        <p className="bl-lead bl-v2-origin">{content.profile.origin}</p>
        <div className="bl-prose">
          {content.profile.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <p className="bl-v2-beginner">{content.profile.beginner}</p>
        <details className="bl-fold">
          <summary>
            <span>건강·유전 참고</span>
            <em>{content.profile.genetics.length}항목</em>
          </summary>
          <ul className="bl-v2-ref-list">
            {content.profile.genetics.map((g) => (
              <li key={g.name}>
                <strong>{g.name}</strong>
                <span>{g.detail}</span>
              </li>
            ))}
          </ul>
        </details>
        <details className="bl-fold">
          <summary>
            <span>매일 관리 팁</span>
            <em>{content.profile.care.length}항목</em>
          </summary>
          <ul className="bl-v2-ref-list">
            {content.profile.care.map((g) => (
              <li key={g.name}>
                <strong>{g.name}</strong>
                <span>{g.detail}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* 도그앤미 케어 — 가로 스크롤 카드 */}
      <section className="bl-v2-care">
        <div className="bl-wrap">
          <p className="bl-kicker">{content.care.kicker}</p>
          <h2 className="bl-h2">{content.care.h2}</h2>
          <p className="bl-lead">{content.care.lead}</p>
          <div className="bl-v2-care-scroll">
            {content.care.items.map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bl-wrap bl-block">
        <h2 className="bl-h2">자주 묻는 질문</h2>
        <div className="bl-faq-list">
          {content.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bl-wrap bl-block bl-local-hub">
        <h2 className="bl-h2">{content.local.h2}</h2>
        {content.local.paragraphs.slice(0, 2).map((p) => (
          <p key={p.slice(0, 22)} className="bl-lead">
            {p}
          </p>
        ))}

        <details className="bl-fold">
          <summary>
            <span>{content.localFacts.snapshotH2}</span>
            <em>지역 통계</em>
          </summary>
          <div className="bl-fold-body">
            <div className="bl-v2-stats-row">
              {content.localFacts.stats.map((s) => (
                <div key={s.label}>
                  <span>{s.label}</span>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>
            <p className="bl-source">{content.localFacts.snapshotSource}</p>
          </div>
        </details>

        {sidoList.length ? (
          <CollapsibleLinkSection
            title={`시·도별 ${breed.name} 분양`}
            defaultOpen
            accent={breed.palette.accent}
            items={sidoList.map((s) => ({ href: breedPath(breed.slug, s), label: s }))}
          />
        ) : null}
        {sigunguList.length ? (
          <CollapsibleLinkSection
            title={`${sidoShort} 시·군·구`}
            accent={breed.palette.accent}
            items={sigunguList.map((r) => ({
              href: breedPath(breed.slug, r.sido, r.sigungu),
              label: r.sigungu,
            }))}
          />
        ) : null}
        {otherSidos.length ? (
          <CollapsibleLinkSection
            title="다른 지역"
            accent={breed.palette.accent}
            items={otherSidos.map((s) => ({ href: breedPath(breed.slug, s), label: s }))}
          />
        ) : null}
        {dongList.length ? (
          <CollapsibleLinkSection
            title={`${sigungu} 동·읍·면`}
            accent={breed.palette.accent}
            items={dongList.map((d) => ({
              href: breedPath(breed.slug, sido, sigungu, d),
              label: d,
            }))}
          />
        ) : null}
        {nearbyDong.length ? (
          <CollapsibleLinkSection
            title="이웃 동"
            accent={breed.palette.accent}
            items={nearbyDong.map((d) => ({
              href: breedPath(breed.slug, sido, sigungu, d),
              label: d,
            }))}
          />
        ) : null}
        {nearbyGu.length ? (
          <CollapsibleLinkSection
            title="인근 시·군·구"
            accent={breed.palette.accent}
            items={[
              { href: breedPath(breed.slug), label: "전체" },
              ...nearbyGu.map((r) => ({
                href: breedPath(breed.slug, r.sido, r.sigungu),
                label: r.sigungu,
              })),
            ]}
          />
        ) : null}
        <CollapsibleLinkSection
          title="다른 견종"
          accent={breed.palette.accent}
          items={DOG_BREEDS.filter((b) => b.slug !== breed.slug).map((b) => ({
            href: samePlace(b.slug),
            label: b.name,
          }))}
        />
        <CollapsibleLinkSection
          title="다른 묘종"
          accent={breed.palette.accent}
          items={CAT_BREEDS.map((b) => ({
            href: samePlace(b.slug),
            label: b.name,
          }))}
        />
      </section>

      <section className="bl-closer bl-v2-closer">
        <div className="bl-wrap">
          <h2 className="bl-h2">{content.closer.h2}</h2>
          <p className="bl-lead">{content.closer.lead}</p>
        </div>
      </section>

      <section className="bl-inquiry" id="inquiry">
        <div className="bl-wrap">
          <p className="bl-kicker" style={{ color: "#ffb89a" }}>
            {SITE.brand} 상담
          </p>
          <h2 className="bl-h2">{content.cta}</h2>
          <p className="bl-lead">
            {place} {breed.name} — 희망 시기와 가족 구성만 남겨 주셔도 됩니다.
          </p>
          <BreedInquiryForm
            breedName={breed.name}
            place={place}
            cta={content.cta}
            pagePath={pagePath}
          />
        </div>
      </section>
    </div>
  );
}
