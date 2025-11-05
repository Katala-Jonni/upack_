import { createAction } from 'redux-actions';

export const loadProfile = createAction('@@Profile/LOAD_PROFILE');
export const endLoadProfile = createAction('@@Profile/END_LOAD_PROFILE');
export const endProfile = createAction('@@Profile/END_PROFILE');
export const startCreateTelegram = createAction('@@Profile/START_CREATE_TELEGRAM');
export const endCreateTelegram = createAction('@@Profile/END_CREATE_TELEGRAM');
export const endEditProfile = createAction('@@Profile/END_EDIT_PROFILE');
export const startCreateUsername = createAction('@@Profile/START_CREATE_USERNAME');
export const endCreateUsername = createAction('@@Profile/END_CREATE_USERNAME');
export const startCreateAvatar = createAction('@@Profile/START_CREATE_AVATAR');
export const endCreateAvatar = createAction('@@Profile/END_CREATE_AVATAR');
export const startCreatePassword = createAction('@@Profile/START_CREATE_PASSWORD');
export const endCreatePassword = createAction('@@Profile/END_CREATE_PASSWORD');
export const startDeleteProfile = createAction('@@Profile/START_DELETE_PROFILE');
export const endDeleteProfile = createAction('@@Profile/END_DELETE_PROFILE');
