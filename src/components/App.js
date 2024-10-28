import styles from "./App.module.css";
import { SeedlingBubble } from "./SeedlingBubble";

export const App = () => {
  // This is temporary. Eventually we will be retrieving each seedling from the database.
  const mockSeedlings = [
    { x: 150, y: 350, title: "Yellow Submarine", size: 250 },
    { x: 200, y: 650, title: "Space is the Place", size: 400 },
    { x: 550, y: 400, title: "Timelapse", size: 300 },
  ];
  return (
    // React uses a language called JSX which is a fancy way of inserting HTML-like language into the middle of
    // JavaScript code. It compiles down into something similar to document.createElement('div').
    <div className={styles.app}>
      <h1>Digital Gradient Garden</h1>
      {/* The .map function takes an array in one format and maps each element onto a different format.
          In this case, we take elements that are simple objects, and transform each one into a JSX element. */}
      {mockSeedlings.map(({ x, y, title, size }, i) => {
        // We have to define a unique key for each element in the resulting array in order for React to keep
        // track of them properly
        return <SeedlingBubble key={i} title={title} x={x} y={y} size={size} />;
      })}
    </div>
  );
};
