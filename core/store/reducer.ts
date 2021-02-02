import ActionTypes from './actionTypes';
import {
  ApplicationRootState,
  ApplicationActions,
  CommandMetaState,
  MetaDataState
} from './types';

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
      const newCommandMetaState: CommandMetaState = {
        ...(state.meta.commands || {}),
        [name]: meta
      };
      // New Meta State Object
      const metaState: MetaDataState = {
        ...(state.meta || {}),
        commands: newCommandMetaState
      };
      // Action return
      return {
        ...state,
        meta: metaState
      };
    }
    //
    // COOLDOWN CASES
    //
    case ActionTypes.ADD_COOLDOWN: {
      const { userId, lastCommandTime, command } = action.payload;

      return {
        ...state,
        cooldown: {
          ...state.cooldown,
          [userId]: {
            [command]: lastCommandTime
          }
        }
      };
    }
    //
    default: {
      return state;
    }
  }
};

export default rootReducer;
