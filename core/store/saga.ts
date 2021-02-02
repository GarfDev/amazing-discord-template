import {
  all,
  call,
  put,
  takeLeading,
  takeEvery,
  actionChannel,
  take,
  spawn
} from 'redux-saga/effects';
import { sendMessage } from 'core/client';
import {
  initApplicationSuccess,
  processAsyncCommand,
  processQueuedCommand,
  verifyCommand as verifyCommandAction
} from './actions';
import ActionTypes from './actionTypes';
// Import commands
import { Commands } from 'types';
import { getLogger, measureElapsed } from 'utils';
import { getCommand, getPrefix } from 'utils/messages';
import { commandListenerRegister } from 'utils/command';
import { useDispatch, useSelector } from '@hooks';
import { selectCommandByName } from './selectors';

function* callInitApplication() {
  const logger = getLogger();
  // Pre-load commands from commands folder
  const measure = measureElapsed();
  logger.info(`Preloaded commands`);
  yield commandListenerRegister();
  const elapsed = measure();

  logger.info(`Take ${elapsed}ms to initialize application`);

  yield put(initApplicationSuccess());
}

function commandObjTraveler(
  commands: Commands,
  params: string[]
): [Commands, string[]] {
  let currentDepth = commands;
  const progressedParams = [...params];

  for (let i = 0; i <= params.length; i++) {
    let param = params[i];
    // Handle first param include  //
    // Application prefix          //
    if (i === 0) {
      param = param.replace(getPrefix(), '');
    }
    // Return if cannot find current param
    // In object. And use remain as function param
    // later
    if (!currentDepth[param]) {
      break;
    }

    currentDepth = currentDepth[param] as any;
    progressedParams.shift();
  }

  return [currentDepth, progressedParams];
}

/**
 *
 * This saga is run if a message is identified as a valid command.
 *
 */

function* verifyCommand({ payload }: ReturnType<typeof verifyCommandAction>) {
  const { message } = payload;
  ////////////////////////////
  const commands: Commands = yield commandListenerRegister();

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
  const start = yield new Date().getTime();
  const result = yield call(commandHandler, message, params);

  // Return response to channel
  if (result) yield call(sendMessage, message.channel.id, result);
  // Monitor execution time for commands
  const elapsed = yield new Date().getTime() - start;
  logger.info(`${name} - ${elapsed}ms`);
}

function* queuedCommandSaga() {
  const channel = yield actionChannel(ActionTypes.RUN_QUEUED_COMMAND);
  while (true) {
    const action = yield take(channel);
    yield commandRunner(action);
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
