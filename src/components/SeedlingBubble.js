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
// The props are title, url, x and y coordinates (of the center) and size (diameter)
export const SeedlingBubble = ({
  title,
  url,
  x,
  y,
  size,
  setPosition,
  onClick,
}) => {
  const [background, setBackground] = useState();
  const [isDragging, setDragging] = useState(false); // Initial value is false
  const [dragStartPos, setDragStartPos] = useState(null); //setting a drag start to use mouseup for clicks

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const newBackground = `radial-gradient(closest-side, ${randomColorFromPalette()} 50%, rgba(0, 0, 0, 0))`; //changed to single color gradient
    // const color1 = randomColorFromPalette();
    // const color2 = randomColorFromPalette();
    // const newBackground = `radial-gradient(closest-side, ${color1} 70%, ${color2} 90%, rgba(0, 0, 0, 0))`;
    setBackground(newBackground);
  }, []);

  const handleMouseDown = function (e) {
    setDragging(true);
    setDragStartPos({ x: e.clientX, y: e.clientY }); //store the start of the drag
  };

  const handleMouseMove = function (e) {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = function (e) {
    if (
      dragStartPos &&
      Math.abs(e.clientX - dragStartPos.x) < 3 &&
      Math.abs(e.clientY - dragStartPos.y) < 3
    ) {
      //if the mouse hasn't moved more than 3px, treat it as a click
      onClick && onClick({ title, url });
    }
    setDragging(false);
    setDragStartPos(null); //reset the drag start to 0
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
        zIndex: isDragging ? 1000 : "auto", // move bubble to toppest layer when dragged
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
