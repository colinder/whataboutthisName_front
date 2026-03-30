import styles from "./RankSection.module.css";

const currentYear = new Date().getFullYear();

const generateMockData = () =>
  Array.from({ length: currentYear - 2008 + 1 }, (_, i) => {
    const year = 2008 + i;
    const maleTotal = Math.floor(Math.random() * 200000 + 100000);
    const femaleTotal = Math.floor(Math.random() * 200000 + 100000);
    const maleCount =
      Math.random() > 0.2 ? Math.floor(Math.random() * 500 + 1) : 0;
    const femaleCount =
      Math.random() > 0.6 ? Math.floor(Math.random() * 200 + 1) : 0;

    return {
      year,
      male: {
        total: maleTotal,
        rank: maleCount > 0 ? Math.floor(Math.random() * 300 + 1) : null,
        count: maleCount,
      },
      female: {
        total: femaleTotal,
        rank: femaleCount > 0 ? Math.floor(Math.random() * 300 + 1) : null,
        count: femaleCount,
      },
    };
  }).reverse();

const mockData = generateMockData();

const RankSection = ({ name }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>순위 정보</h2>
      <p className={styles.subtitle}>
        <span className={styles.bold}>{name}</span> 이름의 연도별 순위 및
        동명이인 수
      </p>

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
          {mockData.map((row) => (
            <tr key={row.year} className={styles.tr}>
              <td className={`${styles.td} ${styles.year}`}>{row.year}</td>
              <td className={styles.td}>{row.male.total.toLocaleString()}</td>
              <td className={styles.td}>
                {row.male.rank ? `${row.male.rank}위` : "-"}
              </td>
              <td className={styles.td}>{row.male.count.toLocaleString()}명</td>
              <td className={styles.td}>{row.female.total.toLocaleString()}</td>
              <td className={styles.td}>
                {row.female.rank ? `${row.female.rank}위` : "-"}
              </td>
              <td className={styles.td}>
                {row.female.count.toLocaleString()}명
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankSection;
