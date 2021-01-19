import { all, takeEvery } from 'redux-saga/effects';
import { runCommand } from './actions';
import ActionType from './actionTypes';

function* handleCommand({ payload }: ReturnType<typeof runCommand>) {
  const { message } = payload;
  yield console.log('Message been catch by saga >>', message.content);
}

function* rootSaga() {
  yield all([takeEvery(ActionType.RUN_COMMAND, handleCommand)]);
}

export default rootSaga;
