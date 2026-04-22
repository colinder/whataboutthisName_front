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

const ChartSection = ({ name }) => {
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState({
    전체: true,
    남아: true,
    여아: true,
  });

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${config.API_URL}/search/name-trend/${encodeURIComponent(name)}`,
        );
        const json = await res.json();
        setYearlyData(json.data || []);
      } catch (err) {
        console.error("이름 추이 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const toggleLine = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!name) return null;

  return (
    <div className={styles.section}>
      <div className={styles.chartBlock}>
        <h2 className={styles.title}>연도별 추이</h2>
        <p className={styles.subtitle}>
          <span className={styles.bold}>{name}</span> 이름의 연도별 전체 · 남아
          · 여아 등록 수
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
            <div className={styles.loadingContainer}>
              <div className={styles.loadingText}>
                {"불러오는 중입니다.".split("").map((char, index) => (
                  <span
                    key={index}
                    className={styles.loadingChar}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </div>
          ) : yearlyData.length > 0 ? (
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
                <Tooltip
                  formatter={(v) => `${v.toLocaleString()}명`}
                  itemSorter={(item) =>
                    ["전체", "남아", "여아"].indexOf(item.dataKey)
                  }
                />
                {LINES.map((key) =>
                  visible[key] ? (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={getColor(key)}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ) : null,
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className={styles.empty}>데이터가 없습니다.</p>
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
