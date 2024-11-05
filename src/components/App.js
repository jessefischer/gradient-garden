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
    // open a new post overlay when double click instead of directly adding a new seedling
    if (event.target === event.currentTarget) {
      setMousePosition({ x: event.clientX, y: event.clientY });
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

  return (
    // React uses a language called JSX which is a fancy way of inserting HTML-like language into the middle of
    // JavaScript code. It compiles down into something similar to document.createElement('div').
    <div className={styles.app} onDoubleClick={handleClick}>
      <Link href="/">
        <Image
          src="/assets/pollinator-logo.svg"
          alt="Pollinator"
          width={206}
          height={38.4}
        />
      </Link>
      {/* Info overlay button */}
      <button className={styles.openInfoButton} onClick={openInfo}>
        i
      </button>
      {/* Info overlay */}
      <Info isOpen={isInfoOpen} onClose={closeInfo}></Info>
      {/* NewPost Overlay */}
      <NewPost
        isOpen={isNewPostOpen}
        onClose={closeNewPost}
        onSubmit={handleNewPostSubmit}
        mousePosition={mousePosition}
      ></NewPost>
      {/* Seedlings */}
      {/* The .map function takes an array in one format and maps each element onto a different format.
          In this case, we take elements that are simple objects, and transform each one into a JSX element. */}
      {Object.entries(seedlings).map(
        ([
          key,
          { x, y, title, url, imgSrc, size, color, comments, reactions },
        ]) => {
          // We have to define a unique key for each element in the resulting array in order for React to keep
          // track of them properly
          return (
            <SeedlingBubble
              key={key}
              title={title}
              url={url}
              x={x}
              y={y}
              size={size}
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
                // This seems cumbersome but is necessary because if we simply mutate one of the
                // elements of newSeedlings, React won't notice that it's been updated and therefore
                // won't re-render the components. You have to create a whole new array from scratch
                // in order for it to re-render.
                const newSeedlings = { ...seedlings };
                newSeedlings[key] = newSeedling;
                setSeedlings(newSeedlings);
              }}
              syncPosition={() => {
                const seedlingsRef = ref(database, `seedlings/${key}`);
                set(seedlingsRef, seedlings[key]);
              }}
              onClick={() => handleSeedlingClick(key)}
            />
          );
        }
      )}{" "}
      {/* End of Seedling */}
      {/* seedling info modal */}
      {isModalOpen ? (
        <BubbleModal
          onClose={() => setIsModalOpen(false)}
          seedlingData={seedlings[selectedSeedlingKey] || {}}
          seedlingKey={selectedSeedlingKey}
          userId={userId}
        />
      ) : null}
    </div>
  );
};
