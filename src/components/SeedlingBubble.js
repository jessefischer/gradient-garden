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
export const SeedlingBubble = ({
  title,
  x,
  y,
  size,
  setPosition,
  link,
  description,
  onBubbleClick,
}) => {
  const [background, setBackground] = useState();
  const [isDragging, setDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState(null);

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const color1 = randomColorFromPalette();
    const color2 = randomColorFromPalette();

    const newBackground = `radial-gradient(closest-side, ${color1} 70%, ${color2} 90%, rgba(0, 0, 0, 0))`;
    setBackground(newBackground);
  }, []);

  const handleMouseDown = function (e) {
    setDragging(true);
    setDragStartTime(Date.now());
  };

  const handleMouseMove = function (e) {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = function (e) {
    const dragDuration = Date.now() - dragStartTime;
    setDragging(false);

    // if the drag duration is less than 200ms, consider it a click
    if (dragDuration < 200) {
      onBubbleClick({ title, link, description });
    }
  };

  // Convert size to pixels for offset calculations if it's in vw units
  const sizeInPixels = size.toString().includes("vw")
    ? (parseFloat(size) * window.innerWidth) / 100
    : parseFloat(size);

  return (
    <div
      className={styles.seedlingBubble}
      style={{
        top: y - sizeInPixels / 2,
        left: x - sizeInPixels / 2,
        height: size, // use the original size value with units
        width: size,
        cursor: "pointer",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.blurBackground}
        style={{
          height: size,
          width: size,
          background: background,
        }}
      ></div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
