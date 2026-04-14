import styles from "./Stats.module.css";
import RankingSection from "./RankingSection";
import ChartSection from "./ChartSection";
import CalendarSection from "./CalendarSection";

const Stats = () => {
  return (
    <div className={styles.container}>
      <RankingSection />
      <ChartSection />
      <CalendarSection />
    </div>
  );
};

export default Stats;
