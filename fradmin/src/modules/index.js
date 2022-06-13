import { fork } from 'redux-saga/effects';
import { sagas as category } from './Category';
import { sagas as product } from './Product';

export default function* rootSaga() {
  yield fork(category);
  yield fork(product);
}
