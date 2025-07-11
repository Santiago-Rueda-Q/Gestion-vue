//VITE_API_BACKEND=http://back.test/api

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND,
  withCredentials: true,
});

export default api;
