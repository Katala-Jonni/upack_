import axios from 'axios';
import { loadStorage, storageKey } from '../storage';
import { routes } from './routes';

export function apiCall() {
  const accessToken = loadStorage(storageKey);
  return axios.create({
    baseURL: routes.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || ''}`
    }
  });
}

export function apiCallFiles() {
  const accessToken = loadStorage(storageKey);

  return axios.create({
    baseURL: routes.baseUrl,
    headers: {
      Accept: 'image/*',
      mimeType: 'multipart/form-data',
      'Content-Type': false,
      processData: false,
      Authorization: `Bearer ${accessToken || ''}`
    }
  })
}
