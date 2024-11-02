import { useState } from "react";
import Image from "next/image";

import { SeedlingBubble } from "./SeedlingBubble";

import styles from "./App.module.css";

export const App = () => {
  // React uses a concept called "state" to keep track of data that changes over time, instead of using
  // global variables like in P5. This state is local to the particular component it's defined in, in this
  // instance the App component. Whenever the state changes, the whole component re-renders. We can use
  // the `useState` hook to create a piece of state that we can update. The first element in the array is the
  // current value of the state, and the second element is a function that we can use to update the state.
  const [seedlings, setSeedlings] = useState([]);

  const handleClick = (event) => {
    if (event.target !== event.currentTarget) return; // Prevent from responding to dragging events on bubbles
    const mouseData = { x: event.clientX, y: event.clientY };
    const newSeedling = {
      x: mouseData.x,
      y: mouseData.y,
      title: "New Seedling",
      size: Math.random() * 400 + 600,
    };
    setSeedlings([...seedlings, newSeedling]);
  };

  return (
    // React uses a language called JSX which is a fancy way of inserting HTML-like language into the middle of
    // JavaScript code. It compiles down into something similar to document.createElement('div').
    <div className={styles.app} onDoubleClick={handleClick}>
      <Image
        src="/assets/pollinator-logo.svg"
        alt="Pollinator"
        width={206}
        height={38.4}
      />
      {/* The .map function takes an array in one format and maps each element onto a different format.
          In this case, we take elements that are simple objects, and transform each one into a JSX element. */}
      {seedlings.map(({ x, y, title, size }, i) => {
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
          />
        );
      })}
    </div>
  );
};
