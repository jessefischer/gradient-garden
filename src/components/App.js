import { useState, useEffect } from "react";
import { database } from "@/util/firebase";
import { set, push, ref, onValue } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import Info from "./Info";
import NewPost from "./NewPost";
import { SeedlingBubble } from "./SeedlingBubble";
import { BubbleModal } from "./BubbleModal";
import styles from "./App.module.css";
import GooEffect from "./GooEffect";

const COMMENTS_WEIGHT = 50;
const REACTIONS_WEIGHT = 20;

export const App = () => {
  // React uses a concept called "state" to keep track of data that changes over time, instead of using
  // global variables like in P5. This state is local to the particular component it's defined in, in this
  // instance the App component. Whenever the state changes, the whole component re-renders. We can use
  // the `useState` hook to create a piece of state that we can update. The first element in the array is the
  // current value of the state, and the second element is a function that we can use to update the state.
  const [seedlings, setSeedlings] = useState({});
  const [isInfoOpen, setInfoOpen] = useState(true); // Set Info Overlay to default when opening the garden for the first time
  const [isNewPostOpen, setNewPostOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeedlingKey, setSelectedSeedlingKey] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mousePosition, setMousePosition] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Set up a listener to the Firebase database to keep the seedlings state up to date
  useEffect(() => {
    const seedlingsRef = ref(database, "/seedlings");
    onValue(seedlingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSeedlings(data);
      }
    });
  }, []);

  // generate a simple user id when the app loads
  useEffect(() => {
    const generateUserId = () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const newUserId = "user_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("userId", newUserId);
        setUserId(newUserId);
      }
    };

    generateUserId();
  }, []);

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / 0.9 - position.x;
      const y = (event.clientY - rect.top) / 0.9 - position.y;

      setMousePosition({ x, y });
      openNewPost();
    }
  };

  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);

  const openNewPost = () => setNewPostOpen(true);
  const closeNewPost = () => setNewPostOpen(false);

  const handleNewPostSubmit = (newSeedling) => {
    //add a new seedling only after a new post is submitted
    const seedlingsRef = ref(database, "seedlings");
    const newSeedlingRef = push(seedlingsRef);
    set(newSeedlingRef, newSeedling);
    closeNewPost(); // Close the overlay
  };

  const handleSeedlingClick = (seedlingKey) => {
    setSelectedSeedlingKey(seedlingKey);
    setIsModalOpen(true);
  };

  // Replace handleMouseDown, handleMouseMove, handleMouseUp with handleScroll
  const handleScroll = (event) => {
    // remove zoom control and just handle pan
    event.preventDefault();
    setPosition((prev) => ({
      x: prev.x - event.deltaX,
      y: prev.y - event.deltaY,
    }));
  };

  useEffect(() => {
    // prevent default pinch-to-zoom behavior
    document.addEventListener("gesturestart", (e) => e.preventDefault());
    document.addEventListener("gesturechange", (e) => e.preventDefault());
  }, []);

  return (
    <div className={styles.appContainer} onWheel={handleScroll}>
      <button className={styles.openInfoButton} onClick={openInfo}>
        i
      </button>

      <div className={styles.fixedElements}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/assets/pollinator-logo.svg"
              alt="Pollinator"
              width={206}
              height={38.4}
            />
          </Link>
        </div>
      </div>

      <div
        className={styles.canvas}
        onDoubleClick={handleClick}
        style={{
          transform: `scale(0.9) translate(${position.x}px, ${position.y}px)`, // fixed scale at 0.9
        }}
      >
        <GooEffect />
        {/* Regular seedlings */}
        {Object.entries(seedlings).map(
          ([
            key,
            { x, y, title, url, imgSrc, size, color, comments, reactions },
          ]) => {
            const numComments = comments ? Object.keys(comments).length : 0;
            const numReactions = reactions
              ? Object.keys(reactions).reduce(
                  (acc, cur) => acc + Object.keys(reactions[cur]).length,
                  0
                )
              : 0;
            const adjustedSize =
              size +
              numComments * COMMENTS_WEIGHT +
              numReactions * REACTIONS_WEIGHT;

            return (
              <SeedlingBubble
                key={key}
                title={title}
                url={url}
                x={x}
                y={y}
                size={adjustedSize}
                color={color}
                imgSrc={imgSrc}
                setPosition={({ x: newX, y: newY }) => {
                  const newSeedling = {
                    x: newX,
                    y: newY,
                    title,
                    url,
                    imgSrc,
                    size,
                    color,
                    ...(comments ? { comments } : {}),
                    ...(reactions ? { reactions } : {}),
                  };
                  const newSeedlings = { ...seedlings };
                  newSeedlings[key] = newSeedling;
                  setSeedlings(newSeedlings);
                }}
                syncPosition={() => {
                  const seedlingsRef = ref(database, `seedlings/${key}`);
                  set(seedlingsRef, seedlings[key]);
                }}
                onClick={() => handleSeedlingClick(key)}
                canvasScale={0.9}
                canvasPosition={position}
              />
            );
          }
        )}

        {/* Shadow copy of seedlings for goo effect */}
        <div className={styles.gooBubbles}>
          {Object.entries(seedlings).map(
            ([
              key,
              { x, y, title, url, imgSrc, size, color, comments, reactions },
            ]) => {
              const numComments = comments ? Object.keys(comments).length : 0;
              const numReactions = reactions
                ? Object.keys(reactions).reduce(
                    (acc, cur) => acc + Object.keys(reactions[cur]).length,
                    0
                  )
                : 0;
              const adjustedSize =
                size +
                numComments * COMMENTS_WEIGHT +
                numReactions * REACTIONS_WEIGHT;

              return (
                <SeedlingBubble
                  key={key}
                  title={title}
                  url={url}
                  x={x}
                  y={y}
                  size={adjustedSize * 1.2} // Slightly larger for the goo effect
                  color={color}
                  imgSrc={imgSrc}
                  backgroundOnly={true}
                  canvasScale={0.9}
                  canvasPosition={position}
                />
              );
            }
          )}
        </div>
      </div>

      {/* Modals */}
      <Info isOpen={isInfoOpen} onClose={closeInfo} />
      <NewPost
        isOpen={isNewPostOpen}
        onClose={closeNewPost}
        onSubmit={handleNewPostSubmit}
        mousePosition={mousePosition}
      />
      {isModalOpen && (
        <BubbleModal
          onClose={() => setIsModalOpen(false)}
          seedlingData={seedlings[selectedSeedlingKey] || {}}
          seedlingKey={selectedSeedlingKey}
          userId={userId}
        />
      )}
    </div>
  );
};
