class LoadingError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = 'LoadingError'; // (2)
  }
}

export default LoadingError;
