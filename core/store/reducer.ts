import { ApplicationRootState, ApplicationActions } from './types';
import ActionTypes from './actionTypes';

const initialRootState: ApplicationRootState = {};

const rootReducer = (state = initialRootState, action: ApplicationActions) => {
  const { type } = action;

  switch (type) {
    case ActionTypes.INIT_APPLICATION: {
      console.log('Action go though reducer');
      return state;
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
