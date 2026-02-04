const quarterCards = [
  {
    quarter: "2026 Q1",
    summary: "분기 집행 6.3억",
    months: [
      { label: "1월", value: "1.9억" },
      { label: "2월", value: "2.1억" },
      { label: "3월", value: "2.3억" },
    ],
    note: "자재비 집중 집행 구간",
    tags: ["인건비", "매출원가"],
  },
  {
    quarter: "2026 Q2",
    summary: "분기 집행 7.4억",
    months: [
      { label: "4월", value: "2.2억" },
      { label: "5월", value: "2.4억" },
      { label: "6월", value: "2.8억" },
    ],
    note: "협력사 계약 확대",
    tags: ["판매비와 관리비", "매출원가"],
  },
  {
    quarter: "2026 Q3",
    summary: "분기 집행 8.1억",
    months: [
      { label: "7월", value: "2.6억" },
      { label: "8월", value: "2.7억" },
      { label: "9월", value: "2.8억" },
    ],
    note: "안전/품질 관리 강화",
    tags: ["판매비와 관리비"],
  },
  {
    quarter: "2026 Q4",
    summary: "분기 집행 9.2억",
    months: [
      { label: "10월", value: "3.0억" },
      { label: "11월", value: "3.1억" },
      { label: "12월", value: "3.1억" },
    ],
    note: "연말 결산 대비 예산 집중",
    tags: ["세금관련 비용", "법인세"],
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

export default function QuarterlyExpensesPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">분기별 지출결의서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-[22px] font-bold text-[#312e81]">
              카드형 한눈 보기
            </h1>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
            뷰 전용
          </span>
        </div>
        <p className="text-sm text-[#64748b]">
          각 분기별 지출결의서를 카드 형태로 배치하고, 월별 총합을 함께
          보여줍니다.
        </p>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">검색/필터</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              분기별 카드 검색
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
            placeholder="분기, 메모 키워드 검색"
          />
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>연도: 2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>분기: 전체</option>
            <option>Q1</option>
            <option>Q2</option>
            <option>Q3</option>
            <option>Q4</option>
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

      <section className="grid gap-6 lg:grid-cols-2">
        {quarterCards.map((card) => (
          <article
            key={card.quarter}
            className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-sm text-[#64748b]">{card.quarter}</p>
                <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
                  {card.summary}
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
                월별 총합
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
              {card.months.map((month) => (
                <div
                  key={month.label}
                  className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3"
                >
                  <span className="text-sm text-[#475569]">{month.label}</span>
                  <span className="text-base font-semibold text-[#4338ca]">
                    {month.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#94a3b8]">{card.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
