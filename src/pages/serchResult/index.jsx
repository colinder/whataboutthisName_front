import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./Result.module.css";
import NameInfoSection from "./NameInfoSection";
import ChartSection from "./ChartSection";
import RankSection from "./RankSection";
import GenderSection from "./GenderSection";
import searchIcon from "../../assets/icons/Magnifier.svg";

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

  const handleSearch = () => {
    if (inputRef.current.value.trim()) {
      navigate(`/result/${inputRef.current.value.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const sections = [
    // <NameInfoSection key="info" name={name} />,
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

      {sections.map((section, i) => (
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
      ))}
    </div>
  );
};

export default Result;
