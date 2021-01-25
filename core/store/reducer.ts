import ActionTypes from './actionTypes';
import {
  ApplicationRootState,
  ApplicationActions,
  CommandMeta,
  CommandMetaState,
  MetaDataState
} from './types';

const initialRootState: ApplicationRootState = {
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
      // New Command Meta Object
      const newCommandMeta: CommandMeta = {
        ...(state.meta.commands[meta.type] || {}),
        [name]: meta
      };
      // New Command Meta State Object
      const newCommandMetaState: CommandMetaState = {
        ...(state.meta.commands || {}),
        [meta.type]: newCommandMeta
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
    default: {
      return state;
    }
  }
};

export default rootReducer;
