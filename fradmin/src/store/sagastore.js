import {
  createStore, combineReducers, compose, applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../modules';
import category from '../modules/Category';
import product from '../modules/Product';

const sagaMiddleware = createSagaMiddleware();

const mainReducer = combineReducers({
  category,
  product
});

const composeEnhancers = typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);
const store = createStore(mainReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
