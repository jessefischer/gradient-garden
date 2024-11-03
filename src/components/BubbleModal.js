import React from "react";
import styles from "./BubbleModal.module.css";

export const BubbleModal = ({ isOpen, onClose, bubbleData }) => {
  if (!isOpen) return null;

  const { title, link, description } = bubbleData;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2>{title}</h2>

        {link && (
          <div className={styles.linkContainer}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Visit Link
            </a>
          </div>
        )}

        {/* Link previewmage goes here */}

        <div className={styles.reactionsSection}>
          <h3>Reactions</h3>
          {/* add reaction functionality here */}
        </div>

        <div className={styles.commentsSection}>
          <h3>Comments</h3>
          {/* add comment functionality here */}
        </div>
      </div>
    </div>
  );
};
