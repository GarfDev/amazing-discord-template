import { all, call, takeEvery } from 'redux-saga/effects';
import { sendMessage } from 'core/client';
import { runCommand } from './actions';
import ActionType from './actionTypes';
// Import commands
import { Commands } from 'types';
import { fromRootPath, getCommands, getLogger } from 'utils';
import { getCommand } from 'utils/messages';
import commandHandler from 'core/commandHandler';

function* handleCommand({ payload }: ReturnType<typeof runCommand>) {
  const start = yield new Date().getTime();
  const { message } = payload;
  const logger = getLogger();

  const commandPath = yield fromRootPath('commands');
  const commands: Commands = yield getCommands(commandPath);

  // Process command
  let splicedCommand = message.content.split(' ');
  const command = getCommand(splicedCommand[0]);
  if (!command) return;
  splicedCommand = splicedCommand.splice(1);

  // Run command
  const commandToRun = commands[command];
  if (!commandToRun) return;

  const result = yield call(
    commandHandler,
    commandToRun,
    message,
    ...splicedCommand
  );

  // Return response to channel
  if (result) yield call(sendMessage, message.channel.id, result);
  // Monitor execution time for commands
  const elapsed = yield new Date().getTime() - start;
  logger.info(`${command} - ${elapsed}ms`);
}

function* rootSaga() {
  yield all([takeEvery(ActionType.RUN_COMMAND, handleCommand)]);
}

export default rootSaga;
