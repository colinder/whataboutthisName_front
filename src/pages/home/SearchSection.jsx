import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchSection.module.css";
import searchIcon from "../../assets/icons/Magnifier.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SearchSection = () => {
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputRef.current.value.trim()) {
      navigate(`/result/${inputRef.current.value.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchButtonRef.current.click();
    }
  };

  return (
    <div className={styles.searchSection}>
      <div className={styles.title}>
        이 <span className={styles.bold}>이름</span>은{" "}
        <span className={styles.bold}>어때요?</span>
      </div>
      <motion.div layoutId="search-box" className={styles.searchBox}>
        <div className={styles.searchBox}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="이름을 입력해주세요"
            onKeyDown={handleKeyDown}
          />
          <button
            ref={searchButtonRef}
            className={styles.searchButton}
            onClick={handleSearch}
          >
            <img src={searchIcon} alt="검색" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchSection;
