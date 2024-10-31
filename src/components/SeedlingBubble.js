import { useEffect, useState } from "react";
import styles from "./SeedlingBubble.module.css";

// Define an array of customized colors
const FALL_PALETTE = [
  '#D9A782', //grey brown
  '#B34F05', //brown
  '#FD699F', //pink
  '#DFA6A3', //grey pink
  '#FFDB00', //bright yellow
  '#D5B807', //dull yellow
  '#B2D400', //bright green
  // '#93BF06', //dull green
  '#548602', //dark green
  '#FC840D', //bright orange
  // '#E38100', //dull orange
  '#BF4E47', //dark red
];

function randomColorFromPalette() {
  const randomIndex = Math.floor(Math.random() * FALL_PALETTE.length);
  return FALL_PALETTE[randomIndex];
}

// This is one bubble defining a seedling on the main app window.
// The props are title, x and y coordinates (of the center) and size (diameter)
export const SeedlingBubble = ({ title, x, y, size }) => {
  const [background, setBackground] = useState();

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const color1 = randomColorFromPalette();
    const color2 = randomColorFromPalette();

    const newBackground = `radial-gradient(closest-side, ${color1}, ${color2}, rgba(0, 0, 0, 0))`;
    setBackground(newBackground);
  }, []);

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
        background: background,
      }}
    >
      {/* We use the curly braces to inject the props into the JSX output, so that
          when any of the props change value, the HTML will update or "react" automatically */}
      {title}
    </div>
  );
};
