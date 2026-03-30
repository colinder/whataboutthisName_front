import styles from "./NameInfoSection.module.css";

const NameInfoSection = ({ name }) => {
  const mockInfo = {
    name: name,
    hanja: "民俊",
    meaning: "백성 민, 준걸 준. 백성 중에 뛰어난 사람이라는 뜻.",
    gender: "남아",
  };

  return (
    <div className={styles.section}>
      <div className={styles.nameBox}>
        <h1 className={styles.name}>{mockInfo.name}</h1>
        <span className={styles.hanja}>{mockInfo.hanja}</span>
      </div>
      <p className={styles.meaning}>{mockInfo.meaning}</p>
    </div>
  );
};

export default NameInfoSection;
