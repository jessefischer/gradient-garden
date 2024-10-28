import styles from "./SeedlingBubble.module.css";

// This is one bubble defining a seedling on the main app window.
// The props are title, x and y coordinates (of the center) and size (diameter)
export const SeedlingBubble = ({ title, x, y, size }) => {
  return (
    <div
      // React uses "className" instead of the normal "class" because "class" is already a reserved keyword
      // in JavaScript with a different meaning.
      className={styles.seedlingBubble}
      style={{
        top: y - size / 2, // We do the extra calculation because CSS is expecting top-left corner
        left: x - size / 2, // instead of center for <div> elements
        height: size,
        width: size,
      }}
    >
      {/* We use the curly braces to inject the props into the JSX output, so that
          when any of the props change value, the HTML will update or "react" automatically */}
      {title}
    </div>
  );
};
