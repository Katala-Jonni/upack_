import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  endCreateCategory,
  endEditCategory,
  endLoadCategory,
  loadCategory, startCreateCategory, startEditCategory
} from './actions';
import { routes as route, routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';
import {status} from '../../utils/category';

function* startLoadCategory() {
  try {
    const url = routes.categories;
    const res = yield call(fetchApi.find, url);
    if (res && res.data && res.data.categories) {
      return yield  put(endLoadCategory(res.data));
    }
  } catch (e) {
    console.error('startLoadCategory', e);
  }
}

function* createCategory(action) {
  try {
    const { payload } = action;
    const { category } = route;
    const body = {
      category: {
        title: payload.values.name
      }
    };
    const res = yield call(fetchApi.create, category, body);
    if (res && res.data && res.data.categories) {
      yield put(endCreateCategory(res.data));
      payload.toast.success('Категория создана');
      payload.router.push(payload.url);
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такая категория уже есть');
    }
    // console.log('categories', categories);
    // return yield payload;
    // const url = `${routes.baseUrl}${routes.campaigns}${routes.add}`;
    // const result = yield call(fetchApi.create, url, values);
    // if (result && result.data.response) {
    //   yield put(loadCategory());
    //   toast.success('Кампания создана');
    //   setLoading(false);
    //   return router.push('/dashboard');
    // } else {
    //   setLoading(false);
    //   toast.error('Что-то пошло не так!');
    //   helpers.setStatus({ success: false });
    //   helpers.setErrors({ submit: 'Error' });
    //   helpers.setSubmitting(false);
    // }
  } catch (e) {
    console.log('createCategory', e);
  }
}

function* editCategory(action) {
  try {
    const { payload } = action;
    const { category } = route;
    const url = `${category}/${payload.product.slug}`;
    const body = {
      category: {
        title: payload.values.name,
        active: payload.active
      }
    };
    const res = yield call(fetchApi.update, url, body);
    if (res && res.data && res.data.category) {
      const category = {
        ...res.data.category,
        active: res.data.category.active ? status.active : status.locked
      };
      yield put(endEditCategory({ category }));
      payload.toast.success('Категория успешно изменена.');
    }
    if (res && res.data && res.data.title) {
      payload.toast.error('Такая категория уже есть');
    }
  } catch (e) {
    console.error('editCategory', e);
  }

}

function* deleteCategory(action) {
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
    //     yield put(endLoadCategory(payload));
    //     toast.success(`Кампания удалена`);
    //     return setDeleteLoading(false);
    //   }
  } catch (e) {
    // setDeleteLoading(false);
    // toast.error('Что-то пошло не так! Кампнаия не удалена.');
    console.error('deleteCategory', e);
  }
}

function* campanyWatcher() {
  yield takeLatest(loadCategory, startLoadCategory);
  yield takeLatest(startCreateCategory, createCategory);
  yield takeLatest(startEditCategory, editCategory);
  // yield takeLatest(startDeleteCategory, deleteCategory);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(campanyWatcher);
}
