function measureElapsed() {
  const start = new Date().getTime();

  return () => {
    const elapsed = new Date().getTime() - start;
    return elapsed;
  };
}

export default measureElapsed;
