import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_PORT });

api.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`;
  }
  return req;
});

export const signIn = (formData) => api.post('/auth/login', formData);
export const signInadm = (formData) => api.post('/auth/admin/login', formData);
export const signUp = (formData) => api.post('/user/register', formData);

export const getProdutos = () => api.get('/products');

export const cadProd = async (formData) => {
  const cadProdApi = axios.create({ baseURL: process.env.REACT_APP_PORT });
  
  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = profile?.access_token;
  if (localStorage.getItem('profile')) {
    cadProdApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  
  const response = await cadProdApi.post('/products', formData);
  return response.data;
};
