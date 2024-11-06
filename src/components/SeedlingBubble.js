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
  backgroundOnly = false,
  canvasScale = 1,
  canvasPosition = { x: 0, y: 0 },
}) => {
  const [background, setBackground] = useState();
  const [isDragging, setDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const newBackground = `radial-gradient(closest-side, transparent 40%, ${color} 60%, ${color} 80%, transparent 100%)`;
    setBackground(newBackground);
  }, [color]);

  const handleMouseDown = function (e) {
    e.stopPropagation();
    setDragging(true);
    setDragStartPos({
      x: e.clientX,
      y: e.clientY,
      initialX: x,
      initialY: y,
    });
  };

  const handleMouseMove = function (e) {
    if (isDragging) {
      e.stopPropagation();
      e.preventDefault();

      // Get the mouse position relative to the canvas
      const mouseX = (e.clientX - canvasPosition.x) / canvasScale;
      const mouseY = (e.clientY - canvasPosition.y) / canvasScale;

      // Calculate the offset from the drag start
      const dx = mouseX - dragStartPos.x / canvasScale;
      const dy = mouseY - dragStartPos.y / canvasScale;

      // Update position using the initial position plus offset
      setPosition({
        x: dragStartPos.initialX + dx,
        y: dragStartPos.initialY + dy,
      });
    }
  };

  const handleMouseUp = function (e) {
    e.stopPropagation();

    if (
      dragStartPos &&
      Math.abs(e.clientX - dragStartPos.x) < 3 &&
      Math.abs(e.clientY - dragStartPos.y) < 3
    ) {
      // This was a click, not a drag
      e.preventDefault(); // Prevent any default click behavior
      onClick && onClick({ title, url });
    } else if (isDragging) {
      // This was a drag
      syncPosition();
    }

    setDragging(false);
    setDragStartPos(null);
  };

  // Add mouse leave handler to prevent stuck dragging state
  const handleMouseLeave = function (e) {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  if (backgroundOnly) {
    return (
      <div
        className={styles.seedlingBubble}
        style={{
          top: y - size / 2,
          left: x - size / 2,
          height: size,
          width: size,
          zIndex: isDragging ? 1000 : "auto",
        }}
      >
        <div
          className={styles.gradientOutline}
          style={{
            background,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.seedlingBubble}
      style={{
        top: y - size / 2,
        left: x - size / 2,
        height: size,
        width: size,
        backgroundImage: `url(${imgSrc}`,
        zIndex: isDragging ? 1000 : "auto",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.gradientOutline}
        style={{
          background,
        }}
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
