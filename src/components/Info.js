import React from "react";
import styles from "./Info.module.css";
const Info = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.infoOverlay} onClick={onClose}>
      <div className={styles.infoContent} onClick={(e) => e.stopPropagation()}>
        {/* <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button> */}
        <h1>How to use Pollinator</h1>
        <div className={styles.infoIllustrations}>
          <div>
            <div className={styles.illustrationPlant}></div>
            <div className={styles.caption}>
              <h4>PLANT</h4>
              <p>double click to add a new idea</p>
            </div>
          </div>
          <div>
            <div className={styles.illustrationComment}></div>
            <div className={styles.caption}>
              <h4>COMMENT</h4>
              <p>leave comments to help ideas grow</p>
            </div>
          </div>
          <div>
            <div className={styles.illustrationExplore}></div>
            <div className={styles.caption}>
              <h4>EXPLORE</h4>
              <p>drag around to map your ideas</p>
            </div>
          </div>
        </div>
        <button className={styles.closeButton2} onClick={onClose}>
          Go to the Garden
        </button>
        {children}
      </div>
    </div>
  );
};

export default Info;
