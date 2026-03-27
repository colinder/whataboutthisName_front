import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.brand}>
          whatabout<span className={styles.bold}>thisname?</span>
        </span>
        <span className={styles.contact}>문의하기</span>
      </div>
    </footer>
  );
};

export default Footer;
