import styles from "./GuideSection.module.css";

const guides = [
  {
    title: "글자수 검색",
    headers: ["입력", "의미"],
    rows: [
      ["*", "한 글자 이름"],
      ["**", "두 글자 이름"],
      ["***", "세 글자 이름"],
    ],
  },
  {
    title: "초성 검색",
    headers: ["입력", "의미"],
    rows: [
      ["ㄷ", "초성이 ㄷ인 한 글자 이름"],
      ["ㅈㄱ", "초성이 ㅈㄱ인 두 글자 이름"],
      ["ㅅㅎㅁ", "초성이 ㅅㅎㅁ인 세 글자 이름"],
    ],
  },
  {
    title: "와일드카드 검색",
    headers: ["입력", "의미"],
    rows: [
      ["ㄷ*", "첫 글자 초성이 ㄷ인 두자 이름"],
      ["*ㄴ*", "가운데 초성이 ㄴ인 세자 이름"],
      ["*ㅎ**", "둘째 초성이 ㅎ인 네 글자 이름"],
    ],
  },
];

const GuideSection = () => {
  return (
    <div className={styles.guideSection}>
      <div className={styles.guideHeader}>
        <h2 className={styles.guideTitle}>검색 방법</h2>
        <p className={styles.guideSubtitle}>
          다양한 방법으로 검색할 수 있습니다.
        </p>
      </div>
      <div className={styles.cardWrapper}>
        {guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{guide.title}</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  {guide.headers.map((header) => (
                    <th key={header} className={styles.th}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.rows.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.tdLeft}>{row[0]}</td>
                    <td className={styles.tdRight}>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
