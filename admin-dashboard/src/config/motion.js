const transition = { duration: 0.8, type: "spring"};
function slideAnimation(direction) {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition
    },
    animate: { x: 0, y: 0, opacity: 1, transition },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition
    },
  };
}

const fadeAnimation = {
    initial: { opacity: 0},
    animate: { opacity: 1, transition},
    exit: { opacity: 0 }
}

export { slideAnimation, fadeAnimation }
