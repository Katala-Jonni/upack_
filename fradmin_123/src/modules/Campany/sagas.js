import { fork, takeLatest, call, put } from 'redux-saga/effects';
import {
  // startCreateCampany,
  // startDeleteCampany,
  // startEditCampany,
  // endLoadCampany,
  loadCampany
} from './actions';
// import { routes } from '../../api/routes';
// import { fetchApi } from '../../api/fetch';

function* startLoadCampany(action) {
  try {
    const { payload } = action;
    return yield payload;
  } catch (e) {
    console.error('startLoadCampany', e);
  }
}

function* createCampany(action) {
  try {
    const { payload } = action;
    // const url = `${routes.baseUrl}${routes.campaigns}${routes.add}`;
    // const result = yield call(fetchApi.create, url, values);
    // if (result && result.data.response) {
    //   yield put(loadCampany());
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
    console.log('createCampany', e);
  }

}

function* editCampany(action) {
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
    //   yield put(endLoadCampany(payload));
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
    console.error('editCampany', e);
  }

}

function* deleteCampany(action) {
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
  //     yield put(endLoadCampany(payload));
  //     toast.success(`Кампания удалена`);
  //     return setDeleteLoading(false);
  //   }
  } catch (e) {
    // setDeleteLoading(false);
    // toast.error('Что-то пошло не так! Кампнаия не удалена.');
    console.error('deleteCampany', e);
  }
}

function* campanyWatcher() {
  yield takeLatest(loadCampany, startLoadCampany);
  // yield takeLatest(startCreateCampany, createCampany);
  // yield takeLatest(startEditCampany, editCampany);
  // yield takeLatest(startDeleteCampany, deleteCampany);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(campanyWatcher);
}
