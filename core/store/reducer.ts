import { ApplicationRootState, ApplicationActions } from './types';
import ActionTypes from './actionTypes';

const initialRootState: ApplicationRootState = {
  meta: {
    defaultPrefix: process.env.DEFAULT_PREFIX || '',
    ownerId: process.env.ADMINISTRATOR || ''
  }
};

const rootReducer = (state = initialRootState, action: ApplicationActions) => {
  const { type } = action;

  switch (type) {
    case ActionTypes.INIT_APPLICATION: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
