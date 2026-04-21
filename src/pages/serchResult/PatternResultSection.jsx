// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./PatternResultSection.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

const PatternResultSection = ({ query, results }) => {
  const navigate = useNavigate();

  const handleNameClick = (name) => {
    navigate(`/result/${name}`);
  };

  if (!results || results.length === 0) {
    return (
      <div className={styles.section}>
        <h2 className={styles.title}>검색 결과</h2>
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <p className={styles.noResultsText}>
            "<span className={styles.queryHighlight}>{query}</span>" 검색 결과가 없습니다
          </p>
          <p className={styles.noResultsHint}>
            다른 검색어를 입력해보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        "<span className={styles.queryHighlight}>{query}</span>" 검색 결과
      </h2>
      <p className={styles.resultCount}>
        총 <strong>{results.length}</strong>개의 이름을 찾았습니다
      </p>
      
      <div className={styles.resultsGrid}>
        {results.map((result, i) => (
          <motion.div
            key={result.name}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={styles.resultCard}
            onClick={() => handleNameClick(result.name)}
          >
            <span className={styles.resultName}>{result.name}</span>
            <span className={styles.resultArrow}>→</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatternResultSection;