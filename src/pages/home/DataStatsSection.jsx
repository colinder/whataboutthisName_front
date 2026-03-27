import styles from "./DataStatsSection.module.css";

const stats = [
  { title: "자료 집계 기간", value: "2008년부터" },
  { title: "전체 데이터 수", value: 7390490 },
  { title: "업데이트 주기", value: "연 1회" },
  { title: "최근 업데이트 날짜", value: "2024.01.01" },
  { title: "등록된 남아 수", value: 3812045 },
  { title: "등록된 여아 수", value: 3578445 },
];

const formatValue = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString("ko-KR");
  }
  return value;
};

const DataStatsSection = () => {
  return (
    <div className={styles.statsSection}>
      <h2 className={styles.statsTitle}>데이터 현황</h2>
      <div className={styles.sourceWrapper}>
        <p className={styles.statsSource}>
          *출처: 대한민국 대법원 전자가족관계등록시스템
        </p>
      </div>
      <div className={styles.cardWrapper}>
        {stats.map((stat) => (
          <div key={stat.title} className={styles.card}>
            <p className={styles.cardTitle}>{stat.title}</p>
            <p className={styles.cardValue}>{formatValue(stat.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataStatsSection;
