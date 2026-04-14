import { useState } from "react";
import styles from "./RankingSection.module.css";

const PAGE_SIZE = 40;
const MAX_COUNT = 200;

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => currentYear - i,
);

const allData = Array.from({ length: MAX_COUNT }, (_, i) => ({
  name: "민준",
  gender: i % 2 === 0 ? "남" : "여",
  count: Math.floor(Math.random() * 10000),
}));
// eslint-disable-next-line no-unused-vars
const maleData = Array.from({ length: MAX_COUNT }, (_, i) => ({
  name: "민준",
  gender: "남",
  count: Math.floor(Math.random() * 10000),
}));
// eslint-disable-next-line no-unused-vars
const femaleData = Array.from({ length: MAX_COUNT }, (_, i) => ({
  name: "서연",
  gender: "여",
  count: Math.floor(Math.random() * 10000),
}));

const getRankedData = (data) =>
  [...data]
    .sort((a, b) => b.count - a.count)
    .map((item, i) => ({
      ...item,
      rank: i + 1,
      count: item.count.toLocaleString("ko-KR"),
    }));

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

  const getSourceData = () => {
    if (gender === "남자") return getRankedData(maleData);
    if (gender === "여자") return getRankedData(femaleData);
    return getRankedData(allData);
  };

  const filtered = getSourceData();

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.section}>
      <p className={styles.notice}>최대 상위 200개의 결과만 표시됩니다.</p>

      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>연도</span>
          <select
            className={styles.select}
            value={year}
            onChange={handleFilterChange(setYear)}
          >
            <option>전체</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>월</span>
          <select
            className={styles.select}
            value={month}
            onChange={handleFilterChange(setMonth)}
          >
            <option>전체</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1}>{i + 1}월</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>성별</span>
          <div className={styles.genderGroup}>
            {["전체", "남자", "여자"].map((g) => (
              <button
                key={g}
                className={`${styles.genderBtn} ${gender === g ? styles.active : ""}`}
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

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>순위</th>
            <th className={styles.th}>이름</th>
            <th className={styles.th}>성별</th>
            <th className={`${styles.th} ${styles.right}`}>등록 수</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item) => (
            <tr key={item.rank}>
              <td className={`${styles.td} ${styles.rank}`}>{item.rank}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>
                <span
                  className={
                    item.gender === "남" ? styles.badgeMale : styles.badgeFemale
                  }
                >
                  {item.gender}
                </span>
              </td>
              <td className={`${styles.td} ${styles.right}`}>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
            className={`${styles.pageBtn} ${page === p ? styles.activePage : ""}`}
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
    </div>
  );
};

export default RankingSection;
