import styles from "./Home.module.css";
import SearchSection from "./SearchSection";
import GuideSection from "./GuideSection";
import DataStatsSection from "./DataStatsSection";

const Home = () => {
  return (
    <div className={styles.container}>
      <SearchSection />
      <GuideSection />
      <DataStatsSection />
    </div>
  );
};

export default Home;
