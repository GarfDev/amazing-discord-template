const inLast = (secs: number) => (timeTocheck: number) => {
  const now = new Date().getTime();

  return now - timeTocheck > secs * 1000;
};

export default inLast;
