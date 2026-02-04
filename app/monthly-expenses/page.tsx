const monthlyRows = [
  {
    id: "ME-2026-01",
    title: "1월 현장 운영비",
    department: "관리부",
    period: "2026.01.01 ~ 2026.01.31",
    total: "1.24억",
    status: "확인 완료",
  },
  {
    id: "ME-2026-02",
    title: "2월 공사 자재비",
    department: "공무팀",
    period: "2026.02.01 ~ 2026.02.28",
    total: "2.08억",
    status: "검토 중",
  },
  {
    id: "ME-2026-03",
    title: "3월 외주 협력비",
    department: "구매팀",
    period: "2026.03.01 ~ 2026.03.31",
    total: "1.56억",
    status: "요청 완료",
  },
  {
    id: "ME-2026-04",
    title: "4월 안전관리비",
    department: "품질팀",
    period: "2026.04.01 ~ 2026.04.30",
    total: "0.92억",
    status: "작성 예정",
  },
];

const monthlyItems = [
  {
    label: "현장 인건비",
    amount: "0.72억",
    note: "현장 인력 43명",
  },
  {
    label: "장비 임차료",
    amount: "0.54억",
    note: "굴착기/덤프 12대",
  },
  {
    label: "안전 물자",
    amount: "0.38억",
    note: "안전모/추락방지",
  },
  {
    label: "공통 운영비",
    amount: "0.44억",
    note: "임시 사무실 포함",
  },
];

