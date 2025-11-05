import { fork, takeLatest } from 'redux-saga/effects';
import {
  endLoadStats,
  loadStats
} from './actions';
import { call, put } from '@redux-saga/core/effects';
import { routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';

function* startLoadStats() {
  try {
    const url = `${routes.baseUrl}${routes.stats}${routes.getStats}?page=1`;
    const result = yield call(fetchApi.find, url);
    if (result && result.data.response) {
      return yield put(endLoadStats(result.data.response.items));
    } else {
      // return yield put(setErrorMessage(response.data.error.message));
    }
  } catch (e) {
    console.log('startLoadStats', e);
  }
}

function* statsWatcher() {
  yield takeLatest(loadStats, startLoadStats);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(statsWatcher);
}
