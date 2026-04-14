import { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import styles from "./CalendarSection.module.css";
import config from "../../config";

const { API_URL } = config;
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => currentYear - i
);

const CalendarSection = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/search/crawl-status?year=${selectedYear}`
        );
        const json = await res.json();

        // ActivityCalendar 형식에 맞게 변환
        // 시작일과 끝일이 반드시 있어야 함
        const startDate = `${selectedYear}-01-01`;
        const endDate = `${selectedYear}-12-31`;

        const dateMap = {};
        json.data.forEach((item) => {
          dateMap[item.date] = item;
        });

        // 1년치 전체 날짜 생성
        const fullData = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split("T")[0];
          const item = dateMap[dateStr];
          fullData.push({
            date: dateStr,
            count: item ? item.count : 0,
            level: item ? item.level : 0,
          });
        }

        setCalendarData(fullData);
        setTotalDays(json.total_days);
      } catch (err) {
        console.error("수집 현황 조회 실패:", err);
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
        {/* {totalDays > 0 && (
          <span className={styles.statusBadge}>
            {selectedYear}년 {totalDays}일 수집 완료
          </span>
        )} */}
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
          <p className={styles.loading}>불러오는 중...</p>
        ) : (
          calendarData.length > 0 && (
            <ActivityCalendar
              data={calendarData}
              theme={{
                light: [
                  "#f6f7f8",
                  "#c6e48b",
                  "#7bc96f",
                  "#239a3b",
                  "#1F2837",
                ],
                dark: [
                  "#333",
                  "#0e4429",
                  "#006d32",
                  "#26a641",
                  "#39d353",
                ],
              }}
              labels={{
                months: [
                  "1월", "2월", "3월", "4월", "5월", "6월",
                  "7월", "8월", "9월", "10월", "11월", "12월",
                ],
                weekdays: ["일", "월", "화", "수", "목", "금", "토"],
                totalCount: "{{count}}회 수집 완료",
                legend: { less: "적음", more: "많음" },
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