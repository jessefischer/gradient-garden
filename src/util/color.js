// Define an array of customized colors
const FALL_PALETTE = [
  "#FD699F", //pink
  "#DFA6A3", //grey pink
  "#FFDB00", //bright yellow
  "#B2D400", //bright green
  "#FC840D", //bright orange
  "#E38100", //dark orange
  "#BF4E47", //dark red
  "#B34F05", //brown
  "#D9A782", //grey brown
  "#90D4FF", //sky blue
  "#5E95DA", //blue
];

export function randomColorFromPalette() {
  const randomIndex = Math.floor(Math.random() * FALL_PALETTE.length);
  return FALL_PALETTE[randomIndex];
}
