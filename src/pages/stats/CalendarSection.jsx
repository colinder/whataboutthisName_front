import { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import styles from "./CalendarSection.module.css";
import cstyles from "../Common.module.css";
import config from "../../config";

const { API_URL } = config;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => currentYear - i,
);

const CalendarSection = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ API 경로 변경: /search/calendar
        const res = await fetch(
          `${API_URL}/search/calendar?year=${selectedYear}`,
        );
        const data = await res.json();

        // ✅ 1년치 전체 날짜 생성
        const startDate = `${selectedYear}-01-01`;
        const endDate = `${selectedYear}-12-31`;

        const dateMap = {};
        data.forEach((item) => {
          dateMap[item.date] = item;
        });

        // 1년치 전체 날짜 생성
        const fullData = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split("T")[0];
          const item = dateMap[dateStr];

          if (item) {
            fullData.push({
              date: dateStr,
              count: item.display_count, // ✅ display_count 사용 (1)
              level: item.level,
              actualCount: item.count, // ✅ 실제 개수 저장 (툴팁용)
            });
          } else {
            fullData.push({
              date: dateStr,
              count: 0,
              level: 0,
              actualCount: 0,
            });
          }
        }

        setCalendarData(fullData);
      } catch (err) {
        console.error("캘린더 데이터 로딩 실패:", err);
        setCalendarData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>데이터 수집 현황</h2>
      <p className={styles.subtitle}>
        데이터가 정상적으로 수집된 날짜를 표시합니다.
      </p>

      <div className={styles.yearTabs}>
        {years.map((y) => (
          <button
            key={y}
            className={`${styles.yearTab} ${
              selectedYear === y ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <div className={styles.calendarWrapper} style={{ minHeight: "200px" }}>
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
          calendarData.length > 0 && (
            <ActivityCalendar
              data={calendarData}
              theme={{
                light: [
                  "#f6f7f8", // level 0: 미수집
                  "#c6e48b", // level 1: (사용 안 함)
                  "#7bc96f", // level 2: (사용 안 함)
                  "#239a3b", // level 3: 부분 수집 (1~47개 또는 1~50개)
                  "#1F2837", // level 4: 완전 수집 (48개 이상 또는 51개 이상)
                ],
                dark: ["#333", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              labels={{
                months: [
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월",
                ],
                weekdays: ["일", "월", "화", "수", "목", "금", "토"],
                totalCount: "총 {{count}}일 수집 완료",
                legend: {
                  less: "미수집",
                  more: "완전수집",
                },
              }}
              fontSize={13}
              blockSize={14}
              blockGap={4}
              showWeekdayLabels
              hideColorLegend={false}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CalendarSection;
