import { useRef } from "react";
import styles from "./SearchSection.module.css";
// import searchIcon from "../../../assets/icons/Magnifier.svg";
import searchIcon from "../../assets/icons/Magnifier.svg";

const SearchSection = () => {
  const searchButtonRef = useRef(null);

  const handleSearch = () => {
    console.log("검색 동작");
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
      <div className={styles.searchBox}>
        <input
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
    </div>
  );
};

export default SearchSection;
