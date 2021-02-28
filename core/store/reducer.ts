import { produce } from 'immer';
import ActionTypes from './actionTypes';
import { ApplicationRootState, ApplicationActions } from './types';

const initialRootState: ApplicationRootState = {
  cooldown: {},
  meta: {
    commands: {},
    defaultPrefix: process.env.DEFAULT_PREFIX || '',
    ownerId: process.env.ADMINISTRATOR || ''
  }
};

const rootReducer = (
  state = initialRootState,
  action: ApplicationActions
): ApplicationRootState => {
  switch (action.type) {
    /**
     * This action register command meta
     * information to global application state
     * to reuse later.
     */
    case ActionTypes.ADD_COMMAND_META: {
      // Destructor Params
      const { meta } = action.payload;
      const { name } = meta;
      // New Command Meta State Object
      // Action return

      return produce(state, nextState => {
        nextState.meta.commands[name] = meta;
      });
    }
    //
    // COOLDOWN CASES
    //
    case ActionTypes.ADD_COOLDOWN: {
      const { userId, lastCommandTime, command } = action.payload;

      return produce(state, nextState => {
        nextState.cooldown[userId] = {
          [command]: lastCommandTime
        };
      });
    }
    //
    default: {
      return state;
    }
  }
};

export default rootReducer;
