import store from 'core/store';

type SelectFn = <TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

const createStoreSelector: <TState>(
  state: TState
) => SelectFn = state => selector => selector(state as any);

export default createStoreSelector(store.getState());
