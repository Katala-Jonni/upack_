import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  endCreateOrder,
  endCurrentOrder,
  endEditOrder,
  endLoadOrder,
  loadOrder, startCurrentOrder, startDeleteProductOrder, startEditOrderStatus, startEditProductOrder
} from './actions';
import { routes as route, routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';
import { status } from '../../utils/category';
import { endCurrentStage, loadStage } from '../Stage';
import { loadProduct } from '../Product';

function* startLoadOrder() {
  try {
    const url = routes.order;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.orders) {
      // yield put(loadOrder());
      return yield put(endLoadOrder(res.data));
    }
  } catch (e) {
    console.error('startLoadOrder', e);
  }
}

function* createOrder(action) {
  try {
    const { payload } = action;
    const { products } = route;
    const body = {
      product: {
        ...payload.values,
        images: ['https://static.productionready.io/images/smiley-cyrus.jpg']
      }
    };
    const res = yield call(fetchApi.create, products, body);
    if (res && res.data && res.data.products) {
      yield put(endCreateOrder(res.data));
      payload.toast.success('Товар создан');
      payload.router.push(payload.url);
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.log('createOrder', e);
  }
}

function* editOrder(action) {
  try {
    const { payload } = action;
    const { products } = route;
    const url = `${products}/${payload.product.slug}`;
    const body = {
      product: {
        ...payload.values
      }
    };
    const res = yield call(fetchApi.update, url, body);
    if (res && res.data && res.data.product) {
      const product = {
        ...res.data.product,
        active: res.data.product.active ? status.active : status.locked
      };
      yield put(endEditOrder({ product }));
      payload.toast.success('Товар успешно изменен');
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.error('editOrder', e);
  }
}

function* getOrder(action) {
  try {
    const { payload } = action;
    const { order } = route;
    const url = `${order}/${payload.orderId}`;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.order) {
      yield put(loadStage());
      yield put(loadProduct());
      yield put(endCurrentOrder({ order: res.data.order }));
    } else {
      yield put(endCurrentOrder({ order: null }));
    }
  } catch (e) {
    console.error('editOrder', e);
  }
}

function* editOrderProduct(action) {
  try {
    const { payload } = action;
    const { order, product } = route;
    if (payload.values.count === payload.item.count) return;
    // const queryCount = payload.values.count > payload.item.count ? 'plus' : 'minus';
    const url = `${order}/${payload.order._id}${product}/${payload.item.productId._id}/?inc=count`;
    const data = {
      order: {
        count: payload.values.count
      }
    };
    const res = yield call(fetchApi.update, url, data);
    if (res && res.data && res.data.order) {
      // yield put(loadStage());
      // yield put(loadProduct());
      yield put(endCurrentOrder({ order: res.data.order }));
      payload.toast.success('Успешно изменено!');
    } else {
      yield put(endCurrentOrder({ order: null }));
    }
  } catch (e) {
    console.error('editOrder', e);
  }
}

function* startDeleteOrderProduct(action) {
  try {
    const { payload } = action;
    const { order, product } = route;
    const url = `${order}/${payload.order._id}${product}/${payload.product._id}`;
    const res = yield call(fetchApi.delete, url);
    if (res && res.data && res.data.order) {
      yield put(endCurrentOrder({ order: res.data.order }));
      payload.closeModal();
      payload.toast.success(`${payload.product.title} успешно удален!`);
    } else {
      yield put(endCurrentOrder({ order: null }));
    }
  } catch (e) {
    console.error('startDeleteOrderProduct', e);
  }
}

function* startEditStatus(action) {
  try {
    const { payload } = action;
    const { order, stage } = route;
    const stageItem = payload.stages.find(s => s.status === payload.values.stage);
    if (!stageItem) {
      return payload.toast.error('Что-то пошло не так! Повторите.');
    }
    const url = `${order}/${payload.order._id}${stage}/${stageItem._id}`;
    const data = {
      order: {
        causeRejected: payload.values.stage === 'canceled' ? payload.values.causeRejected : null
      }
    };
    const res = yield call(fetchApi.update, url, data);
    if (res && res.data && res.data.order) {
      yield put(endCurrentOrder({ order: res.data.order }));
      payload.toast.success('Статус успешно изменен.');
    } else {
      yield put(endCurrentOrder({ order: null }));
    }
  } catch (e) {
    console.error('startDeleteOrderProduct', e);
  }
}

function* deleteOrder(action) {
  // const { payload: { campaign_id, toast, setDeleteLoading, filters } } = action;
  try {
    //   const limit = filters.limit || 5;
    //   const startDate = filters?.startDate ? `&date_min=${filters.startDate}` : '';
    //   const endDate = filters?.endDate ? `&date_max=${filters.endDate}` : '';
    //   const url = `${routes.baseUrl}${routes.campaigns}${routes.delete}`;
    //   yield call(fetchApi.delete, url, { campaign_id });
    //   const result = yield call(fetchApi.find, `${routes.baseUrl}${routes.campaigns}${routes.list}?page=${1}&limit=${limit}`);
    //   if (result && result.data.result) {
    //     let payload = {
    //       ...result.data.response,
    //       filters: {
    //         limit: 5,
    //         page: 0
    //       }
    //     };
    //     yield put(endLoadOrder(payload));
    //     toast.success(`Кампания удалена`);
    //     return setDeleteLoading(false);
    //   }
  } catch (e) {
    // setDeleteLoading(false);
    // toast.error('Что-то пошло не так! Кампнаия не удалена.');
    console.error('deleteOrder', e);
  }
}

function* productWatcher() {
  yield takeLatest(loadOrder, startLoadOrder);
  // yield takeLatest(startCreateOrder, createOrder);
  // yield takeLatest(startEditOrder, editOrder);
  yield takeLatest(startCurrentOrder, getOrder);
  yield takeLatest(startEditProductOrder, editOrderProduct);
  yield takeLatest(startDeleteProductOrder, startDeleteOrderProduct);
  yield takeLatest(startEditOrderStatus, startEditStatus);
  // yield takeLatest(startDeleteOrder, deleteOrder);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(productWatcher);
}
