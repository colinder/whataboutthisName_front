import styles from './Button.module.css';

const Button = ({ label, width, height, onClick, reversed }) => {
  return (
    <button
      className={`${styles.button} ${reversed ? styles.reversed : styles.default}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;