import {
  all,
  call,
  spawn,
  put,
  takeLeading,
  takeEvery,
  actionChannel,
  take
} from 'redux-saga/effects';
import { sendMessage } from 'core/client';
import { initApplicationSuccess, runCommand } from './actions';
import ActionType from './actionTypes';
// Import commands
import { Commands } from 'types';
import { fromRootPath, getCommands, getLogger, measureElapsed } from 'utils';
import { getCommand } from 'utils/messages';

function* callInitApplication() {
  const logger = getLogger();
  // Pre-load commands from commands folder
  const measure = measureElapsed();
  const commandPath = yield fromRootPath('commands');
  yield getCommands(commandPath);
  logger.info(`Preloaded commands`);
  const elapsed = measure();

  logger.info(`Take ${elapsed}ms to initialize application`);

  yield put(initApplicationSuccess());
}

/**
 *
 * This saga is run if a message is identified as a valid command.
 *
 */
function* handleCommand({ payload }: ReturnType<typeof runCommand>) {
  /////////////////////////////
  const start = yield new Date().getTime();
  const { message } = payload;
  const logger = getLogger();

  const commandPath = yield fromRootPath('commands');
  const commands: Commands = yield getCommands(commandPath);

  // Process command /////////
  let splicedCommand = message.content.split(' ');
  const command = getCommand(splicedCommand[0]);
  if (!command) return;
  splicedCommand = splicedCommand.splice(1);

  // Run command ////////////
  const commandToRun = commands[command];
  if (!commandToRun) return;

  const result = yield call(commandToRun, message, splicedCommand);

  // Return response to channel
  if (result) yield call(sendMessage, message.channel.id, result);
  // Monitor execution time for commands
  const elapsed = yield new Date().getTime() - start;
  logger.info(`${command} - ${elapsed}ms`);
  /////////////////////////////
}

function* commandSaga() {
  const channel = yield actionChannel(ActionType.RUN_COMMAND);
  while (true) {
    const { payload } = yield take(channel);
    yield handleCommand(payload);
  }
}

function* rootSaga() {
  yield spawn(commandSaga);
  yield all([takeLeading(ActionType.INIT_APPLICATION, callInitApplication)]);
}

export default rootSaga;
