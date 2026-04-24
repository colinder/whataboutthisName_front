import { useState, useEffect } from "react";
import config from "../../config";
import styles from "./RankingSection.module.css";
import cstyles from "../Common.module.css";

const PAGE_SIZE = 40;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => currentYear - i,
);

const getGenderColor = (g) => {
  if (g === "남자") return "var(--color-male)";
  if (g === "여자") return "var(--color-female)";
  return "var(--color-cblack)";
};

const RankingSection = () => {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("전체");
  const [month, setMonth] = useState("전체");
  const [gender, setGender] = useState("전체");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableMonths, setAvailableMonths] = useState([]);

  // 데이터 조회
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (year !== "전체") params.append("year", year);
        if (month !== "전체") params.append("month", parseInt(month));
        if (gender !== "전체") params.append("gender", gender);
        params.append("limit", "200");
        params.append("exclude_etc", true);

        const res = await fetch(
          `${config.API_URL}/search/statistics?${params.toString()}`,
        );
        const json = await res.json();

        setData(json.data || []);

        // 필터 옵션 업데이트
        if (json.filters?.options) {
          setAvailableMonths(json.filters.options.months || []);
        }
      } catch (err) {
        console.error("통계 조회 실패:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month, gender]);

  // 연도 변경 시 월 초기화
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth("전체");
    setPage(1);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.section}>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          ℹ️ 대법원 API는 각 조건당 상위 20개 이름만 제공합니다.
          <br />
          시도별·성별 데이터를 종합하여 최대한 많은 이름을 수집하고 있으나, 일부
          이름은 누락될 수 있습니다.
        </p>
      </div>

      <p className={styles.notice}>최대 상위 200개의 결과만 표시됩니다.</p>

      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>연도</span>
          <select
            className={styles.select}
            value={year}
            onChange={handleYearChange}
          >
            <option>전체</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>월</span>
          <select
            className={styles.select}
            value={month}
            onChange={handleMonthChange}
          >
            <option>전체</option>
            {(availableMonths.length > 0
              ? availableMonths
              : Array.from({ length: 12 }, (_, i) => i + 1)
            ).map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>성별</span>
          <div className={styles.genderGroup}>
            {["전체", "남자", "여자"].map((g) => (
              <button
                key={g}
                className={`${styles.genderBtn} ${
                  gender === g ? styles.active : ""
                }`}
                style={
                  gender === g
                    ? {
                        backgroundColor: getGenderColor(g),
                        borderColor: getGenderColor(g),
                      }
                    : {}
                }
                onClick={() => {
                  setGender(g);
                  setPage(1);
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ minHeight: "400px" }}>
        {loading ? (
          <div className={cstyles.loadingContainer}>
            <div className={cstyles.loadingText}>
              {"불러오는 중입니다.".split("").map((char, index) => (
                <span
                  key={index}
                  className={cstyles.loadingChar}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>순위</th>
                <th className={styles.th}>이름</th>
                <th className={`${styles.th} ${styles.right}`}>등록 수</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((item) => (
                  <tr key={item.rank}>
                    <td className={`${styles.td} ${styles.rank}`}>
                      {item.rank}
                    </td>
                    <td className={styles.td}>{item.name}</td>
                    <td className={`${styles.td} ${styles.right}`}>
                      {item.total_count.toLocaleString("ko-KR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className={styles.td} colSpan={3}>
                    조회된 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${
                page === p ? styles.activePage : ""
              }`}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default RankingSection;
