import LoadingError from './LoadingError';

class CommandListenerNotFound extends LoadingError {
  errorPath: string;
  constructor(errorPath: string) {
    super(errorPath); // (1)
    this.message = 'Cannot read command listener from: ' + errorPath;
    this.name = 'CommandListenerNotFound';
    this.errorPath = errorPath; // (2)
  }
}

export default CommandListenerNotFound;
