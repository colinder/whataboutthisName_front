import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import config from "../../config";
import styles from "./ChartSection.module.css";

const LINES = ["전체", "남아", "여아"];
const getColor = (key) => {
  if (key === "전체") return "var(--color-cblack)";
  if (key === "남아") return "var(--color-male)";
  return "var(--color-female)";
};

const ChartSection = () => {
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState({
    전체: true,
    남아: true,
    여아: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.API_URL}/search/yearly`);
        const json = await res.json();
        setYearlyData(json.data);
      } catch (err) {
        console.error("연도별 통계 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleLine = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.section}>
      <div className={styles.chartBlock}>
        <h2 className={styles.title}>연도별 출생아 수 추이</h2>
        <p className={styles.subtitle}>
          2008년부터 현재까지 전체 · 남아 · 여아 등록 수
        </p>
        <div className={styles.toggleGroup}>
          {LINES.map((key) => (
            <button
              key={key}
              className={`${styles.toggleBtn} ${
                visible[key] ? styles.activeBtn : ""
              }`}
              style={
                visible[key]
                  ? {
                      backgroundColor: getColor(key),
                      borderColor: getColor(key),
                    }
                  : {}
              }
              onClick={() => toggleLine(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <div style={{ minHeight: "320px" }}>
          {loading ? (
            <p className={styles.loading}>불러오는 중...</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={yearlyData}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(31,40,55,0.1)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: "rgba(31,40,55,0.5)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "rgba(31,40,55,0.5)" }}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <Tooltip formatter={(v) => v.toLocaleString()} />
                {LINES.map((key) =>
                  visible[key] ? (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={getColor(key)}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.legendGroup}>
          {LINES.filter((key) => visible[key]).map((key) => (
            <div key={key} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: getColor(key) }}
              />
              <span>{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;