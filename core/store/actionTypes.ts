enum ActionTypes {
  INIT_APPLICATION = '@core/store/INIT_APPLICATION',
  INIT_APPLICATION_SUCCESS = '@core/store/INIT_APPLICATION_SUCCESS',
  ADD_COMMAND_META = '@core/store/ADD_COMMAND_META',
  RUN_COMMAND = '@core/store/PROCESS_COMMAND',
  // Cooldown actions
  ADD_COOLDOWN = '@core/store/UPDATE_COOLDOWN'
}

export default ActionTypes;