const expenseGroups = [
  {
    title: "1. 인건비",
    items: [
      "급여",
      "특별상여금",
      "상여금",
      "일용노무비(사용시)",
      "퇴직연금",
    ],
  },
  {
    title: "2. 인건비관련 4대보험/원천세",
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
    title: "3-1 판매비와 관리비 - 사무실/차량/용역",
    items: [
      "사무소 건무 임대료",
      "사무소 관리비",
      "임차료(공기/ 복합기)",
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
    title: "3-2 판매비와 관리비 - 복리후생/교육/출장",
    items: ["복리후생비", "교육훈련비", "출장여비교통비/대리운전"],
  },
  {
    title: "3-3 판매비와 관리비 - 통신/공과/소모",
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
    title: "4. 세금관련 비용",
    items: ["세금과공과", "기타부가세"],
  },
  {
    title: "5. 접대/기부 관련 비용",
    items: ["접대비(골프)", "접대비(상품권)", "접대비(경조사)", "기부금"],
  },
  {
    title: "6. 매출원가 상품 관련",
    items: ["상품(외주비 시공비 등 공사원가 계정 포함)"],
  },
  {
    title: "7. 법인세 자본 관련",
    items: ["법인세", "법인지방세", "배당금"],
  },
];

export default function MonthlyExpensesPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">월별 지출결의서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-[22px] font-bold text-[#312e81]">
              월별 지출결의서 작성/수정
            </h1>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
            작성/수정 가능
          </span>
        </div>
        <p className="text-sm text-[#64748b]">
          월별 집행 내역을 표 형식으로 확인하고, 결의서 작성 및 수정 UI를
          제공합니다.
        </p>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">검색/필터</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              월별 결의서 찾기
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
            placeholder="결의서 번호, 제목, 부서 검색"
          />
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>상태: 전체</option>
            <option>작성 예정</option>
            <option>검토 중</option>
            <option>확인 완료</option>
          </select>
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>기간: 2026년</option>
            <option>2025년</option>
            <option>최근 6개월</option>
          </select>
          <select className="w-full rounded-2xl border border-[#c7d2fe] bg-white px-4 py-3 text-sm text-[#1e293b]">
            <option>지출 분류: 전체</option>
            {expenseGroups.map((group) => (
              <optgroup key={group.title} label={group.title}>
                {group.items.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">작성/수정 UI</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              지출결의서 입력 폼
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-[#6366f1] px-4 py-2 text-xs font-semibold text-[#4338ca]">
              임시 저장
            </button>
            <button className="rounded-full bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white">
              결의서 저장
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <p className="text-sm font-semibold text-[#475569]">기본 정보</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="결의서 번호"
              />
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="결의서 제목"
              />
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="부서"
              />
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="담당자"
              />
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="기간 시작"
              />
              <input
                className="w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                placeholder="기간 종료"
              />
            </div>
            <textarea
              className="mt-3 w-full rounded-xl border border-[#cbd5f5] bg-white px-4 py-3 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
              placeholder="결의서 메모"
              rows={3}
            />
          </div>

          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
            <p className="text-sm font-semibold text-[#475569]">요약</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl bg-[#e0e7ff] px-4 py-3">
                <p className="text-xs text-[#64748b]">총 집행 예정액</p>
                <p className="mt-1 text-lg font-semibold text-[#4338ca]">2.08억</p>
              </div>
              <div className="rounded-xl bg-[#e0e7ff] px-4 py-3">
                <p className="text-xs text-[#64748b]">승인 단계</p>
                <p className="mt-1 text-sm font-semibold text-[#4338ca]">
                  내부 검토
                </p>
              </div>
              <div className="rounded-xl bg-[#e0e7ff] px-4 py-3">
                <p className="text-xs text-[#64748b]">연동 문서</p>
                <p className="mt-1 text-sm font-semibold text-[#4338ca]">
                  견적서 3건, 계약서 1건
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#e2e8f0] bg-white p-5">
          <p className="text-sm font-semibold text-[#475569]">지출 항목 입력</p>
          <p className="mt-2 text-xs text-[#94a3b8]">
            판매비와 관리비 항목은 3-1, 3-2, 3-3 세부 분류로 입력합니다.
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {expenseGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-4"
              >
                <p className="text-sm font-semibold text-[#4338ca]">
                  {group.title}
                </p>
                <div className="mt-3 grid gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f8fafc] px-3 py-2"
                    >
                      <span className="text-xs text-[#475569]">{item}</span>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-28 rounded-lg border border-[#cbd5f5] bg-white px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                          placeholder="금액"
                        />
                        <input
                          className="w-32 rounded-lg border border-[#cbd5f5] bg-white px-2 py-1 text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
                          placeholder="비고"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">월별 결의서 목록</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              한눈에 보는 리스트
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
            총 4건
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  결의서 번호
                </th>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  제목
                </th>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  부서
                </th>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  기간
                </th>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  총액
                </th>
                <th className="border-b border-[#e2e8f0] px-3 py-3 text-[13px] font-semibold text-[#64748b]">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyRows.map((row) => (
                <tr key={row.id} className="odd:bg-[#f8fafc]">
                  <td className="border-b border-[#e2e8f0] px-3 py-4 font-semibold text-[#1e293b]">
                    {row.id}
                  </td>
                  <td className="border-b border-[#e2e8f0] px-3 py-4 text-[#475569]">
                    {row.title}
                  </td>
                  <td className="border-b border-[#e2e8f0] px-3 py-4 text-[#475569]">
                    {row.department}
                  </td>
                  <td className="border-b border-[#e2e8f0] px-3 py-4 text-[#475569]">
                    {row.period}
                  </td>
                  <td className="border-b border-[#e2e8f0] px-3 py-4 font-semibold text-[#4338ca]">
                    {row.total}
                  </td>
                  <td className="border-b border-[#e2e8f0] px-3 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e0f2fe] px-3 py-1 text-[12px] font-semibold text-[#0369a1]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[26px] border border-[#e0e7ff] bg-white/90 p-6 shadow-[0_20px_50px_rgba(79,70,229,0.18)]">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">상세 요약</p>
            <h2 className="font-[var(--font-space-grotesk)] text-[20px] font-bold text-[#312e81]">
              2월 공사 자재비 상세 보기
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-3 py-1 text-[12px] font-semibold text-[#b45309]">
            합계 2.08억
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {monthlyItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-4"
            >
              <p className="text-sm text-[#64748b]">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#4338ca]">
                {item.amount}
              </p>
              <p className="mt-1 text-xs text-[#94a3b8]">{item.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
