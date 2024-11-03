import { useEffect, useState } from "react";
import styles from "./SeedlingBubble.module.css";

// Define an array of customized colors
const FALL_PALETTE = [
  "#FD699F", //pink
  "#DFA6A3", //grey pink
  "#FFDB00", //bright yellow
  "#B2D400", //bright green
  "#FC840D", //bright orange
  "#E38100", //dark orange
  "#BF4E47", //dark red
  "#B34F05", //brown
  "#D9A782", //grey brown
  "#90D4FF", //sky blue
  "#5E95DA", //blue
];

function randomColorFromPalette() {
  const randomIndex = Math.floor(Math.random() * FALL_PALETTE.length);
  return FALL_PALETTE[randomIndex];
}

// This is one bubble defining a seedling on the main app window.
// The props are title, x and y coordinates (of the center) and size (diameter)
export const SeedlingBubble = ({ title, x, y, size, setPosition }) => {
  const [background, setBackground] = useState();
  const [isDragging, setDragging] = useState(false); // Initial value is false

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const newBackground = `radial-gradient(closest-side, ${randomColorFromPalette()} 70%, rgba(0, 0, 0, 0))` //changed to single color gradient
    // const color1 = randomColorFromPalette();
    // const color2 = randomColorFromPalette();
    // const newBackground = `radial-gradient(closest-side, ${color1} 70%, ${color2} 90%, rgba(0, 0, 0, 0))`;
    setBackground(newBackground);
  }, []);

  const handleMouseDown = function (e) {
    setDragging(true);
  };

  const handleMouseMove = function (e) {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = function () {
    setDragging(false);
  };

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* We use the curly braces to inject the props into the JSX output, so that
          when any of the props change value, the HTML will update or "react" automatically */}
      {title}
    </div>
  );
};
