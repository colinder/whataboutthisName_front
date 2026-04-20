import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./Result.module.css";
import searchIcon from "../../assets/icons/Magnifier.svg";
import config from "../../config";
import PatternResultSection from "./PatternResultSection";
import RankSection from "./RankSection";
import ChartSection from "./ChartSection";
import GenderSection from "./GenderSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const Result = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const [searchType, setSearchType] = useState("normal");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!name) return;

    const checkNameExists = async () => {
      setLoading(true);
      try {
        // 검색 API로 이름 존재 여부 확인
        const res = await fetch(
          `${config.API_URL}/search?q=${encodeURIComponent(name)}`
        );
        const json = await res.json();
        
        setSearchType(json.type); // "pattern" or "normal"
        setSearchResults(json.results || []);
        
        // normal 타입인 경우에만 정확히 일치하는 이름 확인
        if (json.type === "normal") {
          const exactMatch = json.results?.some(r => r.name === name);
          setFound(exactMatch);
        }
      } catch (err) {
        console.error("이름 확인 실패:", err);
        setFound(false);
      } finally {
        setLoading(false);
      }
    };

    checkNameExists();
  }, [name]);

  const handleSearch = () => {
    if (inputRef.current.value.trim()) {
      navigate(`/result/${inputRef.current.value.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const sections = [
    <RankSection key="rank" name={name} />,
    <ChartSection key="chart" name={name} />,
    <GenderSection key="gender" name={name} />,
  ];

  return (
    <div className={styles.container}>
      <motion.div layoutId="search-box" className={styles.searchBox}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="이름을 입력해주세요"
          defaultValue={name}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          <img src={searchIcon} alt="검색" />
        </button>
      </motion.div>

      {loading ? (
        <div className={styles.loadingWrapper}>
          <p className={styles.loadingText}>데이터를 확인하는 중...</p>
        </div>
      ) : searchType === "pattern" ? (
        /* 패턴 검색 결과 */
        <PatternResultSection query={name} results={searchResults} />
      ) : !found ? (
        /* 일반 검색 - 데이터 없음 */
        <div className={styles.noDataWrapper}>
          <div className={styles.noDataIcon}>🔍</div>
          <h2 className={styles.noDataTitle}>
            "<span className={styles.nameHighlight}>{name}</span>" 이름의 데이터가 없습니다
          </h2>
          <p className={styles.noDataDescription}>
            해당 이름은 2008년 이후 출생신고 상위 20위 안에 포함되지 않았습니다.
          </p>
          <div className={styles.noDataHint}>
            <p>• 다른 이름으로 검색해보세요</p>
            <p>• 띄어쓰기 없이 정확하게 입력했는지 확인해주세요</p>
          </div>
        </div>
      ) : (
        /* 일반 검색 - 정상 데이터 표시 */
        sections.map((section, i) => (
          <motion.div
            key={name + i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ width: "100%" }}
          >
            {section}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Result;