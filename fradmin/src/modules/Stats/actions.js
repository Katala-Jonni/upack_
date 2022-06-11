import { createAction } from 'redux-actions';

export const loadStats = createAction('@@Stats/LOAD_STATS');
export const endLoadStats = createAction('@@Stats/END_LOAD_STATS');
export const endStats = createAction('@@Stats/END_STATS');
