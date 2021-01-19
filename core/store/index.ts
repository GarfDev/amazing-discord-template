import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...defaultMiddleware, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
