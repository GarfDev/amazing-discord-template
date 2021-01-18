import { ApplicationRootState, ApplicationActions } from './types';
import ActionTypes from './actionTypes';

const initialRootState: ApplicationRootState = {};

const rootReducer = (state = initialRootState, action: ApplicationActions) => {
  const { type } = action;

  switch (type) {
    case ActionTypes.INIT_APPLICATION: {
      return { ...state, client: action.payload.client };
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
