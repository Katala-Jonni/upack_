import { fork } from 'redux-saga/effects';
import { sagas as category } from './Category';

export default function* rootSaga() {
  yield fork(category);
}
