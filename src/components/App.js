import { useState, useRef } from "react";
import styles from "./App.module.css";
import { SeedlingBubble } from "./SeedlingBubble";
import { NewPost } from "./NewPost";
import { BubbleModal } from "./BubbleModal";

function getRandomSize() {
  return Math.random() * 2 + 4; // generates number between 4 and 6
}

export function App() {
  const [bubbles, setBubbles] = useState([]);
  const [isCreatingBubble, setIsCreatingBubble] = useState(false);
  const [tempBubblePosition, setTempBubblePosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const clickStartPosition = useRef(null);

  const handleDoubleClick = (e) => {
    // calculate the distance moved
    const distanceMoved = clickStartPosition.current
      ? Math.sqrt(
          Math.pow(e.clientX - clickStartPosition.current.x, 2) +
            Math.pow(e.clientY - clickStartPosition.current.y, 2)
        )
      : 0;

    // only open the form if the mouse hasn't moved much
    if (distanceMoved < 5) {
      setIsCreatingBubble(true);
      setTempBubblePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseDown = (e) => {
    // store the initial click position
    clickStartPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleBubbleSubmit = (formData) => {
    const newBubble = {
      id: Date.now(),
      x: tempBubblePosition.x,
      y: tempBubblePosition.y,
      size: `${getRandomSize()}vw`,
      ...formData,
    };

    setBubbles([...bubbles, newBubble]);
    setIsCreatingBubble(false);
    setTempBubblePosition(null);
  };

  const handleBubbleClick = (bubbleData) => {
    setSelectedBubble(bubbleData);
    setIsModalOpen(true);
  };

  const updateBubblePosition = (id, newPosition) => {
    setBubbles(
      bubbles.map((bubble) =>
        bubble.id === id
          ? { ...bubble, x: newPosition.x, y: newPosition.y }
          : bubble
      )
    );
  };

  return (
    <div
      className={styles.app}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {bubbles.map((bubble) => (
        <SeedlingBubble
          key={bubble.id}
          title={bubble.title}
          x={bubble.x}
          y={bubble.y}
          size={bubble.size}
          link={bubble.link}
          description={bubble.description}
          setPosition={(pos) => updateBubblePosition(bubble.id, pos)}
          onBubbleClick={handleBubbleClick}
        />
      ))}

      {isCreatingBubble && tempBubblePosition && (
        <SeedlingBubble
          title=""
          x={tempBubblePosition.x}
          y={tempBubblePosition.y}
          size={`${getRandomSize()}vw`}
          setPosition={() => {}}
          onBubbleClick={() => {}}
        />
      )}

      {isCreatingBubble && tempBubblePosition && (
        <div
          className={styles.formContainer}
          style={{
            position: "absolute",
            top: tempBubblePosition.y,
            left: tempBubblePosition.x,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <NewPost
            onSubmit={handleBubbleSubmit}
            onCancel={() => {
              setIsCreatingBubble(false);
              setTempBubblePosition(null);
            }}
          />
        </div>
      )}

      <BubbleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bubbleData={selectedBubble || {}}
      />
    </div>
  );
}
