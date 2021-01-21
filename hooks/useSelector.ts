import store from 'core/store';

type SelectFn = <TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

const createStoreSelector: <TState>() => SelectFn = () => selector =>
  selector(store.getState() as any);

export default createStoreSelector();
