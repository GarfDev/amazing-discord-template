import { sendMessage } from 'core/client';
import {
  call,
  takeEvery,
  actionChannel,
  ActionChannelEffect,
  take,
  ActionPattern,
  all,
  takeLeading,
  spawn,
  put
} from 'redux-saga/effects';
import {
  initApplicationSuccess,
  processAsyncCommand,
  processQueuedCommand,
  verifyCommand as verifyCommandAction
} from './actions';
import ActionTypes from './actionTypes';
import { Commands } from 'types';
import { getCommand } from 'utils/messages';
import { getLogger, measureElapsed } from 'utils';
import { commandListenerRegister, commandObjTraveler } from 'utils/command';
import { useDispatch, useSelector } from '@hooks';
import { selectCommandByName } from './selectors';
import { Action } from 'redux';

function* callInitApplication() {
  const logger = getLogger();
  // Pre-load commands from commands folder
  const measure = measureElapsed();
  logger.info(`Preloaded commands`);
  yield call(commandListenerRegister);
  const elapsed = measure();

  logger.info(`Take ${elapsed}ms to initialize application`);

  yield put(initApplicationSuccess());
}

/**
 *
 * This saga is run if a message is identified as a valid command.
 *
 */

function* verifyCommand({ payload }: ReturnType<typeof verifyCommandAction>) {
  const { message } = payload;
  ////////////////////////////
  const commands: Commands = yield call(commandListenerRegister);

  // Process command /////////
  const splicedCommand = message.content.split(' ');
  const command = getCommand(splicedCommand[0]);
  if (!command.length) return;
  const [commandToRun, params] = commandObjTraveler(commands, splicedCommand);
  const commandMeta = useSelector(selectCommandByName(command));

  // Run command /////////////
  if (!commandToRun && !commandMeta.name) return;
  if (commandToRun.default && commandToRun.default instanceof Function) {
    const dispatch = useDispatch();
    if (commandMeta.queued) {
      dispatch(
        processQueuedCommand(command, commandToRun.default, message, params)
      );
    } else {
      dispatch(
        processAsyncCommand(command, commandToRun.default, message, params)
      );
    }
  }
}

function* commandRunner({ payload }: ReturnType<typeof processQueuedCommand>) {
  const { name, commandHandler, message, params } = payload;

  const logger = getLogger();
  const start: number = yield call(() => new Date().getTime());
  const result: number = yield call(commandHandler, message, params);

  // Return response to channel
  if (result) yield call(sendMessage as any, message.channel.id, result);
  // Monitor execution time for commands
  const elapsed: number = yield call(() => new Date().getTime() - start);
  logger.info(`${name} - ${elapsed}ms`);
}

function* queuedCommandSaga() {
  const channel: ActionChannelEffect = yield actionChannel(
    ActionTypes.RUN_QUEUED_COMMAND
  );
  while (true) {
    const action: ActionPattern<Action<any>> = yield take(channel as any);
    yield call(() => commandRunner(action as any));
  }
}

function* asyncCommandSaga() {
  yield all([takeEvery(ActionTypes.RUN_ASYNC_COMMAND, commandRunner)]);
}

function* rootSaga() {
  yield all([
    takeEvery(ActionTypes.VERIFY_COMMAND, verifyCommand),
    takeLeading(ActionTypes.INIT_APPLICATION, callInitApplication)
  ]);
  // Spawn Command Handlers
  yield spawn(asyncCommandSaga);
  yield spawn(queuedCommandSaga);
}

export default rootSaga;
