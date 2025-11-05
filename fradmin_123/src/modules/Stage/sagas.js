import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  endCreateStage,
  endCurrentStage,
  endEditStage,
  endLoadStage,
  loadStage, startCurrentStage
} from './actions';
import { routes as route, routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';
import { status } from '../../utils/category';

const getTabs = list => {
  const tabsList = list.map(s => {
    return {
      label: `${s.title[0].toUpperCase()}${s.title.slice(1)}`,
      value: s.status
    };
  });
  const all = {
    label: 'Все',
    value: 'all'
  };
  return [all, ...tabsList];
};

function* startLoadStage() {
  try {
    const url = routes.stage;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.stages) {
      const tabs = getTabs(res.data.stages);
      return yield put(endLoadStage({ stages: res.data, tabs }));
    }
  } catch (e) {
    console.error('startLoadStage', e);
  }
}

function* createStage(action) {
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
      yield put(endCreateStage(res.data));
      payload.toast.success('Товар создан');
      payload.router.push(payload.url);
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.log('createStage', e);
  }
}

function* editStage(action) {
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
      yield put(endEditStage({ product }));
      payload.toast.success('Товар успешно изменен');
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такой товар уже есть');
    }
  } catch (e) {
    console.error('editStage', e);
  }
}

function* getStage(action) {
  try {
    const { payload } = action;
    const { order } = route;
    const url = `${order}/${payload.orderId}`;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.order) {
      yield put(endCurrentStage({ order: res.data.order }));
    }
  } catch (e) {
    console.error('editStage', e);
  }
}

function* deleteStage(action) {
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
    //     yield put(endLoadStage(payload));
    //     toast.success(`Кампания удалена`);
    //     return setDeleteLoading(false);
    //   }
  } catch (e) {
    // setDeleteLoading(false);
    // toast.error('Что-то пошло не так! Кампнаия не удалена.');
    console.error('deleteStage', e);
  }
}

function* productWatcher() {
  yield takeLatest(loadStage, startLoadStage);
  // yield takeLatest(startCreateStage, createStage);
  // yield takeLatest(startEditStage, editStage);
  // yield takeLatest(startCurrentStage, getStage);
  // yield takeLatest(startDeleteStage, deleteStage);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(productWatcher);
}
