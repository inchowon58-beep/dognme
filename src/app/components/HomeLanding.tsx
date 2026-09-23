import type { CSSProperties } from "react";
import Link from "next/link";
import { CAT_BREEDS, DOG_BREEDS, SHELTER_BREEDS } from "@/lib/breeds";
import { breedPath, bunyangPath } from "@/lib/breed-paths";
import { HOME_CONTENT, HOME_HERO, HOME_SCATTERED_PHOTOS } from "@/lib/home-content";
import { sidoChipNames } from "@/lib/korea-regions";
import BreedPhoto from "./BreedPhoto";
import BreedInquiryForm from "./BreedInquiryForm";
import CollapsibleLinkSection from "./CollapsibleLinkSection";

const HOME_PALETTE = {
  accent: "#ff6b4a",
  accentSoft: "#ffe8df",
  ink: "#1a1a2e",
  muted: "#5a5a72",
  paper: "#fff8f4",
  card: "#ffffff",
  deep: "#c04028",
};

function InlinePhoto({
  src,
  alt,
  variant,
}: {
  src: string;
  alt: string;
  variant: "wide" | "aside" | "inline";
}) {
  return (
    <figure className={`bl-inline-photo bl-inline-photo-${variant}`}>
      <div className="bl-inline-photo-frame">
        <BreedPhoto src={src} alt={alt} sizes="(max-width:768px) 100vw, 50vw" />
      </div>
    </figure>
  );
}

