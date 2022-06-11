import { fork, takeLatest } from 'redux-saga/effects';
import {
  endLoadVisitors,
  loadVisitors
} from './actions';
import { call, put } from '@redux-saga/core/effects';
import { routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';

function* startLoadVisitors(action) {
  const { payload: { filters, campaign_id } } = action;
  const limit = filters?.limit ? filters.limit : 5;
  const page = filters?.page ? +filters.page + 1 : 1;
  const startDate = filters?.startDate ? `&date_min=${filters.startDate}` : '';
  const endDate = filters?.endDate ? `&date_max=${filters.endDate}` : '';
  const dateFilter = startDate && endDate ? `${startDate}${endDate}` : '';
  const url = `${routes.baseUrl}${routes.visitors}/${campaign_id}${routes.list}?page=${page}&limit=${limit}${dateFilter}`;
  const result = yield call(fetchApi.find, url);
  if (result && result.data.response) {
    const payload = {
      ...result.data.response,
      filters
    };
    return yield put(endLoadVisitors(payload));
  } else {
    console.error('startLoadVisitors-result', result);
  }
}

function* visitorsWatcher() {
  yield takeLatest(loadVisitors, startLoadVisitors);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(visitorsWatcher);
}
