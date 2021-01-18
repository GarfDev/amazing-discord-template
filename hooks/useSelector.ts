import store from 'core/store';

const createStoreSelector = <T, K extends keyof T>(state: T) => (
  selector: (store: T) => T[K]
) => {
  return selector(state);
};

export default createStoreSelector(store.getState());
