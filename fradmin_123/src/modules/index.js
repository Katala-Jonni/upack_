import { fork } from 'redux-saga/effects';
import { sagas as category } from './Category';
import { sagas as product } from './Product';
import { sagas as order } from './Orders';
import { sagas as stage } from './Stage';

export default function* rootSaga() {
  yield fork(category);
  yield fork(product);
  yield fork(order);
  yield fork(stage);
}
