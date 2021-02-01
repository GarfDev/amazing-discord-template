import {
  all,
  call,
  put,
  takeLeading,
  actionChannel,
  take,
  spawn
} from 'redux-saga/effects';
import { sendMessage } from 'core/client';
import { initApplicationSuccess } from './actions';
import ActionTypes from './actionTypes';
// Import commands
import { Commands } from 'types';
import { getLogger, measureElapsed } from 'utils';
import { getCommand, getPrefix } from 'utils/messages';
import { commandListenerRegister } from 'utils/command';
import { Message } from 'discord.js';

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

function* handleCommand(message: Message) {
  ////////////////////////////
  const start = yield new Date().getTime();
  const logger = getLogger();
  const commands: Commands = yield commandListenerRegister();

  // Process command /////////
  const splicedCommand = message.content.split(' ');
  const command = getCommand(splicedCommand[0]);
  if (!command.length) return;
  const [commandToRun, params] = commandObjTraveler(commands, splicedCommand);

  // Run command /////////////
  if (!commandToRun) return;
  if (commandToRun.default && commandToRun.default instanceof Function) {
    const result = yield call(commandToRun.default, message, params);

    // Return response to channel
    if (result) yield call(sendMessage, message.channel.id, result);
    // Monitor execution time for commands
    const elapsed = yield new Date().getTime() - start;
    logger.info(`${command} - ${elapsed}ms`);
    //////////////////////////
  }
}

function* commandSaga() {
  const channel = yield actionChannel(ActionTypes.RUN_COMMAND);
  while (true) {
    const { payload } = yield take(channel);
    yield handleCommand(payload.message);
  }
}

function* rootSaga() {
  yield spawn(commandSaga);
  yield all([takeLeading(ActionTypes.INIT_APPLICATION, callInitApplication)]);
}

export default rootSaga;
