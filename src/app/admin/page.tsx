"use client";

import { ChangeEvent, useMemo, useState } from "react";

const EVENT_COLUMN_CANDIDATES = [
  "logType",
  "log_type",
  "event_name",
  "eventName",
  "type",
  "name",
];

const TIME_COLUMN_CANDIDATES = [
  "client_time_utc",
  "created_at",
  "createdAt",
  "date",
  "time",
  "timestamp",
];

const USER_COLUMN_CANDIDATES = [
  "user_id",
  "userId",
  "gamer_id",
  "gamerId",
  "owner_inDate",
  "ownerInDate",
  "inDate",
  "uuid",
];

const RESULT_COLUMN_CANDIDATES = [
  "result",
  "status",
  "purchase_result",
  "ad_result",
];

const MATCH_COLUMN_CANDIDATES = ["match_id", "matchId"];

const TARGET_EVENTS = [
  "match_start",
  "match_result",
  "match_leave",
  "ad_reward",
  "iap_purchase",
  "subscription",
] as const;

type CsvRow = Record<string, string>;

type ParsedCsv = {
  headers: string[];
  rows: CsvRow[];
};

type DetectedColumns = {
  event?: string;
  time?: string;
  user?: string;
  result?: string;
  match?: string;
};

type Message = {
  type: "error" | "warning" | "info";
  text: string;
};

type Counts = {
  totalRows: number;
  scopedRows: number;
  analyzedRows: number;
  match_start_count: number;
  match_result_count: number;
  match_leave_count: number;
  ad_reward_count: number;
  ad_reward_success_count: number | null;
  iap_purchase_count: number;
  iap_purchase_success_count: number | null;
  subscription_count: number;
  subscription_success_count: number | null;
};

type NumericValue = {
  value: number | null;
  source: "auto" | "manual" | "unavailable";
  note?: string;
  reason?: string;
};

type DateSummary = {
  date: string;
  dau: number | null;
  counts: Counts;
};

type AnalysisResult = {
  fileName: string;
  detected: DetectedColumns;
  messages: Message[];
  counts: Counts;
  basisDate?: string;
  dau: NumericValue;
  d1Retention: NumericValue;
  d7Retention: NumericValue;
  dateSummaries: DateSummary[];
};

const emptyCounts = (
  totalRows = 0,
  scopedRows = 0,
  resultColumnExists = false,
): Counts => ({
  totalRows,
  scopedRows,
  analyzedRows: 0,
  match_start_count: 0,
  match_result_count: 0,
  match_leave_count: 0,
  ad_reward_count: 0,
  ad_reward_success_count: resultColumnExists ? 0 : null,
  iap_purchase_count: 0,
  iap_purchase_success_count: resultColumnExists ? 0 : null,
  subscription_count: 0,
  subscription_success_count: resultColumnExists ? 0 : null,
});

const targetEventSet = new Set<string>(TARGET_EVENTS);

