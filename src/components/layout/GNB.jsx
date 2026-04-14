import { useNavigate, useLocation } from "react-router-dom";
import styles from "./GNB.module.css";
import Button from "../ui/Button";

const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome =
    location.pathname === "/" || location.pathname.startsWith("/result");
  const isStats = location.pathname === "/stats";

  return (
    <nav className={styles.gnb}>
      <div className={styles.gnbInner}>
        <Button
          label="홈"
          width={74}
          height={36}
          reversed={!isHome}
          onClick={() => navigate("/")}
        />
        <Button
          label="통계"
          width={74}
          height={36}
          reversed={!isStats}
          onClick={() => navigate("/stats")}
        />
      </div>
    </nav>
  );
};

export default GNB;
