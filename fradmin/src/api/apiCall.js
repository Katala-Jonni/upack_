import axios from 'axios';
import { routes } from './routes';

export function apiCall() {
  return axios.create({
    baseURL: routes.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function apiCallFiles() {

  return axios.create({
    baseURL: routes.baseUrl,
    headers: {
      Accept: 'image/*',
      mimeType: 'multipart/form-data',
      'Content-Type': false,
      processData: false,
    }
  })
}
