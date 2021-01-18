import store from 'core/store';
import { AnyAction } from 'redux';

const dispatch = (action: AnyAction) => store.dispatch(action);

export default dispatch;
