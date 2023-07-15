import { setCookie, destroyCookie } from 'nookies';
import api from './api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/api/token/', { username, password });
  setCookie(null, 'token', response.data.access);
  return response.data;
};

export const logout = () => {
  destroyCookie(null, 'token');
};
