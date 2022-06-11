import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  // startCreateCategory,
  // startDeleteCategory,
  // startEditCategory,
  // endLoadCategory,
  loadCategory
} from './actions';
// import { routes } from '../../api/routes';
// import { fetchApi } from '../../api/fetch';

function* startLoadCategory(action) {
  try {
    const { payload } = action;
    return yield payload;
  } catch (e) {
    console.error('startLoadCategory', e);
  }
}

function* createCategory(action) {
  try {
    const { payload } = action;
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
    // const { payload: { values, helpers, toast, handleCancelEdit, setLoading, filters } } = action;
    // const limit = filters.limit || 5;
    // const startDate = filters?.startDate ? `&date_min=${filters.startDate}` : '';
    // const endDate = filters?.endDate ? `&date_max=${filters.endDate}` : '';
    // const url = `${routes.baseUrl}${routes.campaigns}${routes.edit}`;
    // yield call(fetchApi.update, url, values);
    // const result = yield call(fetchApi.find, `${routes.baseUrl}${routes.campaigns}${routes.list}?page=${1}&limit=${limit}`);
    // if (result && result.data.result) {
    //   let payload = {
    //     ...result.data.response,
    //     filters: {
    //       limit: 5,
    //       page: 0
    //     }
    //   };
    //   yield put(endLoadCategory(payload));
    //   toast.success(`Кампания обновлена`);
    //   setLoading(false);
    //   return handleCancelEdit();
    // } else {
    //   setLoading(false);
    //   toast.error('Что-то пошло не так!');
    //   helpers.setStatus({ success: false });
    //   helpers.setErrors({ submit: 'Error' });
    //   helpers.setSubmitting(false);
    // }
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
  // yield takeLatest(startCreateCategory, createCategory);
  // yield takeLatest(startEditCategory, editCategory);
  // yield takeLatest(startDeleteCategory, deleteCategory);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(campanyWatcher);
}
