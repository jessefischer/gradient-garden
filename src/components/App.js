import styles from "./App.module.css";
import { SeedlingBubble } from "./SeedlingBubble";

export const App = () => {
  const mockBubbles = [
    { x: 150, y: 350, title: "Yellow Submarine", size: 250 },
    { x: 200, y: 650, title: "Space is the Place", size: 400 },
    { x: 550, y: 400, title: "Timelapse", size: 300 },
  ];
  return (
    <div className={styles.app}>
      <h1>Digital Gradient Garden</h1>
      {mockBubbles.map(({ x, y, title, size }, i) => {
        return <SeedlingBubble key={i} title={title} x={x} y={y} size={size} />;
      })}
    </div>
  );
};
