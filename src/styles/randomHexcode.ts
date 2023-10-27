const randomHexcode = () => {
  const hexcode = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexcode}`;
};

export const getRandomHexcode = () => {
  let nextHexcode = randomHexcode();
  while (nextHexcode.length !== 7) {
    nextHexcode = randomHexcode();
  }
  return nextHexcode;
};