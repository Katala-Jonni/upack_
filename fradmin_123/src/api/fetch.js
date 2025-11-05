import axios from 'axios';
import { apiCall, apiCallFiles } from './apiCall';

class Fetch {
  async find(url) {
    return apiCall()
      .get(url)
      .catch((error) => {
        return error.response;
      });
  }

  async create(url, payload) {
    return apiCall()
      .post(url, payload)
      .catch(error => {
        return error.response;
      });
  }

  async update(url, payload) {
    return apiCall()
      .put(url, payload)
      .catch(error => {
        return error.response;
      });
  }

  async delete(url, payload = []) {
    return apiCall()
      .delete(url, {
        data: payload
      })
      .catch(error => {
        console.log('error', error);
        return error.response;
      });
  }

  async sign({ url, payload }) {
    return axios.post(url, {
      ...payload,
      returnUrl: '/'
    })
      .then(res => res)
      .catch(error => {
        return error.response;
      });
  }

  async getSession(url) {
    return axios.get(url)
      .then(res => res)
      .catch(error => {
        console.log(error);
      });
  }

  async createFile(url, payload) {
    return apiCallFiles()
      .put(url, payload)
      .catch(err => {
        console.log('fetchCreateFile', `${err}-${err.message}`);
      });
  }
}

export const fetchApi = new Fetch();
