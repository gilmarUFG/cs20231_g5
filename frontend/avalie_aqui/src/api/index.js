import axios from 'axios';

console.log(process.env.REACT_APP_PORT)

const API = axios.create({ baseURL: process.env.REACT_APP_PORT });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/user/register', formData);

export const cadProd = (formData) => API.post('/products', formData);
