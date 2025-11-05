import { createAction } from 'redux-actions';

export const loadStage = createAction('@@Stage/LOAD_STAGE');
export const endLoadStage = createAction('@@Stage/END_LOAD_STAGE');
export const endStage = createAction('@@Stage/END_STAGE');
export const startCreateStage = createAction('@@Stage/START_CREATE_STAGE');
export const endCreateStage = createAction('@@Stage/END_CREATE_STAGE');
export const startEditStage = createAction('@@Stage/START_EDIT_STAGE');
export const endEditStage = createAction('@@Stage/END_EDIT_STAGE');
export const startCurrentStage = createAction('@@Stage/START_CURRENT_STAGE');
export const endCurrentStage = createAction('@@Stage/END_CURRENT_STAGE');
export const startDeleteStage = createAction('@@Stage/START_DELETE_STAGE');
export const endDeleteStage = createAction('@@Stage/END_DELETE_STAGE');
export const addFilterStage = createAction('@@Stage/ADD_FILTER_STAGE');
