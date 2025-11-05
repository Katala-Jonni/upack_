import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  endCreateProduct, endCurrentProduct,
  endEditProduct,
  endLoadProduct,
  loadProduct,
  startCreateProduct, startCurrentProduct,
  startEditProduct
} from './actions';
import { routes as route, routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';
import { status } from '../../utils/category';
import { endEditCategory, loadCategory } from '../Category';

function* startLoadProduct() {
  try {
    const url = routes.products;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.products) {
      yield put(loadCategory());
      return yield put(endLoadProduct(res.data));
    }
  } catch (e) {
    console.error('startLoadProduct', e);
  }
}

function* createProduct(action) {
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
      yield put(endCreateProduct(res.data));
      payload.toast.success('Товар создан');
      payload.router.push(payload.url);
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.log('createProduct', e);
  }
}

function* editProduct(action) {
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
      yield put(endEditProduct({ product }));
      payload.toast.success('Товар успешно изменен');
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.error('editProduct', e);
  }
}

function* getProduct(action) {
  try {
    const { payload } = action;
    const { products } = route;
    const url = `${products}/${payload.slug}`;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.product) {
      const product = {
        ...res.data.product,
        active: res.data.product.active ? status.active : status.locked
      };
      // yield put(loadCategory());
      yield put(endCurrentProduct({ product }));
    }
    // if (res && res.data && res.data.title) {
    //   payload.toast.error('Такой товар уже есть');
    // }
  } catch (e) {
    console.error('editProduct', e);
  }
}

function* deleteProduct(action) {
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
    //     yield put(endLoadProduct(payload));
    //     toast.success(`Кампания удалена`);
    //     return setDeleteLoading(false);
    //   }
  } catch (e) {
    // setDeleteLoading(false);
    // toast.error('Что-то пошло не так! Кампнаия не удалена.');
    console.error('deleteProduct', e);
  }
}

function* productWatcher() {
  yield takeLatest(loadProduct, startLoadProduct);
  yield takeLatest(startCreateProduct, createProduct);
  yield takeLatest(startEditProduct, editProduct);
  yield takeLatest(startCurrentProduct, getProduct);
  // yield takeLatest(startDeleteProduct, deleteProduct);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(productWatcher);
}
