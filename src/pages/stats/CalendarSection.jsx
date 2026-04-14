import { useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import styles from "./CalendarSection.module.css";

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => currentYear - i,
);

const generateMockData = (year) => [
  { date: `${year}-01-01`, count: 0, level: 0 },
  { date: `${year}-01-15`, count: 1, level: 4 },
  { date: `${year}-03-10`, count: 1, level: 4 },
  { date: `${year}-06-05`, count: 1, level: 4 },
  { date: `${year}-09-20`, count: 1, level: 4 },
  { date: `${year}-12-31`, count: 0, level: 0 },
];

const CalendarSection = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

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
            className={`${styles.yearTab} ${selectedYear === y ? styles.activeTab : ""}`}
            onClick={() => setSelectedYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <div className={styles.calendarWrapper}>
        <ActivityCalendar
          data={generateMockData(selectedYear)}
          theme={{
            light: ["#f6f7f8", "#f6f7f8", "#f6f7f8", "#f6f7f8", "#1F2837"],
            dark: ["#333", "#333", "#333", "#333", "#ffffff"],
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
            totalCount: "{{count}}회 수집 완료",
            legend: { less: "", more: "" },
          }}
          fontSize={13}
          blockSize={14}
          blockGap={4}
          showWeekdayLabels
          hideColorLegend
        />
      </div>
    </div>
  );
};

export default CalendarSection;
