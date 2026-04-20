import { useState, useEffect } from "react";
import styles from "./DataStatsSection.module.css";
import config from "../../config";

const { API_URL } = config;

const DataStatsSection = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/search/overview`);
        const json = await res.json();
        setApiData(json);
      } catch (err) {
        console.error("데이터 현황 조회 실패:", err);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatValue = (value) => {
    if (typeof value === "number") {
      return value.toLocaleString("ko-KR");
    }
    return value;
  };

  const getStats = () => {
    if (!apiData) return [];

    return [
      {
        title: "자료 집계 기간",
        value: "2008년부터",
      },
      {
        title: "전체 데이터 수",
        value: apiData.total_records,
      },
      {
        title: "업데이트 주기",
        value: "연 1회",
      },
      {
        title: "최근 업데이트 날짜",
        value: apiData.last_update_date || "정보 없음",
      },
      {
        title: "등록된 남아 수 (상위 20위 기준)",
        value: apiData.total_male_count,
      },
      {
        title: "등록된 여아 수 (상위 20위 기준)",
        value: apiData.total_female_count,
      },
    ];
  };

  const stats = getStats();

  return (
    <div className={styles.statsSection}>
      <h2 className={styles.statsTitle}>데이터 현황</h2>
      <div className={styles.sourceWrapper}>
        <p className={styles.statsSource}>
          *출처: 대한민국 대법원 전자가족관계등록시스템
        </p>
      </div>

      <div className={styles.cardWrapper}>
        {loading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : (
          stats.map((stat) => (
            <div key={stat.title} className={styles.card}>
              <p className={styles.cardTitle}>{stat.title}</p>
              <p className={styles.cardValue}>{formatValue(stat.value)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataStatsSection;