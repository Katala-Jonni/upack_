import { fork, takeLatest } from 'redux-saga/effects';
import {
  startCreateTelegram,
  startCreateUsername,
  startCreatePassword,
  startDeleteProfile,
  startCreateAvatar,
  endLoadProfile,
  endEditProfile,
  loadProfile
} from './actions';
import { call, put } from '@redux-saga/core/effects';
import { routes } from '../../api/routes';
import { fetchApi } from '../../api/fetch';
import { deleteStorage, saveStorage, storageKey } from '../../storage';


function* startLoadProfile() {
  const url = `${routes.baseUrl}${routes.profile}${routes.list}`;
  const result = yield call(fetchApi.find, url);
  if (result && result.data.result) {
    return yield put(endLoadProfile(result.data.response));
  } else {
    console.error('startLoadProfile', result);
  }
}

function* createTelegram(action) {
  const { payload: { telegram, toast, setLoadingTelegram } } = action;
  const url = `${routes.baseUrl}${routes.profile}${routes.setTelegram}`;
  const result = yield call(fetchApi.update, url, { telegram });
  if (result && result.data.result) {
    yield put(endEditProfile(result.data.response));
    toast.success('Telegram успешно изменен');
    return setLoadingTelegram(false);
  } else {
    console.error(result);
    toast.error('Telegram не изменен');
    return setLoadingTelegram(false);
  }
}

function* createUsername(action) {
  const { payload: { username, toast, setLoadingUsername } } = action;
  const url = `${routes.baseUrl}${routes.profile}${routes.setUsername}`;
  const result = yield call(fetchApi.update, url, { username });
  if (result && result.data.result) {
    yield put(endEditProfile(result.data.response));
    toast.success('Имя пользователя успешно изменен');
    return setLoadingUsername(false);
  } else {
    console.error(result);
    toast.error('Имя пользователя не изменен');
    return setLoadingUsername(false);
  }
}

function* createAvatar(action) {
  const { payload } = action;
  let formData = new FormData();
  let file = payload.source;
  formData.append('image', file);
  const url = `${routes.baseUrl}${routes.profile}${routes.setAvatar}`;
  const result = yield call(fetchApi.createFile, url, formData);
  if (result && result.data.result) {
    yield put(endEditProfile(result.data.response));
    payload.toast.success('Аватар успешно изменен');
    return payload.setLoadingAvatar(false);
  } else {
    console.error(result);
    payload.toast.error('Аватар не изменен');
    return payload.setLoadingAvatar(false);
  }
}

function* createPassword(action) {
  const { payload: { password, toast, setLoading, initialValue } } = action;
  const url = `${routes.baseUrl}${routes.profile}${routes.setPassword}`;
  const result = yield call(fetchApi.update, url, { password });
  if (result && result.data.result) {
    // Здесь приходит токен
    saveStorage(storageKey, result.data.response.access_token);
    toast.success('Пароль успешно изменен');
    initialValue();
    return setLoading(false);
  } else {
    console.error(result);
    toast.error('Пароль не изменен');
    return setLoading(false);
  }
}

function* deleteProfile(action) {
  const { payload: { setLoadingDelete, router } } = action;
  const url = `${routes.baseUrl}${routes.profile}${routes.delete}`;
  const result = yield call(fetchApi.delete, url);
  if (result && result.data.result) {
    deleteStorage(storageKey);
    setLoadingDelete(false);
    router.reload();
  } else {
    setLoadingDelete(false);
  }
}

function* profileWatcher() {
  yield takeLatest(loadProfile, startLoadProfile);
  yield takeLatest(startCreateTelegram, createTelegram);
  yield takeLatest(startCreateUsername, createUsername);
  yield takeLatest(startCreateAvatar, createAvatar);
  yield takeLatest(startCreatePassword, createPassword);
  yield takeLatest(startDeleteProfile, deleteProfile);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(profileWatcher);
}
