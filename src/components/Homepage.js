import styles from "./Homepage.module.css";

export const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gradientBackground}>
        <div className={styles.gradientContainer}>
          <div className={styles.g1}></div>
          <div className={styles.g2}></div>
          <div className={styles.g3}></div>
          <div className={styles.g4}></div>
          <div className={styles.g5}></div>
        </div>
        <div className={styles.noiseOverlay}></div>
        <div className={styles.beginWindow}>
          <h1>Pollinator</h1>
          <button>Enter the garden</button>
        </div>
      </div>
    </div>
  );
};
