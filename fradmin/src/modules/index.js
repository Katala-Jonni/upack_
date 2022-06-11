import { fork } from 'redux-saga/effects';
// import { sagas as campany } from './Campany';
import { sagas as category } from './Category';

export default function* rootSaga() {
  // yield fork(campany);
  yield fork(category);
}
