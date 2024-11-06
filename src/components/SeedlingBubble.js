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
  const [dragStartTime, setDragStartTime] = useState(null);

  // We use the useEffect hook to run some code when the component is first rendered.
  // Otherwise, the code would be run *every time* the component re-renders, which would result int
  // new random colors on every bubble every time the user adds a new bubble.
  useEffect(() => {
    const newBackground = `radial-gradient(closest-side, transparent 40%, ${color} 60%, ${color} 80%, transparent 100%)`;
    setBackground(newBackground);
  }, [color]);

  const handleMouseDown = function (e) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / canvasScale - canvasPosition.x;
    const mouseY = (e.clientY - rect.top) / canvasScale - canvasPosition.y;

    setDragStartPos({ x: mouseX, y: mouseY });
    setDragStartTime(Date.now());
    setDragging(true);
  };

  const handleMouseMove = function (e) {
    e.stopPropagation();
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / canvasScale - canvasPosition.x;
    const mouseY = (e.clientY - rect.top) / canvasScale - canvasPosition.y;

    if (dragStartPos) {
      const dx = mouseX - dragStartPos.x;
      const dy = mouseY - dragStartPos.y;
      setPosition({ x: x + dx, y: y + dy });
    }
  };

  const handleMouseUp = function (e) {
    e.stopPropagation();

    if (dragStartPos) {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / canvasScale - canvasPosition.x;
      const mouseY = (e.clientY - rect.top) / canvasScale - canvasPosition.y;

      const dx = Math.abs(mouseX - dragStartPos.x);
      const dy = Math.abs(mouseY - dragStartPos.y);
      const dragDistance = Math.sqrt(dx * dx + dy * dy);
      const dragDuration = Date.now() - dragStartTime;

      if (dragDistance < 3 && dragDuration < 200) {
        // This was a click, not a drag
        e.preventDefault();
        onClick && onClick();
      } else if (isDragging) {
        // This was a drag
        syncPosition();
      }
    }

    setDragging(false);
    setDragStartPos(null);
    setDragStartTime(null);
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
