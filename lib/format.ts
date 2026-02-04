function buildKoreanAmount(amount: number) {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  const eok = Math.floor(abs / 100_000_000);
  const restAfterEok = abs % 100_000_000;
  const cheonMan = Math.floor(restAfterEok / 10_000_000);
  const baekMan = Math.floor((restAfterEok % 10_000_000) / 1_000_000);
  const sipMan = Math.floor((restAfterEok % 1_000_000) / 100_000);
  const man = Math.floor((restAfterEok % 100_000) / 10_000);

  const parts: string[] = [];

  if (eok > 0) parts.push(`${eok}억`);
  if (cheonMan > 0) parts.push(`${cheonMan}천`);
  if (baekMan > 0) parts.push(`${baekMan}백`);
  if (sipMan > 0) parts.push(`${sipMan}십`);
  if (man > 0) parts.push(`${man}`);

  if (parts.length === 0) {
    if (abs >= 1000) {
      const cheon = Math.floor(abs / 1000);
      return `${sign}${cheon}천`;
    }
    return `${sign}${abs.toLocaleString("ko-KR")}원`;
  }

  const hasManUnit = cheonMan + baekMan + sipMan + man > 0;
  return `${sign}${parts.join("")}${hasManUnit ? "만" : ""}`;
}

export function formatKRWUnit(amount: number) {
  return buildKoreanAmount(amount);
}

export function formatKRW(amount: number) {
  const formatted = amount.toLocaleString("ko-KR");
  return `${formatted}원 (${formatKRWUnit(amount)})`;
}

export function formatKRWShort(amount: number) {
  return amount.toLocaleString("ko-KR");
}
