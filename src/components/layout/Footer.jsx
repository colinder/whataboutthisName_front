import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleContactClick = () => {
    setShowModal(true);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:selfor.official@gmail.com?subject=이 이름 어때요? 문의&body=안녕하세요,%0D%0A%0D%0A문의 내용을 작성해주세요.";
    setShowModal(false);
  };

  const handleCloseModal = (e) => {
    // 모달 배경 클릭 시 닫기
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.brand}>
            whatabout<span className={styles.bold}>thisname?</span>
          </span>
          <span 
            className={styles.contact}
            onClick={handleContactClick}
          >
            문의하기
          </span>
        </div>
      </footer>

      {/* 모달 팝업 */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            
            <h2 className={styles.modalTitle}>문의하기</h2>
            
            <div className={styles.modalContent}>
              <p className={styles.description}>
                서비스 이용 중 궁금하신 점이나 문제가 있으신가요?
              </p>
              <p className={styles.description}>
                아래 이메일로 문의해주시면 빠르게 답변드리겠습니다.
              </p>
              
              <div className={styles.emailBox}>
                <span className={styles.emailIcon}>✉️</span>
                <span className={styles.emailAddress}>selfor.official@gmail.com</span>
              </div>
              
              <button 
                className={styles.emailButton}
                onClick={handleEmailClick}
              >
                메일 쓰기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;