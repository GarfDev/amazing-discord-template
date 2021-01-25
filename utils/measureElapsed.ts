function measureElapsed(): () => number {
  const start = new Date().getTime();

  return (): number => {
    const elapsed = new Date().getTime() - start;
    return elapsed;
  };
}

export default measureElapsed;
