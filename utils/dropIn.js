//actual drop
export const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 50,
      stiffness: 450,
      default: { ease: "easeInOut" }
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 50,
      stiffness: 450,
      // default: { ease: "easeOut" }
    },
  },
};

export const dropInLg = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 50,
      stiffness: 450,
      default: { ease: "easeInOut" }
    },
  },
  exit: {
    y: "-100vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 450,
      // default: { ease: "easeOut" }
    },
  },
};