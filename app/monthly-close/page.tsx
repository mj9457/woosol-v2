const closeCards = [
  {
    title: "기성금외 수입내역",
    total: "1.12억",
    tags: ["기타 수입", "기성금외"],
    items: [
      { label: "임대 수익", value: "0.42억" },
      { label: "장비 매각", value: "0.28억" },
      { label: "공제 환급", value: "0.24억" },
      { label: "기타 수입", value: "0.18억" },
    ],
  },
  {
    title: "공사대금 지출",
    total: "3.74억",
    tags: ["매출원가", "외주비"],
    items: [
      { label: "토목 공사비", value: "1.42억" },
      { label: "전기/설비", value: "0.96억" },
      { label: "협력사 정산", value: "0.88억" },
      { label: "장비 유지비", value: "0.48억" },
    ],
  },
  {
    title: "고정외 지출",
    total: "0.96억",
    tags: ["판매비와 관리비", "기타 비용"],
    items: [
      { label: "안전 캠페인", value: "0.22억" },
      { label: "현장 교육", value: "0.18억" },
      { label: "임시 인력", value: "0.31억" },
      { label: "기타 비용", value: "0.25억" },
    ],
  },
];

const expenseCategoryGroups = [
  {
    label: "인건비",
    items: ["급여", "특별상여금", "상여금", "일용노무비", "퇴직연금"],
  },
  {
    label: "인건비관련 4대보험/원천세",
    items: [
      "국민연금보험료",
      "건강보험료",
      "고용보험료",
      "산재보험료",
      "근로소득세",
      "사업소득세",
      "지방소득세",
    ],
  },
  {
    label: "판매비와 관리비 - 사무실/차량/용역",
    items: [
      "사무소 건무 임대료",
      "사무소 관리비",
      "임차료(공기/복합기)",
      "차량렌탈료",
      "차량관리유지보수",
      "자동차보험가입료",
      "영업비",
      "농엽은행방카보험료",
      "세무기장/홍익노무",
      "지급수수료",
      "일반경비",
      "법인카드대금",
    ],
  },
  {
    label: "판매비와 관리비 - 복리후생/교육/출장",
    items: ["복리후생비", "교육훈련비", "출장여비교통비/대리운전"],
  },
  {
    label: "판매비와 관리비 - 통신/공과/소모",
    items: [
      "통신비(핸드폰/텔레캅)",
      "전화/팩스요금",
      "수도광열비(난방등유)",
      "전력비(전기요금)",
      "도서인쇄비",
      "비품",
      "소모품비",
      "사무용품비",
      "운반비/택배",
      "수선비",
      "폐기물",
      "광고선전비",
    ],
  },
  {
    label: "세금관련 비용",
    items: ["세금과공과", "기타부가세"],
  },
  {
    label: "접대/기부 관련 비용",
    items: ["접대비(골프)", "접대비(상품권)", "접대비(경조사)", "기부금"],
  },
  {
    label: "매출원가 상품 관련",
    items: ["상품(외주비 시공비 등 공사원가 계정 포함)"],
  },
  {
    label: "법인세 자본 관련",
    items: ["법인세", "법인지방세", "배당금"],
  },
];

export default function MonthlyClosePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">월 마감 보고서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-[22px] font-bold text-[#312e81]">
              수입/지출 항목 카드 보기
            </h1>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
            뷰 전용
          </span>
        </div>
        <p className="text-sm text-[#64748b]">
          기성금 외 수입내역, 공사대금 지출, 고정외 지출 항목을 카드 형태로
          제공합니다.
        </p>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">검색/필터</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              월 마감 항목 검색
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-[#6366f1] px-4 py-2 text-xs font-semibold text-[#4338ca]">
              초기화
            </button>
            <button className="rounded-full bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white">
              적용
            </button>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <input
            className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
            placeholder="수입/지출 항목 검색"
          />
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>구분: 전체</option>
            <option>기성금외 수입내역</option>
            <option>공사대금 지출</option>
            <option>고정외 지출</option>
          </select>
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>기간: 2026년</option>
            <option>2025년</option>
            <option>최근 3개월</option>
          </select>
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>지출 분류: 전체</option>
            {expenseCategoryGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {closeCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-sm text-[#64748b]">합계 {card.total}</p>
                <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
                  {card.title}
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
                월 마감
              </span>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-3 py-1 text-[11px] font-semibold text-[#4338ca]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {card.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3"
                >
                  <span className="text-sm text-[#475569]">{item.label}</span>
                  <span className="text-base font-semibold text-[#4338ca]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
