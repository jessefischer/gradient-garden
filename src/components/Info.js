
import React from 'react';
import styles from './Info.module.css';
const Info = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.infoOverlay} onClick={onClose}>
      <div className={styles.infoContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Info;