export default function HomeLanding() {
  const content = HOME_CONTENT;
  const style = {
    "--bl-accent": HOME_PALETTE.accent,
    "--bl-soft": HOME_PALETTE.accentSoft,
    "--bl-ink": HOME_PALETTE.ink,
    "--bl-muted": HOME_PALETTE.muted,
    "--bl-paper": HOME_PALETTE.paper,
    "--bl-card": HOME_PALETTE.card,
    "--bl-deep": HOME_PALETTE.deep,
  } as CSSProperties;

  let photoIdx = 0;
  const nextPhoto = () => HOME_SCATTERED_PHOTOS[photoIdx++] ?? null;

  return (
    <div className="bl-root bl-dm" data-shape="round" style={style}>
      <div className="bl-wrap">
        <nav className="bl-crumb" aria-label="경로">
          <Link href="/">홈</Link>
          <span>/</span>
          <span>강아지분양 안내</span>
        </nav>
      </div>

      <header className="bl-wrap bl-hero-dm">
        <p className="bl-kicker">{content.kicker}</p>
        <h1 className="bl-h1">{content.h1}</h1>
        <p className="bl-lead">{content.lead}</p>
        <div className="bl-hero-photo bl-hero-photo-wide">
          <BreedPhoto src={HOME_HERO} alt="강아지분양 대표 사진" priority sizes="100vw" />
        </div>
        <div className="bl-prose bl-intro">
          {content.intro.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </div>
        {(() => {
          const p = nextPhoto();
          return p ? <InlinePhoto src={p.src} alt={p.alt} variant={p.variant} /> : null;
        })()}
        <div className="bl-stats bl-profile-cards" aria-label="도그앤미 안내 요약">
          {content.profile.cards.map((c) => (
            <article key={c.label} className="bl-stat">
              <span>{c.label}</span>
              <strong>{c.value}</strong>
            </article>
          ))}
        </div>
      </header>

      {content.steps.map((step, idx) => {
        const midPhoto = idx === 1 || idx === 3 ? nextPhoto() : null;
        return (
          <section
            key={step.n}
            className={`bl-step-sec${idx % 2 === 1 ? " bl-step-sec-tint" : ""}`}
          >
            <div className="bl-wrap">
              <p className="bl-step-n">{step.kicker}</p>
              <h2 className="bl-h2">{step.h2}</h2>
              {step.paragraphs.map((p) => (
                <p key={p.slice(0, 26)} className="bl-lead">
                  {p}
                </p>
              ))}
              {midPhoto ? (
                <InlinePhoto src={midPhoto.src} alt={midPhoto.alt} variant={midPhoto.variant} />
              ) : null}
              {step.items?.length ? (
                <div className="bl-check-box">
                  {step.itemLabel ? <p className="bl-check-label">{step.itemLabel}</p> : null}
                  <ol className={step.n === "3" ? "bl-process" : "bl-check-ul"}>
                    {step.items.map((item, i) => (
                      <li key={item}>
                        {step.n === "3" ? <span>{String(i + 1).padStart(2, "0")}</span> : null}
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
              {step.n === "4" ? (
                <div className="bl-observe">
                  {content.trust.cards.map((card) => (
                    <article key={card.title} className="bl-observe-card">
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
              ) : null}
            </div>
          </section>
        );
      })}

      {(() => {
        const p = nextPhoto();
        return p ? (
          <div className="bl-wrap">
            <InlinePhoto src={p.src} alt={p.alt} variant={p.variant} />
          </div>
        ) : null;
      })()}

      <section className="bl-care">
        <div className="bl-wrap">
          <p className="bl-kicker">{content.care.kicker}</p>
          <h2 className="bl-h2">{content.care.h2}</h2>
          <p className="bl-lead">{content.care.lead}</p>
          <div className="bl-care-grid">
            {content.care.items.map((item) => (
              <article key={item.n} className="bl-care-card">
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="bl-care-closer">{content.care.closer}</p>
        </div>
      </section>

      <section className="bl-wrap bl-block">
        <p className="bl-kicker">About</p>
        <h2 className="bl-h2">{content.profile.h2}</h2>
        <div className="bl-prose">
          {content.profile.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bl-wrap bl-block">
        <p className="bl-kicker">FAQ</p>
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

      <section id="breeds" className="bl-wrap bl-block bl-local-hub">
        <p className="bl-kicker">Breeds</p>
        <h2 className="bl-h2">품종을 고르세요</h2>
        <p className="bl-lead">
          강아지분양을 원하시면 견종 목록에서 시작하세요. 묘종·보호소도 같은 방식으로 안내합니다.
        </p>

        <CollapsibleLinkSection
          title={`견종 ${DOG_BREEDS.length}종`}
          defaultOpen
          accent={HOME_PALETTE.accent}
          items={DOG_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
        />
        <CollapsibleLinkSection
          title={`묘종 ${CAT_BREEDS.length}종`}
          accent={HOME_PALETTE.accent}
          items={CAT_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
        />
        {SHELTER_BREEDS.length ? (
          <CollapsibleLinkSection
            title={`보호소 ${SHELTER_BREEDS.length}곳`}
            accent={HOME_PALETTE.accent}
            items={SHELTER_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
          />
        ) : null}

        <CollapsibleLinkSection
          title="시·도별 분양 안내"
          accent={HOME_PALETTE.accent}
          items={sidoChipNames().map((s) => ({
            href: breedPath("말티즈", s),
            label: s,
          }))}
        />

        <div className="bl-link-card" style={{ marginTop: "1rem" }}>
          <Link href={bunyangPath()} className="bl-chip">
            전국 분양 목록 보기
          </Link>
        </div>
      </section>

      <section className="bl-closer">
        <div className="bl-wrap">
          <h2 className="bl-h2">{content.closer.h2}</h2>
          <p className="bl-lead">{content.closer.lead}</p>
        </div>
      </section>

      <section className="bl-inquiry" id="inquiry">
        <div className="bl-wrap">
          <p className="bl-kicker" style={{ color: "#ffb89a" }}>
            Contact
          </p>
          <h2 className="bl-h2">{content.cta}</h2>
          <p className="bl-lead">
            희망 견종·지역·가족 구성만 남겨 주셔도 상담이 시작됩니다. 오늘 결정하지 않으셔도 괜찮아요.
          </p>
          <BreedInquiryForm
            breedName="강아지분양"
            place="전국"
            cta={content.cta}
            pagePath="/"
          />
        </div>
      </section>
    </div>
  );
}
