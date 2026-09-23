import { SITE } from "@/lib/site";

const POINTS = [
  {
    n: "01",
    title: "품종·지역별로 정리",
    body: "견종·묘종·보호소를 고르신 뒤, 서울·부산·대전 등 지역 페이지에서 같은 기준의 안내를 읽으실 수 있습니다.",
  },
  {
    n: "02",
    title: "기록 확인 후 만남",
    body: "사진만 보고 결정하지 않습니다. 건강·예방 기록을 확인한 뒤, 편한 속도로 만남을 이어 갑니다.",
  },
  {
    n: "03",
    title: "분양 후에도 상담",
    body: "인계 후 사료·적응·병원 질문을 이어서 남기실 수 있습니다. 한 번 만나고 끝나지 않습니다.",
  },
];

export default function HomePitch() {
  return (
    <section className="dm-pitch">
      <div className="container">
        <p className="dm-pitch-kicker">Why {SITE.brand}</p>
        <h2 className="dm-pitch-title">
          <em>{SITE.brand}</em>에서 분양 상담 받아 보세요
        </h2>
        <p className="dm-pitch-lead">
          강아지분양·묘종분양을 검색하셨다면, 비교만 하다 끝내지 마세요. 도그앤미는 보호자님이
          스스로 판단할 수 있게 정보를 정리해 두었습니다.
        </p>
        <div className="dm-pitch-grid">
          {POINTS.map((p) => (
            <article key={p.n} className="dm-pitch-card">
              <span>{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
