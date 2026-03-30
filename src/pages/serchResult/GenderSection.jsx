import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./GenderSection.module.css";

const mockData = [
  { name: "남아", value: 6234 },
  { name: "여아", value: 1823 },
];

const COLORS = ["var(--color-male)", "var(--color-female)"];

const GenderSection = ({ name }) => {
  const total = mockData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>성별 통계</h2>
      <p className={styles.subtitle}>
        <span className={styles.bold}>{name}</span> 이름의 성별 분포 (전체 기준)
      </p>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
            >
              {mockData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => v.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.statsWrapper}>
          {mockData.map((item, index) => (
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
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderSection;
