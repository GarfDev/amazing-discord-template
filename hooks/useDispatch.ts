import store from 'core/store';
import { AnyAction } from 'redux';

const useDispatch = () => (action: AnyAction) => store.dispatch(action);

export default useDispatch;
