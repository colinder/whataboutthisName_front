import { useState, useEffect } from "react";
import config from "../../config";
import styles from "./RankSection.module.css";

const RankSection = ({ name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${config.API_URL}/search/name-rank/${encodeURIComponent(name)}`
        );
        const json = await res.json();
        setFound(json.found);
        setData(json.data || []);
      } catch (err) {
        console.error("순위 정보 조회 실패:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (!name) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>순위 정보</h2>
      <p className={styles.subtitle}>
        <span className={styles.bold}>{name}</span> 이름의 연도별 순위 및
        동명이인 수
      </p>

      <div style={{ minHeight: "300px" }}>
        {loading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : !found ? (
          <p className={styles.empty}>"{name}" 이름의 데이터가 없습니다.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} rowSpan={2}>
                  연도
                </th>
                <th className={styles.thMale} colSpan={3}>
                  남아
                </th>
                <th className={styles.thFemale} colSpan={3}>
                  여아
                </th>
              </tr>
              <tr>
                <th className={styles.thSubMale}>전체 수</th>
                <th className={styles.thSubMale}>순위</th>
                <th className={styles.thSubMale}>동명이인</th>
                <th className={styles.thSubFemale}>전체 수</th>
                <th className={styles.thSubFemale}>순위</th>
                <th className={styles.thSubFemale}>동명이인</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.year} className={styles.tr}>
                  <td className={`${styles.td} ${styles.year}`}>{row.year}</td>
                  <td className={styles.td}>
                    {row.male.total.toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    {row.male.rank ? `${row.male.rank}위` : "-"}
                  </td>
                  <td className={styles.td}>
                    {row.male.count > 0
                      ? `${row.male.count.toLocaleString()}명`
                      : "-"}
                  </td>
                  <td className={styles.td}>
                    {row.female.total.toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    {row.female.rank ? `${row.female.rank}위` : "-"}
                  </td>
                  <td className={styles.td}>
                    {row.female.count > 0
                      ? `${row.female.count.toLocaleString()}명`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RankSection;