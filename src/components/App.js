import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Info from "./Info";
import NewPost from "./NewPost";

import { SeedlingBubble } from "./SeedlingBubble";

import styles from "./App.module.css";
import { BubbleModal } from "./BubbleModal";

export const App = () => {
  // React uses a concept called "state" to keep track of data that changes over time, instead of using
  // global variables like in P5. This state is local to the particular component it's defined in, in this
  // instance the App component. Whenever the state changes, the whole component re-renders. We can use
  // the `useState` hook to create a piece of state that we can update. The first element in the array is the
  // current value of the state, and the second element is a function that we can use to update the state.
  const [seedlings, setSeedlings] = useState([]);
  const [isInfoOpen, setInfoOpen] = useState(true); // Set Info Overlay to default when opening the garden for the first time
  const [isNewPostOpen, setNewPostOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeedling, setSelectedSeedling] = useState(null);

  const handleClick = (event) => {
    // open a new post overlay when double click instead of directly adding a new seedling
    if (event.target === event.currentTarget) {
      openNewPost();
    }
    // if (event.target !== event.currentTarget) return; // Prevent from responding to dragging events on bubbles
    // const mouseData = { x: event.clientX, y: event.clientY };
    // const newSeedling = {
    //   x: mouseData.x,
    //   y: mouseData.y,
    //   title: "New Seedling",
    //   size: Math.random() * 300 + 200,
    // };
    // setSeedlings([...seedlings, newSeedling]);
  };

  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);

  const openNewPost = () => setNewPostOpen(true);
  const closeNewPost = () => setNewPostOpen(false);

  const handleNewPostSubmit = (newSeedling) => {
    //add a new seedling only after a new post is submitted
    setSeedlings([...seedlings, newSeedling]); // Add the new seedling to the state
    closeNewPost(); // Close the overlay
  };

  const handleSeedlingClick = (seedling) => {
    setSelectedSeedling(seedling);
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
      <Info isOpen={isInfoOpen} onClose={closeInfo}>
        {/* <Image //<-- Removed logo in favor of some text
          src="/assets/pollinator-logo.svg"
          alt="Pollinator"
          width={206}
          height={38.4}
        /> */}
        <h1>How to use Pollinator</h1>
        <h2>the garden for all your ideas</h2>
        <div className={styles.infoIllustrations}>
          <div>
            <div className={styles.illustrationExplore}> EXPLORE </div>
            <p className={styles.caption}> drag around to map your ideas</p>
          </div>
          <div>
            <div className={styles.illustrationComment}> COMMENT</div>
            <p className={styles.caption}> leave comments to help ideas grow</p>
          </div>
          <div>
            <div className={styles.illustrationPlant}> PLANT</div>
            <p className={styles.caption}>double click to add a new idea</p>
          </div>
        </div>
      </Info>
      {/* NewPost Overlay */}
      {/* <button className={styles.newPostButton} onClick={openNewPost}>Add New Post</button> */}
      <NewPost
        isOpen={isNewPostOpen}
        onClose={closeNewPost}
        onSubmit={handleNewPostSubmit}
      ></NewPost>
      {/* The .map function takes an array in one format and maps each element onto a different format.
          In this case, we take elements that are simple objects, and transform each one into a JSX element. */}
      {seedlings.map(({ x, y, title, url, size }, i) => {
        // We have to define a unique key for each element in the resulting array in order for React to keep
        // track of them properly
        return (
          <SeedlingBubble
            key={i}
            title={title}
            x={x}
            y={y}
            size={size}
            setPosition={({ x: newX, y: newY }) => {
              console.log("setPosition");
              const newSeedling = {
                x: newX,
                y: newY,
                title,
                size,
              };
              // This seems cumbersome but is necessary because if we simply mutate one of the
              // elements of newSeedlings, React won't notice that it's been updated and therefore
              // won't re-render the components. You have to create a whole new array from scratch
              // in order for it to re-render.
              const newSeedlings = [...seedlings];
              newSeedlings[i] = newSeedling;
              setSeedlings(newSeedlings);
            }}
            onClick={() => handleSeedlingClick({ x, y, title, url, size })}
          />
        );
      })}{" "}
      {/* End of Seedling */}
      {/* seedling info modal */}
      <BubbleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seedlingData={selectedSeedling || {}}
      />
    </div>
  );
};
