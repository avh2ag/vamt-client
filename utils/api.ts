import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Change this to your Django server's URL
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies['token'];
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      destroyCookie(null, 'token');
      Router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
