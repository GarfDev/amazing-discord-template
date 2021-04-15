import store from 'core/store';
import { AnyAction } from 'redux';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDispatch = () => (action: AnyAction) => store.dispatch(action);

export default useDispatch;
