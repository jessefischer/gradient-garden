import { useState } from "react";
import styles from "./HelperApp.module.css";

export const HelperApp = () => {
  // start with helper open
  const [isOpen, setIsOpen] = useState(true);

  const handleHelperClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen ? (
        // when open, show full app with background
        <div className={styles.app} onClick={() => setIsOpen(false)}>
          <div className={styles.helperContainer} onClick={handleHelperClick}>
            <h1>How to pollinate</h1>
            <p>
              Click anywhere to plant a seedling. Click to open and explore what
              others have planted. Leave comments and reactions to help the
              seedlings grow.
            </p>
          </div>
        </div>
      ) : (
        // when closed, show just the info button without app background
        <div className={styles.closedContainer} onClick={() => setIsOpen(true)}>
          <h1>i</h1>
        </div>
      )}
    </>
  );
};
