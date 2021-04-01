import axios from 'axios';
import { HashRouter } from 'react-router-dom';

const token = localStorage.getItem('token') || '';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
};
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const myAxios = axios.create({
  baseURL: 'http://localhost:3000', // https://sena.moe
  timeout: 1000000,
  headers,
});

myAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.status === 403) {
      const router = new HashRouter();
      router.history.push('/login');
      console.log('请先登陆');
    } else {
      throw err;
    }
  }
);

export default myAxios;
