import type { CSSProperties } from "react";
import Link from "next/link";
import { CAT_BREEDS, DOG_BREEDS, SHELTER_BREEDS, kindKo, type Breed } from "@/lib/breeds";
import { breedCover } from "@/lib/breed-images";
import { breedPath } from "@/lib/breed-paths";

function BreedRow({
  id,
  title,
  subtitle,
  items,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: Breed[];
}) {
  return (
    <section id={id} className="dm-gallery-section">
      <div className="container">
        <header className="dm-gallery-head">
          <div>
            <p className="dm-gallery-kicker">{subtitle}</p>
            <h2>{title}</h2>
          </div>
          <p>사진을 누르면 {title} 상세 안내로 이동합니다. 품종마다 사진 한 장으로 고르세요.</p>
        </header>
        <div className="dm-gallery-grid">
          {items.map((b) => (
            <Link
              key={b.slug}
              href={breedPath(b.slug)}
              className="dm-gallery-card"
              style={{ "--card-accent": b.palette.accent } as CSSProperties}
            >
              <div className="dm-gallery-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={breedCover(b.folder)} alt={`${b.name} 분양`} loading="lazy" />
                <span className="dm-gallery-kind">{kindKo(b)}</span>
              </div>
              <div className="dm-gallery-meta">
                <strong>{b.name}</strong>
                <span>{b.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BreedGallery() {
  return (
    <>
      <BreedRow id="dogs" title="견종 분양" subtitle="Dogs" items={DOG_BREEDS} />
      <BreedRow id="cats" title="묘종 분양" subtitle="Cats" items={CAT_BREEDS} />
      {SHELTER_BREEDS.length ? (
        <BreedRow id="shelters" title="보호소" subtitle="Shelter" items={SHELTER_BREEDS} />
      ) : null}
    </>
  );
}
