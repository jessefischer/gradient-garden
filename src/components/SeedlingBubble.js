import { useEffect, useState } from "react";
import GooEffect from "./GooEffect";
import styles from "./SeedlingBubble.module.css";

// This is one bubble defining a seedling on the main app window.
// The props are title, url, x and y coordinates (of the center) and size (diameter)
export const SeedlingBubble = ({
  title,
  url,
  imgSrc,
  x,
  y,
  size,
  color,
  setPosition,
  onClick,
  syncPosition,
}) => {
  const [background, setBackground] = useState();
  const [isDragging, setDragging] = useState(false); // Initial value is false
  const [dragStartPos, setDragStartPos] = useState(null); //setting a drag start to use mouseup for clicks

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const newBackground = `radial-gradient(closest-side, transparent 40%, ${color} 60%, ${color} 80%, transparent 100%)`; //changed to single color gradient
    setBackground(newBackground);
  }, [color]);

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
    syncPosition();
  };

  return (
    <>
      <GooEffect />
      <div
        // React uses "className" instead of the normal "class" because "class" is already a reserved keyword
        // in JavaScript with a different meaning.
        className={styles.seedlingBubble}
        style={{
          top: y - size / 2, // We do the extra calculation because CSS is expecting top-left corner
          left: x - size / 2, // instead of center for <div> elements
          height: size,
          width: size,
          backgroundImage: `url(${imgSrc}`,
          backgroundPosition: `center center`,
          backgroundSize: "cover",
          backgroundClip: "border-box",
          backgroundRepeat: "no-repeat",
          zIndex: isDragging ? 1000 : "auto", // move bubble to toppest layer when dragged
          // filter: "url(#goo) blur(10px)", //the goo filter is not working so I commented it out... -md
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className={styles.gradientOutline}
          style={{
            background,
          }}
        />
        {/* We use the curly braces to inject the props into the JSX output, so that
          when any of the props change value, the HTML will update or "react" automatically */}
        <div className={styles.title}>{title}</div>
      </div>
    </>
  );
};