export default function AdminPage() {
  const [parsedCsv, setParsedCsv] = useState<ParsedCsv | null>(null);
  const [fileName, setFileName] = useState("");
  const [parseMessage, setParseMessage] = useState<Message | null>(null);
  const [analysisDate, setAnalysisDate] = useState("");
  const [manualDau, setManualDau] = useState("");
  const [manualD1Retention, setManualD1Retention] = useState("");
  const [manualD7Retention, setManualD7Retention] = useState("");

  const analysis = useMemo(() => {
    if (!parsedCsv) {
      return null;
    }

    return analyzeCsv({
      parsedCsv,
      fileName,
      analysisDate,
      manualDau,
      manualD1Retention,
      manualD7Retention,
    });
  }, [
    analysisDate,
    fileName,
    manualD1Retention,
    manualD7Retention,
    manualDau,
    parsedCsv,
  ]);

  const messages = [
    ...(parseMessage ? [parseMessage] : []),
    ...(analysis?.messages ?? []),
  ];

  const metricCards = buildMetricCards(analysis);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setParseMessage(null);
    setParsedCsv(null);
    setFileName("");

    if (!file) {
      return;
    }

    const isCsv =
      file.name.toLowerCase().endsWith(".csv") ||
      file.type.includes("csv") ||
      file.type === "application/vnd.ms-excel";

    if (!isCsv) {
      setParseMessage({
        type: "error",
        text: "CSV 파일이 아닙니다. .csv 파일을 선택해주세요.",
      });
      event.target.value = "";
      return;
    }

    try {
      const text = await file.text();
      const parsed = parseCsv(text);
      setParsedCsv(parsed);
      setFileName(file.name);
    } catch (error) {
      setParseMessage({
        type: "error",
        text: `CSV 파싱 실패: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`,
      });
      event.target.value = "";
    }
  };

  return (
    <main className="min-h-screen px-5 pb-16 pt-28 sm:px-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-yellow-300">
            Admin
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Blood! Metrics Admin
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
              뒤끝 GameLog CSV를 업로드하면 지표를 계산합니다. CSV는 브라우저
              메모리에서만 읽고 서버로 업로드하거나 저장하지 않습니다.
            </p>
          </div>
        </div>

        <section className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <label className="space-y-2 text-sm text-neutral-300 md:col-span-2">
              <span className="font-bold text-white">CSV 파일 업로드</span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={(event) => void handleFileChange(event)}
                className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm text-white file:mr-3 file:rounded-md file:border-0 file:bg-neutral-200 file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-black"
              />
            </label>

            <label className="space-y-2 text-sm text-neutral-300">
              <span className="font-bold text-white">분석 날짜 선택</span>
              <input
                type="date"
                value={analysisDate}
                onChange={(event) => setAnalysisDate(event.target.value)}
                className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm text-white"
              />
            </label>

            <label className="space-y-2 text-sm text-neutral-300">
              <span className="font-bold text-white">DAU 수동 입력</span>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={manualDau}
                onChange={(event) => setManualDau(event.target.value)}
                placeholder="선택 사항"
                className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm text-white placeholder:text-neutral-600"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
              <label className="space-y-2 text-sm text-neutral-300">
                <span className="font-bold text-white">
                  D1 Retention 수동 입력 (%)
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  inputMode="decimal"
                  value={manualD1Retention}
                  onChange={(event) => setManualD1Retention(event.target.value)}
                  placeholder="선택 사항"
                  className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm text-white placeholder:text-neutral-600"
                />
              </label>

              <label className="space-y-2 text-sm text-neutral-300">
                <span className="font-bold text-white">
                  D7 Retention 수동 입력 (%)
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  inputMode="decimal"
                  value={manualD7Retention}
                  onChange={(event) => setManualD7Retention(event.target.value)}
                  placeholder="선택 사항"
                  className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2 text-sm text-white placeholder:text-neutral-600"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">분석 결과</h2>
              <p className="text-sm text-neutral-400">
                {analysis?.basisDate
                  ? `분석 기준일: ${analysis.basisDate}`
                  : "CSV를 선택하면 결과가 표시됩니다."}
              </p>
            </div>
            {fileName && (
              <p className="text-xs text-neutral-500">파일: {fileName}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metricCards.map((card) => (
              <article
                key={card.label}
                className="rounded-lg border border-neutral-800 bg-[#191919] p-5"
              >
                <p className="text-sm font-bold text-neutral-400">
                  {card.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </p>
                {card.note && (
                  <p className="mt-2 min-h-5 text-xs leading-5 text-neutral-500">
                    {card.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5">
            <h2 className="text-xl font-bold">이벤트 카운트</h2>
            <p className="mt-1 text-sm text-neutral-400">
              match_start, match_result, match_leave, ad_reward,
              iap_purchase, subscription 이벤트만 집계합니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-left text-neutral-400">
                    <th className="py-3 pr-4 font-bold">항목</th>
                    <th className="py-3 font-bold">값</th>
                  </tr>
                </thead>
                <tbody>
                  {buildCountRows(analysis).map((row) => (
                    <tr key={row.label} className="border-b border-neutral-900">
                      <td className="py-3 pr-4 text-neutral-300">
                        {row.label}
                      </td>
                      <td className="py-3 font-bold text-white">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5">
            <h2 className="text-xl font-bold">오류/경고 메시지</h2>
            <div className="mt-4 space-y-2">
              {messages.length === 0 ? (
                <p className="rounded-md border border-neutral-800 bg-black/60 px-3 py-2 text-sm text-neutral-400">
                  표시할 오류나 경고가 없습니다.
                </p>
              ) : (
                messages.map((message, index) => (
                  <p
                    key={`${message.text}-${index}`}
                    className={`rounded-md border px-3 py-2 text-sm leading-6 ${
                      message.type === "error"
                        ? "border-red-900/70 bg-red-950/35 text-red-200"
                        : message.type === "warning"
                          ? "border-yellow-900/70 bg-yellow-950/35 text-yellow-100"
                          : "border-neutral-800 bg-black/60 text-neutral-300"
                    }`}
                  >
                    {message.text}
                  </p>
                ))
              )}
            </div>
          </div>
        </section>

        {analysis?.dateSummaries.length ? (
          <section className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5">
            <h2 className="text-xl font-bold">날짜별 요약</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-left text-neutral-400">
                    <th className="py-3 pr-4 font-bold">date</th>
                    <th className="py-3 pr-4 font-bold">dau</th>
                    <th className="py-3 pr-4 font-bold">match_start</th>
                    <th className="py-3 pr-4 font-bold">match_result</th>
                    <th className="py-3 pr-4 font-bold">match_leave</th>
                    <th className="py-3 pr-4 font-bold">ad_reward_success</th>
                    <th className="py-3 pr-4 font-bold">
                      iap_purchase_success
                    </th>
                    <th className="py-3 pr-4 font-bold">
                      subscription_success
                    </th>
                    <th className="py-3 pr-4 font-bold">match_start / dau</th>
                    <th className="py-3 pr-4 font-bold">
                      match_result / match_start
                    </th>
                    <th className="py-3 font-bold">
                      match_leave / match_start
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.dateSummaries.map((summary) => (
                    <tr key={summary.date} className="border-b border-neutral-900">
                      <td className="py-3 pr-4 text-neutral-300">
                        {summary.date}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatNullableInteger(summary.dau)}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatInteger(summary.counts.match_start_count)}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatInteger(summary.counts.match_result_count)}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatInteger(summary.counts.match_leave_count)}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatNullableInteger(
                          summary.counts.ad_reward_success_count,
                        )}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatNullableInteger(
                          summary.counts.iap_purchase_success_count,
                        )}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatNullableInteger(
                          summary.counts.subscription_success_count,
                        )}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatPerUser(
                          safeDivide(
                            summary.counts.match_start_count,
                            summary.dau,
                          ),
                        )}
                      </td>
                      <td className="py-3 pr-4 font-bold text-white">
                        {formatPercent(
                          safeDivide(
                            summary.counts.match_result_count,
                            summary.counts.match_start_count,
                          ),
                        )}
                      </td>
                      <td className="py-3 font-bold text-white">
                        {formatPercent(
                          safeDivide(
                            summary.counts.match_leave_count,
                            summary.counts.match_start_count,
                          ),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5">
          <h2 className="text-xl font-bold">감지된 컬럼</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
            <DetectedColumn label="이벤트명" value={analysis?.detected.event} />
            <DetectedColumn label="시간" value={analysis?.detected.time} />
            <DetectedColumn label="유저" value={analysis?.detected.user} />
            <DetectedColumn label="결과" value={analysis?.detected.result} />
            <DetectedColumn label="매치 ID" value={analysis?.detected.match} />
          </dl>
        </section>
      </section>
    </main>
  );
}

function DetectedColumn({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-md border border-neutral-800 bg-black/60 px-3 py-2">
      <dt className="text-xs font-bold text-neutral-500">{label}</dt>
      <dd className="mt-1 text-neutral-200">{value ?? "-"}</dd>
    </div>
  );
}

function analyzeCsv({
  parsedCsv,
  fileName,
  analysisDate,
  manualDau,
  manualD1Retention,
  manualD7Retention,
}: {
  parsedCsv: ParsedCsv;
  fileName: string;
  analysisDate: string;
  manualDau: string;
  manualD1Retention: string;
  manualD7Retention: string;
}): AnalysisResult {
  const messages: Message[] = [];
  const detected = detectColumns(parsedCsv.headers);
  const dateKeys = detected.time
    ? parsedCsv.rows.map((row) => toDateKey(row[detected.time as string]))
    : parsedCsv.rows.map(() => null);
  const sortedDates = Array.from(
    new Set(dateKeys.filter((dateKey): dateKey is string => Boolean(dateKey))),
  ).sort();
  const basisDate = analysisDate || sortedDates.at(-1);
  const resultColumnExists = Boolean(detected.result);

  const manualDauValue = parseManualDau(manualDau, messages);
  const manualD1Value = parseManualRetention(
    manualD1Retention,
    "D1 Retention",
    messages,
  );
  const manualD7Value = parseManualRetention(
    manualD7Retention,
    "D7 Retention",
    messages,
  );

  if (!detected.event) {
    messages.push({
      type: "error",
      text: "이벤트명 컬럼을 찾을 수 없습니다.",
    });
  }

  if (!detected.result) {
    messages.push({
      type: "warning",
      text: "result 컬럼이 없어 success 계산이 제한됩니다.",
    });
  }

  if (analysisDate && !detected.time) {
    messages.push({
      type: "warning",
      text: "날짜 컬럼이 없어 선택한 분석 날짜로 필터링할 수 없습니다.",
    });
  }

  if (!detected.time) {
    messages.push({
      type: "warning",
      text: "날짜 컬럼이 없어 날짜별 요약을 숨겼습니다.",
    });
  }

  const scopedRows = parsedCsv.rows.filter((_, index) => {
    if (!basisDate || !detected.time) {
      return true;
    }

    return dateKeys[index] === basisDate;
  });

  const counts = detected.event
    ? countEvents(scopedRows, detected, parsedCsv.rows.length)
    : emptyCounts(parsedCsv.rows.length, scopedRows.length, resultColumnExists);

  if (detected.event && counts.analyzedRows === 0) {
    messages.push({
      type: "warning",
      text: "분석 가능한 이벤트가 없습니다.",
    });
  }

  const dau = resolveDau({
    rows: parsedCsv.rows,
    detected,
    dateKeys,
    basisDate,
    manualValue: manualDauValue,
  });

  if (dau.source === "manual") {
    messages.push({
      type: "info",
      text: "DAU는 수동 입력값 사용 중입니다.",
    });
  }

  if (dau.source === "unavailable") {
    messages.push({
      type: "warning",
      text: `DAU 계산 불가: ${dau.reason ?? "알 수 없는 사유"}`,
    });
  }

  const d1Retention = resolveRetention({
    rows: parsedCsv.rows,
    detected,
    dateKeys,
    sortedDates,
    basisDate,
    daysAfter: 1,
    manualValue: manualD1Value,
  });

  const d7Retention = resolveRetention({
    rows: parsedCsv.rows,
    detected,
    dateKeys,
    sortedDates,
    basisDate,
    daysAfter: 7,
    manualValue: manualD7Value,
  });

  if (d1Retention.source === "unavailable") {
    messages.push({
      type: "warning",
      text: `D1 Retention 계산 불가: ${
        d1Retention.reason ?? "알 수 없는 사유"
      }`,
    });
  }

  if (d7Retention.source === "unavailable") {
    messages.push({
      type: "warning",
      text: `D7 Retention 계산 불가: ${
        d7Retention.reason ?? "알 수 없는 사유"
      }`,
    });
  }

  const dateSummaries = detected.time
    ? buildDateSummaries(parsedCsv.rows, detected, dateKeys, sortedDates)
    : [];

  return {
    fileName,
    detected,
    messages,
    counts,
    basisDate,
    dau,
    d1Retention,
    d7Retention,
    dateSummaries,
  };
}

function parseCsv(text: string): ParsedCsv {
  const records: string[][] = [];
  let row: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          value += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        value += char;
      }

      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      records.push(row);
      row = [];
      value = "";
    } else if (char === "\r") {
      if (text[index + 1] === "\n") {
        index += 1;
      }
      row.push(value);
      records.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (inQuotes) {
    throw new Error("닫히지 않은 따옴표가 있습니다.");
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    records.push(row);
  }

  const nonEmptyRecords = records.filter((record) =>
    record.some((cell) => cell.trim() !== ""),
  );

  if (nonEmptyRecords.length === 0) {
    throw new Error("비어 있는 CSV입니다.");
  }

  const headers = normalizeHeaders(nonEmptyRecords[0]);
  const rows = nonEmptyRecords.slice(1).map((record) =>
    headers.reduce<CsvRow>((acc, header, index) => {
      acc[header] = (record[index] ?? "").trim();
      return acc;
    }, {}),
  );

  return { headers, rows };
}

function normalizeHeaders(headers: string[]) {
  const seen = new Map<string, number>();

  return headers.map((header, index) => {
    const cleaned = header.replace(/^\uFEFF/, "").trim() || `column_${index + 1}`;
    const seenCount = seen.get(cleaned) ?? 0;
    seen.set(cleaned, seenCount + 1);

    return seenCount === 0 ? cleaned : `${cleaned}_${seenCount + 1}`;
  });
}

function detectColumns(headers: string[]): DetectedColumns {
  return {
    event: findColumn(headers, EVENT_COLUMN_CANDIDATES),
    time: findColumn(headers, TIME_COLUMN_CANDIDATES),
    user: findColumn(headers, USER_COLUMN_CANDIDATES),
    result: findColumn(headers, RESULT_COLUMN_CANDIDATES),
    match: findColumn(headers, MATCH_COLUMN_CANDIDATES),
  };
}

function findColumn(headers: string[], candidates: string[]) {
  const exact = candidates.find((candidate) => headers.includes(candidate));

  if (exact) {
    return exact;
  }

  const lowerHeaderMap = new Map(
    headers.map((header) => [header.toLowerCase(), header]),
  );

  for (const candidate of candidates) {
    const found = lowerHeaderMap.get(candidate.toLowerCase());

    if (found) {
      return found;
    }
  }

  return undefined;
}

function countEvents(
  rows: CsvRow[],
  detected: DetectedColumns,
  totalRows: number,
): Counts {
  const counts = emptyCounts(totalRows, rows.length, Boolean(detected.result));

  if (!detected.event) {
    return counts;
  }

  for (const row of rows) {
    const eventName = row[detected.event].trim().toLowerCase();

    if (!targetEventSet.has(eventName)) {
      continue;
    }

    counts.analyzedRows += 1;

    if (eventName === "match_start") {
      counts.match_start_count += 1;
    } else if (eventName === "match_result") {
      counts.match_result_count += 1;
    } else if (eventName === "match_leave") {
      counts.match_leave_count += 1;
    } else if (eventName === "ad_reward") {
      counts.ad_reward_count += 1;
      if (isSuccess(row, detected.result)) {
        counts.ad_reward_success_count =
          (counts.ad_reward_success_count ?? 0) + 1;
      }
    } else if (eventName === "iap_purchase") {
      counts.iap_purchase_count += 1;
      if (isSuccess(row, detected.result)) {
        counts.iap_purchase_success_count =
          (counts.iap_purchase_success_count ?? 0) + 1;
      }
    } else if (eventName === "subscription") {
      counts.subscription_count += 1;
      if (isSuccess(row, detected.result)) {
        counts.subscription_success_count =
          (counts.subscription_success_count ?? 0) + 1;
      }
    }
  }

  return counts;
}

function isSuccess(row: CsvRow, resultColumn?: string) {
  if (!resultColumn) {
    return false;
  }

  return row[resultColumn].trim().toLowerCase() === "success";
}

function resolveDau({
  rows,
  detected,
  dateKeys,
  basisDate,
  manualValue,
}: {
  rows: CsvRow[];
  detected: DetectedColumns;
  dateKeys: Array<string | null>;
  basisDate?: string;
  manualValue: number | null;
}): NumericValue {
  if (manualValue !== null) {
    return {
      value: manualValue,
      source: "manual",
      note: "DAU는 수동 입력값 사용 중",
    };
  }

  if (!detected.user) {
    return { value: null, source: "unavailable", reason: "유저 컬럼 없음" };
  }

  if (!detected.time) {
    return { value: null, source: "unavailable", reason: "날짜 컬럼 없음" };
  }

  if (!basisDate) {
    return { value: null, source: "unavailable", reason: "기준일 없음" };
  }

  const uniqueUsers = new Set<string>();

  rows.forEach((row, index) => {
    const userId = row[detected.user as string]?.trim();

    if (userId && dateKeys[index] === basisDate) {
      uniqueUsers.add(userId);
    }
  });

  return {
    value: uniqueUsers.size,
    source: "auto",
    note: `${basisDate} 자동 계산`,
  };
}

function resolveRetention({
  rows,
  detected,
  dateKeys,
  sortedDates,
  basisDate,
  daysAfter,
  manualValue,
}: {
  rows: CsvRow[];
  detected: DetectedColumns;
  dateKeys: Array<string | null>;
  sortedDates: string[];
  basisDate?: string;
  daysAfter: 1 | 7;
  manualValue: number | null;
}): NumericValue {
  if (manualValue !== null) {
    return {
      value: manualValue,
      source: "manual",
      note: "수동 입력값 사용 중",
    };
  }

  if (!detected.user) {
    return { value: null, source: "unavailable", reason: "유저 컬럼 없음" };
  }

  if (!detected.time) {
    return { value: null, source: "unavailable", reason: "날짜 컬럼 없음" };
  }

  if (sortedDates.length < 2) {
    return { value: null, source: "unavailable", reason: "날짜 범위 부족" };
  }

  if (!basisDate) {
    return { value: null, source: "unavailable", reason: "기준일 없음" };
  }

  const targetDate = addDays(basisDate, daysAfter);

  if (!sortedDates.includes(targetDate)) {
    return { value: null, source: "unavailable", reason: "날짜 범위 부족" };
  }

  const firstDateByUser = new Map<string, string>();
  const activityByUser = new Map<string, Set<string>>();

  rows.forEach((row, index) => {
    const dateKey = dateKeys[index];
    const userId = row[detected.user as string]?.trim();

    if (!dateKey || !userId) {
      return;
    }

    const currentFirstDate = firstDateByUser.get(userId);

    if (!currentFirstDate || dateKey < currentFirstDate) {
      firstDateByUser.set(userId, dateKey);
    }

    const userDates = activityByUser.get(userId) ?? new Set<string>();
    userDates.add(dateKey);
    activityByUser.set(userId, userDates);
  });

  const cohort = Array.from(firstDateByUser.entries())
    .filter(([, firstDate]) => firstDate === basisDate)
    .map(([userId]) => userId);

  if (cohort.length === 0) {
    return {
      value: null,
      source: "unavailable",
      reason: "기준일 cohort 없음",
    };
  }

  const returnedUsers = cohort.filter((userId) =>
    activityByUser.get(userId)?.has(targetDate),
  );

  return {
    value: returnedUsers.length / cohort.length,
    source: "auto",
    note: "CSV 기준 추정치",
  };
}

function buildDateSummaries(
  rows: CsvRow[],
  detected: DetectedColumns,
  dateKeys: Array<string | null>,
  sortedDates: string[],
): DateSummary[] {
  return sortedDates.map((date) => {
    const rowsForDate = rows.filter((_, index) => dateKeys[index] === date);
    const uniqueUsers = new Set<string>();

    if (detected.user) {
      rowsForDate.forEach((row) => {
        const userId = row[detected.user as string]?.trim();

        if (userId) {
          uniqueUsers.add(userId);
        }
      });
    }

    return {
      date,
      dau: detected.user ? uniqueUsers.size : null,
      counts: countEvents(rowsForDate, detected, rows.length),
    };
  });
}

function buildMetricCards(analysis: AnalysisResult | null) {
  if (!analysis) {
    return [
      { label: "DAU", value: "-", note: "" },
      { label: "D1 Retention", value: "-", note: "" },
      { label: "D7 Retention", value: "-", note: "" },
      { label: "match_start / DAU", value: "-", note: "" },
      { label: "match_result / match_start", value: "-", note: "" },
      { label: "match_leave / match_start", value: "-", note: "" },
      { label: "ad_reward_success / DAU", value: "-", note: "" },
      { label: "iap_purchase_success / DAU", value: "-", note: "" },
      { label: "subscription_success / DAU", value: "-", note: "" },
    ];
  }

  const dauValue = analysis.dau.value;
  const counts = analysis.counts;

  return [
    {
      label: "DAU",
      value: formatNumericValue(analysis.dau, formatInteger),
      note: analysis.dau.note ?? analysis.dau.reason,
    },
    {
      label: "D1 Retention",
      value: formatNumericValue(analysis.d1Retention, formatPercent),
      note: analysis.d1Retention.note ?? analysis.d1Retention.reason,
    },
    {
      label: "D7 Retention",
      value: formatNumericValue(analysis.d7Retention, formatPercent),
      note: analysis.d7Retention.note ?? analysis.d7Retention.reason,
    },
    {
      label: "match_start / DAU",
      value: formatPerUser(safeDivide(counts.match_start_count, dauValue)),
      note: dauValue === 0 ? "DAU가 0입니다." : undefined,
    },
    {
      label: "match_result / match_start",
      value: formatPercent(
        safeDivide(counts.match_result_count, counts.match_start_count),
      ),
      note: counts.match_start_count === 0 ? "match_start가 0입니다." : undefined,
    },
    {
      label: "match_leave / match_start",
      value: formatPercent(
        safeDivide(counts.match_leave_count, counts.match_start_count),
      ),
      note: counts.match_start_count === 0 ? "match_start가 0입니다." : undefined,
    },
    {
      label: "ad_reward_success / DAU",
      value: formatPerUser(
        safeDivide(counts.ad_reward_success_count, dauValue),
      ),
      note: counts.ad_reward_success_count === null ? "result 컬럼 없음" : undefined,
    },
    {
      label: "iap_purchase_success / DAU",
      value: formatPerUser(
        safeDivide(counts.iap_purchase_success_count, dauValue),
      ),
      note:
        counts.iap_purchase_success_count === null ? "result 컬럼 없음" : undefined,
    },
    {
      label: "subscription_success / DAU",
      value: formatPerUser(
        safeDivide(counts.subscription_success_count, dauValue),
      ),
      note:
        counts.subscription_success_count === null
          ? "result 컬럼 없음"
          : undefined,
    },
  ];
}

function buildCountRows(analysis: AnalysisResult | null) {
  const counts =
    analysis?.counts ?? emptyCounts(0, 0, Boolean(analysis?.detected.result));

  return [
    { label: "전체 CSV row 수", value: formatInteger(counts.totalRows) },
    { label: "분석 대상 row 수", value: formatInteger(counts.analyzedRows) },
    { label: "match_start", value: formatInteger(counts.match_start_count) },
    { label: "match_result", value: formatInteger(counts.match_result_count) },
    { label: "match_leave", value: formatInteger(counts.match_leave_count) },
    { label: "ad_reward total", value: formatInteger(counts.ad_reward_count) },
    {
      label: "ad_reward success",
      value: formatNullableInteger(counts.ad_reward_success_count),
    },
    {
      label: "iap_purchase total",
      value: formatInteger(counts.iap_purchase_count),
    },
    {
      label: "iap_purchase success",
      value: formatNullableInteger(counts.iap_purchase_success_count),
    },
    {
      label: "subscription total",
      value: formatInteger(counts.subscription_count),
    },
    {
      label: "subscription success",
      value: formatNullableInteger(counts.subscription_success_count),
    },
  ];
}

function parseManualDau(value: string, messages: Message[]) {
  if (!value.trim()) {
    return null;
  }

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue < 0) {
    messages.push({
      type: "warning",
      text: "수동 DAU 입력값은 0 이상의 정수여야 합니다.",
    });
    return null;
  }

  return numberValue;
}

function parseManualRetention(
  value: string,
  label: string,
  messages: Message[],
) {
  if (!value.trim()) {
    return null;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0 || numberValue > 100) {
    messages.push({
      type: "warning",
      text: `${label} 수동 입력값은 0에서 100 사이의 숫자여야 합니다.`,
    });
    return null;
  }

  return numberValue / 100;
}

function toDateKey(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const dashMatch = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);

  if (dashMatch) {
    return dashMatch[1];
  }

  const slashMatch = trimmed.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);

  if (slashMatch) {
    return [
      slashMatch[1],
      slashMatch[2].padStart(2, "0"),
      slashMatch[3].padStart(2, "0"),
    ].join("-");
  }

  const parsedDate = new Date(trimmed);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString().slice(0, 10);
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function safeDivide(
  numerator: number | null | undefined,
  denominator: number | null | undefined,
) {
  if (
    numerator === null ||
    numerator === undefined ||
    denominator === null ||
    denominator === undefined ||
    denominator === 0
  ) {
    return null;
  }

  return numerator / denominator;
}

function formatNumericValue(
  metric: NumericValue,
  formatter: (value: number | null) => string,
) {
  if (metric.value === null) {
    return "계산 불가";
  }

  return formatter(metric.value);
}

function formatInteger(value: number | null) {
  if (value === null) {
    return "계산 불가";
  }

  return value.toLocaleString("ko-KR");
}

function formatNullableInteger(value: number | null) {
  return value === null ? "계산 불가" : formatInteger(value);
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${(value * 100).toFixed(1)}%`;
}

function formatPerUser(value: number | null) {
  if (value === null) {
    return "-";
  }

  return value.toFixed(2);
}
