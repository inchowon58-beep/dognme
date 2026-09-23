"use client";

import Link from "next/link";
import { CAT_BREEDS, DOG_BREEDS, SHELTER_BREEDS, kindKo, type Breed } from "@/lib/breeds";
import { breedCover } from "@/lib/breed-images";
import { breedPath } from "@/lib/breed-paths";
import CollapsibleLinkSection from "./CollapsibleLinkSection";

function BreedGrid({ items }: { items: Breed[] }) {
  return (
    <div className="home-grid">
      {items.map((b) => (
        <Link key={b.slug} href={breedPath(b.slug)} className="home-card">
          <div className="home-card-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={breedCover(b.folder)} alt={`${b.name} 분양`} />
          </div>
          <div className="home-card-meta">
            <small>{kindKo(b)}</small>
            <strong>{b.name}</strong>
            <b>자세히 보기</b>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function BreedCatalog() {
  return (
    <>
      <section className="home-steps">
        <div className="container">
          <ol>
            <li>
              <b>1. 고르기</b>
              <span>마음에 드는 견종·묘종 사진을 눌러 품종 페이지로 이동합니다.</span>
            </li>
            <li>
              <b>2. 읽기</b>
              <span>성격, 크기, 키우기 팁을 품종별 페이지에서 확인합니다.</span>
            </li>
            <li>
              <b>3. 상담</b>
              <span>우리 집과 맞는지 카카오톡으로 편하게 문의하세요.</span>
            </li>
          </ol>
        </div>
      </section>

      <section id="breeds" className="home-breeds">
        <div className="container">
          <div className="home-breeds-head">
            <div>
              <p className="home-kicker">Breeds</p>
              <h2>어떤 아이와 함께할까요?</h2>
            </div>
            <p>견종·묘종·보호소를 펼쳐 보고, 각 품종 페이지에서 자세한 안내를 확인하세요.</p>
          </div>

          <div className="home-fold-group">
            <CollapsibleLinkSection
              title={`견종 ${DOG_BREEDS.length}종`}
              defaultOpen
              items={DOG_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
            />
            <CollapsibleLinkSection
              title={`묘종 ${CAT_BREEDS.length}종`}
              items={CAT_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
            />
            {SHELTER_BREEDS.length ? (
              <CollapsibleLinkSection
                title={`보호소 ${SHELTER_BREEDS.length}곳`}
                items={SHELTER_BREEDS.map((b) => ({ href: breedPath(b.slug), label: b.name }))}
              />
            ) : null}
          </div>

          <details className="dm-fold" style={{ marginTop: "1.5rem" }}>
            <summary className="dm-fold-summary">
              <span>품종 사진 미리보기</span>
              <em>{DOG_BREEDS.length + CAT_BREEDS.length + SHELTER_BREEDS.length}종</em>
            </summary>
            <div className="dm-fold-body">
              <BreedGrid items={[...DOG_BREEDS.slice(0, 8), ...CAT_BREEDS.slice(0, 4)]} />
            </div>
          </details>

          <div className="home-close">
            <p>성격과 생활 리듬은 카드가 아니라, 각 품종 페이지에서 천천히 읽어 주세요.</p>
            <Link href="/bunyang" className="home-btn home-btn-outline" style={{ display: "inline-flex" }}>
              지역별 목록
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
