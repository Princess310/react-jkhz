
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_MOMENTS_ROLE_LIST,
  FETCH_MOMENTS_LIST,
} from './constants';

import {
  loadMomemtsRoleList,
  loadMomentsList,
} from './actions';

export function* fetchRoleList() {
  try {
    const res = yield request.doGet('moments/role');
    const { list } = res;

    yield put(loadMomemtsRoleList(list));

    if (list.length > 0) {
      yield fetchMomentList({
        payload: {
          role: list[0].id,
          page: 1,
        }
      });
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchMomentList(action) {
  try {
    const { role, page } = action.payload;
    const res = yield request.doGet('moments/exhibition-moments', {
      role,
      page,
    });
    
    const { list, page: pageInfo } = res;
    yield put(loadMomentsList(role, list, pageInfo));
  } catch (err) {
    // console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* defaultSaga() {
  const watcher = yield takeLatest(FETCH_MOMENTS_ROLE_LIST, fetchRoleList);
  const momentListWatcher = yield takeLatest(FETCH_MOMENTS_LIST, fetchMomentList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(momentListWatcher);
}

// Bootstrap sagas
export default [
  defaultSaga,
];
