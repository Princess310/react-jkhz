import { put, takeLatest } from 'redux-saga/effects';
import { hashHistory } from 'react-router';

import request from 'utils/request';
import im from 'utils/im';

import { DO_LOGIN } from './constants';
import { loadLoginError } from './actions';

export function* doLogin(action) {
  try {
    // Call our request helper (see 'utils/request')
    const res = yield request.doPut('user/login', action.payload);

    localStorage.setItem('access_token', res.access_token);
    yield im.login(res.data.chat.userid, res.data.chat.password);
  } catch (err) {
    yield put(loadLoginError(true, err));
  }
}

export function* loginSaga() {
  yield takeLatest(DO_LOGIN, doLogin);
}

// All sagas to be loaded
export default [
  loginSaga,
];
