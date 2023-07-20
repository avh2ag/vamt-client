import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies['token'];
  config.headers['Content-Type'] = 'application/json';
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
