import _ from 'lodash';
import store from 'core/store';

type SelectFn = <TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

const createStoreSelector: () => SelectFn = () => selector =>
  selector(_.cloneDeep(store.getState()) as any);

export default createStoreSelector();
