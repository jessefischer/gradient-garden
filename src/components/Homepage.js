import Link from "next/link";
import Image from "next/image";

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
          <Image
            src="/assets/pollinator-logo.svg"
            alt="Pollinator"
            width={860}
            height={240}
          />
          <h1>A Garden of All Your Ideas</h1>
          <Link href="/garden">
            <button>Enter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
