import { useNavigate, useLocation } from "react-router-dom";
import styles from "./GNB.module.css";
import Button from "../ui/Button";

const GNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buttonWidth = 60;

  return (
    <nav className={styles.gnb}>
      <div className={styles.gnbInner}>
        <Button
          label="홈"
          width={buttonWidth}
          height={36}
          reversed={location.pathname !== "/"}
          onClick={() => navigate("/")}
        />
        <Button
          label="통계"
          width={buttonWidth}
          height={36}
          reversed={location.pathname !== "/stats"}
          onClick={() => navigate("/stats")}
        />
      </div>
    </nav>
  );
};

export default GNB;
