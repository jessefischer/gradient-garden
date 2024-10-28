import styles from "./SeedlingBubble.module.css";

export const SeedlingBubble = ({ title, x, y, size }) => {
  return (
    <div
      className={styles.seedlingBubble}
      style={{
        top: y - size / 2,
        left: x - size / 2,
        height: size,
        width: size,
      }}
    >
      {title}
    </div>
  );
};
