import { useState, useEffect } from "react";
import styles from "./DataStatsSection.module.css";
import cstyles from "../Common.module.css";
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
        value: "매일",
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
          *출처:{" "}
          <a
            href="https://stfamily.scourt.go.kr/st/StFrrStatcsView.do?pgmId=090000000025"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            대한민국 대법원 전자가족관계등록시스템
          </a>
        </p>
      </div>

      <div className={styles.cardWrapper}>
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
