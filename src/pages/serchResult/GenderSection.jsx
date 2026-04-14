import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import config from "../../config";
import styles from "./GenderSection.module.css";

const COLORS = ["var(--color-male)", "var(--color-female)"];

const GenderSection = ({ name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${config.API_URL}/search/name-gender/${encodeURIComponent(name)}`
        );
        const json = await res.json();
        setFound(json.found);
        setData(json.data || []);
      } catch (err) {
        console.error("성별 통계 조회 실패:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (!name) return null;

  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index],
  }));
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>성별 통계</h2>
      <p className={styles.subtitle}>
        <span className={styles.bold}>{name}</span> 이름의 성별 분포 (전체 기준)
      </p>

      <div style={{ minHeight: "280px" }}>
        {loading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : !found ? (
          <p className={styles.empty}>"{name}" 이름의 데이터가 없습니다.</p>
        ) : (
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={coloredData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                />
                <Tooltip formatter={(v) => v.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.statsWrapper}>
              {data.map((item, index) => (
                <div key={item.name} className={styles.statItem}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className={styles.statLabel}>{item.name}</span>
                  <span className={styles.statValue}>
                    {item.value.toLocaleString()}
                  </span>
                  <span className={styles.statPercent}>
                    ({total > 0
                      ? ((item.value / total) * 100).toFixed(1)
                      : "0.0"}
                    %)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderSection;