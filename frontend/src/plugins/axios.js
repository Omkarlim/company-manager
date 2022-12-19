import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api/v2',
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const { csrfToken } = window;
  if (config.method !== 'GET') {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});

axios.CancelToken = Axios.CancelToken;

export default axios;
